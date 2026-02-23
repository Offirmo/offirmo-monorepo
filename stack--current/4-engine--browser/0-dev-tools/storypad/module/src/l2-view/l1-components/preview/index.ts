import assert from 'tiny-invariant'
import type { Immutable } from '@monorepo-private/ts--types'

import type { StoryEntry } from '../../../l1-flux/l1-state/types.ts'
import { type Story‿v2, isꓽStory‿v2 } from '../../../l0-types/l1-csf/v2/index.ts'
import { type Story‿v3, isꓽStory‿v3, type Meta‿v3 } from '../../../l0-types/l1-csf/v3/index.ts'
import {
	type RenderParams, aggregateꓽRenderParams,
	isꓽRenderParamsWithComponent,
} from '../../../l0-types/l1-csf/index.ts'

import type { ObservableState } from '../../../l1-flux/l2-observable/index.ts'

/////////////////////////////////////////////////

const LIB = `renderꓽstory()`

async function renderꓽstory(state: ObservableState, container: HTMLElement) {
	// reminder: we want to "pollute" the current window as few as possible
	// so we avoid containers and CSS as much as we can
	console.group(`[${LIB}] Rendering a CSF story…`)
	group: {
		const storyEntry = state.getꓽstoryⵧcurrent()
		console.log('Story Entry =', storyEntry)

		if (!storyEntry) {
			container.innerText = `[No stories found. Please add some or review your setup!]`
			break group
		}

		const {
			global_render_params,
			meta,
			story,
		} = _get_parts(state, storyEntry)

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

		try {
			await _renderⵧstory_v3(state, render_params, container)
		} catch (err) {
			console.error(`💣 Error in ${LIB}!`, err)
			container.innerText = `
[💣${LIB}: Error loading story! See dev console!]
[${(err as any)?.message}]
`
		}
	}
	console.groupEnd()
}

function _get_parts(state: ObservableState, storyEntry: Immutable<StoryEntry>) {
	const global_render_params = state.getꓽRenderParamsⵧglobal<Story‿v2 | Story‿v3>()

	let meta = storyEntry.meta || {}

	let story = storyEntry.story

	switch (true) {
		case isꓽStory‿v2(story): {
			state.addꓽannotation('CSF', 'v2')

			// trivially convert to v2
			assert(!meta.render, `CSFv2: meta.render is not possible!`)
			assert(!meta.component, `CSFv2: meta.component is not possible!`)
			const meta_v3: Immutable<Meta‿v3> = {
				...(meta as any),
			}

			assert(!story.render, `CSFv2: story.render is not possible!`)
			assert(!story.component, `CSFv2: story.component is not possible!`)
			assert(typeof story === 'function', `CSFv2: story must be a function!`)
			const story_v3: Immutable<Story‿v3> = {
				...(story as any),
				render: story,
				name: story.name,
			}

			console.log(`Converted CSFv2 to CSFv3:`, {
				meta_v2: meta,
				story_v2: story,
				meta_v3,
				story_v3,
			})
			meta = meta_v3
			story = story_v3

			break
		}

		case isꓽStory‿v3(story): {
			state.addꓽannotation('CSF', 'v3')
			break
		}

		default:
			throw new Error(`Unsupported story format! (yet?)`)
	}

	return {
		global_render_params,
		meta,
		story,
	}
}

async function _renderⵧstory_v3(state: ObservableState, render_params: Immutable<RenderParams<Story‿v2 | Story‿v3>>, container: HTMLElement) {

	const storyContainer = (() => {
		const { layout } = render_params.parameters

		if (layout === 'bare')
			return container

		//import('../../../__vendor/@monorepo-private/css--framework/atomic/atomic--dimension.css')
		import('./index.css')

		const storyContainer = document.createElement('div')
		storyContainer.classList.add('storypad⋄story-container', `storypad⋄story-container--${layout}`)
		storyContainer.innerText = `[${LIB}: starting…]`
		container.appendChild(storyContainer)

		return storyContainer
	})()

	try {
		const render_v3 = (await import('./v3')).default
		await render_v3(state, render_params as any, storyContainer)
	}
	catch (err) {
		console.error(`Error in ${LIB}! for v3`, err)
		throw err
	}
}

/////////////////////////////////////////////////

export default renderꓽstory
