import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'
import {
	type ReducerAction, type Reducer, type ReducerMap,
	createꓽaction__base, createꓽaction,
	ACTION_TYPEꘌUPDATE_TO_NOW, type ActionUpdateToNow, createꓽactionꘌupdate_to_now,
	ACTION_TYPEꘌNOOP,          type ActionNoop,        createꓽactionꘌnoop,
	ACTION_TYPEꘌSET,           type ActionSet_,        createꓽactionꘌset,
	ACTION_TYPEꘌHACK,          type ActionHack_,       createꓽactionꘌhack,
} from '@offirmo-private/ts-types-web'
import {
	type AllStoreFns,
	type Snapshot, type SyncStoreUnsubscribeFn,
	reduceꓽnoop,
	reduceꓽset,
	reduceꓽhack,
} from '@offirmo-private/sync-store'

import { type TBRSoftExecutionContext, decorateꓽSXC } from '@tbrpg/definitions'
import * as TBRPGState from '@tbrpg/state'
import { type AcknowledgeEngagementMsgSeen, type StartSessionParams, type State } from '@tbrpg/state'

import {
	ActionType,
	type TBRPGAction,
} from '../l1-actions/index.ts'
import type { UUID } from '@offirmo-private/uuid'
import { CharacterClass } from '@tbrpg/state--character'

/////////////////////////////////////////////////

const REDUCERS_MAP = {
	[ActionType['play'] as string]: TBRPGState.play,
	[ActionType['equip_item'] as string]: TBRPGState.equip_item,
	[ActionType['sell_item'] as string]: TBRPGState.sell_item,
	[ActionType['rename_avatar'] as string]: TBRPGState.rename_avatar,
	[ActionType['switch_class'] as string]: TBRPGState.switch_class,
	[ActionType['redeem_code'] as string]: TBRPGState.attempt_to_redeem_code,
	[ActionType['re_seed'] as string]: TBRPGState.re_seed,
	[ActionType['on_start_session'] as string]: TBRPGState.on_start_session,
	[ActionType['on_logged_in_refresh'] as string]: TBRPGState.on_logged_in_refresh,
	[ActionType['acknowledge_engagement_msg_seen'] as string]: TBRPGState.acknowledge_engagement_msg_seen,
	[ACTION_TYPEꘌUPDATE_TO_NOW]: TBRPGState.update_to_now,
	[ACTION_TYPEꘌNOOP]: reduceꓽnoop,
	[ACTION_TYPEꘌSET]: reduceꓽset,
	[ACTION_TYPEꘌHACK]: reduceꓽhack,
}

/////////////////////////////////////////////////

function createꓽall_store_fns(SXC?: TBRSoftExecutionContext): AllStoreFns<State, TBRPGState.CreateParams, TBRPGAction> {

	function init(args?: TBRPGState.CreateParams): Immutable<State> {
		assert(!args, `No args expected!`)
		return TBRPGState.create(SXC, args)
	}

	function reducer(state: Immutable<State>, action: Immutable<TBRPGAction>): Immutable<State> {
		const reducer: Reducer<State, TBRPGAction> = REDUCERS_MAP[action.type] as any
		assert(reducer, `Reducer not found for action type "${action.type}"!`)

		return reducer(state, action)
	}

	/////////////////////////////////////////////////
	let state: Immutable<State> = init()

	function subscribe(onStoreChange: () => void): SyncStoreUnsubscribeFn {
		throw new Error(`Not implemented!`)
	}

	function getSnapshot(): Immutable<State> {
		return state
	}

	function dispatch(action: Immutable<TBRPGAction>): void {
		state = reducer(state, action)
		xxx TODO call store change!
	}

	/////////////////////////////////////////////////

	return {
		reducer,
		init,
		subscribe,
		getSnapshot,
	}
}

/////////////////////////////////////////////////

export {
	createꓽall_store_fns,
}
