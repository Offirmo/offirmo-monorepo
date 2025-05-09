/* Generic description of engagement / messaging
 */

import type { Url‿str } from '../l2-content/index.ts'
import type { WithHints } from '@offirmo-private/ts-types-web'

/////////////////////////////////////////////////
// low-level units

// "who" is "speaking" in the conversation / narration
// use case 1: if displayed on a chat-like interface, which side should it be displayed on?
// use case 2: if presented to a LLM, who is the one speaking? (see Google type AIAssistantPromptRole = 'system' | 'user' | 'assistant')
type ConversationRole =
	| 'user'      // useful ex. when paraphrasing a choice from the user/PC as the user's own words
	| 'assistant' // AI standard case
	| 'system'    // system, narrator
	| 'other'     // different character/NPC/person

type SuccessOrFailure = boolean | null // hint a message as a success/failure/not-applicable

// How is this engagement related to the current user's flow of action + intent?
type FlowAlignment =
	| 'main' // directly flowing from the current flow + intent, ex. a direct answer to a user's question
	| 'side' // ~related to the current flow but more of a side effect or low-intent, ex. "achievement unlocked", tip, greeting...
	| 'out'  // not related to the current flow at all, ex. banner about server restart
	// should we add background? = the user can do sth else in the meantime?

/////////////////////////////////////////////////
// story (everything is "story telling" in a way)

interface StoryHints {
	durationⵧmin‿ms?: number // if present, never resolve the action faster than this (illusion of labor) Do not abuse! (default to some value depending on the verb)
}

interface StoryTellingUnit<RichTextFormat> extends WithHints {
	kind: 'unit'

	role: ConversationRole

	// CORE source of truth
	// should hold as much info as possible (incl. hints)
	message: RichTextFormat
}

// use case: a conversation between characters
interface StoryTellingSequence<RichTextFormat> {
	kind: 'serial'

	sequence: Array<Story<RichTextFormat>>
}

// use case: a cinematic happening in parallel to a conversation, ex. hyperspace jump with "jump in 3.2.1..."
interface StoryTellingConcurrence<RichTextFormat> {
	kind: 'parallel'

	stories: Array<Story<RichTextFormat>>
}

type Story<RichTextFormat> =
	| RichTextFormat // raw
	| StoryTellingUnit<RichTextFormat> // a more complex object
	| StoryTellingSequence<RichTextFormat>
	| StoryTellingConcurrence<RichTextFormat>

/////////////////////////////////////////////////

// TODO review!
// if needed, sequencing infos: (ONLY if flow = main)
// relative to what? to a previously displayed rsrc??
// Note
// "intro" and "transition" should be "permanent"
type EngagementSequence =
	| 'session'      // should only be displayed ONCE, at the beginning of the session. The client is to keep track of this.
	                 // Ex. "Welcome to the app!" or a recap of the story so far.
	                 // The client must NEVER ack it to not change the state on loading: We don't want the mere loading of the app to trigger a state change due to a simple recap!
	//| 'home' when a user returns a frame to its home? TODO review if useful
	//| 'transition'   // should only be displayed BETWEEN navigations/refreshes. The client is to keep track of this.
	                   // Ex. a hyperspace animation while navigating BETWEEN 2 planets but not when we load initially (we WERE on the planet). The client must ack it even if not displayed.
	                   // TODO is it even useful? can be a actionfeedback / actionresult instead
	//| 'pre'          // should be displayed+resolved BEFORE/ABOVE(masking) the resource, ex. a spoiler alert or content warning.
	                   // TODO is it even useful? implement when needed

// level of attention requested https://docs.google.com/spreadsheets/d/1Bc32plQTswNdCqXS99deB0n7Te7FfD7uepGAOOlPbvY/
type AttentionLevel =
	| 'fatal'    // irrecoverable problem, the app/feature can not continue, may imply loss of security/data/etc. (ex. crash)
	| 'alert'    // action must be taken immediately to avoid an unintended consequence/outcome such as loss of security/data/etc. (ex. fail to save in LocalStorage)
	| 'error'    // any other kind of unwanted/unexpected failure
	| 'warning'  // the above, put still only a possibility (ex. close to storage quota)
	| 'notice'   // notable info we'd like the user to be aware of
	| 'normal'   // DEFAULT
	| 'log'      // lower than default
	| 'debug'

// a GENERIC engagement
interface Engagement<RichTextFormat> {
	flow: FlowAlignment

	// if needed, sequencing infos
	sequence?: EngagementSequence

	// TODO should be mandatory?
	attention_needed?: AttentionLevel

	// TODO acknowledge requirements = needed? implicit on show? auto after elapsed time? OR can be inferred from attention needed?
	// TODO clarify!
	//auto_dismiss_delay_ms?: number, // falsy = never

	story: Story<RichTextFormat> // what we want to say/convey

	// hints for optional enhancements
	hints?: {
		// ideally do not use, should be in the story itself!
	}
}

type PendingEngagementUId = number // unique id for this engagement, needed to acknowledge it was shown to the user

interface TrackedEngagement<RichTextFormat> extends Engagement<RichTextFormat> {
	uid: PendingEngagementUId
}

/////////////////////////////////////////////////

export {
	type ConversationRole,
	type SuccessOrFailure,
	type FlowAlignment,

	type StoryTellingUnit,
	type StoryTellingSequence,
	type StoryTellingConcurrence,
	type Story,

	type EngagementSequence,
	type AttentionLevel,

	type Engagement,
	type PendingEngagementUId,
	type TrackedEngagement,
}
