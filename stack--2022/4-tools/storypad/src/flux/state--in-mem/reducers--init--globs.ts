import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import {
	ImportGlob, isꓽImportGlob,
	ImportModule, isꓽImportModule,
} from '../../types/glob'

import { StoryEntry, isꓽStoryEntry } from '../types'
import { State } from './types'
import { registerꓽstory } from './reducers'

/////////////////////////////////////////////////

const SEP = '/'

/////////////////////////////////////////////////

const DEBUGⵧglob_parsing = true

async function registerꓽstoriesⵧfrom_glob(state: State, stories_glob: Immutable<ImportGlob>): Promise<State> {
	DEBUGⵧglob_parsing && console.groupCollapsed(`registerꓽstoriesⵧfrom_glob()`)

	state = await _registerꓽstoriesⵧfrom_glob_or_module(state, stories_glob, [])

	DEBUGⵧglob_parsing && console.groupEnd()

	return state
}

async function _registerꓽstoriesⵧfrom_glob_or_module(state: State, stories_glob: Immutable<ImportGlob>, parent_path: string[] = []): Promise<State> {
	DEBUGⵧglob_parsing && console.group(`_registerꓽstoriesⵧfrom_glob_or_module(${parent_path.join(SEP)})`)
	DEBUGⵧglob_parsing && console.log('glob=', stories_glob)

	await Object.keys(stories_glob).sort().reduce(async (acc, key) => {
		await acc

		// if dynamic import, can be a promise in the process of being resolved
		const blob = await Promise.resolve(stories_glob[key])

		switch (true) {
			case isꓽImportModule(blob):
				state = await _registerꓽstoriesⵧfrom_module(state, blob, [ ...parent_path, key ])
				break

			case isꓽImportGlob(blob):
				state = await _registerꓽstoriesⵧfrom_glob_or_module(state, blob, [ ...parent_path, key ])
				break

			default:
				console.error({key, blob})
				throw new Error(`Unsupported blob field!`)
		}
	}, Promise.resolve())

	DEBUGⵧglob_parsing && console.groupEnd()

	return state
}

async function _registerꓽstoriesⵧfrom_module(state: State, story_module: Immutable<ImportModule>, parent_path: string[] = []): Promise<State> {
	DEBUGⵧglob_parsing && console.group(`_registerꓽstories_from_module(${parent_path.join(SEP)}.[js/ts/...])`)
	console.log('module=', story_module)

	const exports_sync_or_async = story_module.js || story_module.jsx || story_module.ts || story_module.tsx
	assert(exports_sync_or_async, `ESModule unrecognized extension! (Please implement)`)

	const exports = await (async () => {
		// TODO "on demand" resolution to avoid pollution
		if (typeof exports_sync_or_async === 'function') {
			try {
				return await exports_sync_or_async()
			}
			catch (err) {
				return {
					'!ERROR!': {
						render() {
							console.error(`Error while loading the story "${parent_path.join(SEP)}"!`, err)
							return `Error while loading story! (see console)`
						}
					}
				}
			}
		}

		return exports_sync_or_async
	})()

	const { default: meta, ...stories } = exports

	Object.keys(stories).forEach(story_key => {
		DEBUGⵧglob_parsing && console.log(`Found story: key "${story_key}"`)

		assert(![...parent_path, story_key].some(p => p.includes(SEP)), `Story path contains a forbidden character!`) // TODO one day improve

		const uid = [...parent_path, story_key].join(SEP)

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
