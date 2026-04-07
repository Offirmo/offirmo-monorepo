import path from 'path'
import assert from '@monorepo-private/assert/v1'
import stylize_string from 'chalk'
import type { Immutable } from '@monorepo-private/ts--types'
import { NORMALIZERS } from '@monorepo-private/normalize-string'
import micro_memoize from 'micro-memoize'

import { DIGIT_PROTECTION_SEPARATOR } from '../../consts.js'
import { Basename, PathⳇRelative, SimpleYYYYMMDD, TimeZone } from '../../types.js'
import logger from '../../services/logger.js'
import { is_digit } from '../../services/matchers.js'
import {
	parse_folder_basename,
	ParseResult,
	pathㆍparse_memoized,
	is_folder_basename__matching_a_processed_event_format,
} from '../../services/name_parser.js'
import * as BetterDateLib from '../../services/better-date.js'
import { BetterDate, compare_utc, DateRange } from '../../services/better-date.js'
import { FsReliability, NeighborHints } from '../file/index.js'
import * as FileLib from '../file/index.js'

import {
	LIB,
} from './consts.js'
import {
	Type,
	State,
} from './types.js'
import { getꓽtimezoneⵧdefault, getꓽparams, Params } from '../../params.js'

////////////////////////////////////

export const ERROR__RANGE_TOO_BIG = `Folder: range is too big!`

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

export function getꓽcurrent_basename‿parsed(state: Immutable<State>): Immutable<ParseResult> {
	return parse_folder_basename(getꓽcurrent_basename(state))
}

export function getꓽdepth(data: Immutable<State> | Immutable<path.ParsedPath>): number {
	const pathㆍparsed = (data as any).base
		? (data as Immutable<path.ParsedPath>)
		: getꓽcurrent_path‿pparsed(data as Immutable<State>)

	return pathㆍparsed.dir
		? pathㆍparsed.dir.split(path.sep).length
		: 0
}

export function is_pass_1_data_available_for_all_children(state: Immutable<State>): boolean {
	//assert(state.media_children_pass_1_count === state.media_children_count, `is_data_gathering_pass_1_done() child# should equal p1#`)
	return state.media_children_pass_1_count === state.media_children_count
}
export function is_pass_2_data_available_for_all_children(state: Immutable<State>): boolean {
	//assert(state.media_children_pass_2_count === state.media_children_count, `is_data_gathering_pass_2_done() should p2# should equal child#`)
	return state.media_children_pass_2_count === state.media_children_count
}

function _getꓽchildren_fs_reliability(state: Immutable<State>): FsReliability {
	assert(is_pass_1_data_available_for_all_children(state), `${LIB} _getꓽchildren_fs_reliability() pass 1 should be fully done`)
	assert(
		state.media_children_count === 0
			+ state.media_children_fs_reliability_count['unknown']
			+ state.media_children_fs_reliability_count['unreliable']
			+ state.media_children_fs_reliability_count['reliable'],
		`${LIB} _getꓽchildren_fs_reliability() mismatching counts`
	)

	if (state.media_children_fs_reliability_count['unreliable'] > 0)
		return 'unreliable'

	if (state.media_children_fs_reliability_count['reliable'] > 0)
		return 'reliable'

	return 'unknown'
}

export function _getꓽcurrent_best_children_range(state: Immutable<State>): undefined | Immutable<DateRange> {
	assert(is_pass_1_data_available_for_all_children(state), `_getꓽcurrent_best_children_range() at least pass 1 should be complete`)

	if (is_pass_2_data_available_for_all_children(state) && state.media_children_bcd_ranges.from_primaryⵧfinal) {
		return state.media_children_bcd_ranges.from_primaryⵧfinal
	}

	if (is_pass_1_data_available_for_all_children(state) && state.media_children_bcd_ranges.from_primaryⵧcurrentⵧphase_1) {
		return state.media_children_bcd_ranges.from_primaryⵧcurrentⵧphase_1
	}

	if (state.media_children_bcd_ranges.from_fsⵧcurrent) {
		// this range is suspicious, let's check it
		const is_fs_valuable = _getꓽchildren_fs_reliability(state) !== 'unreliable'
		if (is_fs_valuable) {
			return {
				begin: BetterDateLib.create_better_date_from_utc_tms(state.media_children_bcd_ranges.from_fsⵧcurrent.begin, getꓽtz(state, 'fallback:none') || 'tz:auto'),
				end: BetterDateLib.create_better_date_from_utc_tms(state.media_children_bcd_ranges.from_fsⵧcurrent.end, getꓽtz(state, 'fallback:none') || 'tz:auto'),
			}
		}
	}

	return undefined
}

export const getꓽevent_range = micro_memoize(function _getꓽevent_range(state: Immutable<State>, ): DateRange | null | undefined {
	if (state.type !== Type.event && state.type !== Type.overlapping_event)
		return null

	if (state.forced_event_range) {
		return state.forced_event_range
	}

	assert(is_pass_1_data_available_for_all_children(state), `getꓽevent_range() should not be called too early for fear of incomplete results! ("${state.id}")`)

	if (is_looking_like_a_backup(state))
		return null

	const event_beginⵧfrom_folder_basename = getꓽevent_begin_date_from_basename_if_present_and_confirmed_by_other_sources(state)

	const children_range = _getꓽcurrent_best_children_range(state)

	let event_begin_date = event_beginⵧfrom_folder_basename // always have priority if present
		?? children_range?.begin

	if (!event_begin_date) {
		// refine the return value (TODO review)
		return (event_beginⵧfrom_folder_basename === null || children_range === null)
			? null
			: undefined
	}

	// TODO REVIEW (done elsewhere, needed here?)
	/*if (!event_beginⵧfrom_folder_basename) {
		if (getꓽday_of_week_index(event_begin_date) === 0) {
			// sunday is coalesced to sat = start of weekend
			event_begin_date = add_days(event_begin_date, -1)
		}
	}*/

	const PARAMS = getꓽparams()
	const capped_end_date = BetterDateLib.add_days(event_begin_date, PARAMS.event_durationⵧmax‿ₓday)

	let event_end_date = children_range?.end ?? capped_end_date // for now

	const is_range_too_big = BetterDateLib.compare_utc(event_end_date, capped_end_date) > 0

	if (is_range_too_big && !is_current_basename_intentful_of_event_start(state)) {
		logger.info(
			`${LIB} folder: date range too big, most likely not an event, should demote...`, {
				id: state.id,
				tentative_event_begin_date: BetterDateLib.getꓽdebug_representation(event_begin_date),
				tentative_event_end_date: BetterDateLib.getꓽdebug_representation(event_end_date),
			})
		throw new Error(ERROR__RANGE_TOO_BIG) // should be caught by caller
	}

	if (is_range_too_big) {
		logger.debug(
			`${LIB} folder: date range too big but basename is intentful: event end date will be capped at +${PARAMS.event_durationⵧmax‿ₓday}d`, {
				id: state.id,
				new_event_begin_date: BetterDateLib.getꓽdebug_representation(event_begin_date),
				new_event_end_date: BetterDateLib.getꓽdebug_representation(event_end_date),
				new_event_end_date__capped: BetterDateLib.getꓽdebug_representation(capped_end_date),
			})
	}

	event_end_date = BetterDateLib.min(event_end_date, capped_end_date)

	return {
			begin: event_begin_date,
			end: event_end_date,
		}
})

export function getꓽevent_begin_date(state: Immutable<State>): Immutable<BetterDate> {
	assert(state.type === Type.event || state.type === Type.overlapping_event, `${LIB} getꓽevent_begin_date() should be called on an ~event`)
	const range = getꓽevent_range(state)
	assert(range, `${LIB} getꓽevent_begin_date([event]"${state.id}") should have a date range!`)

	return range.begin
}
export function getꓽevent_end_date(state: Immutable<State>): Immutable<BetterDate> {
	assert(state.type === Type.event || state.type === Type.overlapping_event, `${LIB} getꓽevent_end_date() should be called on an ~event`)
	const range = getꓽevent_range(state)
	assert(range, `${LIB} getꓽevent_end_date() should have a date range!`)

	return range.end
}

// get the best folder tz we know
// can be called at any time, should not cause infinite loops.
// Because a tz can't always be computed, fallback instructions should be provided
export function getꓽtz(state: Immutable<State>, fallback: 'fallback:none' | 'fallback:resolved_auto', date_for_auto?: Immutable<BetterDate>): TimeZone | undefined {
	const tz = state.media_children_aggregated_tz
	assert(tz !== 'tz:embedded', `aggregated tz should never = tz:embedded!`)
	if (tz && tz !== 'tz:auto')
		return tz

	assert(tz === undefined || tz === 'tz:auto', `getꓽintermediate_tz() expecting undef/auto here! "${tz}"`)

	switch (fallback) {
		case 'fallback:none':
			return undefined

		case 'fallback:resolved_auto': {
			if (!date_for_auto) {
				assert(is_pass_1_data_available_for_all_children(state), `getꓽintermediate_tz('fallback:resolved_auto') pass 1 should be done!`)
				date_for_auto = getꓽevent_begin_date(state)
			}

			return getꓽtimezoneⵧdefault(BetterDateLib.getꓽtimestamp_utc_ms_from(date_for_auto))
		}

		default:
			throw new Error(`getꓽintermediate_tz() unknown fallback "${fallback}"!`)
	}
}


export function getꓽevent_begin_date‿symd(state: Immutable<State>): SimpleYYYYMMDD {
	return BetterDateLib.getꓽcompact_date(getꓽevent_begin_date(state), getꓽtz(state, 'fallback:resolved_auto')!)
}
export function getꓽevent_end_date‿symd(state: Immutable<State>): SimpleYYYYMMDD {
	return BetterDateLib.getꓽcompact_date(getꓽevent_end_date(state), getꓽtz(state, 'fallback:resolved_auto')!)
}

export function getꓽevent_begin_year(state: Immutable<State>): number | undefined {
	return BetterDateLib.getꓽyear(getꓽevent_begin_date(state), getꓽtz(state, 'fallback:resolved_auto')!)
}

export function getꓽideal_basename(state: Immutable<State>): Basename {
	const current_basename = getꓽcurrent_basename(state)

	if (state.type !== Type.event)
		return NORMALIZERS.trim(NORMALIZERS.normalize_unicode(current_basename))

	assert(getꓽevent_begin_date(state), 'getꓽideal_basename() event range should have a start')

	logger.trace(`${LIB}: getꓽideal_basename(…)`, getꓽcurrent_basename‿parsed(state))

	let meaningful_part = getꓽcurrent_basename‿parsed(state).meaningful_part
	if (is_digit(meaningful_part[0])) {
		// protection to prevent future executions to parse the meaningful part as DD/HH/MM/SS
		meaningful_part = DIGIT_PROTECTION_SEPARATOR + meaningful_part
	}

	return NORMALIZERS.trim(
		NORMALIZERS.normalize_unicode(
			String(BetterDateLib.getꓽcompact_date(getꓽevent_begin_date(state), getꓽtz(state, 'fallback:resolved_auto')!))
			+ ' - '
			+ meaningful_part
		)
	)
}

export function _is_basename_hinting_at_backup(state: Immutable<State>): boolean {
	const basename‿parsed = getꓽcurrent_basename‿parsed(state)
	const lc = basename‿parsed.meaningful_part.toLowerCase()
	return lc.includes('backup')
		|| lc.includes('save')
		|| lc.includes('import')
		|| lc.includes('sauvegarde')
}

function _getꓽevent_begin_from_basename_if_present(state: Immutable<State>): undefined | null | Immutable<BetterDate> {
	const basename‿parsed = getꓽcurrent_basename‿parsed(state)

	if ((basename‿parsed.date_digits?.length ?? 0) < 6) {
		// must be big enough, need precision up to month
		return null
	}

	if (!basename‿parsed.date)
		return basename‿parsed.date

	// the basename has no tz info. the parser uses "auto" but we should switch to "folder tz" without changing the members
	const folder_tz = getꓽtz(state, 'fallback:none')
	if (folder_tz) {
		return BetterDateLib.reinterpret_with_different_tz(basename‿parsed.date, folder_tz)
	}

	return basename‿parsed.date
}

// Note: this is logically and semantically different from getꓽexpected_bcd_range_from_parent_path()
// Note: even if the basename contains a date, this function will only return it if it looks like an EVENT
export function getꓽevent_begin_date_from_basename_if_present_and_confirmed_by_other_sources(state: Immutable<State>): null | Immutable<BetterDate> {
	const basename_date = _getꓽevent_begin_from_basename_if_present(state)
	if (!basename_date)
		return null

	// reminder: a dated folder can indicate
	// - the date of an EVENT = date of the BEGINNING of the file range
	// - the date of a BACKUP = date of the END of the file range
	// - anything TBH ;)
	// we need extra info to discriminate between those cases

	// try to cross-reference with the children date range = best source of info
	const children_range = _getꓽcurrent_best_children_range(state)
	/*console.log('getꓽevent_begin_date_from_basename_if_present_and_confirmed_by_other_sources() DEBUG', {
		begin: BetterDateLib.getꓽdebug_representation(children_range?.begin),
		end: BetterDateLib.getꓽdebug_representation(children_range?.end),
		state,
	})*/
	if (children_range) {
		// we have a range, let's cross-reference…
		const date__from_basename‿symd = BetterDateLib.getꓽcompact_date(basename_date, 'tz:embedded') // should always use tz:embedded for this one

		// TODO use the best available data?
		const tz = getꓽtz(state, 'fallback:none') || 'tz:auto'
		const date_range_begin‿symd = BetterDateLib.getꓽcompact_date(children_range.begin, tz)
		const date_range_end‿symd = BetterDateLib.getꓽcompact_date(children_range.end, tz)
		/*console.log('getꓽevent_begin_date_from_basename_if_present_and_confirmed_by_other_sources() DEBUG', {
			begin: date_range_begin‿symd, //getꓽdebug_representation(begin),
			end: date_range_end‿symd, //getꓽdebug_representation(end),
			date__from_basename‿symd,
		})*/

		if (date__from_basename‿symd <= date_range_begin‿symd) {
			// clearly a beginning date
			return basename_date
		}
		else if (date__from_basename‿symd >= date_range_end‿symd) {
			// clearly a backup date, ignore it
			return null
		}
		else if ((date__from_basename‿symd - 1) <= date_range_begin‿symd) {
			// we allow 1 day margin to account for timezones errors
			// -> accepted as a beginning date
			return basename_date
		}
		else {
			// folder's date is between the children range (not included)
			// However we don't want to lose information
			// and a folder with a date surely means something
			return basename_date
		}
	}

	// we have no range, let's try something else…
	if (_is_basename_hinting_at_backup(state)) {
		// clearly not an event
		return null
	}

	if (is_folder_basename__matching_a_processed_event_format(getꓽcurrent_basename(state))) {
		// this looks very very much like an event
		return basename_date
	}

	// can't really tell... (the folder must be empty OR contains a mix of older and newer files)
	// let's assume it's a start date
	return basename_date
}

export function is_current_basename_intentful_of_event_start(state: Immutable<State>): boolean {
	return getꓽevent_begin_date_from_basename_if_present_and_confirmed_by_other_sources(state) !== null
}

// TODO improve, saw a lot of "slightly" mismatched event folders, ex. with only 1 intruder.
// We may want to be a little bit more tolerant OR salvage the folder name
export function is_looking_like_a_backup(state: Immutable<State>): boolean {
	const basename‿parsed = getꓽcurrent_basename‿parsed(state)

	// if a date is present in the basename, try to cross-reference with the children date range = best source of info
	if (basename‿parsed.date) {
		const children_date_range = _getꓽcurrent_best_children_range(state)
		/*console.log('is_looking_like_a_backup() DEBUG', {
			begin: BetterDateLib.getꓽdebug_representation(children_date_range?.begin),
			end: BetterDateLib.getꓽdebug_representation(children_date_range?.end),
			state,
		})*/
		if (children_date_range) {
			// we have a range, let's cross-reference…
			const date__from_basename‿symd = BetterDateLib.getꓽcompact_date(basename‿parsed.date, 'tz:embedded') // should always use embedded tz here

			// TODO use the best available data?
			const children_range_begin‿symd = BetterDateLib.getꓽcompact_date(children_date_range.begin, getꓽtz(state, 'fallback:resolved_auto', children_date_range.begin)!)
			const children_range_end‿symd = BetterDateLib.getꓽcompact_date(children_date_range.end, getꓽtz(state, 'fallback:resolved_auto', children_date_range.begin)!)
			/*console.log('is_looking_like_a_backup() DEBUG', {
				begin: children_range_begin‿symd, //getꓽdebug_representation(begin),
				end: children_range_end‿symd, //getꓽdebug_representation(end),
				date__from_basename‿symd,
			})*/

			if (date__from_basename‿symd <= children_range_begin‿symd) {
				// clearly a beginning date, this doesn't look like a backup (more like an event)
				return false
			}
			else if (date__from_basename‿symd >= children_range_end‿symd) {
				// clearly a backup date
				return true
			}
			else {
				// fallthrough
			}
		}
	}

	// we have no clear cross-referencing
	return _is_basename_hinting_at_backup(state)
}

export function getꓽneighbor_primary_hints(state: Immutable<State>, PARAMS: Immutable<Params> = getꓽparams()): Immutable<NeighborHints> {
	assert(is_pass_1_data_available_for_all_children(state), `getꓽneighbor_primary_hints() pass 1 should be complete`)

	let hints = FileLib.NeighborHintsLib.create()

	// NOTE this data is used to inform OTHER children. If there's only one, it's just echo!
	// EXCEPT when asserting unreliable which has other ways

	hints.bcdⵧfrom_fs__reliabilityⵧassessed_from_phase1 = _getꓽchildren_fs_reliability(state)
	if (state.media_children_count === 1 && hints.bcdⵧfrom_fs__reliabilityⵧassessed_from_phase1 !== 'unreliable') {
		hints.bcdⵧfrom_fs__reliabilityⵧassessed_from_phase1 = 'unknown'
	}

	////// expected bcd ranges
	// from basename
	const basename_date = _getꓽevent_begin_from_basename_if_present(state)
	if (basename_date) {
		if (is_looking_like_a_backup(state)) {
			hints.expected_bcd_ranges.push({
				begin: BetterDateLib.add_days(basename_date, -6*30),
				end: basename_date,
			})
		}
		else {
			hints.expected_bcd_ranges.push({
				begin: basename_date,
				end: BetterDateLib.add_days(basename_date, PARAMS.event_durationⵧmax‿ₓday),
			})
		}
	}
	// from children
	const children_range_from_non_fs = state.media_children_bcd_ranges.from_primaryⵧfinal ?? state.media_children_bcd_ranges.from_primaryⵧcurrentⵧphase_1
	if (children_range_from_non_fs && state.media_children_count > 1) {
		// enlarge it by a percentage
		const begin_symd = BetterDateLib.getꓽcompact_date(children_range_from_non_fs.begin, getꓽtz(state, 'fallback:resolved_auto', children_range_from_non_fs.begin)!)
		const end_symd = BetterDateLib.getꓽcompact_date(children_range_from_non_fs.end, getꓽtz(state, 'fallback:resolved_auto', children_range_from_non_fs.begin)!)
		if (end_symd < begin_symd) {
			console.log('ERROR imminent', {
				id: state.id,
				state,
				ffc: BetterDateLib.getꓽrange_debug_representation(state.media_children_bcd_ranges.from_fsⵧcurrent),
				fpcp1: BetterDateLib.getꓽrange_debug_representation(state.media_children_bcd_ranges.from_primaryⵧcurrentⵧphase_1),
			})
		}
		const range_size‿ₓdays = BetterDateLib.getꓽelapsed_days_between_ordered_simple_dates(begin_symd, end_symd)
		const margin‿ₓdays = Math.ceil(Math.max(1, range_size‿ₓdays) * 0.2)
		hints.expected_bcd_ranges.push({
			begin: BetterDateLib.add_days(children_range_from_non_fs.begin, -margin‿ₓdays),
			end: BetterDateLib.add_days(children_range_from_non_fs.end, margin‿ₓdays),
		})
	}

	hints.fallback_junk_bcd = getꓽevent_begin_date_from_basename_if_present_and_confirmed_by_other_sources(state)
		?? _getꓽcurrent_best_children_range(state)?.begin

	hints.tz = getꓽtz(state, 'fallback:none')

	return hints
}

export function is_date_matching_this_event(state: Immutable<State>, date: Immutable<BetterDate>): boolean {
	assert(state.type === Type.event, `${LIB} is_date_matching_this_event() should be an event`)

	const begin_date = getꓽevent_begin_date(state)
	const end_date = getꓽevent_end_date(state)

	return BetterDateLib.compare_utc(begin_date, date) <= 0
		&& BetterDateLib.compare_utc(date, end_date) <= 0
}

/*
export function is_date_matching_this_event‿symd(state: Immutable<State>, date‿symd: SimpleYYYYMMDD): boolean {
	assert(state.type === Type.event, `${LIB} is_matching_event‿symd() should be an event`)

	const begin_date‿symd = getꓽevent_begin_date‿symd(state)
	const end_date‿symd = getꓽevent_end_date‿symd(state)

	return date‿symd >= begin_date‿symd && date‿symd <= end_date‿symd
}
*/

///////////////////// DEBUG /////////////////////

export function to_string(state: Immutable<State>) {
	const { id, type } = state

	let str = `📓  [${String(type).padStart('cant_recognize'.length)}]`
	switch(type) {
		case Type.inbox:
		case Type.cant_autosort:
		case Type.cant_recognize:
			str = stylize_string.blue(str)
			break
		case Type.year:
			str = stylize_string.yellow(str)
			break
		case Type.event:
			str = stylize_string.green(str)
			break
		default:
			str = stylize_string.red(str)
			break
	}

	str += stylize_string.yellow.bold(` "${id}"`)

	if (type === Type.event || type === Type.overlapping_event) {
		if (!is_pass_1_data_available_for_all_children(state)) { // TODO review
			str += ' (fs in progress)'
		}
		else {
			str += ` 📅 ${BetterDateLib.getꓽrange_debug_representation(getꓽevent_range(state))}`
		}
	}
	else if (state.reason_for_demotion_from_event) {
		str += ` (demoted due to: ${state.reason_for_demotion_from_event})`
	}

	return str
}
