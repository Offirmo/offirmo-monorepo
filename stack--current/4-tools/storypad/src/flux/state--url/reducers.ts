/* PROMPT
 */

import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { StoryUId } from '../types'
import { getꓽmain_frame_url } from './selectors'

/////////////////////////////////////////////////

function requestꓽstory(uid: StoryUId): void {
	const new_url = getꓽmain_frame_url(uid)

	history.pushState({}, '', new_url)
}

/////////////////////////////////////////////////

export {
	requestꓽstory,
}
