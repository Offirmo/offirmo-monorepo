/* Generic description of engagement / messaging
 */

import type { Url‿str } from '../l2-content/index.ts'

/////////////////////////////////////////////////

// a GENERIC engagement
interface Engagement<TextFormat> {
	// WILL be displayed in a pure text-only interface
	// MAY not be displayed in a richer interface ex. terminal or web
	// if it's able to take cues from the hints, ex. a video cutscene
	// ↳ in this case, this field can be seen as an a11y "alt" text
	summary: TextFormat

	role: // "who" is "speaking"
	// use case 1: if displayed on a chat-like interface, which side should it be displayed on?
	// use case 2: if presented to a LLM, who is the one speaking? (see Google type AIAssistantPromptRole = 'system' | 'user' | 'assistant')
		| 'assistant' // most standard case
		| 'system'    // system, narrator
		| 'user'      // rare but useful ex. when paraphrasing a choice from the user as the user's own words

	success?: boolean // if present, identify this engagement as a success/failure message

	// semantic infos
	flow: // How is this engagement related to the current user's flow of action + intent?
		| 'main' // directly flowing from the current flow + intent, ex. a direct answer to a user's question
		| 'side' // related to the current flow but more of a side effect or low-intent, ex. "achievement unlocked", tip, greeting...
		| 'not'  // not related to the current flow at all, ex. banner about server restart
	// TODO background = the user can do sth else in the meantime?

	// TODO review!
	// relative to what? to a previously displayed rsrc??
	// Note: We don't want the mere loading of the app to trigger an engagement!
	// "intro" and "transition" should be "permanent"
	sequence?: // if needed, sequencing infos: (flow MUST = main)
		| 'intro'        // should only be displayed ONCE, at the beginning of the flow. The client is to keep track of this. Ex. "Welcome to the app!" or a recap of the story so far. The client must NEVER ack it to not change the state on loading. Instead, it should be ignored.
		| 'transition'   // should only be displayed BETWEEN navigations/refreshes. The client is to keep track of this. Ex. a hyperspace animation while navigating BETWEEN 2 planets but not when we load initially (we WERE on the planet). The client must ack it even if not displayed.
		| 'pre'          // should be displayed+resolved BEFORE/ABOVE(masking) the resource, ex. a spoiler alert or content warning.

	// TODO should be mandatory?
	attention_needed?: // level of attention needed https://docs.google.com/spreadsheets/d/1Bc32plQTswNdCqXS99deB0n7Te7FfD7uepGAOOlPbvY/
		| 'fatal'    // irrecoverable error, the app/feature can not continue, may imply loss of security/data/etc. (ex. crash)
		| 'alert'    // action must be taken immediately to avoid an unintended consequence/outcome such as loss of security/data/etc. (ex. fail to save in LocalStorage)
		| 'error'    // any kind of unwanted/unexpected failure
		| 'warning'
		| 'notice'   // notable info we'd like the user to be aware of
		| 'normal'   // DEFAULT
		| 'log'      // lower than default
		| 'debug'

	// TODO acknowledge requirements = needed? implicit on show? auto after elapsed time? OR can be inferred from attention needed?
	// TODO clarify!
	//auto_dismiss_delay_ms?: number, // falsy = never

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

interface TrackedEngagement<TextFormat> extends Engagement<TextFormat> {
	uid: PendingEngagementUId
}

/////////////////////////////////////////////////

export {
	type Engagement,
	type PendingEngagementUId,
	type TrackedEngagement,
}
