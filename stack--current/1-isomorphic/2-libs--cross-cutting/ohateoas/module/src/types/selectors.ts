import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'
import { getꓽscheme_specific_part } from '@offirmo-private/ts-types-web'

import type { OHAHyperLink, OHAHyperLink‿x, OHALinkRelation } from './types.ts'
import { isꓽOHAHyperLink } from './guards.ts'

/////////////////////////////////////////////////

// promote to the most expressive of "X"
function promote_toꓽOHAHyperLink(link: OHAHyperLink‿x, hints: Partial<Omit<OHAHyperLink, 'href'>> = {}): OHAHyperLink {
	if (isꓽOHAHyperLink(link))
		return {
			...link,
			rel: Array.from((new Set<OHALinkRelation>([ ...(link.rel ?? []), ...(hints.rel ?? [])])).values()).sort(),
		}

	return {
		...hints,
		href: link,
	}
}

/////////////////////////////////////////////////

export {
	promote_toꓽOHAHyperLink,
}
