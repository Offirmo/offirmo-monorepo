import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { WebsiteEntryPointSpec } from './types.js'

/////////////////////////////////////////////////

function ifꓽdebug(spec: Immutable<WebsiteEntryPointSpec>) {
	const isꓽdebug = spec.isꓽdebug ?? false

	return {
		prefixꓽwith(prefix: string, str: string): string {
			return `${isꓽdebug ? prefix : ''}${str}`
		},
	}
}

/////////////////////////////////////////////////

export {
	ifꓽdebug,
}
