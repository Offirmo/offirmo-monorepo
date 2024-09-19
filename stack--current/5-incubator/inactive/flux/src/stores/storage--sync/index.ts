/*import memoize_one from 'memoize-one'*/
import assert from 'tiny-invariant'
import EventEmitter from 'emittery'
import { try_or_fallback } from '@offirmo/error-utils'
import stringifyⵧstable from '@offirmo-private/json-stable-stringify'
import { type Immutable, StorageⳇSync, JSONObject } from '@offirmo-private/ts-types'
import { getꓽcompareFn } from '@offirmo-private/ts-utils'
import {
	AnyOffirmoState,
	BaseAction,
	fluid_select,
	FullMigrateToLatestFn,
	getꓽbaseⵧloose,
	getꓽrevisionⵧloose,
	getꓽschema_versionⵧloose,
	isꓽvalid_offirmo_state_object,
	cast_toꓽimmutable,
} from '@offirmo-private/state-utils'
import {
	schedule_when_idle_but_not_too_far,
} from '@offirmo-private/async-utils'

import { Store, Dispatcher } from '../../types'
import { type SoftExecutionContext } from '../../services/sec.js'


/////////////////////////////////////////////////

// ex. the-boring-rpg.savegame
// TODO some kind of slot? Or should it be by the caller?
function getꓽstorage_keys(radix: string) {
	return {
		bkpⵧmain:        `${radix}`,          // current, up-to-date, live, version
		// TODO add safety double-write?
		bkpⵧminor:       `${radix}-bkp`,      // very close most recent version with != revision   ~ akin to an "undo"
		// TODO add "previous active day" ?
		bkpⵧmajorⵧold:   `${radix}-bkp-m1`,   // 1 schema version older. Critical in case the migration code has an issue
		bkpⵧmajorⵧolder: `${radix}-bkp-m2`,   // 2 schema versions older
	}
}

/////////////////////////////////////////////////

export function _safe_read_parse_and_validate_from_storage<State>(
	storage: StorageⳇSync,
	key: string,
	onꓽerror: (err: unknown) => void,
): State | undefined {
	const fallback_result = undefined
	return try_or_fallback({
		fallback_result,
		getter: () => {
			// LS access can throw
			const ls_content = storage.getItem(key)
			if (!ls_content)
				return fallback_result

			// can throw as well
			const json: JSONObject = JSON.parse(ls_content)
			//console.log('parsed', json)

			// need this check due to some serializations returning {} for empty
			const isꓽempty: boolean = !json || Object.keys(json).length === 0
			if (isꓽempty)
				return fallback_result

			// sanity check
			// NOTE: very old backups may not pass those type guards
			assert(isꓽvalid_offirmo_state_object(json), `_safe_read_parse_and_validate_from_storage(${key}): should be a valid state object!`)

			return json as any as State
		},
		onꓽerror,
	})
}

/////////////////////////////////////////////////

const EMITTER_EVT = '⚡️change'

interface CreateParams<State, Action> {
	SXC: SoftExecutionContext
	storage: StorageⳇSync
	reduceꓽaction: (state: Immutable<State>, action: Immutable<Action>) => Immutable<State>
	SCHEMA_VERSION: number
	migrate_toꓽlatest: FullMigrateToLatestFn<State>
	storage_keys_radix: string // this is mandatory if the same domain serves several apps and users. The key should be prefixed by the app name + maybe a container (ex. savegame slot) etc.
	                           // TODO extra app name from SXC?
	debug_id?: string
}
function createꓽstoreⵧlocal_storage<State extends AnyOffirmoState, Action extends BaseAction>({
	SXC,
	storage,
	storage_keys_radix,
	reduceꓽaction,
	migrate_toꓽlatest,
	SCHEMA_VERSION,
	debug_id,
}: CreateParams<State, Action>): Store<State, Action> {
	const LIB = [
		`⚫ store--local`,
		debug_id,
	].filter(Boolean).join('ⳇ')

	return SXC.xTry(`creating ${LIB}…`, ({SXC, logger}) => {
		logger.trace(`[${LIB}].create()…`)

		const STORAGE_KEYS = getꓽstorage_keys(storage_keys_radix)
		logger.verbose(`[${LIB}] FYI storage keys = "${Object.values(STORAGE_KEYS).join(', ')}"`)

		/////////////////////////////////////////////////

		// we keep an in-mem copy bc
		// 1. we're savvy about writing to disk (synchronous, takes cycles)
		// 2. the storage may not work
		let state: Immutable<State> | undefined = undefined

		function get(): Immutable<State> {
			assert(state, `[${LIB}].get(): should be initialized`)

			return state
		}

		/////////////////////////////////////////////////

		const emitter = new EventEmitter<{ [EMITTER_EVT]: undefined }>()

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

				throw new Error(`[${LIB}].init(): already initialized!`)
			}

			state = stateⵧnew
			emitter.emit(EMITTER_EVT)
			_enqueue_in_persistence_pipeline(state)
				.catch(_onꓽerror)
			logger.trace(`[${LIB}].set(): init ✔`)
		}

		/////////////////////////////////////////////////

		function _onꓽerror(err: unknown) {
			logger.warn(`[${LIB}] Error while processing`, err)

			throw err // TODO report to dispatcher instead
		}

		function _storeꓽkey_valueⵧsync(key: string, json: any): void {
			const value = stringifyⵧstable(json)! // can't be undef, we have checks
			logger.trace(`[${LIB}] 💾 writing "${key}"…`, { base: getꓽbaseⵧloose(json)})
			storage.setItem(key, value)
			logger.trace(`[${LIB}] 💾 written "${key}" ✔`, {
				snapshot: JSON.parse(value)
			})
		}

		function _storeꓽkey_valueⵧlater_async(key: string, json: any): Promise<void> {
			return new Promise<void>((resolve, reject) => {
				schedule_when_idle_but_not_too_far(() => {
					try {
						resolve(_storeꓽkey_valueⵧsync(key, json))
					}
					catch (err) {
						reject(err)
					}
				})
			})
		}

		/////////////////////////////////////////////////
		// schema migration backup pipeline
		// - This is a safety against bugs in the migration code.
		// - There is NO un-persistence from those backups
		//   (bc the user may have intentionally reseted their current state and don't want outdated stuff)
		// - This is NOT a user feature!
		//   There is no UI to recover from the old backups, it'll have to be manual (fiddling with local storage)
		//- we store at least 2 previous schema versions

		// we don't need to restore straight away, so for perf reason let's delay their init
		let bkpⵧolder: Array<Readonly<JSONObject>> = []
		let areꓽold_bkps_salvaged = false

		// "fire and forget" method for saving older versions the state
		// no pre-requisites, should take care of anything and decide what to do
		async function _enqueue_in_schema_version_bkp_pipeline(legacy_state: Immutable<any> | undefined | 'init'): Promise<void> {
			if (!legacy_state)
				return

			if (legacy_state === 'init') {
				assert(!areꓽold_bkps_salvaged, 'areꓽold_bkps_salvaged')
				areꓽold_bkps_salvaged = true
				logger.verbose(`[${LIB}] ↳ salvaged ${bkpⵧolder.length} backups.`)
			}
			else {
				const schema_version = getꓽschema_versionⵧloose(legacy_state)
				if (schema_version >= SCHEMA_VERSION)
					return // no need to save it

				bkpⵧolder.push(legacy_state)

				if (!areꓽold_bkps_salvaged) {
					// we don't want to overwrite older backups before they're restored
					return
				}
			}


			throw new Error('NIMP!')
			/*
			// XXX this code block is tricky, beware sync/async
			const most_recent_previous_major_version = bkpⵧolder[0] as any
			logger.trace(`[${LIB}] _enqueue_in_schema_version_bkp_pipeline()`, {
				...fluid_select(legacy_state).getꓽdebug_infos_about_comparison_with(most_recent_previous_major_version, 'enqueued', 'most_recent_major'),
				current_major_bkp_pipeline: structuredClone(bkpⵧolder)
			})

			assert(
				fluid_select(legacy_state).hasꓽhigher_or_equal_schema_version_than(most_recent_previous_major_version),
				`_enqueue_in_schema_version_bkp_pipeline() candidate should >= version than most recent major`
			)

			const is_major_update = fluid_select(legacy_state).hasꓽhigher_schema_version_than(most_recent_previous_major_version)
			if (is_major_update) {
				bkpⵧolder = [legacy_state, bkpⵧolder[0]].filter(s => !!s)
			}
			else {
				const has_valuable_difference = fluid_select(legacy_state).hasꓽvaluable_difference_with(most_recent_previous_major_version)
				if (!has_valuable_difference)
					return

				bkpⵧolder[0] = legacy_state
			}

			logger.trace(`[${LIB}] _enqueue_in_schema_version_bkp_pipeline(): saving major`, getꓽbaseⵧloose(bkpⵧolder[0] as any))
			await _storeꓽkey_valueⵧlater_async(STORAGE_KEYS.bkpⵧmajorⵧold, bkpⵧolder[0])
			if (bkpⵧolder[1]) {
				logger.trace(`[${LIB}] _enqueue_in_schema_version_bkp_pipeline(): saving major-1`, getꓽbaseⵧloose(bkpⵧolder[1] as any))
				await _storeꓽkey_valueⵧlater_async(STORAGE_KEYS.bkpⵧmajorⵧolder, bkpⵧolder[1])
			}

				// XXX
				let recovered_backup_pipeline_unmigrated_ordered_oldest_first: any[] = []
				let restored_migrated: Immutable<State> | undefined = undefined

				// read and store everything needed in memory
				recovered_backup_pipeline_unmigrated_ordered_oldest_first = [
					...bkpⵧolder,
					bkpⵧcurrent || bkpⵧrecent,
				]
					.filter(s => !!s)
					.sort(getꓽcompareFn<any>(getꓽschema_versionⵧloose))
				bkpⵧolder = [] // reset since we temporarily hold the backups in the var above now

				if (recovered_backup_pipeline_unmigrated_ordered_oldest_first.length === 0) {
					// we didn't recover anything
					// most likely a brand-new session
					return
				}

				const bkpⵧmost_recentⵧunmigrated = recovered_backup_pipeline_unmigrated_ordered_oldest_first.slice(-1)[0]

				if (!bkpⵧmost_recentⵧunmigrated) {
					logger.trace(`[${LIB}] found NO candidate state to be restored.`)
				}
				else {
					logger.trace(`[${LIB}] found candidate state to be restored`, getꓽbaseⵧloose(bkpⵧmost_recentⵧunmigrated))
					logger.trace(`[${LIB}] automigrating and restoring this candidate state…`)

					// rare case of a user using old code on a more recent data
					assert(getꓽschema_versionⵧloose(bkpⵧmost_recentⵧunmigrated) <= SCHEMA_VERSION, `[${LIB}] found a backup with a higher schema version than the current code!`)

					// memorize it for later
					restored_migrated = migrate_toꓽlatest(SXC,
						// deep clone in case the migration is not immutable (seen!)
						structuredClone(bkpⵧmost_recentⵧunmigrated)
					)

					// immediate sync restoration
					set(restored_migrated)

					if (dispatcher) {
						// NO DISPATCH ON RESTORATION!
						// - We can't do it SYNC because all the stores may not be plugged in yet
						// - We can't do it ASYNC because dependents would need to wait with sth like a promise
						// Eventually, we let the caller (plugging stores to dispatcher) do it.
						//logger.trace(`[${LIB}] forwarding the restored state to the dispatcher…`)
						//dispatcher.dispatch(create_action__set(restored_migrated!))
					}




				logger.trace(`[${LIB}] found ${recovered_backup_pipeline_unmigrated_ordered_oldest_first.length} past backups:`, {
					recovered_states_unmigrated_ordered_most_recent_first: structuredClone(recovered_backup_pipeline_unmigrated_ordered_oldest_first),
					...(bkpⵧcurrent && { main: bkpⵧcurrent }),
					...(bkpⵧrecent && { minor: bkpⵧrecent }),
					...(bkpⵧolder[0] && { major_1: bkpⵧolder[0]}),
					...(bkpⵧolder[1] && { major_2: bkpⵧolder[1]}),
				})
								*/
		}

		// recover old internal safety bkps
		// we handle potentially sparse bkp pipeline
		// no need to do it sync
		schedule_when_idle_but_not_too_far(function salvage_safety_old_bkps() {
			logger.verbose(`[${LIB}] attempting to restore the INTERNAL safety older versions backup…`)

			_enqueue_in_schema_version_bkp_pipeline(_safe_read_parse_and_validate_from_storage<any>(storage, STORAGE_KEYS.bkpⵧmajorⵧold, _onꓽerror))
			_enqueue_in_schema_version_bkp_pipeline(_safe_read_parse_and_validate_from_storage<any>(storage, STORAGE_KEYS.bkpⵧmajorⵧold, _onꓽerror))
			_enqueue_in_schema_version_bkp_pipeline('init') // to trigger the persistence of whatever was salvaged so far
		})

		/////////////////////////////////////////////////
		// persistence pipeline
		// - this will persist asap
		// - this will un-persist immediately and synchronously on initialisation
		// - this will auto-migrate
		// - it's a "pipeline" bc we're doing extra saves for safety, though there is no UI to restore it

		// NOTE that those variables are BACKUPS, not states
		// TODO use a SXC?
		let bkpⵧcurrent: Immutable<State> | undefined = (function unpersist_bkp() {
			logger.verbose(`[${LIB}] attempting to restore the persisted state…`)
			const raw = _safe_read_parse_and_validate_from_storage<State>(storage, STORAGE_KEYS.bkpⵧmain, _onꓽerror)
			if (!raw) {
				// should we try to restore the "recent" one?
				// TODO find a use case where it would make sense
				logger.verbose(`[${LIB}] ↳ nothing found.`)
				return undefined
			}

			const unmigrated_schema_version = getꓽschema_versionⵧloose(raw)
			assert(unmigrated_schema_version <= SCHEMA_VERSION, `[${LIB}] the active persisted state should have a lower or equal schema version than the current code!`)
			_enqueue_in_schema_version_bkp_pipeline(raw) // important to do this BEFORE migration

			const state = migrate_toꓽlatest(SXC, raw)
			logger.verbose(`[${LIB}] ↳ successfully restored a persisted state ✅`)
			return state
		})()
		if (bkpⵧcurrent) {
			console.assert(!state)
			state = bkpⵧcurrent
		}
		// extra save for safety ~ "swap file" https://vi.stackexchange.com/questions/177/what-is-the-purpose-of-swap-files
		// we don't need them straight away, so for perf reason let's delay their init
		let bkpⵧrecent: Immutable<State> | undefined = undefined


		// "fire and forget" method for persisting the state
		// no pre-requisites, should take care of anything and decide what to do
		// TODO should allow any minor overwrite, in case manual revert
		async function _enqueue_in_persistence_pipeline(some_state: Immutable<State>): Promise<void> {
			const fs = fluid_select(some_state)

			// for perf reason,
			// there is obviously no need to back up T-changes (at 60fps!)
			const isꓽworth_sending_in_bkp_pipeline = fs.hasꓽvaluable_difference_with(bkpⵧcurrent as any)

			logger.trace(`[${LIB}] _enqueue_in_bkp_pipeline()`, {
				...fs.getꓽdebug_infos_about_comparison_with(bkpⵧcurrent as any, 'enqueued', 'current'),
				isꓽworth_sending_in_bkp_pipeline,
			})

			if (!isꓽworth_sending_in_bkp_pipeline)
				return

			const promises: Promise<any>[] = []
			bkpⵧrecent = bkpⵧcurrent
			bkpⵧcurrent = some_state
			promises.push(_storeꓽkey_valueⵧlater_async(STORAGE_KEYS.bkpⵧmain, bkpⵧcurrent))
			if (bkpⵧrecent) {
				assert(getꓽschema_versionⵧloose(bkpⵧrecent) === SCHEMA_VERSION, `bkpⵧrecent should only deal with fully migrated data!`) // see the init function
				promises.push(_storeꓽkey_valueⵧlater_async(STORAGE_KEYS.bkpⵧminor, bkpⵧrecent))
			}

			await Promise.all(promises)
		}

		schedule_when_idle_but_not_too_far(function salvage_bkp_recent() {
			logger.verbose(`[${LIB}] attempting to restore the EXTRA persisted state…`)
			const raw = _safe_read_parse_and_validate_from_storage<State>(storage, STORAGE_KEYS.bkpⵧminor, _onꓽerror)
			if (!raw) {
				logger.verbose(`[${LIB}] ↳ nothing found.`)
				return undefined
			}

			const unmigrated_schema_version = getꓽschema_versionⵧloose(raw)
			assert(unmigrated_schema_version <= SCHEMA_VERSION, `[${LIB}] the active persisted state should have a lower or equal schema version than the current code!`)

			// in case it's an old schema version
			logger.verbose(`[${LIB}] ↳ found something. nothing to do.`)
			_enqueue_in_schema_version_bkp_pipeline(raw)

			// no need to do/write anything.
			// it's already persisted and no-one reads it
		})

		/////////////////////////////////////////////////

		function onꓽdispatch(action: Immutable<Action>, eventual_state_hint?: Immutable<State>): void {
			logger.trace(`[${LIB}] ⚡ action dispatched: ${action.type}`, {
				...(eventual_state_hint && { eventual_state_hint: getꓽbaseⵧloose(eventual_state_hint as any)}),
			})

			assert(state || eventual_state_hint, `[${LIB}].on_dispatch(): should have a previous state or be provided a hint!`)

			if (!eventual_state_hint) {
				logger.warn(`[${LIB}].on_dispatch(): (upper level architectural invariant) hint is usually expected for this store!`)
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

			_enqueue_in_persistence_pipeline(state!).catch(_onꓽerror)
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
	getꓽstorage_keys,
	createꓽstoreⵧlocal_storage,
}
export default createꓽstoreⵧlocal_storage
