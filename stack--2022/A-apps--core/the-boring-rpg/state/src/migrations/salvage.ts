/////////////////////

import { Enum } from 'typescript-string-enums'

import { Immutable, JSONObject, JSON } from '@offirmo-private/ts-types'
import { getꓽschema_version_loose } from '@offirmo-private/state-utils'

import { xxx_internal_reset_prng_cache } from '@oh-my-rpg/state-prng'
import { CharacterClass } from '@tbrpg/state--character'
import * as EngagementState from '@oh-my-rpg/state-engagement'

import { LIB } from '../consts.js'
import { State } from '../types.js'
import { getꓽlogger } from '../services/logger.js'
import {
	create,
	reseed,
	rename_avatar,
	change_avatar_class,
	_autoplay,
} from '../reducers/index.js'
import { EngagementKey } from '../data/engagement/index.js'

/////////////////////

// https://github.com/burakcan/mb
// Exception-free nested nullable attribute accessor
const mb = (...p: string[]) =>
	(o: JSON): JSON =>
		p.map((c: string) => (o = ((o || {}) as JSONObject)[c])) && o

function coerce_to_number_or_zero(x: any): number {
	const res = Number(x)
	return Number.isNaN(res) ? 0 : res
}

const getꓽname_v4 = mb('avatar', 'name')
const getꓽname_v9 = mb('u_state', 'avatar', 'name')
const getꓽname = (ls: any) => getꓽname_v9(ls) || getꓽname_v4(ls)

const getꓽclass_v4 = mb('avatar', 'klass')
const getꓽclass_v9 = mb('u_state', 'avatar', 'klass')
const getꓽclass = (ls: any) => getꓽclass_v9(ls) || getꓽclass_v4(ls)

const get_seed_v4 = mb('prng', 'seed')
const get_seed_v9 = mb('u_state', 'prng', 'seed')
const get_seed = (ls: any) => get_seed_v9(ls) || get_seed_v4(ls)

const get_good_play_count_v4 = mb('good_click_count')
const get_good_play_count_v7 = mb('progress', 'statistics', 'good_play_count')
const get_good_play_count_v9 = mb('u_state', 'progress', 'statistics', 'good_play_count')
const get_good_play_count = (ls: any) => coerce_to_number_or_zero(
	get_good_play_count_v9(ls)
	|| get_good_play_count_v7(ls)
	|| get_good_play_count_v4(ls),
)

const get_play_count_v4 = mb('click_count')
const get_bad_play_count_v4 = (ls: any) =>
	coerce_to_number_or_zero(get_play_count_v4(ls)) - coerce_to_number_or_zero(get_good_play_count_v4(ls))
const get_bad_play_count_v7 = mb('progress', 'statistics', 'bad_play_count')
const get_bad_play_count_v9 = mb('u_state', 'progress', 'statistics', 'bad_play_count')
const get_bad_play_count = (ls: any) => coerce_to_number_or_zero(
	get_bad_play_count_v9(ls)
	|| get_bad_play_count_v7(ls)
	|| get_bad_play_count_v4(ls),
)

/////////////////////

function reset_and_salvage(legacy_state: Immutable<any>): Immutable<State> {
	get_logger().info(`${LIB}: salvaging some data from a v${get_schema_version_loose(legacy_state as any)} legacy savegame…`)

	xxx_internal_reset_prng_cache() // don't do this at home, kids!
	let state: Immutable<State> = create()

	const seed = get_seed(legacy_state)
	if (!Number.isInteger(seed as any)) {
		get_logger().warn(`${LIB}: salvaging: may need to update the seed salvaging!`)
		state = reseed(state) // force random reseed to avoid pp having the same game
	}
	else {
		state = reseed(state, seed as number)
	}

	const name = get_name(legacy_state)
	if (typeof name !== 'string') {
		get_logger().warn(`${LIB}: salvaging: may need to update the avatar name salvaging!`)
	}
	else {
		state = rename_avatar(state, name)
	}

	const klass = get_class(legacy_state)
	if (typeof klass !== 'string' || !Enum.isType(CharacterClass, klass)) {
		get_logger().warn(`${LIB}: salvaging: may need to update the avatar class salvaging!`)
	}
	else {
		if (klass !== state.u_state.avatar.klass)
			state = change_avatar_class(state, klass as CharacterClass)
	}

	const good_play_count = get_good_play_count(legacy_state)
	if (good_play_count === 0) {
		get_logger().warn(`${LIB}: salvaging: may need to update the good play count salvaging!`)
	}

	const bad_play_count = get_bad_play_count(legacy_state)

	state = _autoplay(state, {
		target_good_play_count: good_play_count,
		target_bad_play_count: bad_play_count,
	})

	// now insert some relevant start engagements
	state = {
		...state,
		u_state: {
			...state.u_state,
			engagement: EngagementState.enqueue(state.u_state.engagement, {
				type: EngagementState.EngagementType.warning,
				key: EngagementKey['reborn'],
			}),
		},
	}

	get_logger().info(`${LIB}: salvaged some data from a v${get_schema_version_loose(legacy_state as any)} legacy savegame.`)

	return state
}

/////////////////////

export {
	reset_and_salvage,
}
