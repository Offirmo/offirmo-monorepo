import assert from 'tiny-invariant'
import { Url‿str } from '@offirmo-private/ts-types'

import { FolderUId, StoryUId } from '../../../flux/types.ts'
import { getꓽstory_frame_url, getꓽstoryⵧcurrent } from '../../../flux/selectors'
import { requestꓽstory } from '../../../flux/dispatcher.ts'

import renderⵧside_panel from './side-panel'

/////////////////////////////////////////////////

async function renderꓽmanager(container: HTMLElement = document.body) {

	// we're the top frame
	// render the full UI:
	// 1. side panel
	renderⵧside_panel()
	// 2. story screen
	const { iframe_elt } = _renderⵧstory_area()

	// navigation
	document.body.addEventListener('click', function(e) {
		const target = (e as any).target

		console.log(`Click!`)

		const href: Url‿str = target?.href
		if (href) {
			e.preventDefault()

			console.log('———————————— NAVIGATION ————————————')
			const story_uid: StoryUId = target.getAttribute('id')
			console.log({target, story_uid, href})

			const previous_story‿uid = getꓽstoryⵧcurrent()!.uid!

			requestꓽstory(story_uid)
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


function _renderⵧstory_area() {
	// TODO top nav
	return _renderⵧstory_frame()
}

function _renderⵧstory_frame() {
	const iframe_elt = document.createElement('iframe')
	const current_story = getꓽstoryⵧcurrent()
	iframe_elt.src = getꓽstory_frame_url(current_story?.uid)
	iframe_elt.id = 'storypad⋄iframe'
	//console.log({iframe_elt})
	document.body.appendChild(iframe_elt)
	return { iframe_elt }
}


/////////////////////////////////////////////////

export default renderꓽmanager
