/////////////////////

import { Immutable, enforceꓽimmutable } from '@offirmo-private/state-utils'
import { getꓽengine } from '@offirmo/random'

import {
	Monster,
	MonsterRank,
} from './types.js'
import { create } from './state.js'

/////////////////////

const DEMO_MONSTER_01: Immutable<Monster> = enforceꓽimmutable<Monster>({
	name: 'chicken',
	level: 7,
	rank: MonsterRank.elite,
	possible_emoji: '🐓',
})

// for demo purpose, all attributes having the same probability + also random enhancement level
function generate_random_demo_monster(): Monster {
	const rng = getꓽengine.good_enough()
	return create(rng)
}

/////////////////////

export {
	DEMO_MONSTER_01,
	generate_random_demo_monster,
}

/////////////////////
