import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'

import { Story‿v2, Meta‿v2 } from '../../../../l0-types/l1-csf/v2'
import { StoryEntry } from '../../../../l1-flux/l1-state/types.ts'
import { LIB } from '../../../../consts'
import { aggregateꓽRenderParams, RenderParams, StoryContext } from '../../../../l0-types/l1-csf'
import {ObservableState} from '../../../../l1-flux/l2-observable'

/////////////////////////////////////////////////
console.log('Loading the CSF v2 renderer...')

async function renderCSFV2(state: ObservableState, container: HTMLElement, entry: Immutable<StoryEntry>) {
	console.group(`[${LIB}] Rendering a CSF v2 story…`)
	console.log('StoryEntry=', entry)
	const story: Immutable<Story‿v2> = entry.story as any
	const meta = (entry.meta || {}) as any as Meta‿v2
	const global_render_params = state.getꓽRenderParamsⵧglobal<Story‿v2>()
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

	await _renderⵧaggregated_story(container, render_params)

	console.groupEnd()
}

async function _renderⵧaggregated_story(container: HTMLElement, render_params: Immutable<RenderParams<Story‿v2>>) {
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
	else if (render) {
		const decorated_render = render_params.decorators!.reduce((acc, decorator) => {
			assert(typeof decorator === 'function', 'Decorator must be a function!')
			assert(typeof acc === 'function', 'Decorator must be applied to a function!')
			const context: StoryContext = {
				args: render_params.args!
			}
			return decorator(acc as any, context)
		}, render)
		const rendered = decorated_render(render_params.args!)

		if (typeof rendered === 'string') {
			container.innerHTML = rendered
		}
		else if (!!rendered && (typeof rendered === 'object') && ('$$typeof' in rendered)) {
			// this is React JSX
			container.innerHTML = `[CSFv2 is supported, as a convenience, only for trivial components. React is not supported. Please use CSF v3 format!]`
		}
		else {
			throw new Error(`This render output is unrecognized and not supported!`)
		}
	}
	else {
		throw new Error(`CSFv2: No component nor render()??`)
	}
}

/////////////////////////////////////////////////

export default renderCSFV2
