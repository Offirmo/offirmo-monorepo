import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'

import {StoryEntry} from '../../../l1-flux/l1-state/types.ts'
import { Story‿v2, isꓽStory‿v2 } from '../../../l0-types/l1-csf/v2'
import { Story‿v3, isꓽStory‿v3 } from '../../../l0-types/l1-csf/v3'
import {aggregateꓽRenderParams, CommonRenderParams, RenderParams} from '../../../l0-types/l1-csf'

import { ObservableState } from '../../../l1-flux/l2-observable'

/////////////////////////////////////////////////

const LIB = `renderꓽstory()`

async function renderꓽstory(state: ObservableState, container: HTMLElement) {
	// reminder: we want to "pollute" the current window as few as possible
	// so we avoid containers and CSS as much as we can

	console.group(`[${LIB}] Rendering a CSF story…`)

	const storyEntry = state.getꓽstoryⵧcurrent()
	console.log('Story Entry =', storyEntry)

	if (!storyEntry) {
		container.innerText = `[No stories found. Please add some or review your setup!]`
	}
	else {
		const global_render_params = state.getꓽRenderParamsⵧglobal<Story‿v2 | Story‿v3>()

		const meta = storyEntry.meta || {}

		const story = storyEntry.story

		console.log({
			global_render_params,
			meta,
			story,
		})

		const render_params = aggregateꓽRenderParams(
			global_render_params,
			meta as any,
			story as any,
		)

		const { layout } = render_params.parameters
		const storyContainer = (() => {
			if (layout === 'bare')
				return container

			import('./index.css')

			const storyContainer = document.createElement('div')
			storyContainer.classList.add('storypad⋄story-container', `storypad⋄story-container--${layout}`)
			storyContainer.innerText = `[${LIB}: starting...]`
			container.appendChild(storyContainer)

			return storyContainer
		})()

		try {
			await _renderⵧstory(state, storyEntry, render_params, storyContainer)
		} catch (err) {
			console.error(`💣 Error in ${LIB}!`, err)
			container.innerText = `
[💣${LIB}: Error loading story! See dev console!]
[${(err as any)?.message}]
`
		}
	}
}

async function _renderⵧstory(state: ObservableState, storyEntry: Immutable<StoryEntry>, render_params: Immutable<RenderParams<Story‿v2 | Story‿v3>>, container: HTMLElement) {


	switch (true) {
		case isꓽStory‿v2(storyEntry.story): {
			state.addꓽannotation('CSF', 'v2')
			try {
				const render_v2 = (await import('./v2')).default
				await render_v2(state, storyEntry, render_params as any, container)
			}
			catch (err) {
				console.error(`Error in ${LIB}! for v2`, err)
				throw err
			}
			break
		}

		case isꓽStory‿v3(storyEntry.story): {
			state.addꓽannotation('CSF', 'v3')
			try {
				const render_v3 = (await import('./v3')).default
				await render_v3(state, storyEntry, render_params as any, container)
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
