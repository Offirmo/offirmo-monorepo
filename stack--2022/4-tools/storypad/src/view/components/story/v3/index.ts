import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { aggregateꓽRenderParams, GenericStoryComponent } from '../../../../types/csf'
import { Story‿v3, Meta‿v3 } from '../../../../types/csf/v3'
import { StoryEntry } from '../../../../flux/types.ts'
import { LIB } from '../../../../consts'
import { getꓽRenderParamsⵧglobal } from '../../../../flux/selectors.ts'
import { Story‿v2 } from '../../../../types/csf/v2'

/////////////////////////////////////////////////
console.log('Loading the CSF v3 renderer...')

async function renderCSFV3(entry: Immutable<StoryEntry>) {
	console.group(`[${LIB}] Rendering a CSF v3 story…`)
	console.log('StoryEntry=', entry)
	const story: Immutable<Story‿v3> = entry.story as any
	const meta = (entry.meta || {}) as any as Meta‿v3
	const global_render_params = getꓽRenderParamsⵧglobal<Story‿v3>()
	console.log({
		story,
		meta,
		global_render_params,
	})

	const render_params = aggregateꓽRenderParams<Story‿v3>(
		global_render_params,
		meta,
		story,
	)
	console.log('render_params=', render_params)

	switch (true) {
		/*case story.render !== undefined: {
			const rendered = story.render({
				...meta.args,
				...story.args,
			})
			document.body.innerText = rendered
			break
		}*/

		case story.component !== undefined: {
			_renderⵧcomponent(story.component, story, meta)
			break
		}

		case meta.component !== undefined: {
			_renderⵧcomponent(meta.component, story, meta)
			break
		}

		default:
			document.body.innerText = '[CSF v3: Empty story or unknown rendering method]'
			break
	}

	if (story.decorators || meta?.decorators) {
		throw new Error('Decorators not implemented!')
		/*
		const decorators = storyEntry.storyEntry.decorators === null
			? [] // allow resetting decorators
			:[
				...state.config.decorators,
				...(storyEntry.meta?.decorators || []),
				...(storyEntry.storyEntry.decorators || []),
			].reverse()
		decorators.forEach(decorator => {
			throw new Error('Decorators not implemented!')
			//content = decorator(content)
		})*/
	}
	console.groupEnd()
}

async function _renderⵧcomponent(component: Immutable<GenericStoryComponent>, story: Immutable<Story‿v3>, meta: Immutable<Meta‿v3>) {
	console.log({Component: component})

	const isReact = (typeof component === 'function')

	switch (true) {
		case isReact: {
			const render = (await import('./react/index.tsx')).default;
			await render(component, story, meta)
			break
		}

		default:
			throw new Error(`Unrecognized story "component" format!`)
	}
}

/////////////////////////////////////////////////

export default renderCSFV3
