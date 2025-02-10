/* Root render function
 */

import { isꓽframed } from '@offirmo-private/browser-features-detection/is-framed'

import { RenderMode } from '../../l1-flux/l1-state/types.ts'
import { ObservableState } from '../../l1-flux/l2-observable'
import { LIB } from '../../consts.ts'
import renderⵧstory from '../l1-components/preview'
import renderⵧmanager from '../l1-components/manager'
import renderꓽstoryᝍarea from '../l1-components/story-area'

/////////////////////////////////////////////////

function renderꓽroot(state: ObservableState, container: HTMLElement = document.body) {
	console.group(`[${LIB}] ROOT RENDER [${isꓽframed() ? 'SUB frame' : 'TOP frame'}]`)

	const render_mode = state.getꓽrender_mode()
	console.log(`render_mode =`, render_mode)

	if (render_mode === RenderMode.story) {
		// we want to "pollute" the current window as few as possible
		void renderⵧstory(state, container)
	}
	else {
		// our stuff, we can be more free
		import('@offirmo-private/css--framework/viewport.css')
		import('../index.css')

		const root = document.createElement('div')
		root.classList.add('o⋄full-viewport', 'storypad⋄root')

		switch (render_mode) {
			case RenderMode.manager:
				root.appendChild(renderⵧmanager(state))
				break
			case RenderMode.story_full:
				root.appendChild(renderꓽstoryᝍarea(state))
				break
			default:
				console.error({ render_mode })
				throw new Error(`Unknown render mode!`)
		}

		container.appendChild(root)
	}

	console.groupEnd()
}

/////////////////////////////////////////////////

export default renderꓽroot
