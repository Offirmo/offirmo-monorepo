import type { BaseUState } from '@offirmo-private/state-utils'
import type { UUID } from '@offirmo-private/uuid'
import type { PRNGState } from '@offirmo/random'

/////////////////////////////////////////////////

interface State extends BaseUState {
	uuid: UUID // for caching / debug. Do not mind.

	// underlying @offirmo/random state
	prng_state: PRNGState

	// additional features:
	// - prevent repetition
	recently_encountered_by_id: {
		[k: string]: Array<string | number>
	}
}

/////////////////////////////////////////////////

export {
	type State,
}
