import type {
	SocialNetworkLink as SimplerSocialNetworkLink,
} from '@offirmo-private/ts-types'

import { WithLang } from '../00-base/index.js'

/////////////////////////////////////////////////

type Uri‿str = string
type Url‿str = Uri‿str

////////////

type SocialNetworkId =
	| 'artstation'
	| 'facebook'
	| 'github'
	| 'instagram'
	| 'itch.io' // https://itch.io/profile/xyz
	| 'linkedin'
	| 'producthunt'
	| 'reddit'
	| 'twitch'
	| 'ko-fi' // https://ko-fi.com/xyz
	| 'twitter' // we keep "twitter" as an internal id, "X" is too generic

interface SocialNetworkLink extends SimplerSocialNetworkLink {
	url: Url‿str // mandatory
	handle?: string // ex @Offirmo, u/Offirmo
	network: SocialNetworkId // helps to parse. Not optional bc I can add if missing
}

////////////

interface SchemeSpecificURIPart {
	// TODO clarify encoding

	// authority: not needed for now

	/** Core property
	 */
	path: string

	/** (optional) non-hierarchical data
	 * https://en.wikipedia.org/wiki/Query_string
	 * - The exact structure of the query string is not standardized. Methods used to parse the query string may differ between websites.
	 * NOTE: in-scope of the scheme
	 * * considered "unclean", try to not abuse
	 * NOT necessarily a key/value store
	 */
	query: string // TODO or query params or anything

	/** (optional) sub-resource identifier, sub-set, portion of the primary rsrc or view = representation the resource
	 * https://en.wikipedia.org/wiki/URI_fragment
	 * recommended to only use when it's not practical to serve the sub-rsrc independently https://www.w3.org/TR/cooluris/
	 * NOTE: independent of the scheme
	 * ex. :~:text=whatever
	 */
	fragment?: string

	/** (optional) the immediate parent in the cascade. Useful to resolve the full URI IF NEEDED
	 * TODO clarify how to set a "encapsulating URI" for properly detecting and resolving relative URIs
	 */
	parent?: SchemeSpecificURIPart
}

type URI‿x = Uri‿str | SchemeSpecificURIPart

/////////////////////////////////////////////////

type LinkRelation = string

/** A more generic hyperlink than HTML's <a> following hypermedia theory
 * see https://hypermedia.systems/
 */
interface Hyperlink extends WithLang {
	href: URI‿x

	/**
	 * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel
	 */
	rel: LinkRelation[] // https://www.iana.org/assignments/link-relations/link-relations.xhtml

	cta?: string // if present, replace / complement the anchor content
	// TODO label?

	target?: never // TODO clarify

	// referrer TODO
	// opener TODO

	// do we endorse this link?
	// should we add ref?
	// follow?
	// etc...

	// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
	// download
	// href
	// ping
	// referrer policy
	// attribution https://wicg.github.io/attribution-reporting-api/?sjid=5871821160398133867-AP#monkeypatch-attributionsrc

	// reducer action?
}

/////////////////////////////////////////////////

export {
	type Url‿str,

	type SocialNetworkId,
	type SocialNetworkLink,

	type URI‿x,
	type SchemeSpecificURIPart,
	type LinkRelation,
	type Hyperlink,
}
