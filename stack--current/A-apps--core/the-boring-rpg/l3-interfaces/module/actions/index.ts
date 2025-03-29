import { Enum } from 'typescript-string-enums'
import type { Immutable } from '@offirmo-private/ts-types'

import { UUID } from '@offirmo-private/uuid'
import { TimestampUTCMs } from '@offirmo-private/timestamps'
import { type PendingEngagementUId } from '@oh-my-rpg/state--engagement'
import {
	type State,
	type StartSessionParams,
	type AcknowledgeEngagementMsgSeen,
} from '@tbrpg/state'
import { CharacterClass } from '@tbrpg/state--character'

/////////////////////

export const ActionType = Enum(
	'play',
	'equip_item',
	'sell_item',
	'rename_avatar',
	'change_avatar_class',

	'redeem_code',

	're_seed',
	'on_start_session',
	'on_logged_in_refresh',
	'acknowledge_engagement_msg_seen',
	'update_to_now',

	'set',
	'hack',
)
export type ActionType = Enum<typeof ActionType> // eslint-disable-line no-redeclare

/////////////////////

export interface BaseAction {
	//v: 1 // not sure needed
	now_ms?: TimestampUTCMs // not recommended! better inferred at dispatch! But can be useful for tests or replay.
	expected_revisions?: {
		[k:string]: number
	}
}

export interface ActionReSeed extends BaseAction {
	type: typeof ActionType.re_seed
	seed: number
}

export interface ActionStartSession extends BaseAction, StartSessionParams {
	type: typeof ActionType.on_start_session
}

export interface ActionRefreshLoggedInInfos extends BaseAction {
	type: typeof ActionType.on_logged_in_refresh
	is_logged_in: boolean
	roles: string[]
}

export interface ActionPlay extends BaseAction {
	type: typeof ActionType.play
}

export interface ActionEquipItem extends BaseAction {
	type: typeof ActionType.equip_item
	target_uuid: UUID
}

export interface ActionSellItem extends BaseAction {
	type: typeof ActionType.sell_item
	target_uuid: UUID
}

export interface ActionRenameAvatar extends BaseAction {
	type: typeof ActionType.rename_avatar
	new_name: string
}

export interface ActionChangeAvatarClass extends BaseAction {
	type: typeof ActionType.change_avatar_class
	new_class: CharacterClass
}

export interface ActionRedeemCode extends BaseAction {
	type: typeof ActionType.redeem_code
	code: string
}

export interface ActionAcknowledgeEngagementMsgSeen extends BaseAction, AcknowledgeEngagementMsgSeen {
	type: typeof ActionType.acknowledge_engagement_msg_seen
	uids: Array<PendingEngagementUId>
}

export interface ActionUpdateToNow extends BaseAction {
	type: typeof ActionType.update_to_now
}

// for ex. restoring a game from cloud or a previous save
export interface ActionSet extends BaseAction {
	type: typeof ActionType.set
	state: Immutable<State>
	// force: boolean
}

// for debug / hacks = ex. replenishing energy during local tests
// should never make it to the server!
export interface ActionHack extends BaseAction {
	type: typeof ActionType.hack
	custom_reducer: (state: Immutable<State>) => Immutable<State>
}

export type Action =
	| ActionReSeed
	| ActionStartSession
	| ActionRefreshLoggedInInfos
	| ActionPlay
	| ActionEquipItem
	| ActionSellItem
	| ActionRenameAvatar
	| ActionChangeAvatarClass
	| ActionRedeemCode
	| ActionAcknowledgeEngagementMsgSeen
	| ActionUpdateToNow
	| ActionSet
	| ActionHack


/////////////////////

// needed for some validations
export function getꓽaction_types(): string[] {
	return Enum.keys(ActionType)
}

/////////////////////

export function create_base_action(now_ms?: TimestampUTCMs): BaseAction {
	return {
		...(now_ms && { now_ms }), // only if provided
		expected_revisions: {},
	}
}

export function create_action<SomeAction extends BaseAction>(attributes: Omit<SomeAction, 'now_ms'>, now_ms?: TimestampUTCMs): SomeAction {
	return {
		...create_base_action(now_ms),
		...attributes,
	} as SomeAction
}

export function create_action_noop(): ActionHack {
	return create_action<ActionHack>({
		type: ActionType.hack,
		expected_revisions: {},
		custom_reducer: state => state,
	})
}

export function create_action__set(state: Immutable<State>): ActionSet {
	return create_action<ActionSet>({
		type: ActionType.set,
		expected_revisions: {},
		state,
	})
}
