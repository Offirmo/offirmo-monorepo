import { Immutable } from '@offirmo-private/ts-types'
import {
	AnyOffirmoState,
	BaseAction,
	ActionⳇReconcile,
} from '@offirmo-private/state-utils'

/////////////////////////////////////////////////

// Note: we add ActionⳇReconcile<State> to the allowed actions bc a default implementation is provided

// https://facebookarchive.github.io/flux/docs/flux-utils#stores
// IMPORTANT a store may have a persistence mechanism (ex. local storage)
// and may unpersist itself on creation:
// - if synchronous, MUST auto-init
// - if asynchronous, MUST NOT auto-init but MUST send an action instead
// if persistence, it's the store's responsibility to handle the data migration
interface Store<State extends AnyOffirmoState, Action extends BaseAction> {
	/////// core architectural features
	onꓽdispatch(
		action: Immutable<Action | ActionⳇReconcile<State>>,
		eventual_state_hint?: Immutable<State>, // if present, means this store is a "replica" which may not want to recompute
	): void

	// - returns a function that cleans the subscription
	// - the state is NOT passed to the callback, get() is the single source of truth
	// - the callback will be called ASYNC
	// - the callback will NOT be called on subscription
	// - API compatible with React useSyncExternalStore() https://react.dev/reference/react/useSyncExternalStore
	subscribe(callback: () => void, debug_id?: string): () => void

	// - no undef => should throw if state never set or un-persisted
	// - API compatible with React useSyncExternalStore() https://react.dev/reference/react/useSyncExternalStore
	get(): Immutable<State>

	/////// pragmatic features not in the architecture

	// init
	// - this can't be an action (since no previous state)
	// - should be called only once, on an un-initialised store
	//   - stores MUST tolerate being re-inited with identical value, due to "echo"
	init(state: Immutable<State>): void

	// TODO one day cloud stores
	subscribe_toꓽdistributed_updates?: (callback: (concurrent_state: Immutable<State>) => void, debug_id?: string) => () => void
}


// https://facebookarchive.github.io/flux/docs/dispatcher
interface Dispatcher<State extends AnyOffirmoState, Action extends BaseAction> {
	// core features
	dispatch(action: Immutable<Action | ActionⳇReconcile<State>>): void,

	// NO! done on creation, not dynamically
	//registerꓽstore(s: Store<State, Action>, debug_id?: string): void

	// XXX to review
	// (re)init. Avoid an unnecessary action and also different semantic (different assertions)
	//_set(state: Immutable<State>): void // usually at init, or a secondary store overwritten by a primary one, or a reset
}


// wrapper around a dispatcher + n stores
// - is the object passed around in the app
// - has a "subscribe" method that plugs to the main store (not the replicas)
// - implements the 2 methods for react useSyncExternalStore()
// - TODO handles persistence and server push??
interface Flux<State extends AnyOffirmoState, Action extends BaseAction> {

	// compatible with React useSyncExternalStore() https://react.dev/reference/react/useSyncExternalStore
	// see Store interface
	get(): Immutable<State>

	// compatible with React useSyncExternalStore() https://react.dev/reference/react/useSyncExternalStore
	// see Store interface
	subscribe(callback: () => void, debug_id?: string): () => void


	dispatch(action: Immutable<Action | ActionⳇReconcile<State>>): void

	// TODO promise for suspend??

	// reset?

	// NO! done on creation, not dynamically
	//addꓽstore(s: Store<State, Action>): void
}


/////////////////////////////////////////////////

export {
	type Dispatcher,
	type Store,

	type Flux,
}
