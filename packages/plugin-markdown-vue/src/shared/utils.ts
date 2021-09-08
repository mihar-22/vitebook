import type { Page } from '@vitebook/core/shared';

import type { VueMarkdownPage } from './page';

export function isVueMarkdownPage(
  page?: Page<unknown>
): page is VueMarkdownPage {
  return page?.type === 'vue:md';
}
