import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { MAIN_IFRAME_QUERYPARAMS } from '../../consts'
import { isꓽStory‿v3, isꓽStory‿v2 } from '../../types'
import { State, getꓽstoryⵧcurrent‿uid, getꓽstoryⵧby_uid } from '../../state'

/////////////////////////////////////////////////

async function renderⵧstory(state: Immutable<State>) {
	document.body.innerText = `Loading story…`

	try {
		await _renderⵧstory(state)
	} catch (err) {
		console.error(err)
		document.body.innerText = `Error loading story! (see console)`
	}
}

async function _renderⵧstory(state: Immutable<State>) {
	const urlSearchParams = (new URL(window.location.href)).searchParams

	const story_uid = getꓽstoryⵧcurrent‿uid(state) //urlSearchParams.get(MAIN_IFRAME_QUERYPARAMS.story_uid)
	if (!story_uid || story_uid === 'undefined' || story_uid === '[NO-KNOWN-STORIES]') {
		document.body.innerText = `(no stories found)`
		return
	}

	document.body.innerText = `Loading story "${story_uid}"…`

	const storyEntry = getꓽstoryⵧby_uid(state, story_uid)

	switch(true) {
		case isꓽStory‿v3(storyEntry.story): {
			const render_v3 = (await import('./v3')).default
			render_v3(storyEntry)
			break
		}

		/*
		case isꓽStory‿v2(storyEntry): {
			content = storyEntry()
			break
		}*/

		default:
			throw new Error(`Unsupported story format! (yet!)`)
	}
}

/////////////////////////////////////////////////

export {
	renderⵧstory,
}
