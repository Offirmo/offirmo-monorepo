/* Root render function
 */

import { getꓽrender_mode } from '../flux/selectors'

import { LIB } from '../consts'
import renderⵧstory from './components/story'
import renderⵧmanager from './components/manager'

/////////////////////////////////////////////////

async function render(): Promise<void> {
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

	console.groupEnd()
}

/////////////////////////////////////////////////

export default render
