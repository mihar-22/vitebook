import kleur from 'kleur';

import {
  buildDataAssetID,
  execRouteMatch,
  isFunction,
  isLinkExternal,
  type ServerLoadedDataMap,
  type ServerLoadedOutput,
  type ServerLoadedOutputMap,
  type ServerLoader,
  type ServerLoaderCacheKeyBuilder,
  type ServerLoaderCacheMap,
  type ServerLoaderInput,
  type ServerPage,
  slash,
} from '../../../../shared';
import { logger } from '../../../utils';
import { type App } from '../../App';

export function buildDataScriptTag(
  map: ServerLoadedDataMap,
  hashTable?: Record<string, string>,
) {
  const output = {};

  for (const id of map.keys()) {
    const hashedId = hashTable?.[id] ?? id;
    const data = map.get(id)!;

    if (data && Object.keys(data).length > 0) {
      output[hashedId] = data;
    }
  }

  return `<script id="__VBK_DATA__" type="application/json">${JSON.stringify(
    output,
  )}</script>`;
}

export function buildServerLoadedDataMap(map: ServerLoadedOutputMap) {
  const data: ServerLoadedDataMap = new Map();

  for (const id of map.keys()) {
    data.set(id, map.get(id)!.data ?? {});
  }

  return data;
}

export function buildServerLoaderInput(
  url: URL,
  page: ServerPage,
): ServerLoaderInput {
  const match = execRouteMatch(url, page.route)!;

  return {
    pathname: url.pathname,
    page,
    route: page.route,
    match,
  };
}

export async function loadPageServerOutput(
  url: URL,
  app: App,
  page: ServerPage,
  moduleLoader: (filePath: string) => unknown | Promise<unknown>,
) {
  const map: ServerLoadedOutputMap = new Map();

  const pathname = decodeURI(url.pathname);
  const input = buildServerLoaderInput(url, page);

  let redirect: string | undefined;

  // Load page first - if it has a redirect we'll skip loading layouts.
  await (async () => {
    const id = buildDataAssetID(pathname);

    const output = await runModuleServerLoader(
      app,
      page.filePath,
      input,
      moduleLoader,
    );

    map.set(id, output);

    redirect =
      output.redirect &&
      !isLinkExternal(output.redirect, app.vite?.config.base ?? '/')
        ? slash(output.redirect)
        : output.redirect;
  })();

  if (redirect) return { output: map, redirect };

  await Promise.all(
    page.layouts.map(async (index) => {
      const id = buildDataAssetID(pathname, index);
      const layout = app.pages.getLayoutByIndex(index)!;

      const output = await runModuleServerLoader(
        app,
        layout.filePath,
        input,
        moduleLoader,
      );

      map.set(id, output);
    }),
  );

  return { output: map, redirect };
}

const loadedCache = new Map<string, ServerLoaderCacheMap>();
const cacheKeyBuilder = new Map<string, ServerLoaderCacheKeyBuilder>();

export async function runModuleServerLoader(
  app: App,
  filePath: string | null,
  input: ServerLoaderInput,
  moduleLoader: (filePath: string) => unknown | Promise<unknown>,
): Promise<ServerLoadedOutput> {
  if (!filePath) return {};

  const module = app.pages.isLayout(filePath)
    ? app.pages.getLayout(filePath)
    : app.pages.getPage(filePath);

  if (!module || !module.hasLoader) {
    cacheKeyBuilder.delete(filePath);
    loadedCache.delete(filePath);
    return {};
  }

  if (cacheKeyBuilder.has(filePath)) {
    const buildCacheKey = cacheKeyBuilder.get(filePath)!;
    const cacheKey = await buildCacheKey(input);
    const cache = loadedCache.get(filePath);
    if (cacheKey && cache && cache.has(cacheKey)) {
      return cache.get(cacheKey)!;
    }
  }

  const { loader } = (await moduleLoader(module.filePath)) as {
    loader?: ServerLoader;
  };

  try {
    const output = (await loader?.(input)) ?? {};

    const data = output.data;
    const buildCacheKey = output.cache;
    const isDataValid = !data || typeof data === 'object';

    if (isDataValid && isFunction(buildCacheKey)) {
      const cacheKey = await buildCacheKey(input);

      if (cacheKey) {
        const cache = loadedCache.get(filePath) ?? new Map();
        cache.set(cacheKey, output);
        loadedCache.set(filePath, cache);
      }

      cacheKeyBuilder.set(filePath, buildCacheKey);
    }

    if (!isDataValid) {
      logger.warn(
        logger.formatWarnMsg(
          [
            'Received invalid data from loader (expected object).\n',
            `${kleur.bold('File Path:')} ${filePath}`,
            `${kleur.bold('Data Type:')} ${typeof output.data}`,
          ].join('\n'),
        ),
      );

      output.data = {};
    }

    if (buildCacheKey && !isFunction(buildCacheKey)) {
      logger.warn(
        logger.formatWarnMsg(
          [
            'Received invalid cache builder from loader (expected function).\n',
            `${kleur.bold('File Path:')} ${filePath}`,
            `${kleur.bold('Cache Type:')} ${typeof buildCacheKey}`,
          ].join('\n'),
        ),
      );
    }

    return output;
  } catch (e) {
    // TODO: handle this with error boundaries.
    logger.error(
      logger.formatErrorMsg(
        [
          'Error was thrown by data loader.\n',
          `${kleur.bold('File Path:')} ${filePath}`,
          `${kleur.bold('Input:')} ${input}`,
        ].join('\n'),
      ),
      `\n${e}`,
    );
  }

  return {};
}