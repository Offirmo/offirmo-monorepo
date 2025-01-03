// https://storybook.js.org/docs/configure/user-interface/sidebar-and-urls

import assert from 'tiny-invariant'
import { Url‿str } from '@offirmo-private/ts-types'

import { FolderUId, StoryUId } from '../../../l1-flux/l1-state/types.ts'
import { ObservableState } from '../../../l1-flux/l2-observable'

import renderⵧsidebar from './sidebar'
import renderⵧstory_area, { IFRAME_CLASS } from '../story-area'

/////////////////////////////////////////////////

function renderꓽmanager(state: ObservableState): HTMLElement {
	const root = document.createElement('div')
	root.classList.add('storypad⋄manager')

	// render the full UI:
	// @ts-expect-error bundler stuff
	import('@offirmo-private/css--framework/src/atomic/atomic--dimension.css')
	// @ts-expect-error bundler stuff
	import('./index.css')
	// 1. side panel
	root.appendChild(renderⵧsidebar(state))
	// 2. story screen
	let story_area_elt = renderⵧstory_area(state)
	root.appendChild(story_area_elt)

	// navigation
	root.addEventListener('click', function(e) {
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
			root.removeChild(story_area_elt)
			story_area_elt = renderⵧstory_area(state)
			root.appendChild(story_area_elt)
			/*
			const iframe_elts = stories_elt.getElementsByClassName(IFRAME_CLASS)
			Array.from(iframe_elts).forEach(iframe_elt => {
				(iframe_elt as HTMLIFrameElement).src = href
			})*/
			target.classList.add('current')
			return
		}

		const folder_uid: FolderUId = target?.closest('details')?.dataset?.folderUid
		if (folder_uid) {
			console.log('———————————— TREE ————————————')
			console.log('TODO auto fold/unfold!')
			return
		}

		console.log('———————————— UNKNOWN ————————————')
	})

	return root
}


/////////////////////////////////////////////////

export default renderꓽmanager
