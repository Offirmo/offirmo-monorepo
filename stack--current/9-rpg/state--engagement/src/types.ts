import { Enum } from 'typescript-string-enums'

import { Url‿str } from '@offirmo-private/ts-types'
import { BaseUState } from '@offirmo-private/state-utils'

//////////////////////////////////////////////////////////////////////

// template for re-use
// ex. we can have a unique "achievement completed" template with different achievements
interface EngagementTemplate<TextFormat> {
	// WILL be displayed in a text-only interface
	// MAY not be displayed in a richer interface able to enhance from the hints, ex. video cutscene
	// ↳ in this case, this field can be seen as an a11y "alt" text
	content: TextFormat

	// semantic infos
	flow: // How is this engagement related to the current user's flow of action?
		| 'main' // directly flowing from the current flow + intent, ex. a direct answer to a user's question
		| 'side' // related to the current flow but more of a side-effect or low-intent, ex. achievement unlocked, tip, greeting...
		| 'not'  // not related to the current flow, ex. announcement banner
	role: // "who" is "speaking"
		// use case 1: if displayed on a chat-like interface, which side should it be displayed on?
		// use case 2: if presented to a LLM, who is the locutor? (see Google type AIAssistantPromptRole = 'system' | 'user' | 'assistant')
		| 'user'      // ex. when rephrasing a choice from the user as the user's own words
		| 'assistant' // most standard case
		| 'system'    // system, narrator
	success?: boolean // if present, this engagement is a success/failure message
	attention_needed?: // attention needed https://docs.google.com/spreadsheets/d/1Bc32plQTswNdCqXS99deB0n7Te7FfD7uepGAOOlPbvY/
		| 'fatal'    // irrecoverable error, the app/feature can not continue, may imply loss of security/data/etc.  (ex. crash)
		| 'alert'    // action must be taken immediately to avoid an unintended consequence/outcome such as loss of security/data/etc.  (ex. fail to save in LocalStorage)
		| 'error'    // any kind of unwanted/unexpected failure
		| 'warning'
		| 'notice'   // notable info we'd like the user to be aware of
		| 'log'
		| 'debug'
	// TODO acknowledge requirements = needed? implicit on show?  OR can be inferred from attention needed?

	// implementation details
	auto_dismiss_delay_ms?: number, // falsy = never TODO clarify

	// hints for optional enhancements
	enhancements?: {
		key?: string // for ex. to recognize a specific template (do not abuse! Reminder to keep everything text-compatible)
		vibrate?: { duration‿ms: 'auto' | number, alt: string },
		play_sound?: { url: Url‿str, alt: string },
		play_video?: { url: Url‿str, alt: string },
		// etc.

		[key: string]: any
	}
}

type PendingEngagementUId = number // unique id for this engagement, needed to acknowledge it was shown to the user

interface PendingEngagement<TextFormat> {
	uid: PendingEngagementUId

	template: EngagementTemplate<TextFormat>
	params: { [key: string]: any } // IF NEEDED, to customize the template
}

/////////////////////

interface State<TextFormat> extends BaseUState {
	// first in, first out
	// newest are appended
	queue: Array<PendingEngagement<TextFormat>>
}

/////////////////////

export {
	//type EngagementType,
	type EngagementTemplate,

	type PendingEngagementUId,
	type PendingEngagement,

	type State,
}

//////////////////////////////////////////////////////////////////////
