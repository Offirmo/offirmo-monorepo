import assert from 'tiny-invariant'
import { Immutable } from '../deps/@offirmo-private/ts-types/immutable'
//import { createꓽgraphⵧfile_system } from '../deps/@offirmo-private/state--graph.js'

import {
	UserConfig,
	Glob,
	Module, isꓽModule,
	Meta,
} from '../types'

import {
	StoryId,
	StoryEntry, isꓽStoryEntry,
	State,
	StoryFolder,
} from './types'

/////////////////////////////////////////////////

const SEP = 'Ⳇ'
const SEP_FOR_IDS = ':'
const ROOT_ID = '╣ROOT╠'

////////////////////////////////////////////////////////////////////////////////////
// init
function create(): Immutable<State> {
	return {
		config: {
			root_title: 'Stories',
			decorators: [],
		},
		stories_by_id: {},
		folders_by_id: {},
		current_story‿uid: undefined,
		//graph: createꓽgraphⵧfile_system(),
	}
}

function setꓽconfig(state: Immutable<State>, config: Immutable<UserConfig> | undefined): Immutable<State> {
	return {
		...state,
		config: {
			...state.config,
			...config,
		},
	}
}

/////////////////////////////////////////////////
// setup

export function registerꓽstory(state: Immutable<State>, story: StoryEntry): Immutable<State> {
	/*state = {
		graph:
	}*/
	assert(!state.stories_by_id[story.uid], `story should not already exist! "${story.uid}"`)
	return {
		...state,
		stories_by_id: {
			...state.stories_by_id,
			[story.uid]: story,
		},
		current_story‿uid: state.current_story‿uid || story.uid,
	}
}

export function registerꓽfolder(state: Immutable<State>, folder: StoryFolder): Immutable<State> {
	assert(!state.folders_by_id[folder.uid], `folder should not already exist! "${folder.uid}"`)
	return {
		...state,
		folders_by_id: {
			...state.folders_by_id,
			[folder.uid]: folder,
		},
	}
}

const DEBUGⵧglob_parsing = true

export function registerꓽstoriesⵧfrom_glob(state: Immutable<State>, stories_glob: Immutable<Glob>): Immutable<State> {
	DEBUGⵧglob_parsing && console.group(`registerꓽstoriesⵧfrom_glob()`)
	DEBUGⵧglob_parsing && console.log(stories_glob)

	state = _registerꓽstoriesⵧfrom_glob(state, stories_glob, [])

	// now that we registered the stories, create their corresponding folders
	const all_folder_ids = new Set<string>()
	let max_depth = 0
	Object.keys(state.stories_by_id).forEach(story_id => {
		const parent_id = story_id.split(SEP_FOR_IDS).slice(0, -1).join(SEP_FOR_IDS)
		max_depth = Math.max(max_depth, parent_id.split(SEP_FOR_IDS).length)
		all_folder_ids.add(parent_id)
	})
	console.log(all_folder_ids, max_depth)
	for(let depth: number = 1; depth <= max_depth; ++depth) {
		console.group(`creating folders of depth ${depth}…`)

		const all_folder_ids_of_this_depth = new Set<string>()
		Array.from(all_folder_ids.values())
			.map(id => id.split(SEP_FOR_IDS))
			.filter(path => path.length >= depth)
			.map(path => path
				.slice(0, depth)
				.join(SEP_FOR_IDS)
			)
			.forEach(id => all_folder_ids_of_this_depth.add(id))

		console.log(all_folder_ids_of_this_depth)
		all_folder_ids_of_this_depth.forEach(id => {
			const path = id.split(SEP_FOR_IDS)
			const last_segment = path.pop()!
			const parent_id = path.join(SEP_FOR_IDS) || ROOT_ID
			console.log({
				id,
				parent_id,
				last_segment,
			})
			const parent = state.folders_by_id[parent_id] as StoryFolder
			assert(parent, 'parent should already exist')
			const child = {
				id,
				is_expanded: true, // by default, all open!
				children: {},
			}
			state = registerꓽfolder(state, child)
			parent.children[last_segment] = child
		})
		console.log(state.folders_by_id)
		console.groupEnd()
	}

	console.log(state)
	throw new Error('TODO NIMP!')

	DEBUGⵧglob_parsing && console.groupEnd()

	return state
}

//function _mkdirp(state: Immutable<State>, path: string[]): Immutable<State> {

/*
	// MODIFICATION IN PLACE TODO improve
	let root_folder = state.folders_by_id[ROOT_ID]! as StoryFolder

	Object.keys(state.stories_by_id).forEach(story_id => {
		const segments = story_id.split(SEP_FOR_IDS)
		let parent = root_folder
		segments.slice(0, -1).forEach(segment => {
			let child = parent.children[segment] || (() => {
				const child =
				parent.children[segment] = child
				return child
			})

			parent = child
		})
		parent.children[segments.slice(-1)[0]] = state.stories_by_id[story_id]
	})
 */


function _registerꓽstoriesⵧfrom_glob(state: Immutable<State>, stories_glob: Glob, parent_path: string[] = []): Immutable<State> {
	DEBUGⵧglob_parsing && console.group(`_registerꓽstories_from_glob(${parent_path.join(SEP)})`)

	Object.keys(stories_glob).forEach(key => {
		const blob = stories_glob[key]
		if (!blob) {
			throw new Error(`strange key???`)
		}

		if (isꓽModule(blob)) {
			state = _registerꓽstoriesⵧfrom_module(state, blob, [ ...parent_path, key ])
		}
		else {
			state = _registerꓽstoriesⵧfrom_glob(state, blob, [ ...parent_path, key ])
		}
	})

	DEBUGⵧglob_parsing && console.groupEnd()

	return state
}
function _registerꓽstoriesⵧfrom_module(state: Immutable<State>, story_module: Module, parent_path: string[] = []): Immutable<State> {
	DEBUGⵧglob_parsing && console.groupCollapsed(`_registerꓽstories_from_module(${parent_path.join(SEP)}.[js/ts/...])`)

	const module = story_module.ts

	const meta: Meta | undefined = module.default as any

	Object.keys(module).forEach(story_key => {
		if (story_key === 'default') return

		const id = [...parent_path, story_key].join(SEP_FOR_IDS)
		assert(![...parent_path, story_key].some(p => p.includes(SEP)), `Story "${id}" contains a forbidden character!`) // TODO one day improve

		DEBUGⵧglob_parsing && console.log(`Found story: "${id}"`)
		const story_entry: StoryEntry = {
			id,
			story: module[story_key]!,
			meta,
		}
		DEBUGⵧglob_parsing && console.log(`new story entry: ${id}`, story_entry)
		assert(isꓽStoryEntry(story_entry), `freshly created ${id} is not a story entry??`)
		state = registerꓽstory(state, story_entry)
	})

	DEBUGⵧglob_parsing && console.groupEnd()

	return state
}

export function enrich_state_from_local_storage(state: Immutable<State>): Immutable<State> {
	// TODO
	/*
	try {
		const id = localStorage.getItem(LS_KEYS.current_story_id)
		if (id)
			state = setꓽcurrent_story(state, id)
	}
	catch { /* ignore *}*/
	return {
		...state,
	}
}

export function enrich_state_from_query_parameters(state: Immutable<State>): Immutable<State> {
	// TODO
	return {
		...state,
	}
}

export function enrich_state_from_env(state: Immutable<State>): Immutable<State> {
	// TODO ex. if small window, don't show the UI etc.

	if (state.current_story‿uid) {
		state = folderⵧexpand(state, state.current_story‿uid)
	}

	return state
}

/////////////////////////////////////////////////

export function setꓽcurrent_story(state: Immutable<State>, story_id: StoryId): Immutable<State> {
	state = {
		...state,
		current_story‿uid: story_id,
	}

	state = folderⵧexpand(state, state.current_story‿uid!)

	return state
}


// id can be story or folder, don't mind
export function folderⵧexpand(state: Immutable<State>, id: StoryId): Immutable<State> {
// expand the tree all the way to the target story
	const path = id.split(SEP_FOR_IDS)

	// in-place mutation SORRY TODO fix?
	let folder: StoryFolder = state.folders_by_id[ROOT_ID]! as any
	do {
		console.log('expanding', { path: structuredClone(path), folder })

		const segment = path.shift()!
		folder = folder.children[segment]! as StoryFolder
		assert(folder, 'next segment is present')
		if (isꓽStoryEntry(folder)) {
			assert(path.length === 0, 'last segment is story')
		}
		else {
			assert(Object.hasOwn(folder, 'is_expanded'))
			folder.is_expanded = true
		}
	} while(path.length)

	return state
}

/////////////////////////////////////////////////

export {
	create,
	setꓽconfig,
}
