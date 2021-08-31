import { ensureLeadingSlash } from '../../../utils/path.js';
import type { App } from '../../App.js';

type RouteItem = [
  name: string,
  path: string,
  title: string,
  redirects: string[]
];

/**
 * Generate routes temp file.
 */
export const preparePagesRoutes = async (app: App): Promise<void> => {
  // TODO(CLIENT-PLUGIN): component needs to be determined by client plugin.
  const content = `\
import { Vitebook } from '@vitebook/client/components/Vitebook'

const routeItems = [\
${app.pages
  .map(({ key, title, path, pathInferred, filePathRelative }) => {
    const redirects: string[] = [];
    const routeItem: RouteItem = [key, path, title, redirects];

    // paths that should redirect to this page
    const redirectsSet = new Set<string>();

    // redirect from decoded path
    redirectsSet.add(decodeURI(path));

    if (path.endsWith('/')) {
      // redirect from index path
      redirectsSet.add(path + 'index.html');
    } else {
      // redirect from the path that does not end with `.html`
      redirectsSet.add(path.replace(/.html$/, ''));
    }

    // redirect from inferred path
    if (pathInferred !== null) {
      redirectsSet.add(pathInferred);
      redirectsSet.add(encodeURI(pathInferred));
    }

    // redirect from filename path
    if (filePathRelative !== null) {
      const filenamePath = ensureLeadingSlash(filePathRelative);
      redirectsSet.add(filenamePath);
      redirectsSet.add(encodeURI(filenamePath));
    }

    // avoid redirect from the page path itself
    redirectsSet.delete(path);

    // add redirects to route item
    redirects.push(...redirectsSet);

    return `\n  ${JSON.stringify(routeItem)},`;
  })
  .join('')}
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, title, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vitebook,
        meta: { title },
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vitebook,
    }
  ]
)
`;

  await app.dirs.tmp.write('internal/pagesRoutes.js', content);
};