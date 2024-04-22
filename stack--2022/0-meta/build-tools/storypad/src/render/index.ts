import { Immutable } from '../deps/@offirmo-private/ts-types/immutable'

import { State, StoryId } from '../state/types'

import { renderⵧstory } from './render--story'
import { renderⵧside_panel } from './render--side-panel'
import { LS_KEYS, MAIN_IFRAME_QUERYPARAMS } from '../consts'
import { getꓽcurrent_urlⵧcleaned } from '../services/env'
import { getꓽstoryⵧcurrent } from '../state/selectors'


function getꓽmain_iframe_url(state: Immutable<State>, explicit_id: StoryId = getꓽstoryⵧcurrent(state)): string {
	const sp = new URLSearchParams({
		[MAIN_IFRAME_QUERYPARAMS.story_id]: explicit_id,
	})

	return getꓽcurrent_urlⵧcleaned() + '?' + sp.toString()
}

type Url‿str = string

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

			try {
				localStorage.setItem(LS_KEYS.current_story_id, (new URL(href)).searchParams.get(MAIN_IFRAME_QUERYPARAMS.story_id))
			}
			catch { /* ignore */}
		}
	})
}

export {
	render,
}
