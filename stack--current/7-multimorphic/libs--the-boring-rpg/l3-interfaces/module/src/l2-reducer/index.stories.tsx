


import React, { useReducer, useSyncExternalStore } from 'react'
import type { Meta‿v3, Story‿v3 } from '@offirmo-private/storypad'

import { createꓽall_store_fns } from './index.ts'

/////////////////////////////////////////////////

export default {

} satisfies Meta‿v3

/////////////////////////////////////////////////

const { reducer, init, subscribe, getSnapshot, dispatch } = createꓽall_store_fns()

export const UseReducer: Story‿v3 = {
	component: () => {
		const [state, dispatch] = useReducer(reducer, undefined, init)
		console.log(`UseReducer:`, { state })

		return (
			<>
				<code>
					{JSON.stringify(state, null, 2)}
				</code>
				<button onClick={() => dispatch({type: "play"})}>Play</button>
			</>
		)
	}
}


export const UseSyncExternalStore: Story‿v3 = {
	component: () => {
		const snapshot = useSyncExternalStore(subscribe, getSnapshot)
		console.log(`useSyncExternalStore:`, { snapshot })

		return (
			<>
				<code>
					{JSON.stringify(snapshot, null, 2)}
				</code>
				<button onClick={() => dispatch({type: "play"})}>Play</button>
			</>
		)
	}
}

