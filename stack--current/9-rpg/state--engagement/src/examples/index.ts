//////////////////////////////////////////////////////////////////////

import { type Immutable, enforceꓽimmutable } from '@offirmo-private/state-utils'

import {
	type EngagementTemplate,
	type State,
} from '../types.js'

import { SCHEMA_VERSION } from '../consts.js'

//////////////////////////////////////////////////////////////////////

const DEMO_TEMPLATE: EngagementTemplate<string> = {
	content: 'Hello, {{username}}!',

	is_in_user_flow: true,
	level: 'log',

	auto_dismiss_delay_ms: 5000,
}

// a full-featured, non-trivial demo state
// useful for demos and unit tests
const DEMO_STATE: Immutable<State<string>> = enforceꓽimmutable<State<string>>({
	schema_version: SCHEMA_VERSION,
	revision: 42,

	queue: [
		{
			uid: 42,
			template: DEMO_TEMPLATE,
			params: {
				username: 'Offirmo',
			},
		},
	],
})

/////////////////////

export {
	DEMO_STATE,
}
