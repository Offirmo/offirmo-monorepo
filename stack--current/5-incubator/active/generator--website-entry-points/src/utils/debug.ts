import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'

import { WebPropertyEntryPointSpec } from '../types.js'
import { isꓽdebug } from '../selectors/index.js'

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
