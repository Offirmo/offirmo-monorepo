import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/state-utils'
import {
	type Hyperlink,
} from '@offirmo-private/ts-types-web'

/////////////////////////////////////////////////

interface HATEOASEngagement<HypermediaType> {
	type: 'flow' | 'non-flow'
	$doc: HypermediaType
	ack_action: any // TODO type better?
	uid: string | number // OPAQUE unique id, useful for ex. for React keying. Should not be used for anything else.
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
	dispatch(action: Action, url?: Hyperlink['href']): Promise<void>

	// important to separate resource representation from actions feedback
	// sync bc we assume the browser awaits dispatches
	get_next_pending_engagement(url?: Hyperlink['href']): HATEOASEngagement<HypermediaType> | null
}

/////////////////////////////////////////////////

export {
	type HATEOASEngagement,
	type HATEOASServer,
}
