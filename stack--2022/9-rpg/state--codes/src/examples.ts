import { Immutable, enforce_immutability } from '@offirmo-private/state-utils'
import { TEST_TIMESTAMP_MS, getꓽUTC_timestampⵧhuman_readable‿minutes } from '@offirmo-private/timestamps'

import { State } from './types.js'

/////////////////////

// a full-featured, non-trivial demo state
// useful for demos and unit tests
const DEMO_STATE: Immutable<State> = enforce_immutability<State>({
	schema_version: 1,
	revision: 3,

	redeemed_codes: {
		BORED: {
			'redeem_count': 1,
			'last_redeem_date_minutes': getꓽUTC_timestampⵧhuman_readable‿minutes(new Date(TEST_TIMESTAMP_MS)),
		},
	},
})

/////////////////////

export {
	DEMO_STATE,
}
