import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'

import { isꓽStory‿v3 } from '../../../l0-types/l1-csf/v3'
import { isꓽStory‿v2 } from '../../../l0-types/l1-csf/v2'
import { getꓽstoryⵧcurrent } from '../../../l1-flux/selectors'

/////////////////////////////////////////////////

const LIB = `renderꓽstory()`

async function renderꓽstory(container: HTMLElement = document.body) {
	container.innerText = `[${LIB}: starting...]`
	try {
		await _renderⵧstory(container)
	} catch (err) {
		console.error(`💣 Error in ${LIB}!`, err)
		container.innerText = `[💣${LIB}: Error loading story! See dev console!]`
	}
}

async function _renderⵧstory(container: HTMLElement) {
	const storyEntry = getꓽstoryⵧcurrent()
	if (!storyEntry) {
		container.innerText = `[No stories found. Please add some or review your setup!]`
		return
	}

	// @ts-expect-error bundler stuff
	import('./index.css')

	console.log('Rendering story:', storyEntry)
	switch (true) {

		case isꓽStory‿v2(storyEntry.story): {
			try {
				const render_v2 = (await import('./v2')).default
				assert(typeof render_v2 === 'function', `render_v2 should be a function!`)
				await render_v2(container, storyEntry)
			}
			catch (err) {
				console.error(`Error in ${LIB}! for v2`, err)
				throw err
			}
			break
		}

		case isꓽStory‿v3(storyEntry.story): {
			try {
				const render_v3 = (await import('./v3')).default
				assert(typeof render_v3 === 'function', `render_v3 should be a function!`)
				await render_v3(container, storyEntry)
			}
			catch (err) {
				console.error(`Error in ${LIB}! for v3`, err)
				throw err
			}
			break
		}

		default:
			throw new Error(`Unsupported story format! (yet!)`)
	}

	const path_elt = document.createElement('div')
	path_elt.setAttribute('id', 'path');
	path_elt.innerText = storyEntry.uid
	container.appendChild(path_elt)
}

/////////////////////////////////////////////////

export default renderꓽstory
