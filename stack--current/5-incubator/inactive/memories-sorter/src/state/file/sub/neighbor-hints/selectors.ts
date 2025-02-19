import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'
import { TimestampUTCMs } from '@offirmo-private/timestamps'

import logger from '../../../../services/logger.js'
import { NeighborHints, HistoricalNeighborHints, FsReliability } from './types.js'
import {
	BetterDate,
	DateRange,
	getꓽdebug_representation as getꓽbetter_date_debug_representation,
	create_better_date_from_utc_tms,
	getꓽmembers_for_serialization,
	compare_utc,
	add_days,
} from '../../../../services/better-date.js'
import {
	is_folder_basename__matching_a_processed_event_format,
	parse_folder_basename,
	pathㆍparse_memoized,
} from '../../../../services/name_parser.js'
import { RelativePath } from '../../../../types.js'
import { getꓽparams, Params } from '../../../../params.js'

/////////////////////////////////////////////////

// for comparisons, higher is better
export function getꓽfs_reliability‿numeric_score(reliability: FsReliability | undefined): number {
	switch (reliability) {
		case 'unreliable':
			return 0
		case undefined:
			/* fallthrough */
		case 'unknown':
			return 1
		case 'reliable':
			return 2
		default:
			throw new Error(`getꓽfs_reliability_score() switch unhandled for "${reliability}"!`)
	}
}

export function getꓽbcd_from_parent_path(parent_path: RelativePath): null | undefined | BetterDate {
	// try to infer a date from parent path

	const folder_path‿pparsed = pathㆍparse_memoized(parent_path)
	const folder_basename = folder_path‿pparsed.base
	const basename‿parsed = parse_folder_basename(folder_basename)

	if ((basename‿parsed.date_digits?.length ?? 0) < 8) {
		// must be big enough, need precision up to day
		return null
	}

	return basename‿parsed.date
}

// TODO review usage
export function getꓽexpected_bcd_range_from_parent_path(parent_path: RelativePath, PARAMS: Immutable<Params> = getꓽparams()): null | undefined | DateRange {

	// try to infer a date from parent path
	const date = getꓽbcd_from_parent_path(parent_path)
	if (!date)
		return date

	// event or backup?
	const folder_path‿pparsed = pathㆍparse_memoized(parent_path)
	const folder_basename = folder_path‿pparsed.base
	const basename‿parsed = parse_folder_basename(folder_basename)

	if (basename‿parsed.meaningful_part.toLowerCase().includes('backup')) {
		// clearly not an event
		throw new Error(`getꓽexpected_bcd_range_from_parent_path() NIMP backup range!`)
		/*return {
			begin: xxx, what to use?
			end: date,
		}*/
	}

	if (is_folder_basename__matching_a_processed_event_format(folder_basename)) {
		// this looks very very much like an event
		return {
			begin: date,
			end: add_days(date, PARAMS.event_durationⵧmax‿ₓday),
		}
	}

	return undefined
}

///////////////////// Current /////////////////////

export function getꓽneighbors_fs_reliability(state: Immutable<NeighborHints>): FsReliability {
	return state.bcdⵧfrom_fs__reliabilityⵧassessed_from_phase1
}

export function getꓽfallback_junk_bcd(state: Immutable<NeighborHints>): undefined | BetterDate {
	return state.fallback_junk_bcd
}

export function is_matching_parent_folder_expected_date_ranges(state: Immutable<NeighborHints>, candidate: Immutable<BetterDate>): boolean {
	let result = false // so far

	state.expected_bcd_ranges.forEach(({begin, end}) => {
		const is_before_range = compare_utc(candidate, begin) < 0
		if (is_before_range)
			return
		const is_after_range = compare_utc(end, candidate) < 0
		if (is_after_range)
			return

		result = true
	})

	return result
}

export function is_candidate_fs_bcd_looking_reliable_according_to_neighbor_hints(state: Immutable<NeighborHints>, candidate‿tms: TimestampUTCMs): FsReliability {
	if (state._unit_test_shortcut)
		return state._unit_test_shortcut

	assert(!!candidate‿tms, `is_candidate_fs_bcd_looking_reliable_according_to_neighbor_hints() candidate should be truthy!`)

	const candidate = create_better_date_from_utc_tms(candidate‿tms, state.tz || 'tz:auto')

	if (is_matching_parent_folder_expected_date_ranges(state, candidate)) {
		logger.trace(`is_candidate_fs_bcd_looking_reliable_according_to_neighbor_hints() current fs reliability has been assessed to "reliable" from our fs + parent folder date ranges`)
		return 'reliable'
	}

	// still unknown
	const siblings_fs_bcd_assessed_reliability = getꓽneighbors_fs_reliability(state)
	switch(siblings_fs_bcd_assessed_reliability) {
		case 'reliable':
			logger.trace(`is_candidate_fs_bcd_looking_reliable_according_to_neighbor_hints() current fs reliability has been assessed to "reliable" from parent reliability=reliable, assuming ours is reliable as well`)
			return 'reliable'
		case 'unreliable':
			// NO! Don't allow a single bad file to pollute an entire folder
			// ok we're not "reliable", but can't say that we're unreliable
			// fallthrough
		default:
			// fallthrough
			break
	}

	logger.trace(`is_candidate_fs_bcd_looking_reliable_according_to_neighbor_hints() current fs reliability has been assessed to "unknown" from fallback`)
	return 'unknown'
}

export function to_string(state: undefined | Immutable<NeighborHints>): any {
	if (!state)
		return undefined

	let result = '[hints:'

	const {
		_unit_test_shortcut,
		bcdⵧfrom_fs__reliabilityⵧassessed_from_phase1,
		expected_bcd_ranges,
		fallback_junk_bcd,
		...unhandled
	} = state

	if (_unit_test_shortcut) {
		result += 'force:' + _unit_test_shortcut
	}
	else {
		if (Object.keys(unhandled).length > 0)
			throw new Error('NeighborHints.to_string() needs upgrade!')

		result += `${expected_bcd_ranges.length} ranges; fb-junk-date=${getꓽbetter_date_debug_representation(fallback_junk_bcd)}`
	}

	result += ']'

	return result
}

export function getꓽdebug_representation(state: undefined | Immutable<NeighborHints>): any {
	if (!state)
		return undefined

	let result = {}

	const {
		_unit_test_shortcut,
		bcdⵧfrom_fs__reliabilityⵧassessed_from_phase1,
		expected_bcd_ranges,
		fallback_junk_bcd,
		tz,
		...unhandled
	} = state

	if (Object.keys(unhandled).length > 0)
		throw new Error('NeighborHints.getꓽdebug_representation needs upgrade!')

	result = {
		...result,
		...(_unit_test_shortcut && { _unit_test_shortcut }),
		bcdⵧfrom_fs__reliabilityⵧassessed_from_phase1,
		expected_bcd_ranges: expected_bcd_ranges.map(range => {
			return {
				begin: getꓽbetter_date_debug_representation(range.begin),
				end: getꓽbetter_date_debug_representation(range.end),
			}
		}),
		fallback_junk_bcd: getꓽbetter_date_debug_representation(fallback_junk_bcd),
		tz,
	}

	return result
}

///////////////////// historical /////////////////////

export function getꓽhistorical_representation(state: Immutable<NeighborHints>, fs_bcd‿tms: undefined | TimestampUTCMs): HistoricalNeighborHints {
	const {
		_unit_test_shortcut,
		bcdⵧfrom_fs__reliabilityⵧassessed_from_phase1,
		fallback_junk_bcd,
		...unhandled
	} = state

	let fs_reliability: FsReliability = (() => {
		if (_unit_test_shortcut)
			return _unit_test_shortcut

		if (fs_bcd‿tms === undefined)
			return 'unknown'

		return is_candidate_fs_bcd_looking_reliable_according_to_neighbor_hints(state, fs_bcd‿tms)
	})()

	return {
		fs_reliability,
		...(fs_reliability === 'unreliable' && {
			parent_bcd: fallback_junk_bcd ? getꓽmembers_for_serialization(fallback_junk_bcd) : undefined,
		})
	}
}

export function getꓽhistorical_fs_reliability(state: Immutable<HistoricalNeighborHints>, candidate‿tms: TimestampUTCMs): FsReliability {
	//console.log('getꓽhistorical_fs_reliability(…)', state)
	return state.fs_reliability ?? 'unknown'
	/* TODO review
	const bcd__from_parent_folder__current = neighbor_hints.parent_folder_bcd
	if (bcd__from_parent_folder__current) {
		const bcd__from_parent_folder__current‿tms = getꓽtimestamp_utc_ms_from(bcd__from_parent_folder__current)

		if (bcdⵧfrom_fsⵧcurrent‿tms >= bcd__from_parent_folder__current‿tms
			&& bcdⵧfrom_fsⵧcurrent‿tms < (bcd__from_parent_folder__current‿tms + PARAMS.event_durationⵧmax‿ₓday * DAY_IN_MILLIS)) {
			// ok, looks like an event folder configuration
			logger.trace(`_getꓽcurrent_fs_reliability_according_to_own_and_env() current fs reliability has been assessed to "reliable" from our fs + parent folder bcd`)
			return 'reliable'
		}*/
}

export function to_stringⵧhistorical(state: Immutable<HistoricalNeighborHints>): any {
	const { /*fs_reliability,*/ ...unhandled } = state

	if (Object.keys(unhandled).length > 0)
		throw new Error('HistoricalNeighborHints.to_string() needs upgrade!')

	return '<HistoricalNeighborHints>'
}

/////////////////////////////////////////////////
