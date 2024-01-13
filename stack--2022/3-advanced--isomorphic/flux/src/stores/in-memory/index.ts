import assert from 'tiny-invariant'
import EventEmitter from 'emittery'
import { Immutable } from '@offirmo-private/ts-types'
import {
	AnyOffirmoState,
	BaseAction,
	getꓽrevisionⵧloose,
	fluid_select,
	getꓽbaseⵧloose,
} from '@offirmo-private/state-utils'

import { SoftExecutionContext } from '../../services/sec.js'
import { Store } from '../../types'

/////////////////////////////////////////////////

const EMITTER_EVT = '⚡️change'

function createꓽstoreⵧin_memory<State extends AnyOffirmoState, Action extends BaseAction>(
	SEC: SoftExecutionContext,
	reduceꓽaction: (state: Immutable<State>, action: Immutable<Action>) => Immutable<State>,
	debug_id?: string
): Store<State, Action> {
	const LIB = [
		`🔵 store--in-mem`,
		debug_id,
	].filter(Boolean).join('ⳇ')

	return SEC.xTry(`creating ${LIB}…`, ({ logger }) => {
		logger.trace(`[${LIB}].create()…`)

		let state: Immutable<State> | undefined = undefined

		const emitter = new EventEmitter<{ [EMITTER_EVT]: undefined }>({
			debug: {
				name: 'storeⵧin_memory'
			}
		})

		/////////////////////////////////////////////////

		function init(stateⵧnew: Immutable<State>): void {
			if (state) {
				// we are already initialized, this is a bug
				if (stateⵧnew === state) {
					// init from ourselves, tolerated
					// do nothing
					return
				}

				throw new Error(`[${LIB}].init(): already initialized!`)
			}

			state = stateⵧnew
			emitter.emit(EMITTER_EVT)
			logger.trace(`[${LIB}].set(): init ✔`)
		}

		function get(): Immutable<State> {
			assert(state, `[${LIB}].get(): should be initialized!`)

			return state
		}

		function onꓽdispatch(action: Immutable<Action>, eventual_state_hint?: Immutable<State>): void {
			logger.trace(`[${LIB}] ⚡ action dispatched: ${action.type}`, {
				eventual_state_hint: getꓽbaseⵧloose(eventual_state_hint as any),
			})

			assert(state || eventual_state_hint, `[${LIB}].on_dispatch(): should be provided a hint or a previous state`)

			if (eventual_state_hint) {
				logger.warn(`[${LIB}].on_dispatch(): (upper level architectural invariant) hint normally not expected for this store`)
			}

			/*
			const has_valuable_difference = !state || fluid_select(new_state).has_valuable_difference_with(state)
			logger.trace(`[${LIB}].set()`, {
				new_state: getꓽbaseⵧloose(new_state),
				existing_state: getꓽbaseⵧloose(state as any),
				has_valuable_difference,
			})

			if (!state) {
			} // XXX if not init, should it be used??? TODO check semantic!!!
			else if (!has_valuable_difference) {
				logger.trace(`[${LIB}].set(): no valuable change ✔`)
				return
			}


			 */
			const stateⵧprevious = state
			state = eventual_state_hint || reduceꓽaction(state!, action)
			const has_valuable_difference = state !== stateⵧprevious
			logger.trace(`[${LIB}] ⚡ action dispatched & reduced:`, {
				current_rev: getꓽrevisionⵧloose(stateⵧprevious as any),
				new_rev: getꓽrevisionⵧloose(state as any),
				has_valuable_difference,
			})
			if (!has_valuable_difference) {
				return
			}

			emitter.emit(EMITTER_EVT)
		}

		function subscribe(listener: () => void, debug_id?: string): () => void {
			emitter.on(EMITTER_EVT, listener)
			return () => emitter.off(EMITTER_EVT, listener)
		}

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
