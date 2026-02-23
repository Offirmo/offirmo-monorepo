/////////////////////

import { type Immutable, enforceꓽimmutable } from '@monorepo-private/state-utils'
import { getꓽengine } from '@offirmo/random'

import {
	type Monster,
	MonsterRank,
} from './types.ts'
import { create } from './state.ts'

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
