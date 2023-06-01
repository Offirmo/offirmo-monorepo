import assert from 'tiny-invariant'
import { Immutable } from '../deps/immutable'

import {
	UserConfig,
	Glob, Module, isꓽModule, Meta,
} from '../types'

import {
	StoryId,
	StoryEntry,
	State,
	isꓽStoryEntry,
} from './types'



const SEP = 'Ⳇ'
const SEP_FOR_IDS = ':'

////////////////////////////////////////////////////////////////////////////////////

export function create(): Immutable<State> {
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

export function set_config(state: Immutable<State>, config: Immutable<UserConfig> | undefined): Immutable<State> {
	return {
		...state,
		config: {
			...state.config,
			...config,
		},
	}
}

export function register_story(state: Immutable<State>, story: StoryEntry): Immutable<State> {
	return {
		...state,
		stories_by_id: {
			...state.stories_by_id,
			[story.id]: story,
		},
		current_story‿id: state.current_story‿id || story.id,
	}
}

const DEBUGⵧglob_parsing = true

export function register_stories_from_glob(state: Immutable<State>, stories_glob: Immutable<Glob>): Immutable<State> {
	DEBUGⵧglob_parsing && console.trace(`register_stories_from_glob()`)

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
function _register_stories_from_glob(state: Immutable<State>, stories_glob: Glob, parent_path: string[] = []): Immutable<State> {
	DEBUGⵧglob_parsing && console.group(`_register_stories_from_glob(${parent_path})`)
	Object.keys(stories_glob).forEach(key => {
		const blob = stories_glob[key]
		if (!blob) {
			throw new Error(`strange key???`)
		}

		if (isꓽModule(blob)) {
			state = _register_stories_from_module(state, blob, [ ...parent_path, key ])
		}
		else {
			state = _register_stories_from_glob(state, blob, [ ...parent_path, key ])
		}
	})

	DEBUGⵧglob_parsing && console.groupEnd()

	return state
}
function _register_stories_from_module(state: Immutable<State>, story_module: Module, parent_path: string[] = []): Immutable<State> {
	DEBUGⵧglob_parsing && console.log('_register_stories_from_module()', { story_module, parent_path })

	const module = story_module.ts

	const meta: Meta | undefined = module.default as any

	Object.keys(module).forEach(story_key => {
		if (story_key === 'default') return

		const id = [...parent_path, story_key].join(SEP_FOR_IDS)
		assert(![...parent_path, story_key].some(p => p.includes(SEP)), `Story "${id}" contains a forbidden character!`) // TODO one day improve

		DEBUGⵧglob_parsing && console.log(`Found story: "${id}"`)
		const story_entry: StoryEntry = {
			id,
			story: module[story_key],
			meta,
		}
		console.log(`new story entry: ${id}`, story_entry)
		assert(isꓽStoryEntry(story_entry), `freshly inserted ${id} is not a story entry??`)
		state = register_story(state, story_entry)
	})

	return state
}

export function enrich_state_from_local_storage(state: Immutable<State>): Immutable<State> {
	// TODO
	/*
	try {
		const id = localStorage.getItem(LS_KEYS.current_story_id)
		if (id)
			state = set_current_story(state, id)
	}
	catch { /* ignore *}*/
	return {
		...state,
	}
}

export function enrich_state_from_query_parameters(state: Immutable<State>): Immutable<State> {

	return {
		...state,
	}
}

export function enrich_state_from_env(state: Immutable<State>): Immutable<State> {

	// TODO ex. if small window, don't show the UI etc.
	return {
		...state,
	}
}

export function leaveⵧexpand(state: Immutable<State>): Immutable<State> {


}
