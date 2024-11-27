import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/state-utils'
import {
	type Hyperlink,
} from '@offirmo-private/ts-types-web'
import {
	type PendingEngagement,
	type EngagementTemplate,
} from '@oh-my-rpg/state--engagement'

/////////////////////////////////////////////////

/*
interface HATEOASEngagement<HypermediaType> {
	type: 'flow' | 'non-flow'
	$doc: HypermediaType
	ack_action: any // TODO type better?
	uid: string | number // OPAQUE unique id, useful for ex. for React keying. Should not be used for anything else.
}

 */

interface HATEOASPendingEngagement<HypermediaType, Action>
	extends
		Pick<EngagementTemplate<HypermediaType>,
				| 'flow'
				| 'sequence'
				| 'role'
				| 'success'
				| 'attention_needed'
				| 'enhancements'
			>,
		Pick<PendingEngagement<HypermediaType>,
				| 'uid'
			>
{
	content: HypermediaType // resolved

	ack_action?: Action // the action to dispatch to acknowledge this engagement
}

interface HATEOASServer<
	HypermediaType, // an advanced Hypermedia format able to contain links and actions
	Action,
> {
	// inspired by GET, POST, PUT, DELETE https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
	// also QUERY https://www.ietf.org/archive/id/draft-ietf-httpbis-safe-method-w-body-05.html

	// the base one, return a hypermedia representation with hyperlinks/actions
	get(url: Hyperlink['href']): Promise<HypermediaType>

	// TODO query? https://www.ietf.org/archive/id/draft-ietf-httpbis-safe-method-w-body-05.html


	// dispatch an action
	// url TBD
	// doesn't return (so far) bc the response can be lost and we may want strict feedback to actions
	// ex. a game where an action triggers an important cutscene, we could return the important cutscene but how would we ensure it has been seen/processed by the player?
	// ex. crash or lost connexion and the player lose a very important story development.
	// thus we'd rather use "engagement", see next method.
	// TODO REVIEW we may want to return trivial, "can-be-lost" feedback, for ex. "ticket created" or "action acknowledged"
	dispatch(action: Immutable<Action>, url?: Hyperlink['href']): Promise<void>

	// important to separate resource representation from actions feedback
	// sync bc we assume the browser awaits dispatches
	// the consumer must sort out the engagements by flow and priority
	get_pending_engagements(url?: Hyperlink['href']): Immutable<Array<HATEOASPendingEngagement<HypermediaType, Action>>>
}

/////////////////////////////////////////////////

export {
	type HATEOASPendingEngagement,
	type HATEOASServer,
}
