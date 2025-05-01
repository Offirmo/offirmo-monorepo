import type { Immutable } from '@offirmo-private/ts-types'

import type {
	RichTextNodeLike,
	OHAHyperMedia,
	OHAHyperLink,
	OHAHyperAction,
} from '../types/types.ts'

/////////////////////////////////////////////////

interface OHAServer {
	// inspired by GET, POST, PUT, DELETE https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
	// also QUERY https://www.ietf.org/archive/id/draft-ietf-httpbis-safe-method-w-body-05.html

	// the base one, return a HATEOAS hypermedia representation including hyperlinks/actions
	// should always respond to '/' as a starting point of the rsrc discovery
	ↆget(url?: OHAHyperLink['href']): Promise<OHAHyperMedia> // the returned resource representation should contain everything needed to move forward

	// dispatch an action
	dispatch(
			action: Immutable<OHAHyperAction>,
			url?: OHAHyperLink['href'], // the action target rsrc, defaulting to '/'
		): Promise<void>
	// NOTES TODO review
	// the whole point of an action is to change the state of the system, so we should assume a representation update will be needed
	// - the response can be lost and we may want strict feedback on actions
	// - may not need a response, for ex. sending a mail or simple button click
	// ex. a game where an action triggers an important cutscene, we could return the important cutscene
	//     but in case of crash/disconnection and the player lose a very important story development. (happened to me in Ultima IX with crashing vids btw)
	//     = we must ensure it has been seen/processed by the player
	// thus we'd rather use "engagement", see next method.
	// TODO REVIEW we may want to return trivial, "can-be-lost" feedback, for ex. "ticket created" or "action acknowledged"
	// XXX should a URL be attached to clarify which resource is the target?

	// TODO push = server-initiated updates (bg sync, collab, multi-tabs...)
	// ping a browser? a URL?
}

/////////////////////////////////////////////////

export {
	type OHAServer,
}
