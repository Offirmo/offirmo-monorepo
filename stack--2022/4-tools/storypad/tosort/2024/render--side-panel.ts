import { Immutable } from '@offirmo-private/ts-types'
import { isꓽStoryEntry, isꓽStoryFolder, State, StoryId } from '../state/types'
import { MAIN_IFRAME_QUERYPARAMS } from '../consts'
import { getꓽcurrent_urlⵧcleaned } from '../services/env'
import { getꓽstoryⵧcurrent } from '../state/selectors'

function getꓽmain_iframe_url(state: Immutable<State>, explicit_id: StoryId = getꓽstoryⵧcurrent(state)): string {
	const sp = new URLSearchParams({
		[MAIN_IFRAME_QUERYPARAMS.story_id]: explicit_id,
	})

	return getꓽcurrent_urlⵧcleaned() + '?' + sp.toString()
}


function renderⵧside_panel(state: Immutable<State>) {
	import('./index.css')

	_append_folder(state, document.body, state.story_tree, [])
}



function _append_folder(state, parent_elt, tree, path) {
	//console.log('_append_folder()', { parent_elt, tree, path, })
	let details_elt = document.createElement('details')
	details_elt.open = tree.is_expanded
	details_elt.innerHTML = `
	<summary>${path.slice(-1)[0] || state.config.root_title}</summary>
	`
	Object.keys(tree.children).forEach(key => {
		if (isꓽStoryFolder(tree.children[key]))
			_append_folder(state, details_elt, tree.children[key], [...path, key])
	})
	let ol_elt = document.createElement('ol')
	details_elt.appendChild(ol_elt)
	Object.keys(tree.children).forEach(key => {
		if (isꓽStoryFolder(tree.children[key]))
			return
		if (isꓽStoryEntry(tree.children[key]))
			_append_leaf(state, ol_elt, tree.children[key], [...path, key])
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
	li_elt.innerHTML = `<a href="${getꓽmain_iframe_url(state, story.id)}">${key}</a>`
	parent_elt.appendChild(li_elt)
}

export {
	renderⵧside_panel
}
