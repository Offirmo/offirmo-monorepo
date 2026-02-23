
import { type Immutable, enforceꓽimmutable } from '@monorepo-private/state-utils'

import { REAL_CREATION_DATE‿TMS } from '../../../../__test_shared/utils.js'
import { create_better_date_from_utc_tms } from '../../../../services/better-date.js'

import { NeighborHints, HistoricalNeighborHints } from './types.js'
import { getꓽhistorical_representation } from './selectors.js'

/////////////////////////////////////////////////


const DEMO_STATE: Immutable<NeighborHints> = enforceꓽimmutable<NeighborHints>({
	bcdⵧfrom_fs__reliabilityⵧassessed_from_phase1: 'unknown',
	expected_bcd_ranges: [
		{
			begin: create_better_date_from_utc_tms(REAL_CREATION_DATE‿TMS, 'tz:auto'),
			end: create_better_date_from_utc_tms(REAL_CREATION_DATE‿TMS + 12345678, 'tz:auto'),
		}
	],
	fallback_junk_bcd: create_better_date_from_utc_tms(REAL_CREATION_DATE‿TMS, 'tz:auto'),
	tz: undefined, // TODO
})

/*export const DEMO_STATEⵧHISTORICAL: Immutable<HistoricalNeighborHints> = enforceꓽimmutable<HistoricalNeighborHints>(
	getꓽhistorical_representation(DEMO_STATE)
)*/

/////////////////////////////////////////////////

export {
	DEMO_STATE,
}
