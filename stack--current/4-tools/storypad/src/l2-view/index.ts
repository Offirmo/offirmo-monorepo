/* Root render function
 */

import { getꓽrender_mode } from '../l1-flux/selectors'

import { LIB } from '../consts'
import renderⵧstory from './l1-components/story'
import renderⵧmanager from './l1-components/manager'

/////////////////////////////////////////////////

async function renderꓽroot(): Promise<void> {
	const is_iframe = ( window.location !== window.parent.location )

	console.group(`[${LIB}] ROOT RENDER [${is_iframe ? 'SUB frame' : 'TOP frame'}]`)

	const render_mode = getꓽrender_mode()

	switch (render_mode) {
		case 'full':
			await renderⵧmanager()
			break
		case 'story':
			await renderⵧstory()
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
