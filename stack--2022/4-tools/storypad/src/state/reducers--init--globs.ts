import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import { createꓽfilesystem } from '@offirmo-private/data-structures'

import {
	Glob, isꓽGlob,
	Module, isꓽModule,
	Meta,
} from '../types'

import {
	StoryEntry, isꓽStoryEntry,
	State,
} from './types'
import { registerꓽstory } from './reducers'

/////////////////////////////////////////////////

const SEP = '/' // Ⳇ
const SEP_FOR_UID = 'Ⳇ' // :
const ROOT_ID = '╣ROOT╠'

/////////////////////////////////////////////////

const DEBUGⵧglob_parsing = true

function registerꓽstoriesⵧfrom_glob(state: Immutable<State>, stories_glob: Immutable<Glob>): Immutable<State> {
	DEBUGⵧglob_parsing && console.group(`registerꓽstoriesⵧfrom_glob()`)
	DEBUGⵧglob_parsing && console.log(stories_glob)

	state = _registerꓽstoriesⵧfrom_glob_or_module(state, stories_glob, [])

	/*
	// now that we registered the stories, create their corresponding folders
	const all_folder_ids = new Set<string>()
	let max_depth = 0
	Object.keys(state.stories_by_uid).forEach(story_id => {
		const parent_id = story_id.split(SEP_FOR_UID).slice(0, -1).join(SEP_FOR_UID)
		max_depth = Math.max(max_depth, parent_id.split(SEP_FOR_UID).length)
		all_folder_ids.add(parent_id)
	})
	console.log(all_folder_ids, max_depth)
	for(let depth: number = 1; depth <= max_depth; ++depth) {
		console.group(`creating folders of depth ${depth}…`)

		const all_folder_ids_of_this_depth = new Set<string>()
		Array.from(all_folder_ids.values())
			.map(id => id.split(SEP_FOR_UID))
			.filter(path => path.length >= depth)
			.map(path => path
				.slice(0, depth)
				.join(SEP_FOR_UID)
			)
			.forEach(id => all_folder_ids_of_this_depth.add(id))

		console.log(all_folder_ids_of_this_depth)
		all_folder_ids_of_this_depth.forEach(id => {
			const path = id.split(SEP_FOR_UID)
			const last_segment = path.pop()!
			const parent_id = path.join(SEP_FOR_UID) || ROOT_ID
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

	console.log(state)*/

	DEBUGⵧglob_parsing && console.groupEnd()

	return state
}

//function _mkdirp(state: Immutable<State>, path: string[]): Immutable<State> {

/*
	// MODIFICATION IN PLACE TODO improve
	let root_folder = state.folders_by_id[ROOT_ID]! as StoryFolder

	Object.keys(state.stories_by_uid).forEach(story_id => {
		const segments = story_id.split(SEP_FOR_UID)
		let parent = root_folder
		segments.slice(0, -1).forEach(segment => {
			let child = parent.children[segment] || (() => {
				const child =
				parent.children[segment] = child
				return child
			})

			parent = child
		})
		parent.children[segments.slice(-1)[0]] = state.stories_by_uid[story_id]
	})
 */

function _registerꓽstoriesⵧfrom_glob_or_module(state: Immutable<State>, stories_glob: Immutable<Glob>, parent_path: string[] = []): Immutable<State> {
	DEBUGⵧglob_parsing && console.group(`_registerꓽstoriesⵧfrom_glob_or_module(${parent_path.join(SEP)})`)

	Object.keys(stories_glob).forEach(key => {
		const blob = stories_glob[key]

		switch (true) {
			case isꓽModule(blob):
				state = _registerꓽstoriesⵧfrom_module(state, blob, [ ...parent_path, key ])
				break

			case isꓽGlob(blob):
				state = _registerꓽstoriesⵧfrom_glob_or_module(state, blob, [ ...parent_path, key ])
				break

			default:
				console.error({key, blob})
				throw new Error(`Unsupported blob field!`)
		}
	})

	DEBUGⵧglob_parsing && console.groupEnd()

	return state
}
function _registerꓽstoriesⵧfrom_module(state: Immutable<State>, story_module: Immutable<Module>, parent_path: string[] = []): Immutable<State> {
	DEBUGⵧglob_parsing && console.group(`_registerꓽstories_from_module(${parent_path.join(SEP)}.[js/ts/...])`)
	console.log(story_module)

	// TODO pick whatever has js or ts in it
	const exports = story_module.js || story_module.jsx || story_module.ts || story_module.tsx
	assert(exports, `ESModule unrecognized extension! (TODO implement)`)

	const { default: meta, ...stories } = exports

	Object.keys(stories).forEach(story_key => {
		DEBUGⵧglob_parsing && console.log(`Found story: key "${story_key}"`)

		assert(![...parent_path, story_key].some(p => p.includes(SEP) || p.includes(SEP_FOR_UID)), `Story path contains a forbidden character!`) // TODO one day improve

		const uid = [...parent_path, story_key].join(SEP_FOR_UID)

		const story_entry: StoryEntry = {
			uid,
			story: stories[story_key]!,
			meta,
		}
		DEBUGⵧglob_parsing && console.log(`new story entry: ${uid}`, story_entry)
		assert(isꓽStoryEntry(story_entry), `freshly created ${uid} is not a story entry??`)
		state = registerꓽstory(state, story_entry, [...parent_path, story_key].join(SEP))
	})

	DEBUGⵧglob_parsing && console.groupEnd()

	return state
}

/////////////////////////////////////////////////


export {
	registerꓽstoriesⵧfrom_glob,
}
