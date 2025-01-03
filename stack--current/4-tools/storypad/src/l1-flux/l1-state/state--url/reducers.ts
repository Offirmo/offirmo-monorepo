/* PROMPT
 */

import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'

import { StoryUId } from '../types.ts'
import { getꓽmain_frame_url } from './selectors.ts'

/////////////////////////////////////////////////

function requestꓽstory(uid: StoryUId): void {
	const new_url = getꓽmain_frame_url(uid)

	console.log('about to history.pushState()', new_url)

	history.pushState({}, '', new_url)
}

/////////////////////////////////////////////////

export {
	requestꓽstory,
}
