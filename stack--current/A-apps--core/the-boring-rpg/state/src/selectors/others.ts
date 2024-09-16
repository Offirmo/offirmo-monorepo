import { type Immutable} from '@offirmo-private/ts-types'
import { UUID } from '@offirmo-private/uuid'
import * as RichText from '@offirmo-private/rich-text-format'

import { ITEM_SLOTS, InventorySlot, Element } from '@tbrpg/definitions'
import { appraise_power } from '@tbrpg/logic--shop'
import {
	getꓽitem as _get_item,
	getꓽitem_in_slot as _get_item_in_slot,
} from '@tbrpg/state--inventory'
import {
	PendingEngagement,
	getꓽoldest_queuedⵧflow,
	getꓽoldest_queuedⵧnon_flow,
} from '@oh-my-rpg/state--engagement'
import { AchievementSnapshot } from '@tbrpg/state--achievements'

/////////////////////

import { UState } from '../types.js'
import { getꓽengagement_message } from '../data/engagement/index.js'
import { getꓽachievement_snapshot_by_temporary_id } from './achievements.js'

/////////////////////


// TODO power
function appraise_player_power(u_state: Immutable<UState>): number {
	let power: number = 1

	ITEM_SLOTS.forEach((slot: InventorySlot) => {
		const item = _get_item_in_slot(u_state.inventory, slot)

		if (item)
			power += appraise_power(item)
	})

	// TODO appraise attributes relative to class

	return power
}

function find_element(u_state: Immutable<UState>, uuid: UUID): Immutable<Element> | AchievementSnapshot | null {
	// only inventory for now
	let possible_achievement: AchievementSnapshot | null = null
	try {
		possible_achievement = getꓽachievement_snapshot_by_temporary_id(u_state, uuid)
	}
	catch (err) {
		// not found, swallow
	}
	return possible_achievement || _get_item(u_state.inventory, uuid)
}

// TODO code duplication
function getꓽoldest_pending_flow_engagement(u_state: Immutable<UState>): { uid: number, $doc: RichText.Document, pe: PendingEngagement } | null {
	const pe = getꓽoldest_queuedⵧflow(u_state.engagement)
	if (!pe)
		return null

	return {
		uid: pe.uid,
		$doc: getꓽengagement_message(pe),
		pe,
	}
}
function getꓽoldest_pending_non_flow_engagement(u_state: Immutable<UState>): { uid: number, $doc: RichText.Document, pe: PendingEngagement } | null {
	const pe = getꓽoldest_queuedⵧnon_flow(u_state.engagement)
	if (!pe)
		return null

	return {
		uid: pe.uid,
		$doc: getꓽengagement_message(pe),
		pe,
	}
}


/////////////////////

export {
	find_element,
	appraise_player_power,
	getꓽoldest_pending_flow_engagement,
	getꓽoldest_pending_non_flow_engagement,
}

/////////////////////
