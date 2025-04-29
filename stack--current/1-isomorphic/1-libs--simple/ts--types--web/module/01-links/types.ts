import type {
	SocialNetworkLink as SimplerSocialNetworkLink,
} from '@offirmo-private/ts-types'

import type { WithLang } from '../00-base/index.ts'

/////////////////////////////////////////////////


type Uri‿str = string
type Url‿str = Uri‿str


////////////

// ex. /foo?sort=asc#bar
interface SchemeSpecificURIPart {
	// TODO clarify encoding
	// TODO https://blog.whatwg.org/url-pattern-standard

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
	//parent?: SchemeSpecificURIPart
}

// "x" = "any [kind of format]"
type Uri‿x =
	| Uri‿str
	| SchemeSpecificURIPart

/////////////////////////////////////////////////

// https://www.iana.org/assignments/link-relations/link-relations.xhtml
type LinkRelation =
	| 'home'
	| 'back'
	| 'self' // Conveys an identifier for the link's context.
	| 'about'
	| 'external' // Refers to a resource that is not part of the same site as the current context.
	| 'item' // The target IRI points to a resource that is a member of the collection represented by the context IRI.
	| 'nofollow' // Indicates that the context’s original author or publisher does not endorse the link target.
	| 'noopener' // Indicates that any newly created top-level browsing context which results from following the link will not be an auxiliary browsing context. 	[HTML]
	| 'noreferrer' // Indicates that no referrer information is to be leaked when following the link. 	[HTML]
	| 'opener' // Indicates that any newly created top-level browsing context which results from following the link will be an auxiliary browsing context.
	| 'section' // Refers to a section in a collection of resources.'
	// TODO one day look into webmention, "Linkback" mechanism to the ones of Refback, Trackback, and Pingback
	// ultimately, everything is valid
	//| string
	// special Offirmo HATEOAS
	| 'continue-to' // automatically navigates to this resource once the current one is displayed

// inspired by https://developer.mozilla.org/en-US/docs/Web/API/HTMLAnchorElement/target
type LinkTarget =
	// from https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#target
	| '_self' // The current browsing context (default)
	| '_blank'  // Usually a new tab, but users can configure browsers to open a new window instead.
	| '_parent' // The parent browsing context of the current one. If no parent, behaves as _self.
	| '_top'    // The topmost browsing context. To be specific, this means the "highest" context that's an ancestor of the current one. If no ancestors, behaves as _self.
	| string // The name of a browsing context (window or tab) in which to display the resource. If no such context exists, the user agent will create one with that name
	// special Offirmo HATEOAS
	| '_root' // the closest root, ~to a webapp (may not be the topmost HATEOAS context) = needed for immersion, ex. full-screen cutscene

/** A more generic hyperlink than HTML's <a> following hypermedia theory
 * see https://hypermedia.systems/
 */
interface Hyper {
	// hyper target of this
	href?: Uri‿x // optional bc can sometimes be inferred = current

	// presentation
	cta?: string // optional bc should ideally be derived from the action (esp. for i18n) BUT same action could have different CTA following the context (ex. equip best equipment)
	shortcut?: string // TODO 1D format
}
interface Hyperlink extends Hyper, WithLang {
	href: Uri‿x // mandatory for this subtype

	/**
	 * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel
	 */
	rel: LinkRelation[] // https://www.iana.org/assignments/link-relations/link-relations.xhtml

	target?: LinkTarget

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
}

// "x" = "any [kind of format]"
type Hyperlink‿x =
	| Hyperlink
	| Uri‿x

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

/////////////////////////////////////////////////

export {
	type Uri‿str, type Url‿str,
	type SchemeSpecificURIPart,
	type Uri‿x,

	type Hyper,

	type LinkRelation,
	type LinkTarget,
	type Hyperlink,
	type Hyperlink‿x,

	type SocialNetworkId,
	type SocialNetworkLink,
}
