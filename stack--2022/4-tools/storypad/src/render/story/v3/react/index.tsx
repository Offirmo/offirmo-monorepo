/* PROMPT
 */
import * as React from 'react'
import { Immutable } from '@offirmo-private/ts-types'

import { LIB } from '../../../../consts'
import { Meta, Story‿v3 } from '../../../../types'

/////////////////////////////////////////////////

async function render(Component: any, story: Immutable<Story‿v3>, meta: Immutable<Meta>) {
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

	const { Fragment, StrictMode } = libⳇreact
	const use_strict = true
	const StrictWrapper = use_strict ? StrictMode : Fragment

	root.render(
	<StrictWrapper>
			<Component />
		</StrictWrapper>
	);
	console.groupEnd()
}

/////////////////////////////////////////////////

export default render
