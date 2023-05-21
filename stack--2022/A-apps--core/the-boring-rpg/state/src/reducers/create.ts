/////////////////////

import { get_UTC_timestamp_ms, get_human_readable_UTC_timestamp_minutes } from '@offirmo-private/timestamps'
import assert from 'tiny-invariant'
import { Immutable, enforce_immutability } from '@offirmo-private/state-utils'

/////////////////////

import { ItemQuality } from '@tbrpg/definitions'

import * as CodesState from '@oh-my-rpg/state-codes'
import * as EngagementState from '@oh-my-rpg/state-engagement'
import * as MetaState from '@oh-my-rpg/state-meta'
import * as PRNGState from '@oh-my-rpg/state-prng'

import * as CharacterState from '@tbrpg/state--character'
import * as EnergyState from '@tbrpg/state-energy'
import * as InventoryState from '@tbrpg/state--inventory'
import * as ProgressState from '@tbrpg/state--progress'
import * as WalletState from '@tbrpg/state-wallet'

import {
	Weapon,
	create as create_weapon,
} from '@tbrpg/logic-weapons'
import {
	Armor,
	create as create_armor,
} from '@tbrpg/logic-armors'


/////////////////////

import { SCHEMA_VERSION } from '../consts.js'
import { TBRSoftExecutionContext, get_lib_SEC } from '../services/sec.js'
import { State } from '../types.js'
import { EngagementKey } from '../data/engagement/index.js'
import {
	_update_to_now,
	_receive_item,
	_ack_all_engagements,
} from './internal.js'
import { equip_item } from './base.js'
import { _refresh_achievements } from './achievements/index.js'

/////////////////////

const STARTING_WEAPON_SPEC: Immutable<Partial<Weapon>> = {
	base_hid: 'spoon',
	qualifier1_hid: 'used',
	qualifier2_hid: 'noob',
	quality: ItemQuality.common,
	base_strength: 1,
}
const STARTING_ARMOR_SPEC: Immutable<Partial<Armor>> = {
	base_hid: 'socks',
	qualifier1_hid: 'used',
	qualifier2_hid: 'noob',
	quality: ItemQuality.common,
	base_strength: 1,
}

function create(SEC?: TBRSoftExecutionContext, seed?: PRNGState.Seed): Immutable<State> {
	return get_lib_SEC(SEC).xTry('create', () => {
		const [ u_state_energy, t_state_energy ] = EnergyState.create()
		const now = new Date()
		//console.log('creation', now)

		let state: Immutable<State> = {
			ⵙapp_id: 'tbrpg',
			schema_version: SCHEMA_VERSION,
			last_user_investment_tms: get_UTC_timestamp_ms(now),

			u_state: {
				schema_version: SCHEMA_VERSION,
				revision: 0,

				avatar: CharacterState.create(SEC),
				inventory: InventoryState.create(SEC),
				wallet: WalletState.add_amount(WalletState.create(), WalletState.Currency.coin, 1), // don't start empty so that a loss can happen
				prng: PRNGState.create(seed),
				energy: u_state_energy,
				engagement: EngagementState.create(SEC),
				codes: CodesState.create(SEC),
				progress: ProgressState.create(SEC),
				meta: MetaState.create(),

				last_adventure: null,
			},
			t_state: {
				schema_version: SCHEMA_VERSION,
				revision: 0,
				timestamp_ms: t_state_energy.timestamp_ms,

				energy: t_state_energy,
			},
		}

		const rng = PRNGState.get_prng(state.u_state.prng)

		const starting_weapon = create_weapon(rng, STARTING_WEAPON_SPEC)
		state = _receive_item(state, starting_weapon)
		state = equip_item(state, starting_weapon.uuid)

		const starting_armor = create_armor(rng, STARTING_ARMOR_SPEC)
		state = _receive_item(state, starting_armor)
		state = equip_item(state, starting_armor.uuid)

		state = _refresh_achievements(state) // there are some initial achievements
		state = _ack_all_engagements(state) // reset engagements that may have been created by noisy initial achievements, distracting

		// now insert some relevant start engagements
		state = {
			...state,
			u_state: {
				...state.u_state,
				engagement: EngagementState.enqueue(state.u_state.engagement, {
					type: EngagementState.EngagementType.flow,
					key: EngagementKey['tip--first_play'],
				}),
			},
		}

		assert(
			state.u_state.prng.prng_state.call_count === 0,
			'prng never used yet',
		)
		//state.prng = PRNGState.update_use_count(state.prng, rng)

		state = {
			...state,
			u_state: {
				...state.u_state,

				// to compensate sub-functions used during creation:
				revision: 0,
			},
		}

		// hurts the unit tests!
		//state = _update_to_now(state, now_ms) // not sure needed but doesn't hurt

		return enforce_immutability<State>(state)
	})
}

function reseed(state: Immutable<State>, seed?: PRNGState.Seed): Immutable<State> {
	if (seed) {
		console.warn('TODO review manual seeding!')
		state = {
			...state,
			u_state: {
				...state.u_state,
				prng: PRNGState.set_seed(state.u_state.prng, seed),
				revision: state.u_state.revision + 1,
			},
		}
	}
	else {
		state = {
			...state,
			u_state: {
				...state.u_state,
				prng: PRNGState.auto_reseed(state.u_state.prng),
				revision: state.u_state.revision + 1,
			},
		}
	}


	return enforce_immutability<State>(state)
}

/////////////////////

export {
	STARTING_WEAPON_SPEC,
	STARTING_ARMOR_SPEC,

	create,
	reseed,
}

/////////////////////
