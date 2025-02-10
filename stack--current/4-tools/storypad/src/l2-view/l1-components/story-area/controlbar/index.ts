// https://storybook.js.org/docs/configure/user-interface/sidebar-and-urls

import assert from 'tiny-invariant'
import {type Immutable} from '@offirmo-private/ts-types'

import {Url‿str} from '@offirmo-private/ts-types'

//import { FolderUId, StoryUId } from '../../../l1-flux/l1-state/types.ts'
import { getꓽlast_segment } from '../../../../l1-flux/l1-state/state--url/serialization'
import { ObservableState } from '../../../../l1-flux/l2-observable'

/////////////////////////////////////////////////

function renderꓽcontrolbar(state: ObservableState): HTMLElement {
	const root = document.createElement('div')
	root.classList.add('storypad⋄ui-element', 'storypad⋄controlbar')

	import('./index.css')

	const storyEntry = state.getꓽstoryⵧcurrent()
	if (!storyEntry) {
		root.innerText = `[No current story]`
	} else {
		console.log(`renderꓽcontrolbar()`, {
			storyEntry,
			href: state.getꓽstory_frame_url(storyEntry.uid),
		})

		const title = [
			(storyEntry.meta?.title ?? ''),
			storyEntry.story.name || getꓽlast_segment(storyEntry.uid),
		].filter(s => !!s).join('/')


		root.innerHTML = `
<strong>${title}</strong>
<small><code>${storyEntry.uid}</code></small>
<div class="storypad⋄controlbar__filler"></div>
<a target="_blank" href="${state.getꓽstory_frame_url(storyEntry.uid)}">↗</a>
		`
	}

	return root
}


/////////////////////////////////////////////////

export default renderꓽcontrolbar
