import assert from 'tiny-invariant'
import { Immutable } from '../deps/immutable'

import {
	Config
} from '../types'

import {
	StoryId,
	StoryAndNotes,
	State,
	is_story_and_notes,
} from './types'


const SEP = 'Ⳇ'
const SEP_FOR_IDS = ':'

////////////////////////////////////////////////////////////////////////////////////

export function init(): Immutable<State> {
	return {
		config: {
			root_title: 'Stories',
			decorators: [],
		},
		stories_by_id: {},
		story_tree: {
			is_open: true,
			leaves: {},
		},
		current_story‿id: undefined,
	}
}

export function set_current_story(state: Immutable<State>, story_id: StoryId): Immutable<State> {
	return {
		...state,
		current_story‿id: story_id,
	}
}


export function set_config(state: Immutable<State>, config: Immutable<Config>): Immutable<State> {
	return {
		...state,
		config: {
			...state.config,
			...config,
		},
	}
}

export function register_story(state: Immutable<State>, story: StoryAndNotes): Immutable<State> {
	return {
		...state,
		stories_by_id: {
			...state.stories_by_id,
			[story.id]: story,
		},
		current_story‿id: state.current_story‿id || story.id,
	}
}

export function register_stories_from_glob(state: Immutable<State>, stories_glob: any): Immutable<State> {
	//console.trace(`register_stories_from_glob()`)

	state = _register_stories_from_glob(state, stories_glob, [])

	// build the story_tree
	// TODO one day improve
	let story_tree = {
		is_open: true,
		leaves: {},
	}

	Object.keys(state.stories_by_id).forEach(story_id => {
		const parts = story_id.split(SEP_FOR_IDS)
		let leaf = story_tree
		parts.slice(0, -1).forEach(part => {
			leaf.leaves[part] ||= { is_open: false, leaves: {}}
			leaf = leaf.leaves[part]
		})
		leaf.leaves[parts.slice(-1)[0]] = state.stories_by_id[story_id]
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
			if (key === 'ts') {
				// skip meaningless path part
				state = _register_stories_from_module(state, blob, parent_path)
			}
			else
				state = _register_stories_from_module(state, blob, [ ...parent_path, key ])
			return
		}

		state = _register_stories_from_glob(state, blob, [ ...parent_path, key ])
	})

	return state
}
function _register_stories_from_module(state: Immutable<State>, story_module: any, parent_path: string[] = []): Immutable<State> {
	//console.log('_register_stories_from_module()', { story_module, parent_path })

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
