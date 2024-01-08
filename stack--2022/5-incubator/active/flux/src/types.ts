import { Immutable } from '@offirmo-private/ts-types'
import {
	AnyOffirmoState,
	BaseAction,
} from '@offirmo-private/state-utils'

/////////////////////////////////////////////////


type ActionReducer<State, Action extends BaseAction> = (state: Immutable<State>, action: Immutable<Action>) => Immutable<State>


interface Dispatcher<State extends AnyOffirmoState, Action extends BaseAction> {
	// core features
	dispatch(action: Immutable<Action>): void,

	// utils/meta
	registerꓽstore(s: Store<State, Action>, debug_id?: string): void

	// (re)init. Avoid an unnecessary action and also different semantic (different assertions)
	set(state: Immutable<State>): void // usually at init, or a secondary store overwritten by a primary one, or a reset
}


interface Store<State extends AnyOffirmoState, Action extends BaseAction> {
	// core features
	onꓽdispatch(action: Immutable<Action>, eventual_state_hint?: Immutable<State>): void // replica stores may not want to recompute

	subscribe(debug_id: string, listener: () => void): () => void // state not passed, better call get() = less duplication + single source of truth

	get(): Immutable<State> // no undef => should throw if can't access back or state never set so far bc. it's an error

	// (re)init. Avoid an unnecessary action and also different semantic (different assertions)
	set(state: Immutable<State>): void // usually at init, or a secondary store overwritten by a primary one, or a reset
}


// TODO clarify
// mix of a dispatcher and a store
interface Flux<State extends AnyOffirmoState, Action extends BaseAction> {
	get(): Immutable<State>
	dispatch(action: Immutable<Action>): void
	subscribe(debug_id: string, listener: () => void): () => void // state not passed, better call get() = less duplication
}


/////////////////////////////////////////////////

export {
	type BaseAction, // for convenience

	type ActionReducer,

	type Dispatcher,
	type Store,

	type Flux,
}
