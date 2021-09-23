import { VM_PREFIX } from '@vitebook/core/node';
import {
  prettyJsonStr,
  stripImportQuotesFromJson
} from '@vitebook/core/shared';

import type { PageAddonPlugin } from '../shared';

export const VIRTUAL_ADDONS_MODULE_ID = `${VM_PREFIX}/vitebook/addons` as const;

export const VIRTUAL_ADDONS_MODULE_REQUEST_PATH =
  `/${VIRTUAL_ADDONS_MODULE_ID}` as const;

export function loadAddonsVirtualModule(addons: PageAddonPlugin[]): string {
  return `export default ${stripImportQuotesFromJson(
    prettyJsonStr(
      addons.map(({ addon }) => ({
        loader: `() => import('${addon}')`
      }))
    )
  )}`;
}