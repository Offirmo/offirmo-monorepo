import { type Immutable, enforceꓽimmutable } from '@offirmo-private/state-utils'

import type {
	Engagement,
	State,
} from '../types.ts'

import { SCHEMA_VERSION } from '../consts.ts'

//////////////////////////////////////////////////////////////////////

type DemoContentType = string

// the most common case
// can be re-used
const DEMO_TEMPLATEⵧFLOWꘌMAIN_ROLEꘌASSISTANT_ATTNꘌNORMAL: Engagement<DemoContentType> = {
	summary: '[ENGT DEMO]Hello, World!',

	flow: 'main',
	role: 'assistant',
	attention_needed: 'normal',
}

const DEMO_TEMPLATEⵧPLAYⵧFAILURE: Engagement<DemoContentType> = {
	summary: '[ENGT DEMO]You failed!',

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
const DEMO_TEMPLATEⵧFLOWꘌSIDE_ROLEꘌASSISTANT_ATTNꘌLOG: Engagement<DemoContentType> = {
	summary: '[ENGT DEMO]Hello, World!',

	flow: 'side',
	role: 'assistant',
	attention_needed: 'log',
}

const DEMO_TEMPLATEⵧNON_FLOW: Engagement<DemoContentType> = {
	summary: `[ENGT DEMO]You got an update! See what's new!`,

	flow: 'not',
	role: 'assistant',
	attention_needed: 'notice',
}

// real examples
const DEMO_SPOILER: Engagement<DemoContentType> = {
	summary: 'Spoiler alert!',

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
			...DEMO_TEMPLATEⵧFLOWꘌSIDE_ROLEꘌASSISTANT_ATTNꘌLOG,
			uid: 42,
			/*params: {
				username: 'Offirmo',
			},*/
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
