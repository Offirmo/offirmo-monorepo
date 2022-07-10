import assert from 'tiny-invariant'
import { Immutable } from '../deps/immutable'

import { LS_KEYS, MAIN_IFRAME_QUERYPARAMS } from '../consts'
import { get_current_url__cleaned } from '../services/env'

import {
	State,
	StoryId,
	is_story_and_notes,
	is_story_tree,
} from '../state/types'
import {
	get_story_by_id
} from '../state/selectors'





function get_main_iframe_url(state: Immutable<State>, explicit_id: StoryId = state.current_story‿id): string {
	const sp = new URLSearchParams({
		[MAIN_IFRAME_QUERYPARAMS.story_id]: explicit_id,
	})

	return get_current_url__cleaned() + '?' + sp.toString()
}


export function render(state: Immutable<State>) {
	console.log('render', {state})

	if ( window.location !== window.parent.location ) {
		_render_as_iframe(state)
		return
	}

	// TODO review
	import('./index.css')

	const iframe_elt = document.createElement('iframe')
	iframe_elt.src = get_main_iframe_url(state)
	_append_folder(state, document.body, state.story_tree, [])

	console.log({iframe_elt})
	iframe_elt.id = 'storypad⋄iframe'
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
function _render_as_iframe(state) {
	const sp = (new URL(window.location.href)).searchParams

	setTimeout(() => {
		const story_id = sp.get(MAIN_IFRAME_QUERYPARAMS.story_id)
		if (!story_id || story_id === 'undefined') {
			document.body.innerText = `(no stories found)`
			return
		}

		document.body.innerText = `Loading story "${story_id}"…`

		const story = get_story_by_id(state, story_id)
		try {
			let content = story.fn()
			const decorators = story.fn.decorators === null
				? [] // allow reseting decorators
				:[
					...state.config.decorators,
					...(story.defaults?.decorators || []),
					...(story.fn.decorators || []),
				].reverse()
			decorators.forEach(decorator => {
				content = decorator(content)
			})
			document.body.innerHTML = content
		}
		catch (err) {
			console.error(err)
			document.body.innerText = `Error loading story "${story_id}"! ${String(err)}`
		}
	}, 1)
}


function _append_folder(state, parent_elt, tree, path) {
	//console.log('_append_folder()', { parent_elt, tree, path, })
	let details_elt = document.createElement('details')
	details_elt.open = true
	details_elt.innerHTML = `
	<summary>${path.slice(-1)[0] || state.config.root_title}</summary>
	`
	Object.keys(tree).forEach(key => {
		if (is_story_tree(tree[key]))
			_append_folder(state, details_elt, tree[key], [...path, key])
	})
	let ol_elt = document.createElement('ol')
	details_elt.appendChild(ol_elt)
	Object.keys(tree).forEach(key => {
		if (is_story_tree(tree[key]))
			return
		if (is_story_and_notes(tree[key]))
			_append_leaf(state, ol_elt, tree[key], [...path, key])
		else {
			console.error(tree[key])
			throw new Error(`Unrecognized tree part!`)
		}
	})

	parent_elt.appendChild(details_elt)
	//details_elt.classList.add('gridⵧsquare')

}
function _append_leaf(state, parent_elt, story, path) {
	let li_elt = document.createElement('li')
	const key = path.slice(-1)[0]
	li_elt.innerHTML = `<a href="${get_main_iframe_url(state, story.id)}">${key}</a>`
	parent_elt.appendChild(li_elt)
}
