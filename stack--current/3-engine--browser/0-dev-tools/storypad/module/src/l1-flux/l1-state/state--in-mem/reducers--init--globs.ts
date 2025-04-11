import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'

import {
	type ImportGlob, isꓽImportGlob,
	type ImportModule, isꓽImportModule,
} from '../../../l0-types/l0-glob'
import { type Module‿Parcelv2, isꓽMultiModule‿Parcelv2} from '../../../l0-types/l0-glob/parcel/v2'

import { SEPⵧSEGMENTS, SEPⵧSTORY } from '../../../consts.ts'
import { type StoryEntry, isꓽStoryEntry } from '../types.ts'
import type { State } from './types.ts'
import { registerꓽstory } from './reducers.ts'

/////////////////////////////////////////////////


/////////////////////////////////////////////////

const DEBUGⵧglob_parsing = true

async function registerꓽstoriesⵧfrom_glob(state: State, stories_glob: Immutable<ImportGlob>): Promise<State> {
	DEBUGⵧglob_parsing && console.groupCollapsed(`registerꓽstoriesⵧfrom_glob()`)

	state = await _registerꓽstoriesⵧfrom_glob_or_module(state, stories_glob, [])

	DEBUGⵧglob_parsing && console.groupEnd()

	return state
}

async function _registerꓽstoriesⵧfrom_glob_or_module(state: State, stories_glob: Immutable<ImportGlob>, parent_path: string[] = []): Promise<State> {
	DEBUGⵧglob_parsing && console.group(`_registerꓽstoriesⵧfrom_glob_or_module(${parent_path.join(SEPⵧSEGMENTS)})`)
	DEBUGⵧglob_parsing && console.log('glob=', stories_glob)

	// note: we intentionally don't sort to keep the intended order (fs order should happen naturally anyway)
	await Object.keys(stories_glob).sort().reduce(async (acc, key) => {
		await acc

		assert(!key.includes(SEPⵧSEGMENTS), `Key contains a forbidden character! (SEP)`)
		assert(!key.includes(' '), `Key contains a forbidden character! (space)`)

		// if dynamic import, can be a promise in the process of being resolved
		const blob = await Promise.resolve(stories_glob[key])

		const subpath = [...parent_path, key ]

		switch (true) {
			case isꓽImportModule(blob):
				if (key === 'index')
					subpath.pop() // useless
				state = await _registerꓽstoriesⵧfrom_module(state, blob, subpath)
				break

			case isꓽMultiModule‿Parcelv2(blob): {
				// special case... (sse type definition)
				// let's break this multi-module into individual modules
				state = await Object.keys(blob).sort().reduce(async (acc, extension) => {
					const state = await acc
					const module: Module‿Parcelv2 = {
						[extension]: (blob as any)[extension]!
					}
					return _registerꓽstoriesⵧfrom_module(state, module, [ ...subpath, extension ])
				}, Promise.resolve(state))
				break
			}

			case isꓽImportGlob(blob):
				state = await _registerꓽstoriesⵧfrom_glob_or_module(state, blob, subpath)
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
	DEBUGⵧglob_parsing && console.group(`_registerꓽstories_from_module(${parent_path.join(SEPⵧSEGMENTS)}.[js/ts/...])`)
	console.log('module=', story_module)

	const exports_sync_or_async = story_module.js || story_module.jsx || story_module.ts || story_module.tsx
	assert(exports_sync_or_async, `ESModule unrecognized extension! (Please implement)`)

	const exports = await (async () => {
		// TODO one day "on demand" resolution to avoid global js+styles pollution
		if (typeof exports_sync_or_async === 'function') {
			try {
				return await exports_sync_or_async()
			}
			catch (err) {
				console.error(`💣Error while loading the story "${parent_path.join(SEPⵧSEGMENTS)}"!`, err)
				return {
					'!ERROR!': () => {
						console.error(`💣Error while loading the story "${parent_path.join(SEPⵧSEGMENTS)}"!`, err)
						return `Error while loading stories from "${parent_path.join(SEPⵧSEGMENTS)}"! (see console)`
					}
				}
			}
		}

		return exports_sync_or_async
	})()

	const { default: meta, ...stories } = exports

	// TODO remove duplicates by value
	Object.keys(stories).forEach(story_key => {
		DEBUGⵧglob_parsing && console.log(`Found story: key "${story_key}"`)

		if (story_key.startsWith('_')) {
			console.debug(`Ignoring because it starts with an underscore.`)
			return
		}

		assert(!story_key.includes(SEPⵧSTORY), `Story key contains a forbidden character! (story sep)`)
		assert(![...parent_path, story_key].some(p => p.includes(SEPⵧSEGMENTS)), `Story path contains a forbidden character!`) // TODO one day improve

		const uid = [...parent_path, story_key].join(SEPⵧSEGMENTS)

		const story_entry: StoryEntry = {
			uid,
			story: stories[story_key]!,
			meta,
		}
		DEBUGⵧglob_parsing && console.log(`new story entry: ${uid}`, story_entry)
		assert(isꓽStoryEntry(story_entry), `freshly created ${uid} is not a story entry??`)
		state = registerꓽstory(state, story_entry, [...parent_path, story_key].join(SEPⵧSEGMENTS))
	})

	DEBUGⵧglob_parsing && console.groupEnd()

	return state
}

/////////////////////////////////////////////////


export {
	registerꓽstoriesⵧfrom_glob,
}
