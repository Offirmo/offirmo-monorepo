import assert from 'tiny-invariant'
import { Immutable, RelativePath } from '@offirmo-private/ts-types'
import { createꓽfilesystem, insertꓽfile } from '@offirmo-private/data-structures'

import { Config } from '../../types/config'
import { StoryUId, StoryEntry, StoryFolder } from '../types'
import { State } from './types'

////////////////////////////////////////////////////////////////////////////////////
// init
function create(): State {
	return {
		config: {
			root_title: 'Stories',
			decorators: [],
		},
		first_encountered_story‿uid: undefined,
		tree: createꓽfilesystem<StoryEntry, StoryFolder>(),
	}
}

function setꓽconfig(state: State, config: Immutable<Config> | undefined): State {
	return {
		...state,
		config: {
			...state.config,
			...config as any, // break the Immutable, but we promise not to touch it!
		},
	}
}

/////////////////////////////////////////////////
// setup

function registerꓽstory(state: State, story: StoryEntry, path: RelativePath): State {
	const uid = insertꓽfile(state.tree, path, story)
	assert(uid === story.uid, `uid should be as expected! "${story.uid}" vs. "${uid}"`)

	if (!state.first_encountered_story‿uid) {
		state = {
			...state,
			first_encountered_story‿uid: state.first_encountered_story‿uid || uid,
		}
	}

	return state
}

/////////////////////////////////////////////////

// TODO clarify
function requestꓽstory(state: State, uid: StoryUId): State {
	//assert(getꓽstoryⵧby_uid(state, uid), `story should exist! "${uid}"`)
	state = {
		...state,
		//last_explicitly_activated_story‿uid: uid,
	}

	return state
}


// expand the tree all the way to the target
// id can be story or folder, don't mind
function folderⵧexpand(state: State, uid: StoryUId): State {
	console.warn('TODO folderⵧexpand')
	return state
}

/////////////////////////////////////////////////

export {
	create,
	setꓽconfig,
	registerꓽstory,

	requestꓽstory,
}
