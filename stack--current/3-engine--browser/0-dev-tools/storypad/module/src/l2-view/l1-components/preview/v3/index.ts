import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'

import {
	isꓽRenderParamsWithComponent,
	isꓽRenderParamsWithRenderFunc,
	type RenderParams,
	type RenderParamsWithComponent,
} from '../../../../l0-types/l1-csf'
import type { Story‿v3, Meta‿v3 } from '../../../../l0-types/l1-csf/v3'
import type { StoryEntry } from '../../../../l1-flux/l1-state/types.ts'
import { LIB } from '../../../../consts'
import type { ObservableState } from '../../../../l1-flux/l2-observable'

/////////////////////////////////////////////////
console.log('Loading the CSF v3 renderer...')
// reminder: https://storybook.js.org/docs/writing-stories#component-story-format

async function renderCSFV3(state: ObservableState, entry: Immutable<StoryEntry>, render_params: Immutable<RenderParams<Story‿v3>>, container: HTMLElement) {
	console.group(`[${LIB}] Rendering a CSF v3 story…`)
	console.log('StoryEntry=', entry)
	const story: Immutable<Story‿v3> = entry.story as any

	switch (true) {
		case isꓽRenderParamsWithRenderFunc<Story‿v3>(render_params): {

			const rendered: unknown = render_params.render(render_params.args)
			console.error('render() =', rendered)

			if (!rendered) {
				throw new Error('CSF v3 render() returned null-ish!')
			}

			if (typeof rendered === 'string') {
				// normally we'll use CSF v2 for such trivial cases?
				throw new Error('TODO CSFv3 implement render() -> string with decorators')
				//container.innerHTML = rendered
				//break
			}
			// TODO one day support HTMLElement

			if ((typeof rendered === 'object') && ('$$typeof' in rendered)) {
				// this is React JSX
				state.addꓽannotation('React', 'true')
				const { render, ...rest } = render_params
				const newRenderParams: RenderParamsWithComponent<Story‿v3> = {
					...rest,
					component: () => rendered
				}
				_renderⵧcomponent(state, newRenderParams, container)
				break
			}

			throw new Error('CSF v3 render() returned unrecognized data!')

		}

		case isꓽRenderParamsWithComponent<Story‿v3>(render_params): {
			_renderⵧcomponent(state, render_params, container)
			break
		}

		default:
			container.innerText = '[💣CSF v3: Empty story or unknown rendering method]'
			break
	}

	console.groupEnd()
}

async function _renderⵧcomponent(state: ObservableState, render_params: Immutable<RenderParamsWithComponent<Story‿v3>>, container: HTMLElement) {
	console.log('v3 _renderⵧcomponent', {Component: render_params.component})

	// TODO one day if needed: recognize React through jsx "x" on extension
	const isReact = (typeof render_params.component === 'function')

	switch (true) {
		case isReact: {
			state.addꓽannotation('React', 'true')
			const render = (await import('./react/index.tsx')).default;
			await render(state, render_params, container)
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
