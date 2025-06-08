import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'
import * as RichText from '@offirmo-private/rich-text-format'

import {
	isꓽRenderParamsWithComponent,
	isꓽRenderParamsWithRenderFunc,
	type RenderParams,
	type RenderParamsWithComponent, type RenderParamsWithRenderFunc, type StoryContext,
} from '../../../../l0-types/l1-csf/index.ts'
import type { Story‿v3, Meta‿v3 } from '../../../../l0-types/l1-csf/v3/index.ts'
import type { StoryEntry } from '../../../../l1-flux/l1-state/types.ts'
import { LIB } from '../../../../consts.ts'
import type { ObservableState } from '../../../../l1-flux/l2-observable/index.ts'

/////////////////////////////////////////////////
console.log('Loading the CSF v3 renderer...')
// reminder: https://storybook.js.org/docs/writing-stories#component-story-format

async function renderCSFV3(state: ObservableState, render_params: Immutable<RenderParams<Story‿v3>>, container: HTMLElement) {
	console.group(`[${LIB}] Rendering a CSF v3 story…`)
	console.log({ state, render_params })

	switch (true) {
		case isꓽRenderParamsWithRenderFunc<Story‿v3>(render_params):
			_renderⵧrender_func(state, render_params, container)
			break

		case isꓽRenderParamsWithComponent<Story‿v3>(render_params):
			_renderⵧcomponent(state, render_params, container)
			break

		default:
			throw new Error('💣CSF v3: Empty story or unknown rendering method!')
	}

	console.groupEnd()
}

async function _renderⵧrender_func(state: ObservableState, render_params: Immutable<RenderParamsWithRenderFunc<Story‿v3>>, container: HTMLElement) {
	console.log('v3 _renderⵧrender_func()', render_params)

	const { render } = render_params

	// TODO one day, not sure we're correctly implementing decorators here https://storybook.js.org/docs/writing-stories/decorators
	const decorated_render = render_params.decorators.reduce<(typeof render_params)['render']>((acc, decorator) => {
		assert(typeof decorator === 'function', 'Decorator must be a function!')
		assert(typeof acc === 'function', 'Decorator must be applied to a function!')
		const context: StoryContext = {
			args: render_params.args,
			parameters: render_params.parameters,
			viewMode: 'canvas',
		}
		return decorator(acc as any, context) as any
	}, render)
	const rendered: unknown = decorated_render(render_params.args!)

	console.info('decorated render() yielded:', { rendered })

	if (!rendered) {
		throw new Error('CSF v3 render() returned null-ish!')
	}

	if (typeof rendered === 'string') {
		container.innerHTML = rendered
		return
	}

	if ((typeof rendered === 'object') && ('innerHTML' in rendered)) {
		// this is a DOM element
		container.innerHTML = ''
		container.appendChild(rendered as HTMLElement)
		return
	}

	if ((typeof rendered === 'object') && ('$$typeof' in rendered)) {
		// this is React JSX
		state.addꓽannotation('React', 'true')
		const { render, ...rest } = render_params
		const newRenderParams: RenderParamsWithComponent<Story‿v3> = {
			...rest,
			component: () => rendered,
			decorators: [], // we already applied them
		}
		_renderⵧcomponent(state, newRenderParams, container)
		return
	}

	if (RichText.isꓽNode(rendered)) {
		const asⵧtext = RichText.renderⵧto_text(rendered)
		const asⵧhtml = RichText.renderⵧto_html(rendered)
		// TODO multi-render
		// TODO react
		// TODO markdown
		container.innerHTML = asⵧhtml
		return
	}

	throw new Error('CSF v3 render() returned unrecognized data!')
}

async function _renderⵧcomponent(state: ObservableState, render_params: Immutable<RenderParamsWithComponent<Story‿v3>>, container: HTMLElement) {
	console.log('v3 _renderⵧcomponent()', render_params)

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
