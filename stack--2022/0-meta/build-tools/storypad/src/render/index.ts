import { Immutable } from '../deps/immutable'

import { State, StoryId } from '../state/types'

import { renderⵧstory } from './render--story'
import { renderⵧside_panel } from './render--side-panel'
import { LS_KEYS, MAIN_IFRAME_QUERYPARAMS } from '../consts'
import { get_current_url__cleaned } from '../services/env'


function get_main_iframe_url(state: Immutable<State>, explicit_id: StoryId = state.current_story‿id): string {
	const sp = new URLSearchParams({
		[MAIN_IFRAME_QUERYPARAMS.story_id]: explicit_id,
	})

	return get_current_url__cleaned() + '?' + sp.toString()
}


function render(state: Immutable<State>) {
	console.log('render()', { state })

	if ( window.location !== window.parent.location ) {
		// we're in an iframe -> it's the story
		renderⵧstory(state)
		return
	}

	// TODO better logic

	// render the full UI: controls + story
	renderⵧside_panel(state)

	// now add an iframe that will contain the story
	const iframe_elt = document.createElement('iframe')
	iframe_elt.src = get_main_iframe_url(state)
	iframe_elt.id = 'storypad⋄iframe'
	console.log({iframe_elt})

	document.body.appendChild(iframe_elt)


	document.body.addEventListener('click', function(e) {
		if (e.target?.href) {
			e.preventDefault()

			iframe_elt.src = e.target.href

			try {
				localStorage.setItem(LS_KEYS.current_story_id, (new URL(e.target.href)).searchParams.get(MAIN_IFRAME_QUERYPARAMS.story_id))
			}
			catch { /* ignore */}
		}
	})
}

export {
	render,
}
