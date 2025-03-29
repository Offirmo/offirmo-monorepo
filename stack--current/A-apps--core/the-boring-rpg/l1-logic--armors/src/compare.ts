////////////////////////////////////

import type { Immutable } from '@offirmo-private/ts-types'
import { compareꓽitemsⵧby_quality } from '@tbrpg/definitions'

import { Armor } from './types.ts'
import { getꓽultimate_medium_damage_reduction } from './selectors.ts'

/////////////////////

// for sorting
function compare_armors_by_potential(a: Immutable<Armor>, b: Immutable<Armor>): number {
	const a_dmg = getꓽultimate_medium_damage_reduction(a)
	const b_dmg = getꓽultimate_medium_damage_reduction(b)
	if (a_dmg !== b_dmg)
		return b_dmg - a_dmg

	// fallback to other attributes
	return compareꓽitemsⵧby_quality(a, b) || a.uuid.localeCompare(b.uuid)
}

/////////////////////

export {
	compare_armors_by_potential,
}

/////////////////////
