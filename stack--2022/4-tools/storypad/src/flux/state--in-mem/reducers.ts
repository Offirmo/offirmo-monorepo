import assert from 'tiny-invariant'
import { Immutable, RelativePath } from '@offirmo-private/ts-types'
import { FileSystemNode, createꓽfilesystem, insertꓽfile } from '@offirmo-private/data-structures'

import {
	Config,
} from '../../types/config'

import {
	StoryUId,
	StoryEntry,
	State,
	StoryFolder,
} from './types'

////////////////////////////////////////////////////////////////////////////////////
// init
function create(): State {
	return {
		config: {
			root_title: 'Stories',
			decorators: [],
		},
		//stories_by_uid: {},
		//folders_by_uid: {},
		last_explicitly_activated_story‿uid: undefined,
		first_encountered_story‿uid: undefined,
		tree: createꓽfilesystem<StoryEntry, StoryFolder>(),
	}
}

function setꓽconfig(state: State, config: Immutable<Config> | undefined): State {
	return {
		...state,
		config: {
			...state.config,
			...structuredClone<Config>(config as any),
		},
	}
}

/////////////////////////////////////////////////
// setup

function registerꓽstory(state: State, story: StoryEntry, path: RelativePath): State {
	const uid = insertꓽfile(state.tree, path, story)
	assert(uid === story.uid, `uid should be as expected! "${story.uid}" vs. "${uid}"`)

	return {
		...state,
		first_encountered_story‿uid: state.first_encountered_story‿uid || uid,
		/*stories_by_uid: {
			...state.stories_by_uid,
			[uid]: {
				...story,
				uid,
			},
		},*/
	}
}

/* not needed, folder are inferred from stories path
function registerꓽfolder(state: State, folder: StoryFolder, path: RelativePath): State {
	const uid = upsertꓽfolder(state.tree, path, folder)
	return {
		...state,
		folders_by_uid: {
			...state.folders_by_uid,
			[uid]: folder,
		},
	}
}*/

function enrich_state_from_local_storage(state: State): State {
	console.log('TODO enrich_state_from_local_storage')
	/*
	try {
		const id = localStorage.getItem(LS_KEYS.current_story_uid)
		if (id)
			state = setꓽcurrent_story(state, id)
	}
	catch { /* ignore *}*/
	return {
		...state,
	}
}

function enrich_state_from_query_parameters(state: State): State {
	console.log('TODO enrich_state_from_query_parameters')
	return {
		...state,
	}
}

function enrich_state_from_env(state: State): State {
	console.log('TODO enrich_state_from_env')
	// TODO ex. if small window, don't show the UI etc.

	/*if (state.current_story‿uid) {
		state = folderⵧexpand(state, state.current_story‿uid)
	}*/

	return state
}

/////////////////////////////////////////////////

function activateꓽstory(state: State, uid: StoryUId): State {
	//assert(getꓽstoryⵧby_uid(state, uid), `story should exist! "${uid}"`)
	state = {
		...state,
		last_explicitly_activated_story‿uid: uid,
	}

	state = folderⵧexpand(state, uid)

	return state
}


// expand the tree all the way to the target
// id can be story or folder, don't mind
function folderⵧexpand(state: State, uid: StoryUId): State {
	console.warn('TODO folderⵧexpand')
	/*
	const path = id.split(SEP_FOR_IDS)

	// in-place mutation SORRY TODO fix?
	let folder: StoryFolder = state.folders_by_uid[ROOT_ID]! as any
	do {
		console.log('expanding', { path: structuredClone(path), folder })

		const segment = path.shift()!
		folder = folder.children[segment]! as StoryFolder
		assert(folder, 'next segment is present')
		if (isꓽStoryEntry(folder)) {
			assert(path.length === 0, 'last segment is story')
		}
		else {
			assert(Object.hasOwn(folder, 'isꓽexpandedⵧinitially'))
			folder.isꓽexpandedⵧinitially = true
		}
	} while(path.length)

	return state*/
	return state
}

/////////////////////////////////////////////////

export {
	create,
	setꓽconfig,
	registerꓽstory,
	//registerꓽfolder,

	activateꓽstory,
}
