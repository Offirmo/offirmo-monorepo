import assert from 'tiny-invariant'
import { Url‿str } from '@offirmo-private/ts-types'

import { getꓽstory_frame_url } from '../../../flux/selectors'
import { requestꓽstory } from '../../../flux/dispatcher.ts'

import renderⵧside_panel from './side-panel'
import renderꓽroot from '../../index.ts'

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
		const href: Url‿str = target?.href
		if (href) {
			e.preventDefault()

			console.log('———————————— NAVIGATION ————————————')
			const story_uid = target.getAttribute('id')
			console.log({target, story_uid, href})

			requestꓽstory(story_uid)
			iframe_elt.src = href
		}
	})
}


function _renderⵧstory_area() {
	// TODO top nav
	return _renderⵧstory_frame()
}

function _renderⵧstory_frame() {
	const iframe_elt = document.createElement('iframe')
	iframe_elt.src = getꓽstory_frame_url()
	iframe_elt.id = 'storypad⋄iframe'
	console.log({iframe_elt})
	document.body.appendChild(iframe_elt)
	return { iframe_elt }
}


/////////////////////////////////////////////////

export default renderꓽmanager
