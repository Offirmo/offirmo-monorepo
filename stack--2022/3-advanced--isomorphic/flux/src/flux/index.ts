/* A helper for actual games using this model
 */
import assert from 'tiny-invariant'
import EventEmitter from 'emittery'

import { Immutable } from '@offirmo-private/ts-types'
import { SoftExecutionContext } from '@offirmo-private/soft-execution-context'
import {
	AnyOffirmoState,
	FullMigrateToLatestFn,
	BaseAction, ActionReducer,
} from '@offirmo-private/state-utils'

/*
import { Immutable, Storage } from '@offirmo-private/ts-types'
import { get_UTC_timestamp_ms } from '@offirmo-private/timestamps'

import { schedule_when_idle_but_not_too_far } from '@offirmo-private/async-utils'
import {
	AnyOffirmoState,
	OverallMigrateToLatest,
	BaseAction,
	get_revision_loose,
} from '@offirmo-private/state-utils'
*/

import { LIB } from '../consts.js'
import { getꓽSEC } from '../services/sec.js'

/*
import { create as create_dispatcher } from './dispatcher'
import create_store__local_storage from './stores/local-storage'
import create_store__in_memory from './stores/in-memory'
*/

/////////////////////////////////////////////////

const EMITTER_EVT = 'change'

// TODO improve logging (too verbose)
interface CreateParams<State extends AnyOffirmoState, Action extends BaseAction> {
	SEC?: SoftExecutionContext

	SCHEMA_VERSION: number
	migrateⵧto_latest: FullMigrateToLatestFn<State>

	// TODO ordered stores list!

	//local_storage: Storage
	//storage_key_radix: string

	//create: (SEC: SoftExecutionContext) => Immutable<State>
	//post_create?: (state: Immutable<State>) => Immutable<State>
	//updateꓽto_now?: (state: Immutable<State>) => Immutable<State>
	reduceꓽaction: ActionReducer<State, Action>
}
function createꓽinstance<State extends AnyOffirmoState, Action extends BaseAction>({
	SEC = getꓽSEC(),

	SCHEMA_VERSION,
	migrateⵧto_latest,
	reduceꓽaction,

	/*
	                                                                          storage_key_radix,
	create,
	post_create = (state: Immutable<State>) => state,
	update_to_now = (state: Immutable<State>) => state,
	reduce_action,*/
}: CreateParams<State, Action>) {
	return SEC.xTry('creating flux instance', ({SEC, logger}) => {
		logger.trace(`[${LIB}].createꓽinstance()…`)

		const emitter = new EventEmitter<{ [EMITTER_EVT]: string }>()

		/////////////////////////////////////////////////
		logger.trace(`[${LIB}] linking the flux architecture = dispatcher and stores…`)


		//const _dispatcher = createꓽdispatcher(SEC, SCHEMA_VERSION)

		/////////////////////////////////////////////////
/*
		try {
			// arguably this is not 100% flux
			// but this should be good enough
			const recovered_state: any = persistent_store.get()
			assert(!!recovered_state, '(for local catch, see below)')
			logger.trace(`[${LIB}] restoring the state from the content of persistent store… (incl. update to now)`)
			// TODO should we really update to now?
			_dispatcher.set(update_to_now(recovered_state))
		}
		catch (err) {
			const new_state = post_create(create(SEC))
			logger.verbose(`[${LIB}] Clean savegame created from scratch.`)
			_dispatcher.set(new_state)
		}
		logger.silly(`[${LIB}] state initialised:`, in_memory_store.get())
*/
		////////////////////////////////////
/*
		in_memory_store.subscribe('flux', () => {
			emitter.emit(EMITTER_EVT, `[in-mem]`)
		})

		emitter.emit(EMITTER_EVT, 'init')
*/
		////////////////////////////////////

		function dispatch(action: Immutable<Action>) {
			/*if (action.type !== 'update_to_now') console.groupEnd()

			;(console.groupCollapsed as any)(`——————— ⚡ action dispatched: "${action.type}" ⚡ ———————`)
			schedule_when_idle_but_not_too_far(console.groupEnd)

			//logger.trace('current state:', { action: other_fields_for_debug })
			const { type, time, expected_revisions, ...other_fields_for_debug } = action
			logger.log('⚡ action dispatched:', { ...other_fields_for_debug })

			_dispatcher.dispatch(action)*/
		}

		return {
			//get: in_memory_store.get,
			//dispatch,
			/*subscribe(id: string, fn: () => void): () => void {
				const unbind = emitter.on(EMITTER_EVT, (src: string) => {
					const revision = get_revision_loose(in_memory_store.get())
					console.log(`🌀 model change #${revision} reported to subscriber "${id}" (source: ${src})`)
					fn()
				})
				return unbind
			},*/

			/*
				// currently used by the savegame editor
				reset() {
					const new_state = TBRPGState.reseed(TBRPGState.create())
					logger.info('Savegame reseted:', { new_state })

					_dispatcher.set(new_state)
				},
*//*
			_libs: {
				'@tbrpg/state': TBRPGState,
			},*/
		} as any
	})
}

export {
	type CreateParams,
	createꓽinstance,
}
export default createꓽinstance
