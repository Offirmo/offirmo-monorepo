import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { isꓽStory‿v3 } from '../../../types/csf/v3'
import { getꓽstoryⵧcurrent } from '../../../flux/selectors'

/////////////////////////////////////////////////

async function render(container: HTMLElement = document.body) {
	container.innerText = `Loading story…`
	try {
		await _renderⵧstory(container)
	} catch (err) {
		console.error(err)
		container.innerText = `Error loading story! (see dev console)`
	}
}

async function _renderⵧstory(container: HTMLElement) {
	container.innerText = `Loading current story…`

	try {
		const storyEntry = getꓽstoryⵧcurrent()
		if (!storyEntry) {
			container.innerText = `no stories found! Please add some or review your setup!`
			return
		}

		switch(true) {
			case isꓽStory‿v3(storyEntry.story): {
				const render_v3 = (await import('./v3')).default
				render_v3(storyEntry)
				break
			}

			/*
			case isꓽStory‿v2(storyEntry): {
				content = storyEntry()
				break
			}*/

			default:
				throw new Error(`Unsupported story format! (yet!)`)
		}
	}
	catch (err) {
		console.error(err)
		container.innerText = `Error loading story! (see dev console)`
	}
}

/////////////////////////////////////////////////

export default render
