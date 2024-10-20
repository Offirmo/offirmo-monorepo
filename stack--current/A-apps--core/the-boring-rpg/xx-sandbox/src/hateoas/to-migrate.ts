// TODO move into dedicated package

import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/state-utils'
import {
	type Uri‿str,
	type URI‿x,
	type SchemeSpecificURIPart,
	type Hyperlink,
} from '@offirmo-private/ts-types-web'
import * as RichText from '@offirmo-private/rich-text-format'

/////////////////////////////////////////////////

function normalizeꓽuri‿SSP(url: Immutable<URI‿x>): SchemeSpecificURIPart {
	url ||= '/'

	if (typeof url === 'string') {
		const url‿obj = new URL(url, 'https://example.com')

		const result: SchemeSpecificURIPart = {
			path: url‿obj.pathname,

			query: url‿obj.search,

			...(url‿obj.hash && { fragment: url‿obj.hash }),
		}

		return result
	}

	return url
}
function normalizeꓽuri‿str(url: Immutable<URI‿x>): Uri‿str {
	const { path, query, fragment } = normalizeꓽuri‿SSP(url)

	let result = path

	if (query) {
		result += '?' + query
	}

	if (fragment) {
		result += '#' + fragment
	}

	return result
}
function getꓽCTA(action: Immutable<RichText.Action>): string {
	switch (action.type) {
		case 'action': {
			if (action.cta)
				return '⚡️' + action.cta

			throw new Error('Missing CTA for action!')
		}
		case 'hyperlink': {
			if (action.link.cta)
				return '⇨ ' + action.link.cta

			throw new Error('Missing CTA for hyperlink!')
		}
		default:
			throw new Error(`NIMP action type "${(action as any)?.type}"!`)
	}
}

const DEFAULT_ROOT_URI: Uri‿str = normalizeꓽuri‿str('')

/////////////////////////////////////////////////

interface HATEOASServer<
	HypermediaType, // an advanced Hypermedia format able to contain links and actions
	Action,
> {
	// inspired by GET, POST, PUT, DELETE https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
	// also QUERY https://www.ietf.org/archive/id/draft-ietf-httpbis-safe-method-w-body-05.html

	// the base one, return a hypermedia representation with hyperlinks/actions
	get(url: Hyperlink['href']): Promise<HypermediaType>

	// dispatch an action
	// url TBD
	// doesn't return (so far) bc the response can be lost and we may want strict feedback to actions
	// ex. a game where an action triggers an important cutscene, we could return the important cutscene but how would we ensure it has been seen/processed by the player?
	// ex. crash or lost connexion and the player lose a very important story development.
	// thus we'd rather use "engagement", see next method.
	// TODO REVIEW we may want to return trivial, "can-be-lost" feedback, for ex. "ticket created" or "action acknowledged"
	dispatch(action: Action, url?: Hyperlink['href']): Promise<void>

	// important to separate resource representation from actions feedback
	get_pending_engagement(): [HypermediaType, Action] | null
}

/////////////////////////////////////////////////

export {
	normalizeꓽuri‿SSP,
	normalizeꓽuri‿str,
	getꓽCTA,
	DEFAULT_ROOT_URI,
	type HATEOASServer,
}
