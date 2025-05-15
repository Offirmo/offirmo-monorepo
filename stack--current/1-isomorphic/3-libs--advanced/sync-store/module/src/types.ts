/**
 * Base sync store compatible with both:
 * - React useSyncExternalStore() https://react.dev/reference/react/useSyncExternalStore
 * - React useReducer() https://react.dev/reference/react/useReducer
 */

import type { Immutable } from '@offirmo-private/ts-types'
import {
	type ReducerAction,
	type Reducer,
} from '@offirmo-private/ts-types-web'

/////////////////////////////////////////////////


/////////////////////////////////////////////////

type Snapshot<State> = Immutable<State>

type SyncStoreUnsubscribeFn = () => void

/* React
export function useSyncExternalStore<Snapshot>(
	subscribe: (onStoreChange: () => void) => () => void,
	getSnapshot: () => Snapshot,
	getServerSnapshot?: () => Snapshot,
): Snapshot;
 */
interface SyncStoreFns<State> {
	subscribe: (onStoreChange: () => void) => SyncStoreUnsubscribeFn,
	getSnapshot: () => Snapshot<State>,
}

/////////////////////////////////////////////////

/* React
function useReducer<S, A extends AnyActionArg>(
	reducer: (prevState: S, ...args: A) => S,
	initialState: S,
): [S, ActionDispatch<A>];
 */
interface SyncReducerFns<State, InitArgs, Action extends ReducerAction> {
	reducer: Reducer<State, Action>
	init(args?: InitArgs): Immutable<State> // slight departure from React = making the init args optional
}

/////////////////////////////////////////////////

type AllStoreFns<State, InitArgs, Action extends ReducerAction> = SyncStoreFns<State> & SyncReducerFns<State, InitArgs, Action>

/////////////////////////////////////////////////

export {
	type Snapshot,
	type SyncStoreUnsubscribeFn,
	type SyncStoreFns,

	type SyncReducerFns,

	type AllStoreFns,
}
