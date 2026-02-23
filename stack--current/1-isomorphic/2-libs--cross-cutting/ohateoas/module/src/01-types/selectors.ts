import assert from 'tiny-invariant'
import type { Immutable } from '@monorepo-private/ts--types'
import {
	type Url‿str,
	getꓽuriⵧnormalized‿str as _getꓽuriⵧnormalized‿str, type Uri‿x,
} from '@monorepo-private/ts--types--web'

import type { OHAHyperLink, OHAHyperLink‿x, OHALinkRelation } from './types.ts'
import { isꓽOHAHyperLink } from './type-guards.ts'

/////////////////////////////////////////////////

// promote to the most expressive of "X"
function promote_toꓽOHAHyperLink(link: Immutable<OHAHyperLink‿x>, hints: Immutable<Partial<Omit<OHAHyperLink, 'href'>>> = {}): Immutable<OHAHyperLink> {
	if (isꓽOHAHyperLink(link))
		return {
			...link,
			rel: Array.from((new Set<OHALinkRelation>([ ...(link.rel ?? []), ...(hints.rel ?? [])])).values()).sort(),
		}

	return {
		...hints,
		href: link as Uri‿x, // TODO better TS discrimination
	}
}

function getꓽuriⵧnormalized‿str(link: Immutable<OHAHyperLink‿x>): Url‿str {
	if (isꓽOHAHyperLink(link))
		return _getꓽuriⵧnormalized‿str(link.href)

	return _getꓽuriⵧnormalized‿str(link as Uri‿x) // TODO better TS discrimination
}

/////////////////////////////////////////////////

export {
	promote_toꓽOHAHyperLink,
	getꓽuriⵧnormalized‿str,
}
