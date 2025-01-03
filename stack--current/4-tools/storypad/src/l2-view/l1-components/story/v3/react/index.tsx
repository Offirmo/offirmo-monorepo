/* render a CSF v3 Story
 */
import * as React from 'react'
import { type Immutable } from '@offirmo-private/ts-types'

import { LIB } from '../../../../../consts'
import { Meta‿v3, Story‿v3 } from '../../../../../l0-types/l1-csf/v3'
import {StoryContext} from '../../../../../l0-types/l1-csf'

/////////////////////////////////////////////////

// TODO container
async function render(Component: any, story: Immutable<Story‿v3>, meta: Immutable<Meta‿v3>) {
	console.group(`[${LIB}] Rendering a React component…`)

	// https://react.dev/reference/react-dom/client/createRoot
	const libⳇreactᝍdomⳇclient = await import('react-dom/client')
	const libⳇreact = await import('react')
	console.log('libs', {
		libⳇreactᝍdomⳇclient,
		libⳇreact,
	})

	const { createRoot } = libⳇreactᝍdomⳇclient
	let root_elt = document.createElement('div')
	root_elt.innerHTML = `[React will load here]`
	document.body.innerHTML = '' // reset any loading message
	document.body.appendChild(root_elt)

	const root = createRoot(root_elt);

	const { Fragment, StrictMode, Suspense } = libⳇreact
	const use_strict = false
	const StrictWrapper = use_strict ? StrictMode : Fragment

	const props = {
		...meta.args,
		...story.args,
	}


	let StoryAsReactComponent: React.FunctionComponent = () => <Component {...props} /> // TODO one day apply args?

	if (story.decorators || meta?.decorators) {

		const decorators = story.decorators === null
			? [] // allow resetting decorators
			:[
				...(meta?.decorators || []),
				...(story.decorators || []),
			].reverse()
		const context: StoryContext = {
			// TODO derive from story??
			args: story.args!,
		}
		decorators.forEach(decorator => {
			// TODO one day, not sure we're correctly implementing decorators here https://storybook.js.org/docs/writing-stories/decorators
			const output = decorator(StoryAsReactComponent, context)
			StoryAsReactComponent = (
				(typeof output !== 'function')
					? () => output // the decorator returned direct JSX, it's allowed
					: output
			) as any // TODO clarify
		})
	}


	// TODO error boundary
	root.render(
		<StrictWrapper>
			<Suspense fallback='suspense…'>
				<StoryAsReactComponent />
			</Suspense>
		</StrictWrapper>
	);
	console.groupEnd()
}

/////////////////////////////////////////////////

export default render
