import { Immutable, Url‿str } from '@offirmo-private/ts-types'

import { State, StoryId } from '../state/types'

import { renderⵧstory } from './story/index.js'
import { renderⵧside_panel } from './chrome--side-panel/index.js'
import { LIB, LS_KEYS, MAIN_IFRAME_QUERYPARAMS } from '../consts'
import { getꓽcurrent_urlⵧcleaned } from '../services/env'
import { getꓽstoryⵧcurrent‿uid } from '../state/selectors'


function getꓽmain_iframe_url(state: Immutable<State>, explicit_uid: StoryId = getꓽstoryⵧcurrent‿uid(state)): string {
	const sp = new URLSearchParams({
		[MAIN_IFRAME_QUERYPARAMS.story_uid]: explicit_uid,
	})

	return getꓽcurrent_urlⵧcleaned() + '?' + sp.toString()
}

async function render(state: Immutable<State>): Promise<void> {
	const is_iframe = ( window.location !== window.parent.location )

	console.group(`[${LIB}] render() [${is_iframe ? 'SUB frame' : 'TOP frame'}]`)
	console.log('state=', state)

	// TODO allow QParams to render only the story, add borders, etc.

	if (is_iframe) {
		// we're in an iframe -> we're the story
		return renderⵧstory(state)
	}

	// we're the top frame
	// render the full UI: controls + story
	renderⵧside_panel(state)

	// now add an iframe loading the story
	const iframe_elt = document.createElement('iframe')
	iframe_elt.src = getꓽmain_iframe_url(state)
	iframe_elt.id = 'storypad⋄iframe'
	console.log({iframe_elt})
	document.body.appendChild(iframe_elt)

	// navigation
	document.body.addEventListener('click', function(e) {
		const href: Url‿str = (e as any).target?.href // TODO type properly
		if (href) {
			e.preventDefault()

			console.log('———————————— NAVIGATION ————————————')

			iframe_elt.src = href

			/*try {
				localStorage.setItem(LS_KEYS.current_story_uid, (new URL(href)).searchParams.get(MAIN_IFRAME_QUERYPARAMS.story_uid))
			}
			catch {
			// ignore
			}*/
		}
	})

	console.groupEnd()
}

export {
	render,
}
