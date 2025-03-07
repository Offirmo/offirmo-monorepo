import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'

import type { WebPropertyEntryPointSpec } from '../types.ts'
import { isꓽdebug } from '../selectors/index.ts'

/////////////////////////////////////////////////

function ifꓽdebug(spec: Immutable<WebPropertyEntryPointSpec>) {
	return {
		prefixꓽwith(prefix: string, str: string): string {
			return `${isꓽdebug(spec) ? prefix : ''}${str}`
		},
	}
}

/////////////////////////////////////////////////

export {
	ifꓽdebug,
}
