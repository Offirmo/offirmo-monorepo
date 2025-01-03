// https://storybook.js.org/docs/configure/user-interface/sidebar-and-urls

import assert from 'tiny-invariant'
import { Url‿str } from '@offirmo-private/ts-types'

import { FolderUId, StoryUId } from '../../../l1-flux/l1-state/types.ts'

import renderⵧside_panel from './sidebar'
import {ObservableState} from '../../../l1-flux/l2-observable'

/////////////////////////////////////////////////

async function renderꓽmanager(state: ObservableState, container: HTMLElement = document.body) {

	// we're the top frame
	// render the full UI:
	// 1. side panel
	renderⵧside_panel(state, container)
	// 2. story screen
	const { iframe_elt } = _renderⵧstory_area(state, container)

	// navigation
	container.addEventListener('click', function(e) {
		const target = (e as any).target

		console.log(`Click!`)

		const href: Url‿str = target?.href
		if (href) {
			e.preventDefault()

			console.log('———————————— NAVIGATION ————————————')
			const story_uid: StoryUId = target.getAttribute('id')
			console.log({target, story_uid, href})

			const previous_story‿uid = state.getꓽstoryⵧcurrent()!.uid!

			state.requestꓽstory(story_uid)
			iframe_elt.src = href
			target.classList.add('current')
			return
		}

		const folder_uid: FolderUId = target?.closest('details')?.dataset?.folderUid
		if (folder_uid) {
			console.log('———————————— TREE ————————————')
			console.log('TODO!')
			return
		}

		console.log('———————————— UNKNOWN ————————————')
	})
}


function _renderⵧstory_area(state: ObservableState, container: HTMLElement) {
	// TODO top nav
	return _renderⵧstory_frame(state, container)
}

function _renderⵧstory_frame(state: ObservableState, container: HTMLElement) {
	const iframe_elt = document.createElement('iframe')
	const current_story = state.getꓽstoryⵧcurrent()
	iframe_elt.src = state.getꓽstory_frame_url(current_story?.uid)
	iframe_elt.id = 'storypad⋄iframe'
	console.log('adding the story iframe…', {iframe_elt})
	container.appendChild(iframe_elt)
	return { iframe_elt }
}


/////////////////////////////////////////////////

export default renderꓽmanager
