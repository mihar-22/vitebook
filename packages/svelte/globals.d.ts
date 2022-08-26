declare module '*.svelte' {
  const component: typeof import('svelte').SvelteComponent;
  export default component;
}

declare module '*.md' {
  import type { MarkdownMeta } from 'vitebook';

  const meta: MarkdownMeta;
  export { meta };

  const component: typeof import('svelte').SvelteComponent;
  export default component;
}
