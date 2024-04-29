/* PROMPT
 */

import assert from 'tiny-invariant'
import { Url‿str } from '@offirmo-private/ts-types'

import { LIB } from '../consts'
import renderⵧstory from './components/story/index.js'
import renderⵧside_panel from './components/chrome--side-panel/index.js'

import { getꓽstory_frame_url } from '../flux/selectors'
import { activateꓽstory } from '../flux/dispatcher'

/////////////////////////////////////////////////

async function render(): Promise<void> {
	const is_iframe = ( window.location !== window.parent.location )

	console.group(`[${LIB}] render() [${is_iframe ? 'SUB frame' : 'TOP frame'}]`)

	// TODO allow QParams to render only the story, add borders, etc.

	if (is_iframe) {
		// we're in an iframe -> we're the story
		return renderⵧstory()
	}

	// we're the top frame
	// render the full UI:
	// 1. side panel
	renderⵧside_panel()
	// 2. story screen
	const { iframe_elt } = renderⵧstory_area()

	// navigation
	document.body.addEventListener('click', function(e) {
		const href: Url‿str = (e as any).target?.href // TODO type properly
		if (href) {
			e.preventDefault()

			console.log('———————————— NAVIGATION ————————————')

			activateꓽstory() // TODO!
			iframe_elt.src = href
		}
	})

	console.groupEnd()
}

function renderⵧstory_area() {
	// TODO top nav
	return renderⵧstory_frame()
}

function renderⵧstory_frame() {
	const iframe_elt = document.createElement('iframe')
	iframe_elt.src = getꓽstory_frame_url()
	iframe_elt.id = 'storypad⋄iframe'
	console.log({iframe_elt})
	document.body.appendChild(iframe_elt)
	return { iframe_elt }
}

/////////////////////////////////////////////////

export default render
