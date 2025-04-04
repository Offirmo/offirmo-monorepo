
interface State {
	details: Record<string, any>
}

function create(parent_state: State | undefined) {
	const details = parent_state
		? Object.create(parent_state.details)
		: Object.create(null) // NO auto-details here, let's keep it simple. See core or platform specific code.

	return {
		details,
	}
}

function addDetail(state: State, key: string, value: any): State {
	const { details } = state

	details[key] = value

	return {
		...state,
		details,
	}
}

/////////////////////

export {
	type State,
	create,
	addDetail,
}
