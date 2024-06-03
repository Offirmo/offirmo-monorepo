import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { isꓽStory‿v3 } from '../../../types/csf/v3'
import { isꓽStory‿v2 } from '../../../types/csf/v2'
import { getꓽstoryⵧcurrent } from '../../../flux/selectors'

/////////////////////////////////////////////////

async function renderꓽstory(container: HTMLElement = document.body) {
	container.innerText = `[Loading story…]`
	try {
		await _renderⵧstory(container)
	} catch (err) {
		console.error(err)
		container.innerText = `[Error loading story! See dev console!]`
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
	switch(true) {

		case isꓽStory‿v2(storyEntry.story): {
			const render_v2 = (await import('./v2')).default
			await render_v2(storyEntry)
			break
		}

		case isꓽStory‿v3(storyEntry.story): {
			const render_v3 = (await import('./v3')).default
			await render_v3(storyEntry)
			break
		}

		default:
			throw new Error(`Unsupported story format! (yet!)`)
	}

	const path_elt = document.createElement('div')
	path_elt.setAttribute('id', 'path');
	path_elt.innerText = storyEntry.uid
	document.body.appendChild(path_elt)
}

/////////////////////////////////////////////////

export default renderꓽstory
