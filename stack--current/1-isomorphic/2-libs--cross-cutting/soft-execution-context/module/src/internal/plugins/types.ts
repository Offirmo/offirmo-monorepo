//import type {  } from './types.js'

/////////////////////////////////////////////////

interface SXCPlugin<State = {}> {
	id: string

	augment: (ROOT_PROTOTYPE: any) => void

	state: {
		create(parent_state: State): State
	}
}

/////////////////////////////////////////////////

export {
	type SXCPlugin,
}
