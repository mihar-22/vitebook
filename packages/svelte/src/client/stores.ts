import type {
  LoadedClientPage,
  LoadedRoute,
  MarkdownFrontmatter,
  MarkdownMeta,
} from '@vitebook/core';
import type { Readable } from 'svelte/store';

import { getFrontmatter, getMarkdown, getPage, getRoute } from './context';

export const page: Readable<LoadedClientPage> = {
  subscribe(fn) {
    return getPage().subscribe(fn);
  },
};

export const route: Readable<LoadedRoute> = {
  subscribe(fn) {
    return getRoute().subscribe(fn);
  },
};

export const markdown: Readable<MarkdownMeta | undefined> = {
  subscribe(fn) {
    return getMarkdown().subscribe(fn);
  },
};

export const frontmatter: Readable<MarkdownFrontmatter | undefined> = {
  subscribe(fn) {
    return getFrontmatter().subscribe(fn);
  },
};