import { createFilter } from '@rollup/pluginutils';
import { createHash } from 'crypto';
import fs from 'fs';
import kleur from 'kleur';
import ora from 'ora';
import type { OutputAsset, OutputChunk, RollupOutput } from 'rollup';
import path from 'upath';

import {
  DATA_ASSET_BASE_URL,
  escapeHtml,
  isFunction,
  isLinkExternal,
  isString,
  matchRouteInfo,
  noendslash,
  noslash,
  type ServerEntryModule,
  type ServerLoadedOutputMap,
  type ServerPage,
  slash,
} from '../../../shared';
import { ensureFile } from '../../utils';
import { logger, LoggerIcon } from '../../utils/logger';
import type { App } from '../App';
import type { ResolvedSitemapConfig } from '../AppConfig';
import { installFetch } from '../installFetch';
import {
  buildDataScriptTag,
  buildServerLoadedDataMap,
  loadPageServerOutput,
  readIndexHtmlFile,
} from '../plugins/core';
import { bundle, getAppBundleEntries } from './bundle';

export async function build(app: App): Promise<void> {
  installFetch();

  logger.info(kleur.bold(kleur.cyan(`\nvitebook@${app.version}\n`)));

  if (app.pages.size === 0) {
    logger.info(kleur.bold(`❓ No pages were resolved\n`));
    return;
  }

  const startTime = Date.now();
  const spinner = ora();

  const baseUrl = app.vite?.config.base ?? '/';

  const appEntries = getAppBundleEntries(app);
  const appEntryFilenames = Object.keys(appEntries);

  const pages = app.pages.all;
  const outputFiles: [filePath: string, content: string][] = [];
  const dataHashTable: Record<string, string> = {};
  const pageServerOutput: Map<string, string | ServerLoadedOutputMap> =
    new Map();

  const hrefRE = /href="(.*?)"/g;
  const seenHref = new Map<string, ServerPage>();
  const notFoundHref = new Set<string>();
  const redirectsTable: Record<string, string> = {};

  try {
    // -------------------------------------------------------------------------------------------
    // BUNDLE
    // -------------------------------------------------------------------------------------------

    const bundleStartTime = Date.now();
    spinner.start(kleur.bold('Bundling application...'));

    const [clientBundle] = await bundle(app);

    const ENTRY_CHUNK = clientBundle.output.find(
      (chunk) =>
        chunk.type === 'chunk' &&
        chunk.isEntry &&
        /^assets\/entry\./.test(chunk.fileName),
    ) as OutputChunk;

    const APP_CHUNK = clientBundle.output.find(
      (chunk) =>
        chunk.type === 'chunk' &&
        chunk.isEntry &&
        /^assets\/app\./.test(chunk.fileName),
    ) as OutputChunk;

    const CSS_CHUNK = clientBundle.output.find(
      (chunk) => chunk.type === 'asset' && chunk.fileName.endsWith('.css'),
    ) as OutputAsset;

    const HTML_TEMPLATE = readIndexHtmlFile(app, { dev: false });

    const SSR_MANIFEST = JSON.parse(
      await fs.promises.readFile(
        app.dirs.out.resolve('ssr-manifest.json'),
        'utf-8',
      ),
    );

    const bundleEndTime = ((Date.now() - bundleStartTime) / 1000).toFixed(2);
    spinner.stopAndPersist({
      symbol: LoggerIcon.Success,
      text: kleur.bold(
        `Bundled application in ${kleur.underline(`${bundleEndTime}s`)}`,
      ),
    });

    // -------------------------------------------------------------------------------------------
    // LOAD DATA
    // -------------------------------------------------------------------------------------------

    const specialCharsRE = /\$|#|\[|\]|{|}|:/g;

    // eslint-disable-next-line no-inner-declarations
    async function loadServerOutput(url: URL, page: ServerPage) {
      if (pageServerOutput.has(url.pathname)) {
        return pageServerOutput.get(url.pathname)!;
      }

      const { output, redirect } = await loadPageServerOutput(
        url,
        app,
        page,
        (filePath) => {
          const path = app.dirs.out.resolve(
            'server',
            `${appEntryFilenames
              .find((name) => appEntries[name] === filePath)
              ?.replace(specialCharsRE, '_')}.cjs`,
          );

          return require(path);
        },
      );

      if (redirect) {
        redirectsTable[url.pathname] = redirect;
        pageServerOutput.set(url.pathname, redirect);
        return redirect;
      }

      for (const id of output.keys()) {
        const data = output.get(id)!.data ?? {};
        const content = JSON.stringify(data);

        if (content !== '{}') {
          const hash = createHash('sha1')
            .update(content)
            .digest('hex')
            .substring(0, 8);

          dataHashTable[id] = hash;

          outputFiles.push([
            path.join(app.dirs.out.path, `${DATA_ASSET_BASE_URL}/${hash}.json`),
            content,
          ]);
        }
      }

      pageServerOutput.set(url.pathname, output);
      return output;
    }

    // -------------------------------------------------------------------------------------------
    // RENDER
    // -------------------------------------------------------------------------------------------

    spinner.start(kleur.bold(`Rendering ${app.pages.size} pages...`));

    const serverEntryPath = app.dirs.out.resolve('server', 'entry.cjs');

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { render } = require(serverEntryPath) as ServerEntryModule;

    // eslint-disable-next-line no-inner-declarations
    async function buildPage(url: URL, page: ServerPage) {
      if (seenHref.has(url.pathname)) return;
      seenHref.set(url.pathname, page);

      const serverOutput = await loadServerOutput(url, page);

      // Redirect.
      if (isString(serverOutput)) {
        const location = serverOutput;

        const html = `<meta http-equiv="refresh" content="${escapeHtml(
          `0;url=${location}`,
        )}">`;

        outputFiles.push([getHTMLFilePath(url), html]);

        await buildPageFromHref(page, location);

        return;
      }

      const serverData = buildServerLoadedDataMap(serverOutput);
      const { ssr, html, head } = await render(url, { data: serverData });

      const stylesheetLinks = [CSS_CHUNK?.fileName]
        .filter(Boolean)
        .map((fileName) => createLinkTag(app, 'stylesheet', fileName))
        .filter((tag) => tag.length > 0)
        .join('\n    ');

      const pageImports = resolvePageImports(
        app,
        page,
        clientBundle,
        ENTRY_CHUNK,
        APP_CHUNK,
      );

      const manifestImports = resolveImportsFromManifest(
        ssr.modules,
        SSR_MANIFEST,
      );

      const preloadLinks = Array.from(
        new Set([...pageImports.imports, ...manifestImports]),
      )
        .map((fileName) => createPreloadTag(app, fileName))
        .join('\n    ');

      const prefetchLinks = pageImports.dynamicImports
        .map((fileName) => createLinkTag(app, 'prefetch', fileName))
        .join('\n    ');

      const headTags = [
        head ?? '',
        stylesheetLinks,
        preloadLinks,
        prefetchLinks,
      ]
        .filter((t) => t.length > 0)
        .join('\n    ');

      const appScriptTag = `<script type="module" src="/${ENTRY_CHUNK.fileName}" defer></script>`;

      const dataScriptTag = buildDataScriptTag(serverData, dataHashTable);

      const dataHashScriptTag = `<script id="__VBK_DATA_HASH_MAP__">window.__VBK_DATA_HASH_MAP__ = __VBK_DATA__;</script>`;
      const redirectsScriptTag = `<script id="__VBK_REDIRECTS_MAP__">window.__VBK_REDIRECTS_MAP__ = __VBK_REDIRECTS__;</script>`;

      const pageHtml = HTML_TEMPLATE.replace(`<!--@vitebook/head-->`, headTags)
        .replace(`<!--@vitebook/app-->`, html)
        .replace(
          '<!--@vitebook/body-->',
          redirectsScriptTag + dataHashScriptTag + dataScriptTag + appScriptTag,
        )
        .replace(
          '<script type="module" src="/:virtual/vitebook/client"></script>',
          '',
        );

      outputFiles.push([getHTMLFilePath(url), pageHtml]);

      await crawlHtml(page, html);
    }

    // eslint-disable-next-line no-inner-declarations
    function getHTMLFilePath(url: URL) {
      const decodedRoute = decodeURI(url.pathname);

      const filePath = decodedRoute.endsWith('/')
        ? `${decodedRoute}index.html`
        : decodedRoute;

      return app.dirs.out.resolve(filePath.slice(1));
    }

    const notFoundRE = /\/404\./;
    // eslint-disable-next-line no-inner-declarations
    async function crawlHtml(page: ServerPage, html: string) {
      // Attempt to crawl for additional links.
      for (let href of html.match(hrefRE) ?? []) {
        href = href.slice(6, -1);
        await buildPageFromHref(page, href);
      }
    }

    // eslint-disable-next-line no-inner-declarations
    async function buildPageFromHref(page: ServerPage, href: string) {
      if (isLinkExternal(href, baseUrl) || seenHref.has(href)) return;

      const url = new URL(`http://ssr${slash(href)}`);

      const { index } = matchRouteInfo(url, app.pages.all) ?? {};
      const foundPage = index ? app.pages.all[index] : null;

      if (foundPage && !notFoundRE.test(foundPage.id)) {
        await buildPage(url, foundPage);
        return;
      }

      if (!notFoundHref.has(url.pathname)) {
        if (notFoundHref.size === 0) console.log();

        logger.warn(
          logger.formatWarnMsg(
            [
              `${kleur.bold('(404)')} Found link matching no page.`,
              '',
              `${kleur.bold('Link:')} ${href}`,
              `${kleur.bold('File Path:')} ${page.rootPath}`,
            ].join('\n'),
          ),
        );

        notFoundHref.add(url.pathname);
      }
    }

    // Start with static paths and then crawl additional links.
    for (const page of pages.filter((page) => !page.route.dynamic).reverse()) {
      await buildPage(new URL(`http://ssr${page.route.pathname}`), page);
    }

    for (const entry of app.config.routes.entries) {
      const url = new URL(`http://ssr${slash(entry)}`);
      const { index } = matchRouteInfo(url, app.pages.all) ?? {};

      if (index) {
        const page = app.pages.all[index];
        await buildPage(url, page);
      } else {
        logger.warn(
          logger.formatWarnMsg(
            `${kleur.bold(
              '(404)',
            )} No matching route for entry ${kleur.underline(entry)}.\n`,
          ),
        );
      }
    }

    spinner.stopAndPersist({
      symbol: LoggerIcon.Success,
      text: kleur.bold(`Rendered ${kleur.underline(seenHref.size)} pages`),
    });

    // -------------------------------------------------------------------------------------------
    // WRITE OUTPUT
    // -------------------------------------------------------------------------------------------

    spinner.start(`Writing files...`);

    const dataInsertRE = /__VBK_DATA__/;
    const dataHashTableString = JSON.stringify(dataHashTable);

    const redirectsInsertRE = /__VBK_REDIRECTS__/;
    const redirectsString = JSON.stringify(redirectsTable);

    await Promise.all(
      outputFiles.map(async ([filePath, fileContent]) => {
        if (filePath.endsWith('.html')) {
          fileContent = fileContent
            .replace(dataInsertRE, dataHashTableString)
            .replace(redirectsInsertRE, redirectsString);
        }

        await ensureFile(filePath);
        await fs.promises.writeFile(filePath, fileContent);
      }),
    );

    if (app.config.sitemap.length > 0) {
      await Promise.all(
        app.config.sitemap.map((config) => buildSitemap(app, seenHref, config)),
      );
    }

    spinner.stopAndPersist({
      symbol: LoggerIcon.Success,
      text: kleur.bold(`Committed files`),
    });

    // -------------------------------------------------------------------------------------------
    // CLEAN + LOG
    // -------------------------------------------------------------------------------------------

    if (!app.env.isDebug) {
      await fs.promises.rm(app.dirs.out.resolve('server'), {
        recursive: true,
        force: true,
      });

      await fs.promises.unlink(app.dirs.out.resolve('ssr-manifest.json'));
    }
  } catch (e) {
    spinner.stopAndPersist({
      symbol: LoggerIcon.Error,
    });
    throw e;
  } finally {
    // ...
  }

  const endTime = ((Date.now() - startTime) / 1000).toFixed(2);

  logRoutes(app, seenHref, redirectsTable);

  const speedIcon = {
    2: '🤯',
    4: '🏎️',
    6: '🏃',
    10: '🐌',
    Infinity: '⚰️',
  };

  logger.success(
    kleur.bold(
      `${LoggerIcon.Success} Build complete in ${kleur.bold(
        kleur.underline(`${endTime}s`),
      )} ${speedIcon[Object.keys(speedIcon).find((t) => endTime <= t)!]}`,
    ),
  );

  const pkgManager = guessPackageManager(app);
  const previewCommand = await findPreviewScriptName(app);
  logger.success(
    kleur.bold(
      `\n⚡ ${
        previewCommand
          ? `Run \`${
              pkgManager === 'npm' ? 'npm run' : pkgManager
            } ${previewCommand}\` to serve production build`
          : 'Ready for preview'
      }\n`,
    ),
  );
}

export function logRoutes(
  app: App,
  seenHref: Map<string, ServerPage>,
  redirectsTable: Record<string, string>,
) {
  console.log(`\n${kleur.bold(kleur.underline('ROUTES'))}\n`);

  type TreeDir = {
    name: string;
    path: TreeDir[];
    file: Set<{ name: string; href: string; page: ServerPage }>;
  };

  const newDir = (name: string): TreeDir => ({
    name,
    path: [],
    file: new Set(),
  });

  const tree = newDir('.');

  for (const href of seenHref.keys()) {
    const segments = noslash(href).split('/');

    let current = tree;
    for (const segment of segments.slice(0, -1)) {
      let nextDir = current.path.find((dir) => dir.name === segment);

      if (!nextDir) {
        nextDir = newDir(segment);
        current.path.push(nextDir);
      }

      current = nextDir;
    }

    const name = href.endsWith('/') ? 'index.html' : path.basename(href);
    const page = seenHref.get(href)!;
    current.file.add({ name, href, page });
  }

  const PRINT_SYMBOLS = {
    BRANCH: '├── ',
    EMPTY: '',
    INDENT: '    ',
    LAST_BRANCH: '└── ',
    VERTICAL: '│   ',
  };

  const redirects = new Set(Object.keys(redirectsTable));

  const print = (tree: TreeDir, depth: number, precedingSymbols: string) => {
    const lines: string[] = [];

    const files = Array.from(tree.file).sort((a, b) => {
      if (a.name === 'index.html') return -1;
      if (b.name === 'index.html') return 1;
      return a.name.localeCompare(b.name, undefined, { numeric: true });
    });

    for (const [index, file] of files.entries()) {
      const isLast = index === files.length - 1 && tree.path.length === 0;
      const line = [precedingSymbols];
      const isRedirect = redirects.has(file.href);
      line.push(isLast ? PRINT_SYMBOLS.LAST_BRANCH : PRINT_SYMBOLS.BRANCH);
      line.push(isRedirect ? kleur.yellow(file.name) : file.name);
      if (isRedirect) line.push(kleur.dim(` -> ${redirectsTable[file.href]}`));
      lines.push(line.join(''));
    }

    for (const [index, child] of tree.path.entries()) {
      const line = [precedingSymbols];
      const isLast = index === tree.path.length - 1 && child.path.length === 0;
      line.push(isLast ? PRINT_SYMBOLS.LAST_BRANCH : PRINT_SYMBOLS.BRANCH);
      line.push(kleur.bold(kleur.cyan(child.name)));
      lines.push(line.join(''));
      const dirLines = print(
        child,
        depth + 1,
        precedingSymbols +
          (depth >= 1
            ? isLast
              ? PRINT_SYMBOLS.INDENT
              : PRINT_SYMBOLS.VERTICAL
            : PRINT_SYMBOLS.EMPTY),
      );

      lines.push(...dirLines);
    }

    return lines;
  };

  console.log(kleur.bold(kleur.cyan('.')));
  console.log(print(tree, 1, '').join('\n'));
  console.log('\n');
}

function guessPackageManager(app: App): 'npm' | 'yarn' | 'pnpm' {
  if (fs.existsSync(app.dirs.root.resolve('pnpm-lock.yaml'))) {
    return 'pnpm';
  }

  if (fs.existsSync(app.dirs.root.resolve('yarn.lock'))) {
    return 'yarn';
  }

  return 'npm';
}

async function findPreviewScriptName(app: App): Promise<string | undefined> {
  try {
    const packageJson = app.dirs.root.resolve('package.json');
    if (fs.existsSync(packageJson)) {
      const content = fs.readFileSync(packageJson, 'utf-8');
      const json = JSON.parse(content);

      const script = Object.keys(json.scripts ?? {}).find((script) => {
        return json.scripts[script].includes('vitebook preview');
      });

      return script;
    }
  } catch (e) {
    //
  }

  return undefined;
}

function createLinkTag(app: App, rel: string, fileName?: string) {
  if (!fileName) return '';
  const baseUrl = noendslash(app.vite?.config.base ?? '/');
  const href = `${baseUrl}${slash(fileName)}`;
  return `<link rel="${rel}" href="${href}">`;
}

function createPreloadTag(app: App, fileName?: string) {
  if (!fileName) return '';

  const baseUrl = noendslash(app.vite?.config.base ?? '/');
  const href = `${baseUrl}${slash(fileName)}`;

  if (fileName.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${href}">`;
  } else if (fileName.endsWith('.css')) {
    return `<link rel="stylesheet" href="${href}">`;
  } else if (fileName.endsWith('.woff')) {
    return ` <link rel="preload" href="${href}" as="font" type="font/woff" crossorigin>`;
  } else if (fileName.endsWith('.woff2')) {
    return ` <link rel="preload" href="${href}" as="font" type="font/woff2" crossorigin>`;
  } else if (fileName.endsWith('.gif')) {
    return ` <link rel="preload" href="${href}" as="image" type="image/gif">`;
  } else if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) {
    return ` <link rel="preload" href="${href}" as="image" type="image/jpeg">`;
  } else if (fileName.endsWith('.png')) {
    return ` <link rel="preload" href="${href}" as="image" type="image/png">`;
  }

  return '';
}

function resolveImportsFromManifest(
  modules: Set<string>,
  manifest: Record<string, string[]>,
) {
  const imports = new Set<string>();

  for (const filename of modules) {
    manifest[filename]?.forEach((file) => {
      imports.add(noslash(file));
    });
  }

  return Array.from(imports);
}

function resolvePageImports(
  app: App,
  page: ServerPage,
  bundle: RollupOutput,
  entryChunk: OutputChunk,
  appChunk: OutputChunk,
) {
  const pageChunk = bundle.output.find(
    (chunk) => chunk.type === 'chunk' && chunk.facadeModuleId === page.filePath,
  ) as OutputChunk;

  const layoutChunks = resolvePageLayoutChunks(app, page, bundle);

  return {
    imports: Array.from(
      new Set([
        ...entryChunk.imports.filter((i) => i !== appChunk.fileName),
        ...appChunk.imports,
        ...layoutChunks.map((chunk) => chunk.imports).flat(),
        appChunk.fileName,
        ...layoutChunks.map((chunk) => chunk.fileName),
        ...(pageChunk?.imports ?? []),
        pageChunk.fileName,
      ]),
    ),
    dynamicImports: Array.from(
      new Set([
        ...[entryChunk, appChunk]
          .map((chunk) =>
            chunk.dynamicImports.filter(
              (fileName) => !isPageChunk(fileName, bundle),
            ),
          )
          .flat(),
        ...layoutChunks.map((chunk) => chunk.dynamicImports).flat(),
        ...(pageChunk?.dynamicImports ?? []),
      ]),
    ),
  };
}

function resolveChunkByFilePath(filePath: string, bundle: RollupOutput) {
  return bundle.output.find(
    (chunk) => chunk.type === 'chunk' && chunk.facadeModuleId === filePath,
  ) as OutputChunk;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function resolvePageChunk(page: ServerPage, bundle: RollupOutput) {
  return resolveChunkByFilePath(page.filePath, bundle);
}

function resolvePageLayoutChunks(
  app: App,
  page: ServerPage,
  bundle: RollupOutput,
) {
  return page.layouts
    .map((i) => app.pages.getLayoutByIndex(i))
    .map((layout) => resolveChunkByFilePath(layout!.filePath, bundle))
    .filter(Boolean) as OutputChunk[];
}

const cache = new Map();
function isPageChunk(fileName: string, bundle: RollupOutput) {
  if (cache.has(fileName)) return cache.get(fileName);

  const is = bundle.output.find(
    (chunk) => chunk.type === 'chunk' && chunk.fileName === fileName,
  ) as OutputChunk;

  cache.set(fileName, !!is);
  return is;
}

async function buildSitemap(
  app: App,
  seenHref: Map<string, ServerPage>,
  config: ResolvedSitemapConfig,
) {
  const baseUrl = config.baseUrl;

  if (!baseUrl) return;

  const filter = createFilter(config.include, config.exclude);

  const changefreq = isFunction(config.changefreq)
    ? config.changefreq
    : () => config.changefreq;

  const priority = isFunction(config.priority)
    ? config.priority
    : () => config.priority;

  const lastmodCache = new Map<string, string>();
  const lastmod = async (pathname: string) => {
    if (lastmodCache.has(pathname)) return lastmodCache.get(pathname);
    const filePath = seenHref.get(pathname)!.filePath;
    const mtime = (await fs.promises.stat(filePath)).mtime;
    const date = mtime.toISOString().split('T')[0];
    lastmodCache.set(pathname, date);
    return date;
  };

  const urls = (
    await Promise.all(
      Array.from(seenHref.keys())
        .filter(filter)
        .map(
          async (pathname) => `<url>
    <loc>${baseUrl}${slash(pathname)}</loc>
    <lastmod>${await lastmod(pathname)}</lastmod>
    <changefreq>${await changefreq(new URL(pathname, baseUrl))}</changefreq>
    <priority>${await priority(new URL(pathname, baseUrl))}</priority>
  </url>`,
        ),
    )
  ).join('\n  ');

  const content = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
  ${urls}
</urlset>`;

  await app.dirs.out.write(config.filename, content);
}
