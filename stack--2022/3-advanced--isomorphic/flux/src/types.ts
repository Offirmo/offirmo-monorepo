import { Immutable } from '@offirmo-private/ts-types'
import {
	AnyOffirmoState,
	BaseAction,
} from '@offirmo-private/state-utils'

/////////////////////////////////////////////////

// https://facebookarchive.github.io/flux/docs/dispatcher
interface Dispatcher<State extends AnyOffirmoState, Action extends BaseAction> {
	// core features
	dispatch(action: Immutable<Action>): void,

	registerꓽstore(s: Store<State, Action>, debug_id?: string): void

	// (re)init. Avoid an unnecessary action and also different semantic (different assertions)
	_set(state: Immutable<State>): void // usually at init, or a secondary store overwritten by a primary one, or a reset
}


// https://facebookarchive.github.io/flux/docs/flux-utils#stores
interface Store<State extends AnyOffirmoState, Action extends BaseAction> {
	/////// core architectural features
	onꓽdispatch(
		action: Immutable<Action>,
		eventual_state_hint?: Immutable<State>, // if provided, means this is a "replica" store which may not want to recompute
	): void
	subscribe(debug_id: string, listener: () => void): () => void // state not passed, better call get() = less duplication + single source of truth
	get(): Immutable<State> // no undef => should throw if can't access back or state never set so far bc. it's an error

	/////// pragmatic features
	// (re)init. Avoid an unnecessary action and also different semantic (different assertions)
	_set(state: Immutable<State>): void // usually at init, or a secondary store overwritten by a primary one, or a reset
	// unpersist
	// MUST be async since it may involve IO
	_getꓽpersisted(): Promise<
		| Immutable<State>
		| null       // nothing in persistence
		| undefined  // persistence not supported
	>
}


// TODO clarify
// mix of a dispatcher and a store
interface Flux<State extends AnyOffirmoState, Action extends BaseAction> {
	addꓽstore(s: Store<State, Action>): void
	get(): Immutable<State>
	dispatch(action: Immutable<Action>): void
	subscribe(debug_id: string, listener: () => void): () => void // state not passed, better call get() = less duplication
}


/////////////////////////////////////////////////

export {
	type Dispatcher,
	type Store,

	type Flux,
}
