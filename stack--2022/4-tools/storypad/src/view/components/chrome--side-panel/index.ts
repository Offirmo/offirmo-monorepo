/* PROMPT
 */

import assert from 'tiny-invariant'
import { Immutable, Basename } from '@offirmo-private/ts-types'

import { LIB, MAIN_IFRAME_QUERYPARAMS } from '../../../consts'
import { StoryEntry, isꓽStoryEntry, StoryFolder, isꓽStoryFolder, State, StoryId } from '../../../state/types'
import { getꓽcurrent_urlⵧcleaned } from '../../../services/env'

/////////////////////////////////////////////////


function renderⵧside_panel(state: Immutable<State>) {
	console.group(`[${LIB}] renderⵧside_panel()`)
	// @ts-expect-error bundler stuff
	import('./index.css')

	_append_folder(state, document.body, state.tree, [])
}

function _append_folder(state: Immutable<State>, parent_elt: HTMLElement, tree: Immutable<State>['tree'], path: Basename[]) {
	console.group('_append_folder()', path)
	let details_elt = document.createElement('details')
	const payload: StoryFolder = (tree.payload as any) ?? {
		uid: path.join('/'),
		is_expanded: false,
	}
	details_elt.open = payload.is_expanded
	details_elt.innerHTML = `
	<summary>${path.slice(-1)[0] || state.config.root_title}</summary>
	`
	Object.keys(tree.childrenⵧfolders).forEach(key => {
		_append_folder(state, details_elt, tree.childrenⵧfolders[key]!, [...path, key])
	})

	let ol_elt = document.createElement('ol')
	details_elt.appendChild(ol_elt)
	Object.keys(tree.childrenⵧfiles).forEach(key => {
		_append_leaf(state, ol_elt, tree.childrenⵧfiles[key]!.payload, [...path, key])
	})

	parent_elt.appendChild(details_elt)
	//details_elt.classList.add('gridⵧsquare')
	console.groupEnd()
}


function _append_leaf(state: Immutable<State>, parent_elt: HTMLElement, story: Immutable<StoryEntry>, path: Basename[]) {
	let li_elt = document.createElement('li')
	const key = path.slice(-1)[0]
	li_elt.innerHTML = `<a href="${getꓽmain_iframe_url(state, story.uid)}">${key}</a>`
	parent_elt.appendChild(li_elt)
}

function getꓽmain_iframe_url(state: Immutable<State>, story_uid: StoryId): string {
	const sp = new URLSearchParams({
		[MAIN_IFRAME_QUERYPARAMS.story_uid]: story_uid,
	})

	return getꓽcurrent_urlⵧcleaned() + '?' + sp.toString()
}

/////////////////////////////////////////////////

export {
	renderⵧside_panel
}
