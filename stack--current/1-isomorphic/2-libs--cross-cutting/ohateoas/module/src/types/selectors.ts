import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'
import { promote_toꓽscheme_specific_part } from '@offirmo-private/ts-types-web'

import type { OHAHyperLink, OHAHyperLink‿x } from './types.ts'
import { isꓽOHAHyperLink } from './guards.ts'

/////////////////////////////////////////////////

// promote to the most expressive of "X"
function promote_toꓽOHAHyperLink(link: OHAHyperLink‿x, hints: Partial<Omit<OHAHyperLink‿x, 'href'>> = {}): OHAHyperLink {
	if (isꓽOHAHyperLink(link))
		return link

	return {
		...hints,
		href: link,
	}
}

/////////////////////////////////////////////////

export {
	promote_toꓽOHAHyperLink,
}
