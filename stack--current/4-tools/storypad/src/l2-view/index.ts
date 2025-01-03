/* Root render function
 */

import { ObservableState } from '../l1-flux/l2-observable'

import { LIB } from '../consts'
import renderⵧstory from './l1-components/preview'
import renderⵧmanager from './l1-components/manager'

/////////////////////////////////////////////////

async function renderꓽroot(state: ObservableState): Promise<void> {
	const is_iframe = ( window.location !== window.parent.location )

	console.group(`[${LIB}] ROOT RENDER [${is_iframe ? 'SUB frame' : 'TOP frame'}]`)

	const render_mode = state.getꓽrender_mode()

	switch (render_mode) {
		case 'full':
			await renderⵧmanager(state)
			break
		case 'story':
			await renderⵧstory(state)
			break
		default:
			console.error({ render_mode })
			throw new Error(`Unknown render mode!`)
	}

	// @ts-expect-error bundler stuff
	import('./index.css')

	console.groupEnd()
}

/////////////////////////////////////////////////

export default renderꓽroot
