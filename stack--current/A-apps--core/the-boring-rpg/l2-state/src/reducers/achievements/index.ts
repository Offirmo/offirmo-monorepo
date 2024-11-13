import { type Immutable} from '@offirmo-private/ts-types'

import {
	AchievementDefinition,
	AchievementStatus,
	on_achieved,
	getꓽlast_known_achievement_status,
} from '@tbrpg/state--achievements'
import {
	enqueue as enqueueEngagement,
} from '@oh-my-rpg/state--engagement'

import { type State, UState } from '../../types.js'

import ACHIEVEMENT_DEFINITIONS from '../../data/achievements.js'
import { EngagementTemplateKey, getꓽengagement_template } from '../../data/engagement/index.js'

/////////////////////

function _refresh_achievements(state: Immutable<State>): Immutable<State> {
	let { u_state } = state
	let { progress, engagement } = u_state
	let has_change = false

	ACHIEVEMENT_DEFINITIONS.forEach((definition: AchievementDefinition<UState>) => {
		const { icon, name } = definition

		const last_known_status = getꓽlast_known_achievement_status(progress, name)
		if (last_known_status === AchievementStatus.unlocked) return // can't change, already best

		const current_status = definition.getꓽstatus(u_state)
		if (last_known_status === current_status) return

		has_change = true
		progress = on_achieved(progress, name, current_status)

		if (current_status === AchievementStatus.unlocked) {
			// tell the user
			engagement = enqueueEngagement(engagement,
					getꓽengagement_template(EngagementTemplateKey.achievement_unlocked),
					{
						icon,
						name,
					},
				)
		}
	})

	if (!has_change)
		return state

	return {
		...state,
		u_state: {
			...u_state,
			progress,
			engagement,
		},
	}
}

export {
	_refresh_achievements,
}
