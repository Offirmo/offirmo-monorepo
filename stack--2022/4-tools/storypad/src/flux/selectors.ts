/* Flux dispatcher for our app
 */

import assert from 'tiny-invariant'
import { Immutable, Url‿str } from '@offirmo-private/ts-types'

import { Config } from '../types/config'
import { getꓽstate } from './dispatcher'
import { State, FolderUId, StoryEntry, StoryUId } from './state--in-mem'
import * as InMemStateSelectors from './state--in-mem/selectors'
import { getꓽmain_frame_url, getꓽstory_frame_url } from './state--url'

/////////////////////////////////////////////////

function getꓽtree_root(): Immutable<State['tree']> {
	return getꓽstate().tree
}

function getꓽconfig(): Immutable<Config> {
	return getꓽstate().config
}

function isꓽexpandedⵧinitially(uid: FolderUId): boolean {
	return true // TODO more complex one day
	/*const state = getꓽstate()
	const folder = state.folders_by_uid[uid]
	*/
}

function getꓽstoryⵧcurrent(): Immutable<StoryEntry> | undefined {
	const state = getꓽstate()
	return InMemStateSelectors.getꓽstoryⵧcurrent(state)
}

/////////////////////////////////////////////////

export {
	getꓽtree_root,
	getꓽconfig,

	isꓽexpandedⵧinitially,
	getꓽstoryⵧcurrent,
	getꓽmain_frame_url,
	getꓽstory_frame_url,
}
