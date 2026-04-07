/* PROMPT
 */

import assert from '@monorepo-private/assert/v1'
import type { Immutable, Basename } from '@monorepo-private/ts--types'

import { LIB, SEPⵧSEGMENTS } from '../../../../consts'
import type { StoryEntry, StoryFolder, StoryTree } from '../../../../l1-flux/l1-state/types.ts'
import type { ObservableState } from '../../../../l1-flux/l2-observable'

/////////////////////////////////////////////////

function renderⵧsidebar(state: ObservableState): HTMLElement {
	console.group(`[${LIB}] renderⵧsidebar()`)

	const root = document.createElement('div')
	root.classList.add('storypad⋄ui-element', 'storypad⋄sidebar')

	import('./index.css')
	_append_folder(state, state.getꓽtree_root(), [], root)

	console.groupEnd()

	return root
}

function _append_folder(state: ObservableState, treenode: Immutable<StoryTree>, path: Basename[], parent_elt: HTMLElement) {
	console.group('_append_folder()', path)
	let details_elt = document.createElement('details')

	// TODO common code!
	const payload: StoryFolder = (treenode.payload as any) ?? {
		uid: path.join(SEPⵧSEGMENTS),
		isꓽexpandedⵧinitially: true,
	}
	payload.isꓽexpandedⵧinitially = state.isꓽexpandedⵧinitially(payload.uid)

	const config = state.getꓽconfig()

	details_elt.dataset['folderUid'] = payload.uid
	details_elt.open = payload.isꓽexpandedⵧinitially
	details_elt.innerHTML = `
	<summary>${path.at(-1) || config.root_title}</summary>
	`
	Object.keys(treenode.childrenⵧfolders).forEach(key => {
		_append_folder(state, treenode.childrenⵧfolders[key]!, [...path, key], details_elt)
	})

	if (Object.keys(treenode.childrenⵧfiles).length > 0) { // avoid adding empty <ol/>
		let ol_elt = document.createElement('ol')
		details_elt.appendChild(ol_elt)
		Object.keys(treenode.childrenⵧfiles).forEach(key => {
			_append_leaf(state, treenode.childrenⵧfiles[key]!.payload, [...path, key], ol_elt)
		})
	}

	parent_elt.appendChild(details_elt)
	//details_elt.classList.add('gridⵧsquare')
	console.groupEnd()
}

function _append_leaf(state: ObservableState, story: Immutable<StoryEntry>, path: Basename[], parent_elt: HTMLElement) {
	let li_elt = document.createElement('li')
	const key = path.at(-1)
	li_elt.dataset['storyUid'] = story.uid
	li_elt.innerHTML = `<a id="${story.uid}" href="${state.getꓽmain_frame_url(story.uid)}">${key}</a>`
	parent_elt.appendChild(li_elt)
	const current_story‿uid = state.getꓽstoryⵧcurrent()?.uid
	if (story.uid === current_story‿uid) {
		setTimeout(() => {
			document.getElementById(story.uid)!.focus();
		})
	}
}

/////////////////////////////////////////////////

export default renderⵧsidebar
