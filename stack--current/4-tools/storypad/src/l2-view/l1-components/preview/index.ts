import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'

import { isꓽStory‿v3 } from '../../../l0-types/l1-csf/v3'
import { isꓽStory‿v2 } from '../../../l0-types/l1-csf/v2'
import { ObservableState } from '../../../l1-flux/l2-observable'
import {StoryEntry} from '../../../l1-flux/l1-state/types.ts'

/////////////////////////////////////////////////

const LIB = `renderꓽstory()`

async function renderꓽstory(state: ObservableState, container: HTMLElement) {

	const storyContainer = document.createElement('div')
	storyContainer.classList.add('o⋄fill-parent', 'storypad⋄story-container')
	storyContainer.innerText = `[${LIB}: starting...]`
	storyContainer.style.position = 'relative'
	container.appendChild(storyContainer)

	const storyEntry = state.getꓽstoryⵧcurrent()
	if (!storyEntry) {
		container.innerText = `[No stories found. Please add some or review your setup!]`
		return
	}

	try {
		await _renderⵧstory(state, storyEntry, storyContainer)
	} catch (err) {
		console.error(`💣 Error in ${LIB}!`, err)
		storyContainer.innerText = `
[💣${LIB}: Error loading story! See dev console!]
[${(err as any)?.message}]
`
	}
}

async function _renderⵧstory(state: ObservableState, storyEntry: Immutable<StoryEntry>, container: HTMLElement) {
	// @ts-expect-error bundler stuff
	import('./index.css')

	console.log('Rendering story:', storyEntry)

	switch (true) {
		case isꓽStory‿v2(storyEntry.story): {
			try {
				const render_v2 = (await import('./v2')).default
				await render_v2(state, container, storyEntry)
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
				await render_v3(state, container, storyEntry)
			}
			catch (err) {
				console.error(`Error in ${LIB}! for v3`, err)
				throw err
			}
			break
		}

		default:
			throw new Error(`Unsupported story format! (yet?)`)
	}
}

/////////////////////////////////////////////////

export default renderꓽstory
