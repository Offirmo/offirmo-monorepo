/* Root render function
 */

import { isꓽframed } from '@offirmo-private/features-detection-browser/src/l1-is-framed'

import { RenderMode } from '../l1-flux/l1-state/types'
import { ObservableState } from '../l1-flux/l2-observable'
import { LIB } from '../consts'
import renderⵧstory from './l1-components/preview'
import renderⵧmanager from './l1-components/manager'
import renderꓽstoryᝍarea from './l1-components/story-area'

/////////////////////////////////////////////////

function renderꓽroot(state: ObservableState, container: HTMLElement = document.body) {
	console.group(`[${LIB}] ROOT RENDER [${isꓽframed() ? 'SUB frame' : 'TOP frame'}]`)

	// @ts-expect-error bundler stuff
	import('@offirmo-private/css--framework/src/atomic/atomic--dimension.css')
	// @ts-expect-error bundler stuff
	import('./index.css')

	const root = document.createElement('div')
	root.classList.add('o⋄full-viewport', 'storypad⋄root')

	const render_mode = state.getꓽrender_mode()

	switch (render_mode) {
		case RenderMode.manager:
			root.appendChild(renderⵧmanager(state))
			break
		case RenderMode.story:
			renderⵧstory(state, root)
			break
		case RenderMode.story_full:
			root.appendChild(renderꓽstoryᝍarea(state))
			break
		default:
			console.error({ render_mode })
			throw new Error(`Unknown render mode!`)
	}

	container.appendChild(root)

	console.groupEnd()
}

/////////////////////////////////////////////////

export default renderꓽroot
