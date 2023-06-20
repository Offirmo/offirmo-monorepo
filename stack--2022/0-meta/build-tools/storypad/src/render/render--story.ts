import { MAIN_IFRAME_QUERYPARAMS } from '../consts'
import { getꓽstory_by_id } from '../state/selectors'

function renderⵧstory(state) {
	const sp = (new URL(window.location.href)).searchParams

	setTimeout(() => {
		const story_id = sp.get(MAIN_IFRAME_QUERYPARAMS.story_id)
		if (!story_id || story_id === 'undefined') {
			document.body.innerText = `(no stories found)`
			return
		}

		document.body.innerText = `Loading story "${story_id}"…`

		const story = getꓽstory_by_id(state, story_id)
		try {
			let content = story.story()
			const decorators = story.story.decorators === null
				? [] // allow resetting decorators
				:[
					...state.config.decorators,
					...(story.meta?.decorators || []),
					...(story.story.decorators || []),
				].reverse()
			decorators.forEach(decorator => {
				content = decorator(content)
			})
			document.body.innerHTML = content
		}
		catch (err) {
			console.error(err)
			document.body.innerText = `Error loading story "${story_id}"! ${String(err)}`
		}
	}, 1)
}

export {
	renderⵧstory,
}
