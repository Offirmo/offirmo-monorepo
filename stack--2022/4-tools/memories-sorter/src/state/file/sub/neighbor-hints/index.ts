import { BetterDate } from '../../../../services/better-date.js'

import { FsReliability, NeighborHints } from './types.js'

/////////////////////////////////////////////////

function create(): NeighborHints {
	// safest possible
	return {
		bcdⵧfrom_fs__reliabilityⵧassessed_from_phase1: 'unknown',
		expected_bcd_ranges: [],
		fallback_junk_bcd: undefined,
		tz: undefined,
	}
}

function _createⵧfor_ut(params: {
	reliability_shortcut?: FsReliability,
	junk_bcd?: BetterDate | undefined,
} = {}): NeighborHints {
	let state = create() // so far
	state._unit_test_shortcut = params.reliability_shortcut
	state.fallback_junk_bcd = params.junk_bcd
	return state
}

/////////////////////////////////////////////////

export * from './types.js'
export * from './selectors.js'

export {
	create,
	_createⵧfor_ut,
}
