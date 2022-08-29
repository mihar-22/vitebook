import path from 'node:path';
import { readFileSync } from 'node:fs';
import minimist from 'minimist';
import { globbySync } from 'globby';
import { build } from 'esbuild';

const args = minimist(process.argv.slice(2));

const IS_NODE = args.platform === 'node';

if (args.prod) {
  process.env.NODE_ENV = 'production';
}

if (!args.entry) {
  args.entry = IS_NODE ? 'src/node/index.ts' : 'src/client/index.ts';
}

if (!args.outfile && !args.outdir) {
  args.outdir = IS_NODE ? 'dist/node' : 'dist/client';
}

const NODE_SHIMS = IS_NODE
  ? [IS_NODE && requireShim()].filter(Boolean).join('\n')
  : '';

async function main() {
  const entryPoints = (
    args.entry.includes(',') ? args.entry.split(',') : [args.entry]
  )
    .map((glob) => globbySync(glob))
    .flat();

  const outdir = args.outfile
    ? undefined
    : path.resolve(process.cwd(), args.outdir);

  await build({
    entryPoints,
    outdir,
    outfile: args.outfile,
    outbase: args.outbase,
    logLevel: args.logLevel ?? 'warning',
    platform: args.platform ?? 'browser',
    format: 'esm',
    target: args.target ?? IS_NODE ? 'node16' : 'esnext',
    watch: args.watch || args.w,
    chunkNames: '[name].[hash]',
    splitting: args.split,
    banner: { js: NODE_SHIMS },
    minify: args.minify,
    legalComments: 'none',
    sourcemap: args.sourcemap,
    treeShaking: true,
    incremental: args.watch || args.w,
    define: {
      __DEV__: args.prod ? 'false' : 'true',
      __NODE__: IS_NODE ? 'true' : 'false',
    },
    bundle: args.bundle,
    external: args.bundle
      ? [
          'rollup',
          'vite',
          ':virtual',
          ...(args.external?.split(',') ?? []),
          ...getDeps(),
        ]
      : undefined,
    plugins: [ignoreSveltePlugin()],
  });
}

function getDeps() {
  const pkg = JSON.parse(
    readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf-8'),
  );
  return [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ];
}

/** @returns {import('esbuild').Plugin} */
function ignoreSveltePlugin() {
  return {
    name: 'ignore-svelte',
    setup(build) {
      build.onResolve({ filter: /\.svelte$/ }, (args) => {
        return { path: args.path, external: true, namespace: 'ignore-svelte' };
      });
    },
  };
}

function requireShim() {
  return [
    "import __path from 'node:path';",
    "import { fileURLToPath as __fileURLToPath } from 'node:url';",
    "import { createRequire as __createRequire } from 'node:module';",
    'const require = __createRequire(import.meta.url);',
    'const __filename = __fileURLToPath(import.meta.url);',
    'const __dirname = __path.dirname(__filename);',
  ].join('\n');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});