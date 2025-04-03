
/////////////////////////////////////////////////

interface State {
	context: Record<string, any>
}

function create(parent_state: State | undefined) {
	const context = parent_state
		? Object.create(parent_state.context)
		: Object.create(null) // NO auto-injections here, let's keep it simple. See core & common

	return {
		context,
	}
}

function injectDependencies(state: State, key: string, value: any): State {
	const { context } = state

	context[key] = value

	return {
		...state,
		context,
	}
}

/////////////////////////////////////////////////

export {
	type State,
	create,
	injectDependencies,
}
