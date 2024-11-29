/////////////////////

import { type Immutable} from '@offirmo-private/ts-types'
import { TimestampUTCMs, getꓽUTC_timestamp‿ms } from '@offirmo-private/timestamps'
import { complete_or_cancel_eager_mutation_propagating_possible_child_mutation } from '@offirmo-private/state-utils'

/////////////////////

import { type HypermediaContentType } from '@tbrpg/definitions'
import * as EnergyState from '@tbrpg/state--energy'
import * as EngagementState from '@oh-my-rpg/state--engagement'
import * as PRNGState from '@oh-my-rpg/state--prng'
import * as CodesState from '@oh-my-rpg/state--codes'
import * as AchievementsState from '@tbrpg/state--achievements'

import { ItemQuality } from '@tbrpg/definitions'
import { getꓽprng } from '@oh-my-rpg/state--prng'
import { create as create_weapon } from '@tbrpg/logic--weapons'
import { create as create_armor } from '@tbrpg/logic--armors'

/////////////////////

import { type State } from '../../types.js'
import { EngagementTemplateKey, getꓽengagement_template } from '../../data/engagement/index.js'
import { CODE_SPECS_BY_KEY } from '../../data/codes.js'

import {
	_update_to_now,
	_receive_item,
	_auto_make_room,
} from '../internal.js'

import { _refresh_achievements } from '../achievements/index.js'
import { reset_and_salvage } from '../../migrations/salvage.js'
import { reseed } from '../create.js'

/////////////////////

function attempt_to_redeem_code(_state: Immutable<State>, code: string, now_ms: TimestampUTCMs = getꓽUTC_timestamp‿ms()): Immutable<State> {
	// tri-state needed for "complete_or_cancel_eager_mutation"
	let previous_state: Immutable<State> | null = _state // allow null for special manipulation such as reset
	let updated_state: Immutable<State> | null = _state // for now
	let state: Immutable<State> = _state

	let engagement_key: EngagementTemplateKey = EngagementTemplateKey.code_redemptionⵧfailed // so far
	const engagement_params: NonNullable<EngagementState.TrackedEngagement<HypermediaContentType>['params']> = {}

	code = CodesState.normalize_code(code)
	const code_spec = CODE_SPECS_BY_KEY[code]

	if (!code_spec || !CodesState.is_code_redeemable(state.u_state.codes, code_spec, state)) {
		// nothing to do,
		// will trigger an engagement rejection below
	}
	else {
		updated_state = _update_to_now(previous_state, now_ms) // need to compare to an updated
		state = updated_state
		state = {
			...state,
			u_state: {
				...state.u_state,
				codes: CodesState.attempt_to_redeem_code(state.u_state.codes, code_spec, state),
			},
		}

		engagement_key = EngagementTemplateKey.code_redemptionⵧsucceeded
		engagement_params.code = code

		// spread them for convenience
		// BE CAREFUL!
		let { u_state, t_state } = state

		switch(code) {

			case 'REBORNX':
				previous_state = updated_state = null // since we completely recreate the state
				state = reseed(state) // force random reseed to see new stuff
				state = reset_and_salvage(state as any)
				u_state = state.u_state
				t_state = state.t_state
				u_state = {
					...u_state,
					progress: AchievementsState.on_achieved(u_state.progress, 'Reborn!', AchievementsState.AchievementStatus.unlocked),
				}
				break
			case 'REBORN':
				previous_state = updated_state = null // since we completely recreate the state
				state = reset_and_salvage(state as any)
				u_state = state.u_state
				t_state = state.t_state
				u_state = {
					...u_state,
					progress: AchievementsState.on_achieved(u_state.progress, 'Reborn!', AchievementsState.AchievementStatus.unlocked),
				}
				break

			case 'ALPHATWINK': {
				const rng = getꓽprng(u_state.prng)
				const weapon = create_weapon(rng, {
					quality: ItemQuality.artifact,
					qualifier2_hid: 'twink',
				})
				const armor = create_armor(rng, {
					quality: ItemQuality.artifact,
					qualifier2_hid: 'twink',
				})
				u_state = {
					...u_state,
					prng: PRNGState.update_use_count(u_state.prng, rng, 6),
				}
				state = {
					...state,
					u_state,
					t_state,
				}
				state = _auto_make_room(state)
				state = _receive_item(state, weapon)
				state = _auto_make_room(state)
				state = _receive_item(state, armor)
				u_state = state.u_state
				t_state = state.t_state
				break
			}

			//////////// TRIBUTES
			case 'XYZZY': // https://www.plover.net/~davidw/sol/xyzzy.html
				u_state = {
					...u_state,
					engagement: EngagementState.enqueue(u_state.engagement,
						{
							...EngagementState.DEMO_TEMPLATEⵧFLOWꘌMAIN_ROLEꘌASSISTANT_ATTNꘌNORMAL,
							// https://rickadams.org/adventure/d_hints/hint024.html
							summary: 'fee fie foe foo ;)',
						},
					),
				}
				break
			case 'PLUGH': // https://www.plover.net/~davidw/sol/plugh.html
				u_state = {
					...u_state,
					engagement: EngagementState.enqueue(u_state.engagement,
						{
							...EngagementState.DEMO_TEMPLATEⵧFLOWꘌMAIN_ROLEꘌASSISTANT_ATTNꘌNORMAL,
							summary: 'A hollow voice says "Ahhhhhhh".', // TODO more
						},
					),
				}
				break


			//////////// DEBUG
			case 'TESTNOTIFS':
				u_state = {
					...u_state,
					engagement: EngagementState.enqueue(u_state.engagement,
						EngagementState.DEMO_TEMPLATEⵧFLOWꘌMAIN_ROLEꘌASSISTANT_ATTNꘌNORMAL,
					),
				}
				u_state = {
					...u_state,
					engagement: EngagementState.enqueue(u_state.engagement,
						EngagementState.DEMO_TEMPLATEⵧFLOWꘌSIDE_ROLEꘌASSISTANT_ATTNꘌLOG,
					),
				}
				u_state = {
					...u_state,
					engagement: EngagementState.enqueue(u_state.engagement,
						EngagementState.DEMO_TEMPLATEⵧNON_FLOW,
					),
				}
				u_state = {
					...u_state,
					engagement: EngagementState.enqueue(u_state.engagement,
						EngagementState.DEMO_TEMPLATEⵧPLAYⵧFAILURE,
					),
				}
				break

			case 'TESTACH':
				// complicated, but will auto-re-gain this achievement
				u_state = {
					...u_state,
					//					progress: AchievementsState.on_achieved(u_state.progress, 'TEST', AchievementsState.AchievementStatus.revealed)
					progress: {
						...u_state.progress,
						achievements: {
							...u_state.progress.achievements,
							'TEST': AchievementsState.AchievementStatus.revealed,
						},
					},
				}
				break

			case 'BORED': {
				t_state = {
					...t_state,
					energy: EnergyState.restore_energy([u_state.energy, t_state.energy], 1.),
				}
				break
			}

			default:
				throw new Error(`Internal error: code "${code}" not implemented!`)
		}

		// re-assemble
		state = {
			...state,
			u_state,
			t_state,
		}
	}

	// enqueue the result
	state = {
		...state,

		u_state: {
			...state.u_state,
			engagement: EngagementState.enqueue(state.u_state.engagement,
				getꓽengagement_template(engagement_key),
				engagement_params
			),
		},
	}

	state = _refresh_achievements(state)

	if (previous_state) {
		state = complete_or_cancel_eager_mutation_propagating_possible_child_mutation(previous_state, state, updated_state || undefined, `attempt_to_redeem_code(${code})`)
	}

	if (state !== previous_state) {
		state = {
			...state,
			last_user_investment_tms: now_ms,
		}
	}

	return state
}

/////////////////////

export {
	attempt_to_redeem_code,
}

/////////////////////
