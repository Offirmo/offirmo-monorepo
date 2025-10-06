import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'
import { type Url‿str } from '@offirmo-private/ts-types-web'

import type { State } from './types.js'
import { getꓽlinks, getꓽlink‿str } from '../../10-representation'
import { OHALinkRelation } from '../../01-types'

/////////////////////////////////////////////////

function getꓽurlⵧself(state: Immutable<State>): Url‿str {
	if (state.$representation) {
		const links = getꓽlinks(state.$representation)
		if (OHALinkRelation.self in links) {
			return getꓽlink‿str(links[OHALinkRelation.self]!)
		}
	}

	return state.urlⵧload
}

/*
function getꓽurl_for_display(state: Immutable<State>): Url‿str {
	return state.urlⵧself || state.urlⵧload
}
*/

/////////////////////////////////////////////////

export {
	getꓽurlⵧself,
}
