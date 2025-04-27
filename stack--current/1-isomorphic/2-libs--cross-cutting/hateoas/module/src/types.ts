import assert from 'tiny-invariant'
import type { Immutable, JSONPrimitiveType } from '@offirmo-private/ts-types'
import type { Node as RichTextNode } from '@offirmo-private/rich-text-format'

import {
	type Hyperlink as _Hyperlink,
	type Action, type Uri‿x,
} from '@offirmo-private/ts-types-web'
import {
	type TrackedEngagement,
	type Engagement,
} from '@oh-my-rpg/state--engagement'

/////////////////////////////////////////////////

type HyperMedia = RichTextNode

/////////////////////////////////////////////////


// ex. ack "your request has been received"
// ex. wait "processing..."
// ex. prepare transition "hyperspace" from planet A to planet B
interface Feedback {
	// text
	// loader
	// emoji
	// color...
}

/////////////////////////////////////////////////

// TODO navigation type? https://developer.mozilla.org/en-US/docs/Web/API/NavigateEvent/navigationType

interface HyperLink extends _Hyperlink {
	// TODO some kind of feedback engagement
}

/////////////////////////////////////////////////

type InputType =
	// inspired by HTML5 input types
// TODO add more types

interface InputSpec {
	// TODO one day
}

// anything not hypermedia.GET
// conceptually maps to an HTML form
// but should be enhanced
// yes, we provide a generic, non-strictly typed action interface
// this is intentional as the point is to decouple client & server
// actions dispatched from the client should originate from the server
// so the client shouldn't have to know about strict typing
interface HyperActionCandidate {
	type: string // TODO standardize refresh, about, faq (from rel)

	// presentation
	cta?: string // optional bc should ideally be derived from the action (esp. for i18n) BUT same action could have different CTA following the context (ex. equip best equipment)

	// requirements
	input?: Record<string, InputSpec>// the data of the action, could be anything

	// aftermath
	href?: Uri‿x // optional URL to navigate to following the action
	// TODO feedback engagement? Or in an extension of this?
}

// constructed from the above
interface HyperAction {
	type: string

	payload: Record<string, JSONPrimitiveType>
}

/////////////////////////////////////////////////

interface HATEOASPendingEngagement extends TrackedEngagement<HyperMedia> {
	ack_action?: HyperAction // the action to dispatch to acknowledge this engagement, ex. record engagement as seen
}

/////////////////////////////////////////////////

interface HATEOASServer<
	HypermediaType = RichTextNode, // an advanced Hypermedia format able to contain links and actions
> {
	// inspired by GET, POST, PUT, DELETE https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
	// also QUERY https://www.ietf.org/archive/id/draft-ietf-httpbis-safe-method-w-body-05.html

	// the base one, return a hypermedia representation with hyperlinks/actions
	ↆget(url?: HyperLink['href']): Promise<HypermediaType> // TODO more complex response? meta/headers?

	// TODO query? https://www.ietf.org/archive/id/draft-ietf-httpbis-safe-method-w-body-05.html

	// dispatch an action
	// doesn't return (so far) bc:
	// - the response can be lost and we may want strict feedback on actions
	// - may not need a response, for ex. sanding a mail or simple button click
	// ex. a game where an action triggers an important cutscene, we could return the important cutscene
	//     but in case of crash/disconnection and the player lose a very important story development. (happened to me in Ultima IX with crashing vids btw)
	//     = we must ensure it has been seen/processed by the player
	// thus we'd rather use "engagement", see next method.
	// TODO REVIEW we may want to return trivial, "can-be-lost" feedback, for ex. "ticket created" or "action acknowledged"
	// XXX should a URL be attached to clarify which resource is the target?
	dispatch(action: Immutable<HyperAction>, url?: HyperLink['href']): Promise<void>

	// XXX why not in GET???
	// important to separate resource representation from actions feedback
	// sync bc we assume the browser awaits dispatches
	// the consumer must sort out the engagements by flow and priority
	//getꓽengagementsⵧpending(url?: HyperLink['href']): Immutable<Array<HATEOASPendingEngagement>>

	// TODO push
}

/////////////////////////////////////////////////

export {
	type HyperMedia,
	type HyperLink,
	type HyperActionCandidate, type HyperAction,
	type HATEOASPendingEngagement,
	type HATEOASServer,
}
