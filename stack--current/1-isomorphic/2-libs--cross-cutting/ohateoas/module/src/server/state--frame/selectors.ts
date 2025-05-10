import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'
import { type Url‿str } from '@offirmo-private/ts-types-web'

import type { State } from './types.js'

/////////////////////////////////////////////////

function getꓽurl_for_display(state: Immutable<State>): Url‿str {
	return state.urlⵧself || state.urlⵧload
}

/////////////////////////////////////////////////

export {
	getꓽurl_for_display,
}
