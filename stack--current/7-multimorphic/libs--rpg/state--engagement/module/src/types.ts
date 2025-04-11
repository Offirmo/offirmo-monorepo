import { Enum } from 'typescript-string-enums'

import {
	type Engagement,
	type PendingEngagementUId,
	type TrackedEngagement,
} from '@offirmo-private/ts-types'
import { type BaseUState } from '@offirmo-private/state-utils'

//////////////////////////////////////////////////////////////////////

interface State<TextFormat> extends BaseUState {
	// first in, first out
	// newest are appended
	queue: Array<TrackedEngagement<TextFormat>>
}

/////////////////////

export {
	// for convenience
	type Engagement,
	type PendingEngagementUId,
	type TrackedEngagement,

	type State,
}

//////////////////////////////////////////////////////////////////////
