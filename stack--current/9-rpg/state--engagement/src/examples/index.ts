import { type Immutable, enforceꓽimmutable } from '@offirmo-private/state-utils'

import {
	type EngagementTemplate,
	type State,
} from '../types.js'

import { SCHEMA_VERSION } from '../consts.js'

//////////////////////////////////////////////////////////////////////

const DEMO_TEMPLATEⵧHELLO_FLOW: EngagementTemplate<string> = {
	content: 'Hello, {{username}}!',

	flow: 'side',
	role: 'assistant',
	attention_needed: 'log',
}

const DEMO_TEMPLATEⵧPLAYⵧFAILURE: EngagementTemplate<string> = {
	content: 'You played too soon!',

	flow: 'main',
	role: 'system',
	success: false,
	attention_needed: 'notice',

	enhancements: {
		key: 'playⵧfailure',
		vibrate: { duration‿ms: 'auto', alt: '' },
		play_sound: { url: 'death.mp4', alt: '' },
	}
}

const DEMO_TEMPLATEⵧNON_FLOW: EngagementTemplate<string> = {
	content: `You got an update! See what's new!`,

	flow: 'not',
	role: 'assistant',
	attention_needed: 'log',

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
			template: DEMO_TEMPLATEⵧHELLO_FLOW,
			params: {
				username: 'Offirmo',
			},
		},
	],
})

/////////////////////

export {
	DEMO_TEMPLATEⵧHELLO_FLOW,
	DEMO_TEMPLATEⵧPLAYⵧFAILURE,
	DEMO_TEMPLATEⵧNON_FLOW,

	DEMO_STATE,
}
