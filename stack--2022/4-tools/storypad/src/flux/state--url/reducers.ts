/* PROMPT
 */

import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { StoryUId } from '../types'
import { getꓽmain_frame_url } from './selectors'
import { QUERYPARAMS } from './consts.ts'

/////////////////////////////////////////////////

function init(): void {
	console.log('URL=', window.location.href)

	const url‿obj = (new URL(window.location.href))
	;[...url‿obj.searchParams.keys()]
		.filter(k => Object.values(QUERYPARAMS).includes(k))
		.forEach(k => {
			console.log(`URL param "${k}" = "${url‿obj.searchParams.get(k)}" found!`)
		})
}

function requestꓽstory(uid: StoryUId): void {
	const new_url = getꓽmain_frame_url(uid)

	history.pushState({}, '', new_url)
}

/////////////////////////////////////////////////

export {
	init,

	requestꓽstory,
}
