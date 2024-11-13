import { type Immutable, enforceꓽimmutable } from '@offirmo-private/state-utils'

import {
	type EngagementTemplate,
	type State,
} from '../types.js'

import { SCHEMA_VERSION } from '../consts.js'

//////////////////////////////////////////////////////////////////////

type DemoContentType = string

// the most common case
// can be re-used
const DEMO_TEMPLATEⵧFLOWꘌMAIN_ROLEꘌASSISTANT_ATTNꘌNORMAL: EngagementTemplate<DemoContentType> = {
	content: '[ENGT DEMO]Hello, World!',

	flow: 'main',
	role: 'assistant',
	attention_needed: 'normal',
}

const DEMO_TEMPLATEⵧPLAYⵧFAILURE: EngagementTemplate<DemoContentType> = {
	content: '[ENGT DEMO]You failed!',

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

// low importance
const DEMO_TEMPLATEⵧFLOWꘌSIDE_ROLEꘌASSISTANT_ATTNꘌLOG: EngagementTemplate<DemoContentType> = {
	content: '[ENGT DEMO]Hello, World!',

	flow: 'side',
	role: 'assistant',
	attention_needed: 'log',
}

const DEMO_TEMPLATEⵧNON_FLOW: EngagementTemplate<DemoContentType> = {
	content: `[ENGT DEMO]You got an update! See what's new!`,

	flow: 'not',
	role: 'assistant',
	attention_needed: 'notice',
}

// real examples
const DEMO_SPOILER: EngagementTemplate<DemoContentType> = {
	content: 'Spoiler alert!',

	flow: 'main',
	role: 'system',
	sequence: 'pre',
	attention_needed: 'warning',

	enhancements: {
		background: 'blurⵧextreme',
	},
}

// a full-featured, non-trivial demo state
// useful for demos and unit tests
const DEMO_STATE: Immutable<State<DemoContentType>> = enforceꓽimmutable<State<DemoContentType>>({
	schema_version: SCHEMA_VERSION,
	revision: 42,

	queue: [
		{
			uid: 42,
			template: DEMO_TEMPLATEⵧFLOWꘌSIDE_ROLEꘌASSISTANT_ATTNꘌLOG,
			params: {
				username: 'Offirmo',
			},
		},
	],
})

/////////////////////

export {
	DEMO_TEMPLATEⵧFLOWꘌMAIN_ROLEꘌASSISTANT_ATTNꘌNORMAL,
	DEMO_TEMPLATEⵧPLAYⵧFAILURE,
	DEMO_TEMPLATEⵧFLOWꘌSIDE_ROLEꘌASSISTANT_ATTNꘌLOG,
	DEMO_TEMPLATEⵧNON_FLOW,

	DEMO_STATE,
}
