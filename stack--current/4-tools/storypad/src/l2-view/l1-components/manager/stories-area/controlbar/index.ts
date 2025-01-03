// https://storybook.js.org/docs/configure/user-interface/sidebar-and-urls

import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'

import { Url‿str } from '@offirmo-private/ts-types'

//import { FolderUId, StoryUId } from '../../../l1-flux/l1-state/types.ts'

import {ObservableState} from '../../../../../l1-flux/l2-observable'

/////////////////////////////////////////////////

function renderꓽcontrolbar(state: ObservableState): HTMLElement {
	const root = document.createElement('div')
	root.classList.add('storypad⋄ui-element', 'storypad⋄controlbar')

	// @ts-expect-error bundler stuff
	import('./index.css')
	root.innerText = 'TODO control bar'

	return root
}


/////////////////////////////////////////////////

export default renderꓽcontrolbar
