export * from './src/index.js'

/////////////////////////////////////////////////

import {
	Immutable,
	BaseAction,
	ActionReducer,
	ActionⳇReconcile,
} from '@offirmo-private/state-utils'

import {
	State,
	on_start_session,
	on_logged_in_refresh,
} from './src/index.js'

/////////////////////////////////////////////////

interface ActionⳇStartSession extends BaseAction {
	type: 'start_session'
	is_web_diversity_supporter: boolean
}

interface ActionⳇOnLoggedInRefresh extends BaseAction {
	type: 'logged_in_refresh'
	is_logged_in: boolean
	roles?: string[]
}

type Action = ActionⳇStartSession | ActionⳇOnLoggedInRefresh | ActionⳇReconcile<State>


//const reduceꓽaction: ActionReducer<State, Action> = (state: Immutable<State>, action: Immutable<Action>): Immutable<State> => {
const reduceꓽaction: ActionReducer<State, Action> = (state, action) => {
	switch (action.type) {
		case 'start_session':
			return on_start_session(state, action.is_web_diversity_supporter)
		case 'logged_in_refresh':
			return on_logged_in_refresh(state, action.is_logged_in, action.roles)
		default:
			return state
	}
}

/////////////////////////////////////////////////

export {
	type ActionⳇStartSession,
	type ActionⳇOnLoggedInRefresh,
	type Action,
	reduceꓽaction,
}
