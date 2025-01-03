import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'

import { Story‿v2, Meta‿v2 } from '../../../../l0-types/l1-csf/v2'
import { StoryEntry } from '../../../../l1-flux/types.ts'
import { LIB } from '../../../../consts'
import { getꓽRenderParamsⵧglobal } from '../../../../l1-flux/selectors'
import { aggregateꓽRenderParams, RenderParams, StoryContext } from '../../../../l0-types/l1-csf'

/////////////////////////////////////////////////
console.log('Loading the CSF v2 renderer...')

async function renderCSFV2(entry: Immutable<StoryEntry>) {
	console.group(`[${LIB}] Rendering a CSF v2 story…`)
	console.log('StoryEntry=', entry)
	const story: Immutable<Story‿v2> = entry.story as any
	const meta = (entry.meta || {}) as any as Meta‿v2
	const global_render_params = getꓽRenderParamsⵧglobal<Story‿v2>()
	console.log({
		story,
		meta,
		global_render_params,
	})

	const render_params = aggregateꓽRenderParams<Story‿v2>(
		global_render_params,
		meta,
		story,
	)
	console.log('render_params=', render_params)

	await _renderⵧaggregated_story(render_params)

	console.groupEnd()
}

async function _renderⵧaggregated_story(render_params: Immutable<RenderParams<Story‿v2>>) {
	console.log(render_params)
	const { render, component } = render_params

	if (component) {
		const isReact = (typeof component === 'function')

		switch (true) {
			case isReact: {
				throw new Error(`CSF v2 React components not implemented yet!`)
			}

			default:
				throw new Error(`CSF v2: Unrecognized story "component" format!`)
		}

		if (render_params.decorators?.length) {
			throw new Error('Decorators not implemented!')
		}
	}

	if (render) {
		const decorated_render = render_params.decorators!.reduce((acc, decorator) => {
			assert(typeof decorator === 'function', 'Decorator must be a function!')
			assert(typeof acc === 'function', 'Decorator must be applied to a function!')
			const context: StoryContext = {
				args: render_params.args!
			}
			return decorator(acc as any, context)
		}, render)
		const rendered = decorated_render(render_params.args!)

		assert(typeof rendered === 'string', `render output not a string is not supported!`)

		document.body.innerHTML = rendered
	}
}

/////////////////////////////////////////////////

export default renderCSFV2
