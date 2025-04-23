import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'
import type { Node as RichTextNode } from '@offirmo-private/rich-text-format'

import {
	type Hyperlink as _Hyperlink,
} from '@offirmo-private/ts-types-web'
import {
	type TrackedEngagement,
	type Engagement,
} from '@oh-my-rpg/state--engagement'

/////////////////////////////////////////////////

type HyperMedia = RichTextNode

/////////////////////////////////////////////////

// navigation type? https://developer.mozilla.org/en-US/docs/Web/API/NavigateEvent/navigationType

// ex. ack "your request has been received"
// ex. wait "processing..."
// ex. prepare transition
interface Feedback {

}

/////////////////////////////////////////////////

interface HyperLink extends _Hyperlink {
	// TODO some kind of feedback engagement
}

/////////////////////////////////////////////////

// yes, we provide a generic, non-strictly typed action interface
// this is intentional as the point is to decouple client & server
// actions dispatched from the client should originate from the server
// so the client shouldn't have to know about strict typing
interface HyperAction {
	// TODO spec of required params
}

// a few standardised actions, though:

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
	get(url?: HyperLink['href']): Promise<HypermediaType>

	// TODO query? https://www.ietf.org/archive/id/draft-ietf-httpbis-safe-method-w-body-05.html

	// dispatch an action
	// doesn't return (so far) bc the response can be lost and we may want strict feedback on actions
	// ex. a game where an action triggers an important cutscene, we could return the important cutscene
	//     but in case of crash/disconnection and the player lose a very important story development. (happened to me in Ultima IX with crashing vids btw)
	//     = we must ensure it has been seen/processed by the player
	// thus we'd rather use "engagement", see next method.
	// TODO REVIEW we may want to return trivial, "can-be-lost" feedback, for ex. "ticket created" or "action acknowledged"
	dispatch(action: Immutable<HyperAction>): Promise<void>

	// important to separate resource representation from actions feedback
	// sync bc we assume the browser awaits dispatches
	// the consumer must sort out the engagements by flow and priority
	getꓽengagementsⵧpending(url?: HyperLink['href']): Immutable<Array<HATEOASPendingEngagement>>

	// TODO push
}

/////////////////////////////////////////////////

export {
	type HyperMedia,
	type HyperLink,
	type HyperAction,
	type HATEOASPendingEngagement,
	type HATEOASServer,
}
