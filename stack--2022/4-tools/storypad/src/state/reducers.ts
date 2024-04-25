import assert from 'tiny-invariant'
import { Immutable, RelativePath } from '@offirmo-private/ts-types'
import { FileSystemNode, createꓽfilesystem, insertꓽfile } from '@offirmo-private/data-structures'

import {
	UserConfig,
} from '../types'

import {
	StoryId,
	StoryEntry, isꓽStoryEntry,
	State,
	StoryFolder,
} from './types'

////////////////////////////////////////////////////////////////////////////////////
// init
function create(): Immutable<State> {
	return {
		config: {
			root_title: 'Stories',
			decorators: [],
		},
		stories_by_uid: {},
		folders_by_id: {},
		current_story‿uid: undefined,
		tree: createꓽfilesystem<StoryEntry, StoryFolder>(),
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

export function registerꓽstory(state: Immutable<State>, story: StoryEntry, path: RelativePath): Immutable<State> {
	assert(!state.stories_by_uid[story.uid], `story should not already exist! "${story.uid}"`)

	insertꓽfile(state.tree, path, story)

	return {
		...state,
		stories_by_uid: {
			...state.stories_by_uid,
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

export function enrich_state_from_local_storage(state: Immutable<State>): Immutable<State> {
	console.log('TODO enrich_state_from_local_storage')
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
	console.log('TODO enrich_state_from_query_parameters')
	return {
		...state,
	}
}

export function enrich_state_from_env(state: Immutable<State>): Immutable<State> {
	console.log('TODO enrich_state_from_env')
	// TODO ex. if small window, don't show the UI etc.

	/*if (state.current_story‿uid) {
		state = folderⵧexpand(state, state.current_story‿uid)
	}*/

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


// expand the tree all the way to the target
// id can be story or folder, don't mind
export function folderⵧexpand(state: Immutable<State>, id: StoryId): Immutable<State> {
	throw new Error('TODO folderⵧexpand')
	/*
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

	return state*/
}

/////////////////////////////////////////////////

export {
	create,
	setꓽconfig,
}
