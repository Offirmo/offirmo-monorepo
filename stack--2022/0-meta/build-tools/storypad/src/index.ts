import assert from 'tiny-invariant'

import { Immutable } from './immutable'


////////////////////////////////////////////////////////////////////////////////////

type Path = string
type StoryId = string
type Decorator = Function // TODO

interface StoryAndNotes {
	id: StoryId
	defaults: any

	fn: Function
}
interface StoryTree {
	[key: string]: StoryAndNotes | StoryTree
}

interface Config {
	root_title: string
	decorators: Decorator[]
}

interface State {
	config: Config

	stories_by_id: {
		[k: StoryId]: StoryAndNotes,
	}

	story_tree: StoryTree

	current_story‿id: StoryId | undefined
}

export function is_story_tree(s: any): s is StoryTree {
	return typeof s?.fn !== 'function'
}
export function is_story_and_notes(s: any): s is StoryAndNotes {
	return typeof s?.fn === 'function'
}

////////////////////////////////////////////////////////////////////////////////////

const SEP_FOR_IDS = ':'
const SEP = 'Ⳇ'
const MAIN_IFRAME_QUERYPARAMS = {
	story_id: 'story_id',
}
const LS_KEYS = {
	current_story_id: 'current_story_id',
}

////////////////////////////////////////////////////////////////////////////////////

export function start_storypad(stories_glob: Immutable<any>, config: Immutable<Config> = {}) {
	console.group(`Starting storypad…`)
	console.log('config =', config)
	console.log('glob =', stories_glob)

	let state = init()
	state = add_config(state, config)
	state = register_stories_from_glob(state, stories_glob)

	console.groupEnd()

	setTimeout(() => {
		render(state)
	}, 1)
}
export default start_storypad

////////////////////////////////////////////////////////////////////////////////////

function get_current_url__cleaned(): string {
	const location = document.location
	return location.origin + location.pathname
}

function get_main_iframe_url(state: Immutable<State>, explicit_id: StoryId = state.current_story‿id): string {
	const sp = new URLSearchParams({
		[MAIN_IFRAME_QUERYPARAMS.story_id]: explicit_id,
	})

	return get_current_url__cleaned() + '?' + sp.toString()
}

function get_story_by_id(state: Immutable<State>, id: StoryId): Immutable<StoryAndNotes> {
	const result = state.stories_by_id[id]
	assert(is_story_and_notes(result))
	return result
}

////////////////////////////////////////////////////////////////////////////////////

function init(): Immutable<State> {
	return {
		config: {
			root_title: 'Stories',
			decorators: [],
		},
		stories_by_id: {},
		story_tree: {},
		current_story‿id: (() => {
			try {
				return localStorage.getItem(LS_KEYS.current_story_id)
			}
			catch { /* ignore */}
			return undefined
		})(),
	}
}

function add_config(state: Immutable<State>, config: Config): Immutable<State> {
	return {
		...state,
		config: {
			...state.config,
			...config,
		},
	}
}

function register_story(state: Immutable<State>, story: StoryAndNotes): Immutable<State> {
	return {
		...state,
		stories_by_id: {
			...state.stories_by_id,
			[story.id]: story,
		},
		current_story‿id: state.current_story‿id || story.id,
	}
}

function register_stories_from_glob(state: Immutable<State>, stories_glob: any): Immutable<State> {
	//console.trace(`register_stories_from_glob()`)

	state = _register_stories_from_glob(state, stories_glob, [])

	// build the story_tree
	// TODO one day improve
	let story_tree = {}
	Object.keys(state.stories_by_id).forEach(story_id => {
		const parts = story_id.split(SEP_FOR_IDS)
		let leaf = story_tree
		parts.slice(0, -1).forEach(part => {
			leaf[part] ||= {}
			leaf = leaf[part]
		})
		leaf[parts.slice(-1)[0]] = state.stories_by_id[story_id]
	})

	return {
		...state,
		story_tree,
	}
}
function _register_stories_from_glob(state: Immutable<State>, stories_glob: any, parent_path: string[] = []): Immutable<State> {
	//console.trace(`_register_stories_from_glob()`)
	Object.keys(stories_glob).forEach(key => {
		const blob = stories_glob[key]
		if (!blob) {
			throw new Error(`strange key???`)
		}

		if (blob.__esModule === true) {
			state = _register_stories_from_module(state, blob, [ ...parent_path, key ])
			return
		}

		state = _register_stories_from_glob(state, blob, [ ...parent_path, key ])
	})

	return state
}
function _register_stories_from_module(state: Immutable<State>, story_module: any, parent_path: string[] = []): Immutable<State> {
	//console.log({ story_module, parent_path })

	Object.keys(story_module).forEach(story_key => {
		const id = [...parent_path, story_key].join(SEP_FOR_IDS)
		assert(![...parent_path, story_key].some(p => p.includes(SEP)), `Story "${id}" contains a forbidden character!`) // TODO one day improve

		if (story_key === 'default') {
			assert(typeof story_key['default'] !== 'function')
			return
		}

		//console.log(`Found story: "${id}"`)
		const story: StoryAndNotes = {
			id,
			defaults: story_module['default'],
			fn: story_module[story_key],
		}
		assert(is_story_and_notes(story), `${id} is not a story??`)
		state = register_story(state, story)
	})

	return state
}

////////////////////////////////////////////////////////////////////////////////////

function render(state: Immutable<State>) {
	console.log('render', {state})

	if ( window.location !== window.parent.location ) {
		_render_as_iframe(state)
		return
	}

	// TODO review
	import('./index.css')

	const iframe_elt = document.createElement('iframe')
	iframe_elt.src = get_main_iframe_url(state)
	_append_folder(state, document.body, state.story_tree, [])

	console.log({iframe_elt})
	iframe_elt.id = 'storypad⋄iframe'
	document.body.appendChild(iframe_elt)

	document.body.addEventListener('click', function(e) {
		if (e.target?.href) {
			e.preventDefault()

			iframe_elt.src = e.target.href

			try {
				localStorage.setItem(LS_KEYS.current_story_id, (new URL(e.target.href)).searchParams.get(MAIN_IFRAME_QUERYPARAMS.story_id))
			}
			catch { /* ignore */}
		}
	})
}
function _render_as_iframe(state) {
	const sp = (new URL(window.location.href)).searchParams

	setTimeout(() => {
		const story_id = sp.get(MAIN_IFRAME_QUERYPARAMS.story_id)
		if (!story_id || story_id === 'undefined') {
			document.body.innerText = `(no stories found)`
			return
		}

		document.body.innerText = `Loading story "${story_id}"…`

		const story = get_story_by_id(state, story_id)
		try {
			let content = story.fn()
			const decorators = [
				...state.config.decorators,
				...(story.defaults?.decorators || []),
				...(story.fn.decorators || []),
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


function _append_folder(state, parent_elt, tree, path) {
	//console.log('_append_folder()', { parent_elt, tree, path, })
	let details_elt = document.createElement('details')
	details_elt.open = true
	details_elt.innerHTML = `
	<summary>${path.slice(-1)[0] || state.config.root_title}</summary>
	`
	Object.keys(tree).forEach(key => {
		if (is_story_tree(tree[key]))
			_append_folder(state, details_elt, tree[key], [...path, key])
	})
	let ol_elt = document.createElement('ol')
	details_elt.appendChild(ol_elt)
	Object.keys(tree).forEach(key => {
		if (is_story_tree(tree[key]))
			return
		if (is_story_and_notes(tree[key]))
			_append_leaf(state, ol_elt, tree[key], [...path, key])
		else {
			console.error(tree[key])
			throw new Error(`Unrecognized tree part!`)
		}
	})

	parent_elt.appendChild(details_elt)
	//details_elt.classList.add('gridⵧsquare')

}
function _append_leaf(state, parent_elt, story, path) {
	let li_elt = document.createElement('li')
	const key = path.slice(-1)[0]
	li_elt.innerHTML = `<a href="${get_main_iframe_url(state, story.id}">${key}</a>`
	parent_elt.appendChild(li_elt)
}
