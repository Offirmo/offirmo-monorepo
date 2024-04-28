import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { Story‿v3, Meta‿v3, StoryComponent‿v3 } from '../../../../types/csf/v3'
import { StoryEntry } from '../../../../state'
import { LIB } from '../../../../consts'

/////////////////////////////////////////////////
console.log('Loading the CSF v3 renderer...')

async function render(entry: Immutable<StoryEntry>) {
	console.group(`[${LIB}] Rendering a CSF v3 story…`)
	console.log('StoryEntry=', entry)
	const story: Immutable<Story‿v3> = entry.story as any
	const { uid, meta = {} as Meta‿v3 } = entry
	console.log({
		story,
		meta,
	})

	switch (true) {
		case story.render !== undefined: {
			const rendered = story.render()
			document.body.innerText = rendered
			break
		}

		case story.component !== undefined: {
			_renderⵧcomponent(story.component, story, meta)
			break
		}

		case meta.component !== undefined: {
			_renderⵧcomponent(meta.component, story, meta)
			break
		}

		default:
			document.body.innerText = 'Empty story or unknown rendering method.'
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

async function _renderⵧcomponent(component: Immutable<StoryComponent‿v3>, story: Immutable<Story‿v3>, meta: Immutable<Meta‿v3>) {
	console.log({Component: component})

	const isReact = (typeof component === 'function') && Object.hasOwn(component, 'propTypes')

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

export default render
