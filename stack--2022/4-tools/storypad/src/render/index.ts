import { Immutable, Url‿str } from '@offirmo-private/ts-types'

import { State, StoryId } from '../state/types'

import { renderⵧstory } from './story/index.js'
import { renderⵧside_panel } from './chrome--side-panel/index.js'
import { LS_KEYS, MAIN_IFRAME_QUERYPARAMS } from '../consts'
import { getꓽcurrent_urlⵧcleaned } from '../services/env'
import { getꓽstoryⵧcurrent‿uid } from '../state/selectors'


function getꓽmain_iframe_url(state: Immutable<State>, explicit_uid: StoryId = getꓽstoryⵧcurrent‿uid(state)): string {
	const sp = new URLSearchParams({
		[MAIN_IFRAME_QUERYPARAMS.story_uid]: explicit_uid,
	})

	return getꓽcurrent_urlⵧcleaned() + '?' + sp.toString()
}

function render(state: Immutable<State>) {
	console.log('render()', { state })

	if ( window.location !== window.parent.location ) {
		// we're in an iframe -> it's the story
		return renderⵧstory(state)
	}

	// TODO better logic

	// render the full UI: controls + story
	renderⵧside_panel(state)

	// now add an iframe that will contain the story
	const iframe_elt = document.createElement('iframe')
	iframe_elt.src = getꓽmain_iframe_url(state)
	iframe_elt.id = 'storypad⋄iframe'
	console.log({iframe_elt})

	document.body.appendChild(iframe_elt)

	document.body.addEventListener('click', function(e) {
		const href: Url‿str = (e as any).target?.href // TODO type properly
		if (href) {
			e.preventDefault()

			iframe_elt.src = href

			/*try {
				localStorage.setItem(LS_KEYS.current_story_uid, (new URL(href)).searchParams.get(MAIN_IFRAME_QUERYPARAMS.story_uid))
			}
			catch {
			// ignore
			}*/
		}
	})
}

export {
	render,
}
