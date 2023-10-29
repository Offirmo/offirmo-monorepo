import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { WebsiteEntryPointSpec } from './types.js'
import { isꓽdebug } from './selectors.js'

/////////////////////////////////////////////////

function ifꓽdebug(spec: Immutable<WebsiteEntryPointSpec>) {
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
