import * as path from 'node:path'

import micro_memoize from 'micro-memoize'
import stylize_string from 'chalk'
import assert from '@monorepo-private/assert/v1'
import { ExifDateTime } from 'exiftool-vendored'
import type { Immutable } from '@monorepo-private/ts--types'
import { TimestampUTCMs } from '@monorepo-private/timestamps'
import { NORMALIZERS } from '@monorepo-private/normalize-string'

import {
	FILE_EXTENSIONSⵧTO_BE_FIXED‿LC,
	FILE_EXTENSIONSⵧEXIF_POWERED‿LC,
	NOTES_FILE__BASENAME‿LC,
	DIGIT_PROTECTION_SEPARATOR,
} from '../../consts.js'
import {
	Basename,
	PathⳇRelative,
	SimpleYYYYMMDD,
	TimeZone,
} from '../../types.js'
import { Params, getꓽparams } from '../../params.js'
import logger from '../../services/logger.js'
import {
	getꓽmost_reliable_birthtime_from_fs_stats,
} from '../../services/fs_stats.js'
import {
	getꓽbest_creation_date_from_exif,
	getꓽcreation_timezone_from_exif,
	has_actual_exif_fields,
} from '../../services/exif.js'
import {
	ParseResult,
	getꓽfile_basename_extension‿normalized,
	is_processed_media_basename,
	parse_file_basename,
	pathㆍparse_memoized,
} from '../../services/name_parser.js'
import * as BetterDateLib from '../../services/better-date.js'
import { BetterDate } from '../../services/better-date.js'
import { FileHash } from '../../services/hash.js'
import { is_digit } from '../../services/matchers.js'

import { LIB } from './consts.js'
import {
	State,
	NeighborHints,
	FsReliability,
} from './types.js'
import * as NeighborHintsLib from './sub/neighbor-hints/index.js'
import { getꓽbcd_from_parent_path } from './sub/neighbor-hints/index.js'

////////////////////////////////////

export function getꓽcurrent_relative_path(state: Immutable<State>): PathⳇRelative {
	return state.id
}

export function getꓽcurrent_path‿pparsed(state: Immutable<State>): Immutable<path.ParsedPath> {
	return pathㆍparse_memoized(getꓽcurrent_relative_path(state))
}

export function getꓽcurrent_basename(state: Immutable<State>): Basename {
	return getꓽcurrent_path‿pparsed(state).base
}

export function getꓽoldest_known_basename(state: Immutable<State>): Basename {
	assert(state.are_notes_restored, `getꓽoldest_known_basename() expects notes restored!`)
	return state.notes.historical.basename
}

export function getꓽcurrent_basename‿parsed(state: Immutable<State>): Immutable<ParseResult> {
	return parse_file_basename(getꓽcurrent_basename(state))
}

export function getꓽoldest_known_basename‿parsed(state: Immutable<State>): Immutable<ParseResult> {
	return parse_file_basename(getꓽoldest_known_basename(state))
}

export function getꓽcurrent_extension‿normalized(state: Immutable<State>): string {
	return getꓽfile_basename_extension‿normalized(getꓽcurrent_basename(state))
}

export function getꓽcurrent_parent_folder_id(state: Immutable<State>): PathⳇRelative {
	return getꓽcurrent_path‿pparsed(state).dir || '.'
}

export function getꓽcurrent_top_parent_folder_id(state: Immutable<State>): PathⳇRelative {
	return getꓽcurrent_relative_path(state).split(path.sep)[0] || '.'
}

export function is_notes(state: Immutable<State>): boolean {
	return getꓽcurrent_basename(state).endsWith(NOTES_FILE__BASENAME‿LC)
		|| getꓽcurrent_basename(state).endsWith('.@offirmo-memories-sorter_notes copy.json') // macOs copy
		|| getꓽcurrent_basename(state).endsWith('@offirmo-photos-sorter_notes.json') // legacy name, should exist on author machine only
}

export function has_neighbor_hints(state: Immutable<State>): boolean {
	return state.current_neighbor_hints !== undefined
}

///////

export function is_broken_file(state: Immutable<State>): boolean {

	if (state.are_notes_restored) {
		const parsed_oldest_known_basename = getꓽoldest_known_basename‿parsed(state)
		let extension = parsed_oldest_known_basename.extension_lc
		return FILE_EXTENSIONSⵧTO_BE_FIXED‿LC.includes(extension)
	}

	const current_ext = getꓽcurrent_extension‿normalized(state)
	return FILE_EXTENSIONSⵧTO_BE_FIXED‿LC.includes(current_ext)
}

export function is_media_file(state: Immutable<State>, PARAMS: Immutable<Params> = getꓽparams()): boolean {
	const path_parsed = getꓽcurrent_path‿pparsed(state)

	const is_invisible_file = path_parsed.base.startsWith('.')
	if (is_invisible_file) return false

	let normalized_extension = getꓽcurrent_extension‿normalized(state)
	return PARAMS.extensions_of_media_files‿lc.includes(normalized_extension)
}

export function is_exif_powered_media_file(state: Immutable<State>): boolean {
	if (!is_media_file(state)) return false

	let normalized_extension = getꓽcurrent_extension‿normalized(state)

	return FILE_EXTENSIONSⵧEXIF_POWERED‿LC.includes(normalized_extension)
}

export function is_recoverable_broken_file(state: Immutable<State>): boolean {



	if (!is_broken_file(state))
		return false

	assert(!!state.current_exif_data, `is_recoverable_broken_file() should have EXIF loaded!`)

	return has_actual_exif_fields(state.current_exif_data)
}

export function has_all_infos_for_extracting_the_creation_date(state: Immutable<State>, {
	should_log = true as boolean,
	require_neighbors_hints = true as boolean,
	require_notes = true as boolean,
}): boolean {
	// TODO optim if name = canonical?

	const is_note = is_notes(state)

	const is_exif_available_or_null     = state.current_exif_data      !== undefined
	const are_fs_stats_read             = state.current_fs_stats       !== undefined
	const is_current_hash_computed      = state.current_hash           !== undefined
	const are_neighbors_hints_collected = has_neighbor_hints(state)
	const { are_notes_restored } = state

	const is_exif_requirement_met = is_exif_available_or_null
	const is_fs_stats_requirement_met = are_fs_stats_read
	const is_neighbor_hints_requirement_met = are_neighbors_hints_collected || !require_neighbors_hints
	const is_current_hash_requirement_met = is_current_hash_computed || !require_notes || is_note
	const is_notes_requirement_met = are_notes_restored || !require_notes || is_note

	const has_all_infos = is_exif_requirement_met
		&& is_fs_stats_requirement_met
		&& is_neighbor_hints_requirement_met
		&& is_current_hash_requirement_met
		&& is_notes_requirement_met

	if (!has_all_infos && should_log) {
		// TODO review and remove, valid check most of the time
		logger.warn(`has_all_infos_for_extracting_the_creation_date() !met`, {
			requirements: {
				require_neighbors_hints,
				require_notes,
			},
			data: {
				is_note,
				is_exif_available_if_needed: is_exif_available_or_null,
				are_fs_stats_read,
				is_current_hash_computed,
				are_neighbors_hints_collected,
				are_notes_restored,
			},
			requirements_met: {
				is_exif_requirement_met,
				is_fs_stats_requirement_met,
				is_neighbor_hints_requirement_met,
				is_current_hash_requirement_met,
				is_notes_requirement_met,
			},
		})
	}

	return has_all_infos
}

// primary, in order
function _getꓽcreation_dateⵧfrom_manual(state: Immutable<State>): BetterDate | undefined {
	if (state.notes.manual_date === undefined)
		return undefined

	if (typeof state.notes.manual_date === 'number')
		return BetterDateLib.create_better_date_from_symd(state.notes.manual_date, 'tz:auto')

	return BetterDateLib.create_better_date_obj(state.notes.manual_date)
}
function _getꓽcreation_dateⵧfrom_exif‿edt(state: Immutable<State>): ExifDateTime | undefined {
	const { id, current_exif_data } = state

	assert(!!current_exif_data, `_getꓽcreation_date_from_exif__edt(): ${id} exif data available`)

	try {
		return getꓽbest_creation_date_from_exif(current_exif_data)
	}
	catch (err) {
		logger.fatal(`_getꓽcreation_date_from_exif__edt() error for "${id}"!`, { err })
		throw err
	}
}
function _getꓽcreation_tzⵧfrom_exif(state: Immutable<State>): TimeZone | undefined {
	const { id, current_exif_data } = state

	assert(!!current_exif_data, `_getꓽcreation_tz_from_exif(): ${id} exif data available`)

	try {
		return getꓽcreation_timezone_from_exif(current_exif_data)
	}
	catch (err) {
		logger.fatal(`_getꓽcreation_tz_from_exif() error for "${id}"!`, { err })
		throw err
	}
}
function _getꓽcreation_dateⵧfrom_exif(state: Immutable<State>): BetterDate | undefined {
	const { id, current_exif_data } = state

	assert(current_exif_data !== undefined, `_getꓽcreation_date_from_exif(): ${id} exif data should have been read`)

	if (!is_exif_powered_media_file(state)) {
		assert(current_exif_data === null, `_getꓽcreation_date_from_exif(): ${id} exif data should be null for non-exif media`)
		return undefined
	}

	assert(current_exif_data !== null, `_getꓽcreation_date_from_exif(): ${id} exif data should not be empty for an exif-powered media`)

	const _from_exif‿edt: ExifDateTime | undefined = _getꓽcreation_dateⵧfrom_exif‿edt(state)
	if (!_from_exif‿edt) return undefined

	const _from_exif__tz = _getꓽcreation_tzⵧfrom_exif(state)
	const bcd = BetterDateLib.create_better_date_from_ExifDateTime(_from_exif‿edt, _from_exif__tz)
	/*logger.trace(`_getꓽcreation_date__from_exif() got bcd from EXIF`, {
		//current_exif_data,
		//edt: _from_exif‿edt.toISOString(),
		_from_exif__tz,
		bcd: BetterDateLib.getꓽdebug_representation(bcd),
	})*/
	return bcd
}
function _getꓽcreation_dateⵧfrom_fsⵧoldest_known‿tms(state: Immutable<State>): TimestampUTCMs {
	assert(state.are_notes_restored, `_getꓽcreation_date_from_original_fs_stats() needs notes restored`)
	// TODO one day ignore if we implement FS normalization & historical basename is processed
	return state.notes.historical.fs_bcd_tms
}
export function getꓽcreation_dateⵧfrom_fsⵧcurrent‿tms(state: Immutable<State>): TimestampUTCMs {
	assert(state.current_fs_stats, 'getꓽcreation_dateⵧfrom_fsⵧcurrent‿tms() fs stats collected')
	return getꓽmost_reliable_birthtime_from_fs_stats(state.current_fs_stats)
}
function _getꓽcreation_dateⵧfrom_basename_npⵧoldest_known(state: Immutable<State>): BetterDate | undefined {
	assert(state.are_notes_restored, `_getꓽcreation_date__from_basename_np__oldest_known() needs notes restored`)

	const oldest_known_basename = getꓽoldest_known_basename(state)

	if (is_processed_media_basename(oldest_known_basename)) {
		// this is not the original basename, we lost the info...
		logger.warn(`_getꓽcreation_date__from_basename_np__oldest_known() reporting loss of the original basename`, {
			id: state.id,
			oldest_known_basename,
		})
		return undefined
	}

	const parsed = getꓽoldest_known_basename‿parsed(state)
	return parsed.date
}
function _getꓽcreation_dateⵧfrom_basename_pⵧoldest_known(state: Immutable<State>): BetterDate | undefined {
	assert(state.are_notes_restored, `_getꓽcreation_date__from_basename_p__oldest_known() needs notes restored`)

	const oldest_known_basename = getꓽoldest_known_basename(state)

	if (!is_processed_media_basename(oldest_known_basename)) {
		// cool, ideal case of still knowing the original basename
		return undefined
	}

	// we lost the original basename
	// use this info with caution, since earlier versions of this tool may have had a bad algorithm
	const parsed = getꓽoldest_known_basename‿parsed(state)
	return parsed.date
}
function _getꓽcreation_dateⵧfrom_basename_npⵧcurrent(state: Immutable<State>): BetterDate | undefined {
	if (!is_processed_media_basename(getꓽcurrent_basename(state))) {
		const parsed = getꓽcurrent_basename‿parsed(state)
		if (parsed.date)
			return parsed.date
	}

	return undefined
}
function _getꓽcreation_dateⵧfrom_basename_pⵧcurrent(state: Immutable<State>): BetterDate | undefined {
	if (is_processed_media_basename(getꓽcurrent_basename(state))) {
		const parsed = getꓽcurrent_basename‿parsed(state)
		if (parsed.date)
			return parsed.date
	}

	return undefined
}
// junk
function _getꓽcreation_dateⵧfrom_envⵧoldest_known(state: Immutable<State>): BetterDate | null | undefined {
	assert(state.are_notes_restored, `_getꓽcreation_dateⵧfrom_envⵧoldest_known() needs notes restored`)

	const historical_neighbor_hints = state.notes.historical.neighbor_hints
	if (historical_neighbor_hints.parent_bcd)
		return BetterDateLib.create_better_date_obj(historical_neighbor_hints.parent_bcd)

	return getꓽbcd_from_parent_path(state.notes.historical.parent_path)
}
function _getꓽcreation_dateⵧfrom_envⵧcurrent(state: Immutable<State>): BetterDate | undefined {
	assert(state.current_neighbor_hints, `_getꓽcreation_dateⵧfrom_envⵧcurrent() needs neighbor hints`)

	return NeighborHintsLib.getꓽfallback_junk_bcd(state.current_neighbor_hints)
}

// all together
export type DateConfidence =
	| 'primary' // reliable data coming from the file itself = we can match to an event and rename
	| 'secondary' // reliable data but coming from secondary sources such as folder date or neighbor hints = we can match to an event BUT won't rename
	| 'junk' // we don't even trust sorting this file
export interface BestCreationDate {
	candidate: BetterDate
	source: `${'manual' | 'exif' | 'basename_np' | 'fs' | 'basename_p' | 'parent'}ⵧ${'current' | 'oldest'}${'' | '+fs' | `+neighbor${'✔' | '?' | '✖'}`}`

	confidence: DateConfidence // redundant with 'source' but makes it easier to code / consume
	from_historical: boolean // redundant with 'source' but makes it easier to code / consume
	is_fs_matching: boolean // useful for deciding to fix FS or not TODO use
}

function _reinterpret_with_neighbor_tz_if_not_explicit(date: Immutable<BetterDate>, neighbor_tz: NeighborHints['tz']): Immutable<BetterDate> {
	if (date._has_explicit_timezone)
		return date
	if (!neighbor_tz)
		return date

	assert(!neighbor_tz.startsWith('tz:'), `_reinterpret_with_neighbor_tz_if_not_explicit() strange value`)

	return BetterDateLib.reinterpret_with_different_tz(date, neighbor_tz)
}

// for stability, we try to rely on the oldest known data first and foremost.
// Note that oldest known !== original
// (ideally this func should NOT rely on anything else than TRULY ORIGINAL data)
export const getꓽbest_creation_dateⵧfrom_oldest_known_data‿meta = micro_memoize(function getꓽbest_creation_dateⵧfrom_oldest_known_data‿meta(state: Immutable<State>): BestCreationDate {
	logger.trace(`getꓽbest_creation_dateⵧfrom_oldest_known_data‿meta()`, { id: state.id })

	assert(
		has_all_infos_for_extracting_the_creation_date(state, {
			require_neighbors_hints: false,
			require_notes: true,
		}),
		'getꓽbest_creation_dateⵧfrom_oldest_known_data‿meta() has_all_infos_for_extracting_the_creation_date()'
	)

	// Reminder: may not be the original, many things may have caused a FS date change (incl. our own FS normalization)
	const bcd__from_fs__oldest_known‿tms = _getꓽcreation_dateⵧfrom_fsⵧoldest_known‿tms(state)
	const bcd__from_fs__oldest_known = BetterDateLib.create_better_date_from_utc_tms(bcd__from_fs__oldest_known‿tms, state.current_neighbor_hints?.tz || 'tz:auto')
	assert(bcd__from_fs__oldest_known‿tms === BetterDateLib.getꓽtimestamp_utc_ms_from(bcd__from_fs__oldest_known), `oldest fs tms back and forth stability`)

	const result: BestCreationDate = {
		// so far. safe, init values
		candidate: bcd__from_fs__oldest_known,
		source: 'fsⵧoldest',
		confidence: 'junk',
		from_historical: true,
		is_fs_matching: false,
	}

	/////// PRIMARY SOURCES ///////

	// some good cameras put the date in the file name
	// however it's usually only precise up to the day,
	// so we'll try to get a more precise one from EXIF or FS if matching
	const bcd__from_basename_np__oldest_known: BetterDate | undefined = _getꓽcreation_dateⵧfrom_basename_npⵧoldest_known(state)

	// strongest source
	const bcd__from_exif = _getꓽcreation_dateⵧfrom_exif(state)
	logger.trace('getꓽbest_creation_dateⵧfrom_oldest_known_data‿meta() trying EXIF…', {
		has_candidate: !!bcd__from_exif,
		//...(!!bcd__from_exif && {data: state.current_exif_data}),
	})
	if (bcd__from_exif) {
		// best situation, EXIF is the most reliable
		result.candidate = _reinterpret_with_neighbor_tz_if_not_explicit(bcd__from_exif, state.current_neighbor_hints?.tz)
		result.source = 'exifⵧoldest'
		result.confidence = 'primary'
		result.is_fs_matching = BetterDateLib.are_dates_matching_while_disregarding_tz_and_precision(bcd__from_fs__oldest_known, result.candidate)

		if (bcd__from_basename_np__oldest_known) {
			// cross check
			const auto_from_candidate = BetterDateLib.getꓽhuman_readable_timestamp_auto(result.candidate, 'tz:embedded')
			const auto_from_basename = BetterDateLib.getꓽhuman_readable_timestamp_auto(bcd__from_basename_np__oldest_known, 'tz:embedded')

			if (auto_from_candidate.startsWith(auto_from_basename)) {
				// perfect match, keep EXIF more precise
			}
			else if (BetterDateLib.are_dates_matching_while_disregarding_tz_and_precision(bcd__from_basename_np__oldest_known, result.candidate)) {
				// good enough, keep EXIF more precise
				// TODO evaluate in case of timezone?
			}
			else {
				if (state.notes.manual_date) {
					// normal that basename doesn't match exif, if there is an override it means that EXIF wasn't good/pertinent
				}
				else {
					// this is suspicious, report it
					logger.warn(`getꓽbest_creation_date_meta__from_historical_data() EXIF vs. historical-basename discrepancy`, {
						oldest_known_basename: getꓽoldest_known_basename(state),
						diff: Math.abs(BetterDateLib.getꓽtimestamp_utc_ms_from(bcd__from_exif) - BetterDateLib.getꓽtimestamp_utc_ms_from(bcd__from_basename_np__oldest_known)),
						id: state.id,
						auto_from_basename,
						auto_from_exif: auto_from_candidate,
					})
				}
			}
		}

		logger.trace(`getꓽbest_creation_dateⵧfrom_oldest_known_data‿meta() resolved to ${BetterDateLib.getꓽdebug_representation(result.candidate)} from ${result.source} with confidence = ${result.confidence} ✔`)
		return result
	}

	// second most authoritative source
	logger.trace('getꓽbest_creation_dateⵧfrom_oldest_known_data‿meta() trying basename--NP', { has_candidate: !!bcd__from_basename_np__oldest_known })
	if (bcd__from_basename_np__oldest_known) {
		result.candidate = _reinterpret_with_neighbor_tz_if_not_explicit(bcd__from_basename_np__oldest_known, state.current_neighbor_hints?.tz)
		result.source = 'basename_npⵧoldest'
		result.confidence = 'primary'
		result.is_fs_matching = BetterDateLib.are_dates_matching_while_disregarding_tz_and_precision(bcd__from_fs__oldest_known, result.candidate)

		const auto_from_candidate = BetterDateLib.getꓽhuman_readable_timestamp_auto(result.candidate, 'tz:embedded')
		const auto_from_fs = BetterDateLib.getꓽhuman_readable_timestamp_auto(bcd__from_fs__oldest_known, 'tz:embedded')
		if (auto_from_fs.startsWith(auto_from_candidate)) {
			// perfect match, switch to FS more precise
			result.source = 'basename_npⵧoldest+fs'
			result.candidate = bcd__from_fs__oldest_known
		}
		else if (result.is_fs_matching) {
			// good enough, switch to FS more precise
			// TODO review if tz could be an issue?
			/* TZ is an issue, we only accept perfect matches (case above)
			TODO try to investigate this FS issue
			result.source = 'some_basename_np+fs'
			result.candidate = bcd__from_fs__oldest_known
			 */
		}
		else {
			// FS is notoriously unreliable, don't care when compared to this better source
		}

		logger.trace(`getꓽbest_creation_dateⵧfrom_oldest_known_data‿meta() resolved to ${BetterDateLib.getꓽdebug_representation(result.candidate)} from ${result.source} with confidence = ${result.confidence} ✔`)
		return result
	}

	// FS is ok as PRIMARY if confirmed by some primary hints
	const fs__reliabilityⵧaccording_to_env = NeighborHintsLib.getꓽhistorical_fs_reliability(state.notes.historical.neighbor_hints, bcd__from_fs__oldest_known‿tms)
	logger.trace('getꓽbest_creation_dateⵧfrom_oldest_known_data‿meta() trying FS as primary (if reliable)…', {
		bcd__from_fs__oldest_known: BetterDateLib.getꓽdebug_representation(bcd__from_fs__oldest_known),
		fs__reliabilityⵧaccording_to_env,
	})
	if (fs__reliabilityⵧaccording_to_env === 'reliable') {
		result.candidate = bcd__from_fs__oldest_known
		result.source = 'fsⵧoldest+neighbor✔'
		result.confidence = 'primary'
		result.is_fs_matching = true

		logger.trace(`getꓽbest_creation_dateⵧfrom_oldest_known_data‿meta() resolved to ${BetterDateLib.getꓽdebug_representation(result.candidate)} from ${result.source} with confidence = ${result.confidence} ✔`)
		return result
	}

	// Note: date from parent folder should NEVER make it above secondary

	/////// SECONDARY SOURCES ///////
	// TODO review is that even useful?

	// if oldest known basename is already normalized,
	// it means that
	// 1) we don't know the original basename :-(
	// 2) theoretically if the file was renamed, it means that confidence was high at the time
	//    however it may have been an earlier, inferior version of this tool, so we can't trust it as primary (TODO reconsider in the future?)
	const date__from_basename_p__oldest_known = _getꓽcreation_dateⵧfrom_basename_pⵧoldest_known(state)
	logger.trace('getꓽbest_creation_dateⵧfrom_oldest_known_data‿meta() trying basename (already processed)…', { has_candidate: !!date__from_basename_p__oldest_known })
	if (date__from_basename_p__oldest_known) {
		result.candidate = _reinterpret_with_neighbor_tz_if_not_explicit(date__from_basename_p__oldest_known, state.current_neighbor_hints?.tz)
		result.source = 'basename_pⵧoldest'
		result.confidence = 'secondary' // since we can't guarantee that it's truly from original
		result.is_fs_matching = BetterDateLib.are_dates_matching_while_disregarding_tz_and_precision(bcd__from_fs__oldest_known, result.candidate)

		// normalized is already super precise, no need to refine with FS
		// TODO see if we can migrate by detecting algo improvement?

		logger.trace(`getꓽbest_creation_dateⵧfrom_oldest_known_data‿meta() resolved to ${BetterDateLib.getꓽdebug_representation(result.candidate)} from ${result.source} with confidence = ${result.confidence} ✔`)
		return result
	}

	logger.trace('getꓽbest_creation_dateⵧfrom_oldest_known_data‿meta() trying FS as secondary (if reliability unknown)…', {
		bcd__from_fs__oldest_known: BetterDateLib.getꓽdebug_representation(bcd__from_fs__oldest_known),
		fs__reliabilityⵧaccording_to_env,
	})
	if (fs__reliabilityⵧaccording_to_env === 'unknown') {
		// not that bad
		// we won't rename the file, but good enough to match to an event
		result.candidate = bcd__from_fs__oldest_known
		result.source = 'fsⵧoldest+neighbor?'
		result.confidence = 'secondary'
		result.is_fs_matching = true

		logger.trace(`getꓽbest_creation_date_meta__from_historical_data() resolved to ${BetterDateLib.getꓽdebug_representation(result.candidate)} from ${result.source} with confidence = ${result.confidence} ✔`)
		return result
	}

	// worst secondary choice
	const bcdⵧfrom_parent_folderⵧoldest = _getꓽcreation_dateⵧfrom_envⵧoldest_known(state)
	logger.trace('getꓽbest_creation_dateⵧfrom_oldest_known_data‿meta() trying parent folder…', {
		has_candidate: !!bcdⵧfrom_parent_folderⵧoldest,
		bcdⵧfrom_parent_folderⵧoldest: BetterDateLib.getꓽdebug_representation(bcdⵧfrom_parent_folderⵧoldest),
	})
	if (bcdⵧfrom_parent_folderⵧoldest) {
		// while the parent's date is likely to be several days off
		// it's still useful for sorting into an event
		result.candidate = _reinterpret_with_neighbor_tz_if_not_explicit(bcdⵧfrom_parent_folderⵧoldest, state.current_neighbor_hints?.tz)
		result.source = 'parentⵧoldest'
		result.confidence = 'secondary'
		result.is_fs_matching = BetterDateLib.are_dates_matching_while_disregarding_tz_and_precision(bcd__from_fs__oldest_known, result.candidate)

		logger.trace(`getꓽbest_creation_dateⵧfrom_oldest_known_data‿meta() resolved to ${BetterDateLib.getꓽdebug_representation(result.candidate)} from ${result.source} with confidence = ${result.confidence} ✔`)
		return result
	}

	/////// JUNK SOURCES ///////

	// still the starting default
	assert(result.source === 'fsⵧoldest')
	assert(result.candidate === bcd__from_fs__oldest_known)
	assert(result.confidence === 'junk')
	assert(fs__reliabilityⵧaccording_to_env === 'unreliable')
	result.candidate = bcd__from_fs__oldest_known
	result.source = 'fsⵧoldest+neighbor✖'
	result.is_fs_matching = true // obviously

	logger.trace(`getꓽbest_creation_dateⵧfrom_oldest_known_data‿meta() defaulted to ${BetterDateLib.getꓽdebug_representation(result.candidate)} from ${result.source} with confidence = ${result.confidence} ✔`)
	return result
}, {
	maxSize: 10, // we need 1 or millions. The >1 is for having less noise during unit tests across a few files
	onCacheHit() {
		logger.trace(`getꓽbest_creation_dateⵧfrom_oldest_known_data‿meta()… [memoized hit]`)
	}
})

// used on 1st stage consolidation => it should be able to work without hints and notes
// info may be overriden by notes later
// useful for files we encounter for the first time
export const getꓽbest_creation_dateⵧfrom_current_data‿meta = micro_memoize(function getꓽbest_creation_dateⵧfrom_current_data‿meta(state: Immutable<State>): BestCreationDate {
	logger.trace(`getꓽbest_creation_dateⵧfrom_current_data‿meta()`, { id: state.id })

	assert(
		has_all_infos_for_extracting_the_creation_date(state, {
			should_log: true,
			require_notes: false,
			require_neighbors_hints: false,
		}),
		'getꓽbest_creation_dateⵧfrom_current_data‿meta() has_all_infos_for_extracting_the_creation_date()'
	)

	const bcd__from_fs__current‿tms = getꓽcreation_dateⵧfrom_fsⵧcurrent‿tms(state)
	const bcd__from_fs__current = BetterDateLib.create_better_date_from_utc_tms(bcd__from_fs__current‿tms, state.current_neighbor_hints?.tz || 'tz:auto')
	assert(bcd__from_fs__current‿tms === BetterDateLib.getꓽtimestamp_utc_ms_from(bcd__from_fs__current), `current fs tms back and forth stability`)

	const result: BestCreationDate = {
		candidate: bcd__from_fs__current,
		source: 'fsⵧcurrent',
		confidence: 'junk',
		from_historical: false, // always in this func
		is_fs_matching: false, // init value
	}

	/////// PRIMARY SOURCES ///////

	// some good cameras put the date in the file name
	// however it's usually only precise up to the day,
	// so we'll still try to get a more precise one from EXIF or FS if matching
	const bcd__from_basename_np__current: BetterDate | undefined = _getꓽcreation_dateⵧfrom_basename_npⵧcurrent(state)

	// strongest source
	const bcd__from_exif = _getꓽcreation_dateⵧfrom_exif(state)
	logger.trace('getꓽbest_creation_dateⵧfrom_current_data‿meta() trying EXIF…', {
		has_candidate: !!bcd__from_exif,
		//...(!!bcd__from_exif && {data: state.current_exif_data}),
	})
	if (bcd__from_exif) {
		// best situation, EXIF is the most reliable
		result.candidate = _reinterpret_with_neighbor_tz_if_not_explicit(bcd__from_exif, state.current_neighbor_hints?.tz)
		result.source = 'exifⵧcurrent'
		result.confidence = 'primary'
		result.is_fs_matching = BetterDateLib.are_dates_matching_while_disregarding_tz_and_precision(bcd__from_fs__current, result.candidate)

		// cross-check the date from basename if any
		if (bcd__from_basename_np__current) {
			const auto_from_candidate = BetterDateLib.getꓽhuman_readable_timestamp_auto(result.candidate, 'tz:embedded')
			const auto_from_np_basename = BetterDateLib.getꓽhuman_readable_timestamp_auto(bcd__from_basename_np__current, 'tz:embedded')

			if (auto_from_candidate.startsWith(auto_from_np_basename)) {
				// perfect match + EXIF more precise
			}
			else if (BetterDateLib.are_dates_matching_while_disregarding_tz_and_precision(bcd__from_basename_np__current, result.candidate)) {
				// good enough, keep EXIF
				// TODO evaluate in case of timezone?
			}
			else {
				if (state.notes.manual_date) {
					// normal that basename doesn't match exif, if there is an override it means that EXIF wasn't good/pertinent
				}
				else {
					// this is suspicious, report it
					logger.warn(`_getꓽbest_creation_date_meta__from_current_data() EXIF/np-basename discrepancy`, {
						basename: getꓽcurrent_basename(state),
						//oldest_known_basename: getꓽoldest_known_basename(state),
						diff: Math.abs(BetterDateLib.getꓽtimestamp_utc_ms_from(bcd__from_exif) - BetterDateLib.getꓽtimestamp_utc_ms_from(bcd__from_basename_np__current)),
						id: state.id,
						auto_from_np_basename,
						auto_from_exif: auto_from_candidate,
					})
				}
			}
		}

		logger.trace(`getꓽbest_creation_dateⵧfrom_current_data‿meta() resolved to ${BetterDateLib.getꓽdebug_representation(result.candidate)} from ${result.source} with confidence = ${result.confidence} ✔`)
		return result
	}

	// second most authoritative source
	logger.trace('getꓽbest_creation_dateⵧfrom_current_data‿meta() trying current basename--NP…', { has_candidate: !!bcd__from_basename_np__current })
	if (bcd__from_basename_np__current) {
		result.candidate = _reinterpret_with_neighbor_tz_if_not_explicit(bcd__from_basename_np__current, state.current_neighbor_hints?.tz)
		result.source = 'basename_npⵧcurrent'
		result.confidence = 'primary'
		result.is_fs_matching = BetterDateLib.are_dates_matching_while_disregarding_tz_and_precision(bcd__from_fs__current, result.candidate)

		const auto_from_candidate = BetterDateLib.getꓽhuman_readable_timestamp_auto(result.candidate, 'tz:embedded')
		const auto_from_fs = BetterDateLib.getꓽhuman_readable_timestamp_auto(bcd__from_fs__current, 'tz:embedded')
		if (auto_from_fs.startsWith(auto_from_candidate)) {
			// perfect match, switch to FS more precise
			result.source = 'basename_npⵧcurrent+fs'
			result.candidate = bcd__from_fs__current
		}
		else if (result.is_fs_matching) {
			// good enough, switch to FS more precise
			// TODO review if tz could be an issue?
			/* TZ is an issue, we only accept perfect matches (case above)
			TODO try to investigate this FS issue
			result.source = 'some_basename_np+fs'
			result.candidate = bcd__from_fs__current
			 */
		}
		else {
			// FS is notoriously unreliable, don't care when compared to this better source
		}

		logger.trace(`getꓽbest_creation_dateⵧfrom_current_data‿meta() resolved to ${BetterDateLib.getꓽdebug_representation(result.candidate)} from ${result.source} with confidence = ${result.confidence} ✔`)
		return result
	}

	// FS is ok as PRIMARY if confirmed by some primary hints
	// Note that hints are secondary but the main data is truely primary
	if (state.current_neighbor_hints) {
		const fs__reliabilityⵧaccording_to_env = _getꓽcurrent_fs_reliability_according_to_own_and_env(state)
		logger.trace('getꓽbest_creation_dateⵧfrom_current_data‿meta() trying FS as primary (if reliable)…', {
			bcd__from_fs__current: BetterDateLib.getꓽdebug_representation(bcd__from_fs__current),
			current_neighbor_hints: NeighborHintsLib.getꓽdebug_representation(state.current_neighbor_hints),
			current_fs_reliability: fs__reliabilityⵧaccording_to_env,
			expected: 'reliable'
		})

		if (fs__reliabilityⵧaccording_to_env === 'reliable') {
			result.candidate = bcd__from_fs__current
			result.source = 'fsⵧcurrent+neighbor✔'
			result.confidence = 'primary'
			result.is_fs_matching = true

			logger.trace(`getꓽbest_creation_dateⵧfrom_current_data‿meta() resolved to ${BetterDateLib.getꓽdebug_representation(result.candidate)} from ${result.source} with confidence = ${result.confidence} ✔`)
			return result
		}
	}

	// Note: date from parent folder should NEVER make it above secondary

	/////// SECONDARY SOURCES ///////

	// if historical or current basename is already normalized,
	// since we only normalize on primary source of trust,
	// we trust our past self which may have had more info at the time
	// however we don't entirely trust (ex. old algorithm with bugs), so the confidence is downgraded to secondary
	const date__from_basename_p__current = _getꓽcreation_dateⵧfrom_basename_pⵧcurrent(state)
	logger.trace('getꓽbest_creation_dateⵧfrom_current_data‿meta() trying current basename--P…', { has_candidate: !!date__from_basename_p__current })
	if (date__from_basename_p__current) {
		result.candidate = _reinterpret_with_neighbor_tz_if_not_explicit(date__from_basename_p__current, state.current_neighbor_hints?.tz)
		result.source = 'basename_pⵧcurrent'
		result.confidence = 'secondary' // since we can't guarantee that it's truly from original + unsure we can trust a past algo
		result.is_fs_matching = BetterDateLib.are_dates_matching_while_disregarding_tz_and_precision(bcd__from_fs__current, result.candidate)

		// normalized is already super precise, no need to refine with FS

		logger.trace(`getꓽbest_creation_dateⵧfrom_current_data‿meta() resolved to ${BetterDateLib.getꓽdebug_representation(result.candidate)} from ${result.source} with confidence = ${result.confidence} ✔`)
		return result
	}

	// borderline secondary/junk
	logger.trace('getꓽbest_creation_dateⵧfrom_current_data‿meta() trying env hints…', {
		current_neighbor_hints: NeighborHintsLib.getꓽdebug_representation(state.current_neighbor_hints),
	})
	if (state.current_neighbor_hints) {
		const current_fs_reliability = _getꓽcurrent_fs_reliability_according_to_own_and_env(state)
		logger.trace('getꓽbest_creation_dateⵧfrom_current_data‿meta() trying FS as secondary (if reliability unknown)…', {
			bcd__from_fs__current: BetterDateLib.getꓽdebug_representation(bcd__from_fs__current),
			//current_neighbor_hints: state.current_neighbor_hints,
			current_fs_reliability,
			expected: 'unknown'
		})
		if (current_fs_reliability === 'unknown') {
			result.candidate = bcd__from_fs__current
			result.source = 'fsⵧcurrent+neighbor?'
			result.confidence = 'secondary'
			result.is_fs_matching = true

			logger.trace(`getꓽbest_creation_dateⵧfrom_current_data‿meta() resolved to ${BetterDateLib.getꓽdebug_representation(result.candidate)} from ${result.source} with confidence = ${result.confidence} ✔`)
			return result
		}

		// borderline secondary/junk
		// the user may have manually sorted the file into the right folder
		// why secondary and not junk? -> to keep the file in its current folder
		const bcdⵧfrom_parent_folderⵧcurrent = _getꓽcreation_dateⵧfrom_envⵧcurrent(state)
		logger.trace('getꓽbest_creation_dateⵧfrom_current_data‿meta() trying parent folder…', {
			has_candidate: !!bcdⵧfrom_parent_folderⵧcurrent,
			bcdⵧfrom_parent_folderⵧcurrent: BetterDateLib.getꓽdebug_representation(bcdⵧfrom_parent_folderⵧcurrent),
		})
		if (bcdⵧfrom_parent_folderⵧcurrent) {
			result.candidate = _reinterpret_with_neighbor_tz_if_not_explicit(bcdⵧfrom_parent_folderⵧcurrent, state.current_neighbor_hints?.tz)
			result.source = 'parentⵧcurrent'
			result.confidence = 'secondary'
			result.is_fs_matching = BetterDateLib.are_dates_matching_while_disregarding_tz_and_precision(bcd__from_fs__current, result.candidate)
			assert(!result.is_fs_matching, `getꓽbest_creation_date_meta__from_current_data() if FS matches why wasn't it taken as source??`)

			logger.trace(`getꓽbest_creation_dateⵧfrom_current_data‿meta() resolved to ${BetterDateLib.getꓽdebug_representation(result.candidate)} from ${ result.source } with confidence = ${ result.confidence } ✔`)
			return result
		}
	}

	/////// JUNK SOURCE ///////

	// default to fs
	assert(result.source === 'fsⵧcurrent')
	assert(result.candidate === bcd__from_fs__current)
	assert(result.confidence === 'junk')
	if (state.current_neighbor_hints) {
		const current_fs_reliability = _getꓽcurrent_fs_reliability_according_to_own_and_env(state)
		assert(current_fs_reliability === 'unreliable')
		result.source = 'fsⵧcurrent+neighbor✖'
	}

	logger.trace(`getꓽbest_creation_dateⵧfrom_current_data‿meta() defaulted to ${BetterDateLib.getꓽdebug_representation(result.candidate)} from ${ result.source } with confidence = ${ result.confidence } ✔`)
	return result
}, {
	maxSize: 10, // we need 1 or millions. The >1 is for having less noise during unit tests across a few files
	onCacheHit() {
		logger.trace(`getꓽbest_creation_dateⵧfrom_current_data‿meta()… [memoized hit]`)
	}
})


// Best creation date overall
// mixes the best info from historical and current + takes into account "manual"
export const getꓽbest_creation_date‿meta = micro_memoize(function getꓽbest_creation_date_meta(state: Immutable<State>): BestCreationDate {
	logger.trace(`getꓽbest_creation_date‿meta()`, { id: state.id })

	assert(
		has_all_infos_for_extracting_the_creation_date(state, {
			require_neighbors_hints: true,
			require_notes: true,
		}),
		'getꓽbest_creation_date‿meta() has_all_infos_for_extracting_the_creation_date()'
	)

	const bcd__from_fs__oldest_known‿tms = _getꓽcreation_dateⵧfrom_fsⵧoldest_known‿tms(state)
	const bcd__from_fs__oldest_known = BetterDateLib.create_better_date_from_utc_tms(bcd__from_fs__oldest_known‿tms, state.current_neighbor_hints?.tz || 'tz:auto')
	assert(bcd__from_fs__oldest_known‿tms === BetterDateLib.getꓽtimestamp_utc_ms_from(bcd__from_fs__oldest_known), `original fs tms back and forth stability`)

	const result: BestCreationDate = {
		candidate: bcd__from_fs__oldest_known,
		source: 'fsⵧoldest',
		confidence: 'junk',
		from_historical: false,
		is_fs_matching: false, // init value
	}

	/////// PRIMARY SOURCES ///////

	// the strongest indicator = explicit user's will
	const bcd__from_manual = _getꓽcreation_dateⵧfrom_manual(state)
	logger.trace('getꓽbest_creation_date‿meta() trying manual…')
	if (bcd__from_manual) {
		result.candidate = _reinterpret_with_neighbor_tz_if_not_explicit(bcd__from_manual, state.current_neighbor_hints?.tz)
		result.source = 'manualⵧcurrent'
		result.confidence = 'primary'
		result.is_fs_matching = BetterDateLib.are_dates_matching_while_disregarding_tz_and_precision(bcd__from_manual, result.candidate)

		logger.trace(`getꓽbest_creation_date‿meta() resolved to ${BetterDateLib.getꓽdebug_representation(result.candidate)} from ${ result.source } with confidence = ${ result.confidence } ✔`)
		return result
	}

	// then rely on original data as much as possible
	logger.trace('getꓽbest_creation_date‿meta() trying historical data…')
	const meta__from_oldest_known = getꓽbest_creation_dateⵧfrom_oldest_known_data‿meta(state)
	if (meta__from_oldest_known.confidence === 'primary') {
		logger.trace(`getꓽbest_creation_date‿meta() resolved to ${BetterDateLib.getꓽdebug_representation(meta__from_oldest_known.candidate)} from ${result.source} of oldest data result ✔ (primary)`)
		return meta__from_oldest_known
	}

	// strongest source after "manual"
	// BUT redundant with "oldest known"
	const bcd__from_exif = _getꓽcreation_dateⵧfrom_exif(state)
	assert(!bcd__from_exif, `getꓽbest_creation_date‿meta() EXIF should have already been covered by "oldest known"`)

	logger.trace('getꓽbest_creation_date‿meta() trying current data…')
	const meta__from_current = getꓽbest_creation_dateⵧfrom_current_data‿meta(state)
	if (meta__from_current.confidence === 'primary') {
		logger.trace(`getꓽbest_creation_date‿meta() resolved to ${BetterDateLib.getꓽdebug_representation(meta__from_current.candidate)} from ${result.source} of current data result ✔ (primary)`)
		return meta__from_current
	}

	// Reminder: FS is handled by the "_historical()" selector
	// if not triggered, means current FS is not original hence not primary

	// Note: date from parent folder should NEVER make it above secondary

	/////// SECONDARY SOURCES ///////
	// for secondary source, it's the "current" which has priority

	if (meta__from_current.confidence === 'secondary') {
		logger.trace(`getꓽbest_creation_date‿meta() resolved to ${BetterDateLib.getꓽdebug_representation(meta__from_current.candidate)} from ${result.source} of current data result ✔ (secondary)`)
		return meta__from_current
	}

	if (meta__from_oldest_known.confidence === 'secondary') {
		logger.trace(`getꓽbest_creation_date‿meta() resolved to ${BetterDateLib.getꓽdebug_representation(meta__from_oldest_known.candidate)} from ${result.source} of oldest data result ✔ (secondary)`)
		return meta__from_oldest_known
	}

	/////// JUNK SOURCE ///////

	// at this level, historical is still better
	logger.trace(`getꓽbest_creation_date‿meta() defaulted to ${BetterDateLib.getꓽdebug_representation(meta__from_oldest_known.candidate)} from ${result.source} of oldest data result ✔ (junk)`)
	return meta__from_oldest_known
}, {
	maxSize: 10, // we need 1 or millions. The >1 is for having less noise during unit tests across a few files
	onCacheHit() {
		logger.trace(`getꓽbest_creation_date_meta()… [memoized hit]`)
	}
})

export function getꓽbest_tz(state: Immutable<State>): TimeZone {
	return state.current_neighbor_hints?.tz
		|| BetterDateLib.getꓽembedded_timezone(getꓽbest_creation_date‿meta(state).candidate)
}

// TODO: allow to suggest a tz?
export function getꓽbest_creation_date(state: Immutable<State>): BetterDate {
	const meta = getꓽbest_creation_date‿meta(state)
	return meta.candidate
}

export function _getꓽbest_creation_date‿compact(state: Immutable<State>, suggested_tz = getꓽbest_tz(state)): SimpleYYYYMMDD {
	return BetterDateLib.getꓽcompact_date(getꓽbest_creation_date(state), suggested_tz)
}

export function getꓽbest_creation_date__year(state: Immutable<State>, suggested_tz = getꓽbest_tz(state)): number {
	return Math.trunc(_getꓽbest_creation_date‿compact(state, suggested_tz) / 10000)
}

function _is_confident_in_date(state: Immutable<State>, up_to: DateConfidence): boolean {
	const meta = getꓽbest_creation_date‿meta(state)
	const { confidence } = meta

	let is_confident = false
	switch (confidence) {
		case 'primary':
			is_confident = true
			break

		case 'secondary':
			is_confident = (up_to === 'secondary')
			break

		case 'junk':
			is_confident = false
			break
	}

	if (!is_confident) {
		logger.warn(`getꓽconfidence_in_date() low confidence`, {
			id: state.id,
			up_to,
			meta: {
				...meta,
				candidate: BetterDateLib.getꓽdebug_representation(meta.candidate),
			},
		})
	}

	return is_confident
}
export function is_confident_in_date_enough_to__fix_fs(state: Immutable<State>): boolean {
	return _is_confident_in_date(state, 'primary')
}
export function is_confident_in_date_enough_to__sort(state: Immutable<State>): boolean {
	return _is_confident_in_date(state, 'secondary')
}

export function getꓽcreation_dateⵧfrom_fsⵧcurrent__reliability_according_to_our_own_trustable_current_primary_date_sources(state: Immutable<State>): FsReliability {
	const bcdⵧfrom_fsⵧcurrent‿tms = getꓽcreation_dateⵧfrom_fsⵧcurrent‿tms(state)
	const bcdⵧfrom_fsⵧcurrent = BetterDateLib.create_better_date_from_utc_tms(bcdⵧfrom_fsⵧcurrent‿tms, state.current_neighbor_hints?.tz || 'tz:auto')

	// TODO when we start doing FS normalization, detect it and return undefined

	const bcdⵧfrom_exif = _getꓽcreation_dateⵧfrom_exif(state)
	if (bcdⵧfrom_exif) {
		if (BetterDateLib.are_dates_matching_while_disregarding_tz_and_precision(bcdⵧfrom_fsⵧcurrent, bcdⵧfrom_exif, state.id))
			return 'reliable'
	}

	const bcdⵧfrom_basename_npⵧcurrent = _getꓽcreation_dateⵧfrom_basename_npⵧcurrent(state)
	if(bcdⵧfrom_basename_npⵧcurrent) {
		if (BetterDateLib.are_dates_matching_while_disregarding_tz_and_precision(bcdⵧfrom_fsⵧcurrent, bcdⵧfrom_basename_npⵧcurrent, state.id))
			return 'reliable'
	}

	const is_fs_suspicious = bcdⵧfrom_fsⵧcurrent‿tms < 31535999000 // must be after year 1970. Year 1970 is suspicious as it's the origin of unix timestamps = suspicious of timestamp reset to 0

	if (!bcdⵧfrom_exif && !bcdⵧfrom_basename_npⵧcurrent) {
		// we only have fs
		// does it looks reliable?
		if (!is_fs_suspicious)
			return 'unknown'
	}

	// TODO attach to file state
	logger.silly('⚠️ getꓽcreation_date__reliability_according_to_other_trustable_current_primary_date_sourcesⵧfrom_fsⵧcurrent() is yielding FALSE', {
		id: state.id,
		is_fs_suspicious,
		bcd__from_fs__current: BetterDateLib.getꓽdebug_representation(bcdⵧfrom_fsⵧcurrent‿tms),
		bcd__from_exif: BetterDateLib.getꓽdebug_representation(bcdⵧfrom_exif),
		bcd__from_basename__current_non_processed: BetterDateLib.getꓽdebug_representation(bcdⵧfrom_basename_npⵧcurrent),
		//current_exif_data: state.current_exif_data,
	})

	return 'unreliable'
}

export function _getꓽcurrent_fs_reliability_according_to_own_and_env(
	state: Immutable<State>,
	PARAMS: Immutable<Params> = getꓽparams(),
	neighbor_hints: Immutable<NeighborHints> = state.current_neighbor_hints!,
): FsReliability {
	assert(neighbor_hints, `_getꓽcurrent_fs_assessed_reliability() should be called with neighbor hints`)

	// first look at ourself
	const self_assessed_reliability = getꓽcreation_dateⵧfrom_fsⵧcurrent__reliability_according_to_our_own_trustable_current_primary_date_sources(state)
	if (self_assessed_reliability !== 'unknown') {
		logger.trace(`_getꓽcurrent_fs_assessed_reliability() current fs reliability has been assessed to "${self_assessed_reliability}" from self`)
		return self_assessed_reliability
	}

	// unclear reliability so far, let's try to infer one from our neighbors
	const bcdⵧfrom_fsⵧcurrent‿tms = getꓽcreation_dateⵧfrom_fsⵧcurrent‿tms(state)
	const reliability_according_to_neighbors = NeighborHintsLib.is_candidate_fs_bcd_looking_reliable_according_to_neighbor_hints(neighbor_hints, bcdⵧfrom_fsⵧcurrent‿tms)
	logger.trace(`_getꓽcurrent_fs_reliability_according_to_own_and_env() current fs reliability has been assessed to "${reliability_according_to_neighbors}"`)
	return reliability_according_to_neighbors
}

export function getꓽideal_basename(state: Immutable<State>, {
	PARAMS = getꓽparams(),
	copy_marker = 'none',
	requested_confidence = true, // unit tests
}: {
	PARAMS?: Immutable<Params>
	requested_confidence?: boolean
	copy_marker?: 'none' | 'preserve' | 'temp' | number
} = {}): Basename {
	const parsed_oldest_known_basename = getꓽoldest_known_basename‿parsed(state)
	const meaningful_part = parsed_oldest_known_basename.meaningful_part
	let extension = parsed_oldest_known_basename.extension_lc
	extension = PARAMS.extensions_to_normalize‿lc[extension] || extension

	logger.trace(`${LIB} getꓽideal_basename()`, {
		is_media_file: is_media_file(state),
		parsed_oldest_known_basename: (() => {
			const { date, ...rest } = parsed_oldest_known_basename
			return {
				...rest,
				date: BetterDateLib.getꓽdebug_representation(date),
			}
		})(),
	})

	let result = meaningful_part // so far. REM: it can be empty (ex. photo.jpg = 0 meaningful part)
	if (meaningful_part.endsWith(')')) {
		logger.warn('⚠️⚠️⚠️ TODO check meaningful_part.endsWith copy index??', { current_id: state.id, parsed_oldest_known_basename })
	}

	if (is_media_file(state)) {
		const bcd_meta = getꓽbest_creation_date‿meta(state)

		switch (bcd_meta.confidence) {
			case 'junk':
				break
			// @ts-ignore
			case 'secondary':
				if (requested_confidence && !is_processed_media_basename(getꓽcurrent_basename(state))) {
					// not confident enough in getting the date, can't add the date
					break
				}
			/* fallthrough */
			case 'primary':
			/* fallthrough */
			default:
				const bcd = bcd_meta.candidate
				const prefix = 'MM' + BetterDateLib.getꓽhuman_readable_timestamp_auto(bcd, getꓽbest_tz(state))
				if (is_digit(result[0])) {
					// protection to prevent future executions to parse the meaningful part as DD/HH/MM/SS
					result = DIGIT_PROTECTION_SEPARATOR + result
				}
				result = [ prefix, result ].filter(s => !!s).join('_') // take into account chance of result being empty so far
		}
	}

	switch (copy_marker) {
		case 'none':
			break
		case 'preserve':
			if (parsed_oldest_known_basename.copy_index)
				result += ` (${parsed_oldest_known_basename.copy_index})`
			break
		case 'temp':
			result += ` (temp)`
			break
		default:
			if (copy_marker)
				result += ` (${copy_marker})`
			break
	}

	if (!result) {
		// it's possible if nothing meaningful in the name + not confident in date
		result = 'memory'
	}

	if (is_recoverable_broken_file(state)) {
		// TODO improve, good enough for now
		extension = '.jpg'
	}

	result += extension

	return NORMALIZERS.trim(NORMALIZERS.normalize_unicode(result))
}

export function getꓽhash(state: Immutable<State>): FileHash | undefined {
	return state.current_hash
}

///////////////////// DEBUG /////////////////////

export function to_string(state: Immutable<State>) {
	const { id } = state
	const is_eligible = is_media_file(state)
	const path_parsed = getꓽcurrent_path‿pparsed(state)
	const { dir, base } = path_parsed

	let str = `🏞  "${[ '.', ...(dir ? [dir] : []), (is_eligible ? stylize_string.green : stylize_string.gray.dim)(base)].join(path.sep)}"`

	if (is_eligible) {
		if (!has_all_infos_for_extracting_the_creation_date(state, { should_log: false })) {
			str += ' ⏳processing in progress…'
		}
		else {
			const ideal_basename = getꓽideal_basename(state)
			if (base === ideal_basename)
				str += '✅'
			else
				str += ` 📅 -> "${ideal_basename}"`
		}
	}

	if (base !== state.notes.historical.basename || dir !== state.notes.historical.parent_path) {
		// historically known as
		str += ` (Note: HKA "${state.notes.historical.parent_path}/${state.notes.historical.basename}")`
	}

	return stylize_string.gray.dim(str)
}
