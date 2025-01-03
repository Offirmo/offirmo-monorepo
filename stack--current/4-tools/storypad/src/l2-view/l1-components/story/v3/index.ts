import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'

import { aggregateꓽRenderParams, GenericStoryComponent } from '../../../../l0-types/l1-csf'
import { Story‿v3, Meta‿v3 } from '../../../../l0-types/l1-csf/v3'
import { StoryEntry } from '../../../../l1-flux/types.ts'
import { LIB } from '../../../../consts'
import { getꓽRenderParamsⵧglobal } from '../../../../l1-flux/selectors.ts'

/////////////////////////////////////////////////
console.log('Loading the CSF v3 renderer...')
// reminder: https://storybook.js.org/docs/writing-stories#component-story-format

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
		case story.render !== undefined: {

			const rendered: unknown = story.render({
				...meta.args,
				...story.args,
			})

			if (typeof rendered === 'string') {
				document.body.innerHTML = rendered
				break
			}

			if (!!rendered && (typeof rendered === 'object') && ('$$typeof' in rendered)) {
				// this is React JSX
				_renderⵧcomponent(() => rendered, story, meta)
				break
			}

			document.body.innerText = '[💣CSF v3: TODO unrecognized output of "render()"!]'
			console.error('XXX rendered=', rendered)
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
			document.body.innerText = '[CSF v3: Empty story or unknown rendering method]'
			break
	}


	console.groupEnd()
}

async function _renderⵧcomponent(component: Immutable<GenericStoryComponent>, story: Immutable<Story‿v3>, meta: Immutable<Meta‿v3>) {
	console.log('v3 _renderⵧcomponent', {Component: component})

	// TODO one day if needed: recognize React through jsx "x" on extension
	const isReact = (typeof component === 'function')

	switch (true) {
		case isReact: {
			const render = (await import('./react/index.tsx')).default;
			await render(component, story, meta)
			break
		}

		// if new format
		// don't forget to implement the decorators!

		default:

			throw new Error(`Unrecognized story "component" format!`)
	}
}

/////////////////////////////////////////////////

export default renderCSFV3
