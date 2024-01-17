import assert from 'tiny-invariant'
import EventEmitter from 'emittery'
import { Immutable } from '@offirmo-private/ts-types'
import {
	AnyOffirmoState,
	BaseAction,
	getꓽrevisionⵧloose,
	fluid_select,
	getꓽbaseⵧloose,
	isꓽvalid_offirmo_state_object,
} from '@offirmo-private/state-utils'

import { SoftExecutionContext } from '../../services/sec.js'
import { Store } from '../../types'

/////////////////////////////////////////////////

const EMITTER_EVT = '⚡️change'

interface CreateParams<State, Action> {
	SEC: SoftExecutionContext,
	reduceꓽaction: (state: Immutable<State>, action: Immutable<Action>) => Immutable<State>,
	debug_id?: string
}
function createꓽstoreⵧin_memory<State extends AnyOffirmoState, Action extends BaseAction>({
	SEC,
	reduceꓽaction,
	debug_id,
}: CreateParams<State, Action>): Store<State, Action> {
	const LIB = [
		`🔵 store--in-mem`,
		debug_id,
	].filter(Boolean).join('ⳇ')

	return SEC.xTry(`creating ${LIB}…`, ({ logger }) => {
		logger.trace(`[${LIB}].create()…`)

		/////////////////////////////////////////////////

		let state: Immutable<State> | undefined = undefined

		function get(): Immutable<State> {
			assert(state, `[${LIB}].get(): should be initialized!`)

			return state
		}

		/////////////////////////////////////////////////

		const emitter = new EventEmitter<{ [EMITTER_EVT]: undefined }>({
			debug: {
				name: 'storeⵧin_memory'
			}
		})

		function subscribe(listener: () => void, debug_id?: string): () => void {
			emitter.on(EMITTER_EVT, listener)
			return () => emitter.off(EMITTER_EVT, listener)
		}

		/////////////////////////////////////////////////

		function init(stateⵧnew: Immutable<State>): void {
			if (state) {
				// we are already initialized, this is a bug
				if (stateⵧnew === state) {
					// init from ourselves, tolerated
					// do nothing
					return
				}

				logger.error(`[${LIB}].init(): already initialized!`, {
					...fluid_select(state).getꓽdebug_infos_about_comparison_with(stateⵧnew, 'current', 'new'),
				})
				throw new Error(`[${LIB}].init(): already initialized!`)
			}

			state = stateⵧnew
			emitter.emit(EMITTER_EVT)
			logger.trace(`[${LIB}].set(): init ✔`, getꓽbaseⵧloose(state))
		}

		/////////////////////////////////////////////////

		function onꓽdispatch(action: Immutable<Action>, eventual_state_hint?: Immutable<State>): void {
			logger.trace(`[${LIB}] ⚡ action dispatched: ${action.type}`, {
				eventual_state_hint: eventual_state_hint ? getꓽbaseⵧloose(eventual_state_hint as any) : eventual_state_hint,
			})

			assert(state || eventual_state_hint, `[${LIB}].on_dispatch(): should have a previous state or be provided a hint!`)

			if (eventual_state_hint) {
				logger.warn(`[${LIB}].on_dispatch(): (upper level architectural invariant) hint normally not expected for this store`)
			}

			const stateⵧprevious = state
			const stateⵧcandidate = eventual_state_hint || reduceꓽaction(state!, action)
			if (stateⵧcandidate === stateⵧprevious) {
				// no change, that happens, an action can result in a no-op
				logger.trace(`[${LIB}].onꓽdispatch(): no change ✔`)
				return
			}
			// sanity check
			assert(isꓽvalid_offirmo_state_object(stateⵧcandidate), `[${LIB}].onꓽdispatch(): new state should be a valid state object!`)
			state = stateⵧcandidate

			logger.trace(`[${LIB}] ⚡ action dispatched & reduced:`, {
				current_rev: getꓽrevisionⵧloose(stateⵧprevious as any),
				new_rev: getꓽrevisionⵧloose(state as any),
			})

			emitter.emit(EMITTER_EVT)
		}

		/////////////////////////////////////////////////

		return {
			get,
			onꓽdispatch,
			subscribe,
			init,
		}
	})
}

/////////////////////////////////////////////////

export {
	createꓽstoreⵧin_memory,
}
export default createꓽstoreⵧin_memory
