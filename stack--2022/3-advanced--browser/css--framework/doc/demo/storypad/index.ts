import { Immutable } from '@offirmo-private/ts-types'
import assert from 'tiny-invariant'
import nearest_pkg from '~/package.json'

////////////////////////////////////////////////////////////////////////////////////

type Path = string

interface Story {
	fn: Function
	defaults: any
}
interface StoryTree {
	[key: string]: Story | StoryTree
}

interface Config {

}

interface State {
	config: Config
	story_tree: StoryTree

	current_story‿path: Path | undefined
}

export function is_story_tree(s: any): s is StoryTree {
	return typeof s?.fn !== 'function'
}
export function is_story(s: any): s is Story {
	return typeof s?.fn === 'function'
}

////////////////////////////////////////////////////////////////////////////////////

export function start_storypad(stories_glob: Immutable<any>, config: Immutable<Config> = {}) {
	console.group(`Starting storypad…`)
	console.log('config =', config)
	console.log(nearest_pkg)
	//console.log('glob =', stories_glob)

	let state = init()
	state = apply_config(state, config)
	state = add_stories(state, stories_glob)

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

function get_story_url(state: Immutable<State>, path: Path = state.current_story‿path): string {
	const sp = new URLSearchParams({
		storypath: path
	})

	return get_current_url__cleaned() + '?' + sp.toString()
}

function get_story(state: Immutable<State>, path: Path): Immutable<Story> {
	const path_parts = path.split('Ⳇ')
	let leaf: Story | StoryTree = state.story_tree
	path_parts.forEach(segment => {
		leaf = leaf[segment]
		assert(!!leaf)
	})
	assert(is_story(leaf))
	return leaf
}

////////////////////////////////////////////////////////////////////////////////////

function init(): Immutable<State> {
	return {
		config: {},
		story_tree: {},
		current_story‿path: undefined,
	}
}

function apply_config(state: Immutable<State>, config: Config): Immutable<State> {
	return {
		...state,
		config,
	}
}

function add_stories(state: Immutable<State>, stories_glob: any, parent_path: string[] = []): Immutable<State> {
	//console.trace(`add_stories()`)
	Object.keys(stories_glob).forEach(key => {
		const blob = stories_glob[key]
		if (blob.__esModule === true) {
			state = _add_story_file(state, blob, parent_path)
			return
		}

		if (!blob) {
			throw new Error(`strange key???`)
		}

		state = add_stories(state, blob, [ ...parent_path, key ])
	})

	return state
}
function _add_story_file(state: Immutable<State>, story_module: any, parent_path: string[] = []): Immutable<State> {
	//console.log({ story_module, parent_path })

	let current_story‿path = state.current_story‿path
	let story_tree: StoryTree = { ... state.story_tree }
	let leaf: StoryTree = story_tree
	parent_path.forEach(path => {
		if (is_story(story_tree[path])) {
			throw new Error(`Tree error!`)
		}

		story_tree[path] = { ...story_tree[path] }

		leaf = story_tree[path] as StoryTree
	})

	Object.keys(story_module).forEach(story_key => {
		const id = [...parent_path, story_key].join('Ⳇ')

		if (story_key === 'default') {
			assert(typeof story_key['default'] !== 'function')
			return
		}

		console.log(`Found story: "${id}"`)
		const story: Story = {
			fn: story_module[story_key],
			defaults: story_module['default'],
		}
		assert(is_story(story), `${id} is not a story??`)
		assert(!leaf[story_key], `conflict on "${id}"???`)
		leaf[story_key] = story
		current_story‿path ||= id
	})

	return {
		...state,
		story_tree,
		current_story‿path,
	}
}

////////////////////////////////////////////////////////////////////////////////////

function render(state: Immutable<State>) {
	console.log('render', {state})

	if ( window.location !== window.parent.location ) {
		_render_as_iframe(state)
		return
	}

	import('@offirmo-private/css--sane-defaults')
	import('./index.css')

	const iframe_elt = document.createElement('iframe')
	iframe_elt.src = get_story_url(state)
	_append_folder(state, document.body, state.story_tree, [])

	console.log({iframe_elt})
	iframe_elt.id = 'storypad⋄iframe'
	document.body.appendChild(iframe_elt)

	document.body.addEventListener('click', function(e) {
		if (e.target?.href) {
			e.preventDefault()
			iframe_elt.src = e.target.href
		}
	})
}
function _render_as_iframe(state) {
	const sp = (new URL(window.location.href)).searchParams

	setTimeout(() => {
		const storypath = sp.get('storypath')
		document.body.innerText = `Loading story "${storypath}"…`

		const story = get_story(state, storypath)
		try {
			const content = story.fn()
			console.log(story)
			const decorators = [
				...story.decorators,
				...story.defaults.decorators,
			]
			document.body.innerHTML = content
		}
		catch (err) {
			console.error(err)
			document.body.innerText = `Error loading story "${storypath}"! ${String(err)}`
		}
	}, 1)
}


function _append_folder(state, parent_elt, tree, path) {
	console.log({ parent_elt, tree, path, })
	let details_elt = document.createElement('details')
	details_elt.open = true
	details_elt.innerHTML = `
	<summary><code>${path.slice(-1)[0] || nearest_pkg?.name || 'Stories'}</code></summary>
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
		if (is_story(tree[key]))
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
	li_elt.innerHTML = `<a href="${get_story_url(state, path.join('Ⳇ'))}">${key}</a>`
	parent_elt.appendChild(li_elt)
}
/*
<style>
@import "npm:@offirmo-private/css--sane-defaults";
</style>*/
