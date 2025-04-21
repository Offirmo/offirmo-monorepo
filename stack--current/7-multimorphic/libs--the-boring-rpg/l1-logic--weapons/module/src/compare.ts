/////////////////////

import type { Immutable } from '@offirmo-private/ts-types'
import { compareꓽitemsⵧby_quality } from '@tbrpg/definitions'

import type { Weapon } from './types.ts'
import { getꓽultimate_medium_damage } from './selectors.ts'

/////////////////////

// for sorting
function compare_weapons_by_potential(a: Immutable<Weapon>, b: Immutable<Weapon>): number {
	const a_dmg = getꓽultimate_medium_damage(a)
	const b_dmg = getꓽultimate_medium_damage(b)
	if (a_dmg !== b_dmg)
		return b_dmg - a_dmg

	// fallback to other attributes
	return compareꓽitemsⵧby_quality(a, b) || a.uuid.localeCompare(b.uuid)
}

/////////////////////

export {
	compare_weapons_by_potential,
}

/////////////////////
