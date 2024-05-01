/* PROMPT
 */

import assert from 'tiny-invariant'
import { Immutable, Basename } from '@offirmo-private/ts-types'

import { LIB } from '../../../../consts'
import { StoryEntry, StoryFolder, State } from '../../../../flux/types'
import { getꓽtree_root, getꓽconfig, getꓽmain_frame_url, isꓽexpandedⵧinitially } from '../../../../flux/selectors'

/////////////////////////////////////////////////


function render() {
	console.group(`[${LIB}] renderⵧside_panel()`)

	// @ts-expect-error bundler stuff
	import('./index.css')

	_append_folder(document.body, getꓽtree_root(), [])

	console.groupEnd()
}

function _append_folder(parent_elt: HTMLElement, treenode: Immutable<State>['tree'], path: Basename[]) {
	console.group('_append_folder()', path)
	let details_elt = document.createElement('details')

	// TODO common code!
	const payload: StoryFolder = (treenode.payload as any) ?? {
		uid: path.join('/'),
		isꓽexpandedⵧinitially: true, // TODO
	}
	payload.isꓽexpandedⵧinitially = isꓽexpandedⵧinitially(payload.uid)

	const config = getꓽconfig()

	details_elt.dataset['folderUid'] = payload.uid
	details_elt.open = payload.isꓽexpandedⵧinitially
	details_elt.innerHTML = `
	<summary>${path.slice(-1)[0] || config.root_title}</summary>
	`
	Object.keys(treenode.childrenⵧfolders).forEach(key => {
		_append_folder(details_elt, treenode.childrenⵧfolders[key]!, [...path, key])
	})

	let ol_elt = document.createElement('ol')
	details_elt.appendChild(ol_elt)
	Object.keys(treenode.childrenⵧfiles).forEach(key => {
		_append_leaf( ol_elt, treenode.childrenⵧfiles[key]!.payload, [...path, key])
	})

	parent_elt.appendChild(details_elt)
	//details_elt.classList.add('gridⵧsquare')
	console.groupEnd()
}

function _append_leaf(parent_elt: HTMLElement, story: Immutable<StoryEntry>, path: Basename[]) {
	let li_elt = document.createElement('li')
	const key = path.slice(-1)[0]
	li_elt.dataset['storyUid'] = story.uid
	li_elt.innerHTML = `<a id="${story.uid}" href="${getꓽmain_frame_url(story.uid)}">${key}</a>`
	parent_elt.appendChild(li_elt)
}

/////////////////////////////////////////////////

export default render
