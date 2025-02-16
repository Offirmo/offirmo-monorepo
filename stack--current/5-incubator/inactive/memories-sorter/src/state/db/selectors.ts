import path from 'path'

import assert from 'tiny-invariant'
import stylize_string from 'chalk'
import type { Immutable } from '@offirmo-private/ts-types'
import { prettifyꓽjson } from '@offirmo-private/prettify-any'
import { enforceꓽimmutable } from '@offirmo-private/state-utils'

import { LIB as APP } from '../../consts.js'
import { AbsolutePath, RelativePath } from '../../types.js'
import { Action } from '../actions.js'
import { getꓽfile_basename_without_copy_index } from '../../services/name_parser.js'
import * as BetterDateLib from '../../services/better-date.js'
import logger from '../../services/logger.js'

import * as Folder from '../folder/index.js'
import * as File from '../file/index.js'
import * as Notes from '../notes/index.js'
import { FolderId } from '../folder/index.js'
import { FileId, is_recoverable_broken_file } from '../file/index.js'
import { getꓽparams } from '../../params.js'

import { LIB } from './consts.js'
import {	State } from './types.js'

export function getꓽabsolute_path(state: Immutable<State>, id: RelativePath): AbsolutePath {
	return path.join(state.root, id)
}

export function has_pending_actions(state: Immutable<State>): boolean {
	return state.queue.length > 0
}

export function getꓽfirst_pending_action(state: Immutable<State>): Immutable<Action> {
	if (!has_pending_actions(state))
		throw new Error('No more pending actions!')

	return state.queue[0]
}

export function getꓽpending_actions(state: Immutable<State>): Immutable<Action>[] {
	return [...state.queue]
}

export function getꓽall_folders(state: Immutable<State>): Immutable<Folder.State>[] {
	return Object.values(state.folders)
}

export function getꓽmax_folder_depth(state: Immutable<State>): number {
	return getꓽall_folders(state).reduce((acc, folder_state) => {
		const depth = Folder.getꓽdepth(folder_state)
		return Math.max(acc, depth)
	}, 0)
}

export function getꓽall_folder_ids(state: Immutable<State>): string[] {
	return Object.keys(state.folders)
		.sort()
}

export function getꓽall_event_folder_ids(state: Immutable<State>): string[] {
	return getꓽall_folder_ids(state)
		.filter(k => state.folders[k].type === Folder.Type.event)
}

export function getꓽall_files(state: Immutable<State>): Immutable<File.State>[] {
	return Object.values(state.files)
}

export function getꓽall_file_ids(state: Immutable<State>): string[] {
	return Object.keys(state.files)
		.sort()
}

export function getꓽall_files_except_meta(state: Immutable<State>): Immutable<File.State>[] {
	return getꓽall_files(state)
		.filter(state => !File.is_notes(state))
}

export function getꓽall_media_files(state: Immutable<State>): Immutable<File.State>[] {
	return getꓽall_files(state)
		.filter(s => File.is_media_file(s))
}

/*
export function getꓽall_media_file_ids(state: Immutable<State>): string[] {
	return getꓽall_media_files(state)
		.map(s => s.id)
}
*/

// TODO unicode normalization of folders
export function is_file_existing(state: Immutable<State>, id: FileId): boolean {
	return Object.hasOwn(state.files, id)
}

// beware of unknown OS path normalization!
// TODO unicode normalization of folders
export function is_folder_existing(state: Immutable<State>, id: FolderId): boolean {
	return Object.hasOwn(state.folders, id)
}

// CORE LOGIC
export function getꓽideal_file_relative_folder(state: Immutable<State>, id: FileId): RelativePath {
	logger.trace(`✴️ getꓽideal_file_relative_folder()`, { id })
	const DEBUG = false

	const file_state = state.files[id]

	assert(!File.is_notes(file_state), `getꓽideal_file_relative_folder() should not be called on notes`) // bc notes have their own consolidation/cleaning logic

	const current_parent_folder_id: FolderId = File.getꓽcurrent_parent_folder_id(file_state)
	assert(is_folder_existing(state, current_parent_folder_id), `getꓽideal_file_relative_folder() current parent folder exists "${current_parent_folder_id}"`)
	const current_parent_folder_state = state.folders[current_parent_folder_id]

	const top_parent_id: FolderId = File.getꓽcurrent_top_parent_folder_id(file_state)
	const is_top_parent_special = Folder.SPECIAL_FOLDERS_BASENAMES.includes(top_parent_id)

	let is_media_file = File.is_media_file(file_state)
	if (File.is_broken_file(file_state) && !File.is_recoverable_broken_file(file_state)) {
		is_media_file = false
	}

	logger.trace(`✴️ getꓽideal_file_relative_folder() processing…`, {
		top_parent_id,
		is_top_parent_special,
		parent_folder_type: current_parent_folder_state.type,
		is_media_file,
		'current_parent_folder_state.type': current_parent_folder_state.type,
	})

	// first, if not media, clear out from the medias
	if (!is_media_file) {
		// keep the exact same path, ensuring it's below "can't recognize"
		let targetꓽsplit_path = File.getꓽcurrent_relative_path(file_state).split(path.sep).slice(0, -1)
		if (is_top_parent_special)
			targetꓽsplit_path[0] = Folder.SPECIAL_FOLDERⵧCANT_RECOGNIZE__BASENAME
		else
			targetꓽsplit_path.unshift(Folder.SPECIAL_FOLDERⵧCANT_RECOGNIZE__BASENAME)
		logger.warn(`✴️ !media = Unfortunately can't manage to recognize a file :-(`, {
			id,
			parent_folder_type: current_parent_folder_state.type,
			//current_parent_folder_state,
		})
		DEBUG && console.log(`✴️ ${id} can't sort`)
		return path.join(targetꓽsplit_path.join(path.sep))
	}

	// Ok, it's a media file.
	const file_bcd = File.getꓽbest_creation_date(file_state)

	// whatever the file, is it already in an event folder? (= already sorted)
	// BEWARE that:
	// 1) the event folder may not have a canonical path = need to use the canonical
	// 2) the event folder may be a "forced capped" event (most likely bc intentful name ex. a 6 month iphone import)
	//    in which case we may need to move out depending on the date
	// 3) while a legitimate event folder, the folder may nos have its canonical name yet

	if (current_parent_folder_state.type === Folder.Type.event) {
		// 2 cases
		// - the media is INSIDE the event range =  it's sorted already, keep it that way
		// - the media is OUTSIDE of the event range = event was capped most likely bc intentful name (ex. a 6 month iphone import),
		//   but need to move medias in more appropriate event folders
		let should_stay_in_this_event_folder = true // so far
		if (File.is_confident_in_date_enough_to__sort(file_state)) {
			const date_for_matching_an_event = file_bcd
			should_stay_in_this_event_folder = Folder.is_date_matching_this_event(current_parent_folder_state, date_for_matching_an_event)
		}

		if (should_stay_in_this_event_folder) {
			const event_folder_base = Folder.getꓽideal_basename(current_parent_folder_state)
			const year = String(Folder.getꓽevent_begin_year(current_parent_folder_state))

			DEBUG && console.log(`✴️ ${id} is already in event and computed that it should stay in`)
			return path.join(year, event_folder_base)
		}

		// else continue...
	}

	// we need to find a better event folder
	const date_for_matching_an_event: BetterDateLib.BetterDate = (() => {
		if (File.is_confident_in_date_enough_to__sort(file_state))
			return file_bcd

		return Folder.getꓽevent_begin_date(current_parent_folder_state)
	})()

	let compatible_event_folder_id = getꓽall_event_folder_ids(state)
		.find(fid => Folder.is_date_matching_this_event(state.folders[fid], date_for_matching_an_event))
	if (!compatible_event_folder_id) {
		if (current_parent_folder_state.type === Folder.Type.overlapping_event) {
			// can happen if the folder is force-dated
			// but the file date is reliable and don't match
			// Let's investigate if that happens:
			logger.warn(`File was in an overlapped event but couldn't find a matching event`, {
				id,
				date_for_matching: BetterDateLib.getꓽdebug_representation(date_for_matching_an_event),
			})
		}
		// fall through to other rules
	}
	else {
		// we found a matching event, all good
		const event_folder_base = Folder.getꓽideal_basename(state.folders[compatible_event_folder_id])

		const year = String(Folder.getꓽevent_begin_year(state.folders[compatible_event_folder_id]))

		DEBUG && console.log(`✴️ ${id} found a matching event`, {
			confidence_to_sort: File.is_confident_in_date_enough_to__sort(file_state),
			file_date: BetterDateLib.getꓽdebug_representation(date_for_matching_an_event),
		})
		return path.join(year, event_folder_base)
	}

	// we don't have a matching event folder...

	if (!File.is_confident_in_date_enough_to__sort(file_state)) {
		// we really can't sort this media file :(
		let targetꓽsplit_path = File.getꓽcurrent_relative_path(file_state).split(path.sep).slice(0, -1)
		if (is_top_parent_special)
			targetꓽsplit_path[0] = Folder.SPECIAL_FOLDERⵧCANT_AUTOSORT__BASENAME
		else
			targetꓽsplit_path.unshift(Folder.SPECIAL_FOLDERⵧCANT_AUTOSORT__BASENAME)
		DEBUG && console.log(`✴️ ${id} really not confident`)
		logger.warn(`✴️ !confident = Unfortunately really not confident about sorting the file :-(`, {
			id,
			parent_folder_type: current_parent_folder_state.type,
		})
		return targetꓽsplit_path.join(path.sep)
	}

	// we have reasonable confidence, we don't have a folder
	const year = String(BetterDateLib.getꓽyear(file_bcd, 'tz:embedded'))
	const event_folder_base = ((): string => {
		const all_events_folder_ids = getꓽall_event_folder_ids(state)

		let compatible_event_folder_id = all_events_folder_ids.find(fid => Folder.is_date_matching_this_event(state.folders[fid], file_bcd))
		if (compatible_event_folder_id) {
			DEBUG && console.log(`✴️ ${id} found existing compatible event folder:`, compatible_event_folder_id)
			return Folder.getꓽideal_basename(state.folders[compatible_event_folder_id])
		}

		// need to create a new event folder!
		// We don't group too much, split day / wek-end
		let folder_date = file_bcd
		DEBUG && console.log(`✴️ ${id} !found compatible event folder = creating one`, BetterDateLib.getꓽdebug_representation(folder_date))
		if (BetterDateLib.getꓽday_of_week_index(folder_date, 'tz:embedded') === 0) {
			// sunday is coalesced to sat = start of weekend
			folder_date = BetterDateLib.add_days(folder_date, -1)
		}

		const new_event_folder_basename =
			String(BetterDateLib.getꓽcompact_date(folder_date, 'tz:embedded'))
			+ ' - '
			+ (BetterDateLib.getꓽday_of_week_index(folder_date, 'tz:embedded') === 6 ? 'weekend' : 'life') // TODO use the existing parent folder as a base hint anyway
		DEBUG && console.log(`✴️ ${id} !found compatible event folder = created one`, {
			adjusted_date: BetterDateLib.getꓽdebug_representation(folder_date),
			new_event_folder_basename,
		})

		return new_event_folder_basename
	})()

	DEBUG && console.log(`✴️ "${id}" found target folder to sort in:`, { year, event_folder_base })
	return path.join(year, event_folder_base)
}

export function getꓽideal_file_relative_path(state: Immutable<State>, id: FileId): RelativePath {
	logger.trace(`getꓽideal_file_relative_path()`, { id })

	const file_state = state.files[id]
	assert(file_state, `getꓽideal_file_relative_path() should refer to a state! "${id}"`)

	if (File.is_notes(file_state)) {
		return id // duplicate non-canonical notes will be cleaned at a later stage, no change for now
	}

	let ideal_basename = File.getꓽideal_basename(file_state)
	if (!getꓽparams().dry_run) {
		const current_basename = File.getꓽcurrent_basename(file_state)
		const current_basename_cleaned = getꓽfile_basename_without_copy_index(current_basename)
		assert(
			current_basename_cleaned === ideal_basename,
			`getꓽideal_file_relative_path() file should already have been normalized in place! ideal="${ideal_basename}" vs current(no copy index)="${current_basename_cleaned}" from "${current_basename}"`
		)
	}

	return path.join(getꓽideal_file_relative_folder(state, id), ideal_basename)
}

export function getꓽpast_notes(state: Immutable<State>): Immutable<Notes.State> {
	return enforceꓽimmutable(Notes.create('for persisting -- old', state.extra_notes))
}

export function getꓽpresent_notes(state: Immutable<State>): Immutable<Notes.State> {
	let result = enforceꓽimmutable(Notes.create('for persisting -- present'))

	const encountered_files = { ...result.encountered_files }

	getꓽall_media_files(state)
		.forEach(file_state => {
			assert(file_state.current_hash, `getꓽpast_and_present_notes() should happen on hashed files`)
			assert(
				!state.extra_notes.encountered_files[file_state.current_hash],
				`getꓽpast_and_present_notes() should not have conflicting data for hash "${file_state.current_hash}"`
			)
			encountered_files[file_state.current_hash] = file_state.notes
		})

	result = {
		...result,
		encountered_files,
	}

	return result
}

export function getꓽpast_and_present_notes(state: Immutable<State>): Immutable<Notes.State> {
	let past = getꓽpast_notes(state)
	let current = getꓽpresent_notes(state)
	let result = enforceꓽimmutable(Notes.create('for persisting -- all'))

	result = {
		...result,
		encountered_files: {
			...past.encountered_files,
			...current.encountered_files,
		},
		known_modifications_new_to_old: {
			...past.known_modifications_new_to_old,
			...current.known_modifications_new_to_old,
		}
	}

	//logger.info(`getꓽpast_and_present_notes(): ` + Notes.to_string(result))
	return result
}

export function getꓽfile_ids_by_hash(state: Immutable<State>): { [hash: string]: FileId[] } {
	/*const duplicated_hashes: Set<FileHash> = new Set<FileHash>(
		Object.entries(state.encountered_hash_count)
			.filter(([ hash, count ]) => count > 1)
			.map(([ hash ]) => hash)
	)*/

	const file_ids_by_hash = getꓽall_file_ids(state)
		.reduce((acc, file_id) => {
			const file_state = state.files[file_id]
			const hash = File.getꓽhash(file_state)

			if (!hash) {
				// happens for some special files such as notes. TODO clarify
			}
			else {
				acc[hash] ??= []
				acc[hash].push(file_id)
			}
			return acc
		}, {} as { [hash: string]: FileId[] })

	/*const duplicate_original_basenames_by_hash: { [hash: string]: FileId[] } = getꓽall_file_ids(state)
		.reduce((acc, file_id) => {
			const file_state = state.files[file_id]
			const hash = File.getꓽhash(file_state)
			if (hash && duplicated_hashes.has(hash)) {
				acc[hash] ??= []
				acc[hash].push(file_state.extra_notes.original.basename)
			}
			return acc
		}, {} as { [hash: string]: string[] })

	console.log({ duplicate_file_ids_by_hash, duplicate_original_basenames_by_hash })*/

	return file_ids_by_hash
}

///////////////////// DEBUG /////////////////////

export function to_string(state: Immutable<State>) {
	const { root, folders, files, extra_notes, queue } = state

	let str = `
${stylize_string.blue.bold(`##################### ${LIB} ${APP}’s DB #####################`)}
Root: "${stylize_string.yellow.bold(root)}"
`

	const all_folder_ids = getꓽall_folder_ids(state)
	str += stylize_string.bold(
		`\n${stylize_string.blue('' + all_folder_ids.length)} folders:\n`,
	)
	str += all_folder_ids.map(id => Folder.to_string(folders[id])).join('\n')


	//const all_file_ids = getꓽall_media_file_ids(state)
	const all_file_ids = getꓽall_file_ids(state)
	str += stylize_string.bold(
		`\n\n${stylize_string.blue(String(all_file_ids.length))} files in ${stylize_string.blue(String(all_folder_ids.length))} folders:\n`,
	)
	str += all_file_ids.map(id => File.to_string(files[id])).join('\n')

	str += stylize_string.bold('\n\nExtra notes:') + ' (on hashes no longer existing we encountered in the past)'
	str += (Notes.to_string(getꓽpast_notes(state), 'mode:summary') || '\n  (none)')

	str += stylize_string.bold('\n\nPresent notes:')
	str += (Notes.to_string(getꓽpresent_notes(state)) || '\n  (none)')

	str += stylize_string.bold('\n\nActions queue:')
	if (queue.length === 0) str += '\n  (empty)'
	queue.forEach(task => {
		const { type, ...details } = task
		str += `\n- pending task "${type}" ${prettifyꓽjson(details)}`
	})

	return str
}
