import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { MAIN_IFRAME_QUERYPARAMS } from '../../consts'
import { isꓽStory‿v3, isꓽStory‿v2 } from '../../types'
import { State, getꓽstoryⵧcurrent‿uid, getꓽstoryⵧby_id } from '../../state'

/////////////////////////////////////////////////

function renderⵧstory(state: Immutable<State>) {
	const urlSearchParams = (new URL(window.location.href)).searchParams

	setTimeout(() => {
		const story_id = getꓽstoryⵧcurrent‿uid(state) //urlSearchParams.get(MAIN_IFRAME_QUERYPARAMS.story_id)
		if (!story_id || story_id === 'undefined' || story_id === '[NO-KNOWN-STORIES]') {
			document.body.innerText = `(no stories found)`
			return
		}

		document.body.innerText = `Loading story "${story_id}"…`

		const story = getꓽstoryⵧby_id(state, story_id)
		try {
			let content = ''
			switch(true) {
				case isꓽStory‿v3(story): {
					throw new Error('v3 render Not implemented!')
					//content = story.render()
					break
				}
				case isꓽStory‿v2(story): {
					content = story()
					break
				}
				default:
					throw new Error(`Unsupported story format!`)
			}

			const decorators = story.story.decorators === null
				? [] // allow resetting decorators
				:[
					...state.config.decorators,
					...(story.meta?.decorators || []),
					...(story.story.decorators || []),
				].reverse()
			decorators.forEach(decorator => {
				throw new Error('Decorators not implemented!')
				//content = decorator(content)
			})
			document.body.innerHTML = content
		}
		catch (err) {
			console.error(err)
			document.body.innerText = `Error loading story "${story_id}"! ${String(err)}`
		}
	}, 1)
}

/////////////////////////////////////////////////

export {
	renderⵧstory,
}
