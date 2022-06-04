export const EXTERNAL_URL_RE = /^https?:/i;

/**
 * Ensure a url `string` has an ending slash `/`.
 */
export const endslash = (str: string): string =>
  /(\.html|\/)$/.test(str) ? str : str + '/';

const slashSplitRE = /(?=\/)/g;

/**
 * Split string and keep `/` at the start of each path.
 */
export const slashedSplit = (path: string) => slash(path).split(slashSplitRE);

/**
 * Ensure a url `string` has a leading slash `/`.
 */
export const slash = (str: string): string => str.replace(/^\/?/, '/');

/**
 * Remove leading slash `/` from a `string`.
 */
export const noslash = (str: string): string => str.replace(/^\//, '');

/**
 * Remove ending slash `/` from a `string`.
 */
export const noendslash = (str: string): string => str.replace(/\/$/, '');

/**
 * Normalize slashes by ensuring a leading slash and no trailing slash.
 */
export const slashes = (str: string) => slash(noendslash(str));

/**
 * Determine if a link is a http link or not.
 *
 * - http://github.com
 * - https://github.com
 * - //github.com
 */
export const isLinkHttp = (link: string): boolean =>
  /^(https?:)?\/\//.test(link);

/**
 * Determine if a link is external or not.
 */
export const isLinkExternal = (link: string, base = '/'): boolean => {
  // http link
  if (isLinkHttp(link)) {
    return true;
  }

  // absolute link that does not start with `base`
  if (link.startsWith('/') && !link.startsWith(base)) {
    return true;
  }

  return false;
};

/**
 * Determine if a link is a `mailto` address or not.
 */
export const isLinkMailto = (link: string): boolean => /^mailto:/.test(link);

/**
 * Determine if a link is a `tel` address or not
 */
export const isLinkTel = (link: string): boolean => /^tel:/.test(link);

export const HASH_RE = /#.*$/s;
export const QUERY_RE = /\?.*$/s;

export const cleanUrl = (url: string): string =>
  url.replace(HASH_RE, '').replace(QUERY_RE, '');

export const resolveRoutePathFromUrl = (url: string, baseUrl = '/'): string =>
  url
    // Remove url origin
    .replace(/^(https?:)?\/\/[^/]*/, '')
    // Remove site base
    .replace(new RegExp(`^${baseUrl}`), '/');
