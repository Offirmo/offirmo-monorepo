// https://storybook.js.org/docs/configure/user-interface/sidebar-and-urls

import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'

import { Url‿str } from '@offirmo-private/ts-types'

//import { FolderUId, StoryUId } from '../../../l1-flux/l1-state/types.ts'

import {ObservableState} from '../../../../l1-flux/l2-observable'
import {StoryEntry} from '../../../../l1-flux/l1-state/types.ts'

import renderꓽcontrolbar from './controlbar'
import renderꓽdrawer from './drawer'

/////////////////////////////////////////////////

const IFRAME_CLASS = 'storypad⋄story-iframe'

function renderꓽstoriesᝍarea(state: ObservableState): HTMLElement {
	const root = document.createElement('div')
	root.classList.add('storypad⋄stories-area')

	// @ts-expect-error bundler stuff
	import('./index.css')

	root.appendChild(renderꓽcontrolbar(state))

	root.appendChild(renderꓽstoriesᝍworkspace(state))

	root.appendChild(renderꓽdrawer(state))

	return root
}

function renderꓽstoriesᝍworkspace(state: ObservableState): HTMLElement {
	const root = document.createElement('div')
	root.classList.add('storypad⋄storiesᝍworkspace')

	const current_story = state.getꓽstoryⵧcurrent()

	const iframe_elt = _renderⵧstory_frame(state, current_story)
	root.appendChild(iframe_elt)

	return root
}

function _renderⵧstory_frame(state: ObservableState, storyEntry = state.getꓽstoryⵧcurrent()): HTMLIFrameElement {
	const iframe_elt = document.createElement('iframe')
	iframe_elt.src = state.getꓽstory_frame_url(storyEntry?.uid)
	iframe_elt.classList.add(IFRAME_CLASS)
	return iframe_elt
}

/////////////////////////////////////////////////

export {
	IFRAME_CLASS,
}
export default renderꓽstoriesᝍarea
