/////////////////////

import { type Immutable} from '@offirmo-private/ts-types'
import { type TimestampUTCMs, getꓽUTC_timestamp‿ms } from '@offirmo-private/timestamps'
import { complete_or_cancel_eager_mutation_propagating_possible_child_mutation } from '@offirmo-private/state-utils'

/////////////////////

import { type HypermediaContentType } from '@tbrpg/definitions'
import * as EnergyState from '@tbrpg/state--energy'
import * as AchievementsState from '@tbrpg/state--achievements'
import * as EngagementState from '@oh-my-rpg/state--engagement'
import { type AdventureHumanReadableID } from '@tbrpg/logic--adventures'

/////////////////////

import { type State } from '../../types.ts'

import { will_next_play_be_good_at } from '../../selectors/index.ts'
import { _update_to_now } from '../internal.ts'
import { _play_good } from './play_good.ts'
import { _play_bad } from './play_bad.ts'
import { _refresh_achievements } from '../achievements/index.ts'

/////////////////////

interface PlayParams {
	now_ms?: TimestampUTCMs // will be inferred if not provided
	explicit_adventure_archetype_hid?: AdventureHumanReadableID // in case we want a specific adventure and not a random one, either for testing or for onboarding
}
function play(previous_state: Immutable<State>, { now_ms = getꓽUTC_timestamp‿ms(), explicit_adventure_archetype_hid }: PlayParams = {}): Immutable<State> {
	let up_to_date_state = _update_to_now(previous_state, now_ms)
	let state = up_to_date_state

	const is_good_play = will_next_play_be_good_at(state, now_ms)

	// add a little animation
	// totally optional of course
	/*state = {
		...state,
		u_state: {
			...state.u_state,
			engagement: EngagementState.enqueue<HypermediaContentType>(state.u_state.engagement, {
				flow: 'main',
				story: 'You’re going on an adventure...',
				//sequence: 'pre',
				//role: 'system',
				//success: is_good_play,
				attention_needed: is_good_play ? 'normal' : 'notice',
				hints: {
					key: 'action--play--before-result',
					...(!is_good_play && {vibrate: { duration‿ms: 'auto', alt: 'You encounter trouble!!!' }}),
					//play_sound?: { url: Url‿str, alt: string }, TODO one day!
				}
			})
		}
	}*/

	// consume energy
	if (!is_good_play) {
		state = {
			...state,
			t_state: {
				...state.t_state,
				// punishment
				energy: EnergyState.lose_all_energy([state.u_state.energy, state.t_state.energy], now_ms),
				revision: state.t_state.revision + 1,
			},
		}
	}
	else {
		const [ u, t ] = EnergyState.use_energy([state.u_state.energy, state.t_state.energy])
		state = {
			...state,
			u_state: {
				...state.u_state,
				energy: u,
				// revision will be incremented below
			},
			t_state: {
				...state.t_state,
				energy: t,
				revision: state.t_state.revision + 1,
			},
		}

		// onboarding
		if (!explicit_adventure_archetype_hid) {
			const { good_play_count } = state.u_state.progress.statistics
			explicit_adventure_archetype_hid = [
				'talk_to_all_villagers',
				'rematch',
				'fight_won_coins',
				'high_level_zone_2',
				'found_random_mushroom',
				'class_grimoire',
				'progress_loop',
				'fight_won_any',
				'found_swirling_potion',
				'castle_summon',
				'arrow_in_the_knee',
				'inspect_sewers',
				'side_quests',
				'fight_won_coins',
			][good_play_count]
		}
	}

	// actual play
	state = is_good_play
		? _play_good(state, explicit_adventure_archetype_hid)
		: _play_bad(state, explicit_adventure_archetype_hid)

	// final updates
	const u_state = state.u_state
	state = {
		...state,
		last_user_investment_tms: now_ms,

		u_state: {
			...u_state,
			revision: state.u_state.revision + 1,
			progress: AchievementsState.on_played(u_state.progress, {
				good: is_good_play,
				adventure_key: u_state.last_adventure!.hid,
				encountered_monster_key: u_state.last_adventure!.encounter
					? u_state.last_adventure!.encounter!.name
					: null,
				active_class: u_state.avatar.klass,
				coins_gained: u_state.last_adventure!.gains.coin,
				tokens_gained: u_state.last_adventure!.gains.token,
				items_gained: (u_state.last_adventure!.gains.armor ? 1 : 0) + (u_state.last_adventure!.gains.weapon ? 1 : 0),
			}),
		},
	}

	return _refresh_achievements(state)
}

/////////////////////

export {
	type PlayParams,
	play,
}

/////////////////////
