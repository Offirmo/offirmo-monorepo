// New "Offirmo's Hyper Architecture" OHA

import assert from 'tiny-invariant'
import { Enum } from 'typescript-string-enums'
import type { JSON, JSONPrimitiveType, Story, WithHints } from '@offirmo-private/ts-types'
import { type Hyperlink, type ReducerAction, type Uri‿x } from '@offirmo-private/ts-types-web'
import type { Hints as RichTextHints, NodeLike as RichTextNodeLike } from '@offirmo-private/rich-text-format'
import {
	type TrackedEngagement,
	type Engagement,
} from '@oh-my-rpg/state--engagement'

/////////////////////////////////////////////////
// 1. Hypertext / Hypermedia

// IMPORTANT
// RichTextNode = no links/actions (will be ignored if any)
// HyperMedia   = RichTextNode + links/actions
type OHAHyperMedia = RichTextNodeLike

type OHAStory = Story<OHAHyperMedia>

/////////////////////////////////////////////////
// 2a. Hyperlinks

/** A more generic hyperlink than HTML's <a> following hypermedia theory
 * see https://hypermedia.systems/
 */
	// as usual, the client is free to ignore all hints, it should still work
interface OHAHyperHints {
	cta?: RichTextNodeLike // optional bc 1) not always needed (ex. already an anchor) 2) SSoT = should ideally be derived BUT useful bc same action could have different CTA following the context (ex. equip the best equipment)
	keyboard_shortcut?: string // TODO 1D high level format
}
interface OHAHyper extends WithHints<OHAHyperHints> {
	// hyper target of this
	href?: Uri‿x // optional bc can sometimes be inferred = current

	// TODO navigation type? https://developer.mozilla.org/en-US/docs/Web/API/NavigateEvent/navigationType
	// useful to hint for back

	// TODO description of the target? needed?
}

// tslint:disable-next-line: variable-name
export const OHALinkRelation = Enum(
	// inspired by https://www.iana.org/assignments/link-relations/link-relations.xhtml
	'self',
	'home',     // or root ? TODO clarify
	//| 'back'  TODO review what need? shouldn't it be handled by the browser?
	//| 'external' // Refers to a resource that is not part of the same site as the current context
	//| 'item'     // The target IRI points to a resource that is a member of the collection represented by the context IRI
	// no need: no follow/open/ref is the default in our Hyper Architecture
	//| 'nofollow' // Indicates that the context’s original author or publisher does not endorse the link target.
	//| 'noopener'
	//| 'noreferrer'
	//| 'opener' // Indicates that any newly created top-level browsing context which results from following the link will be an auxiliary browsing context.
	//| 'section' // Refers to a section in a collection of resources.'
	// TODO 1D look into webmention, "Linkback" mechanism to the ones of Refback, Trackback, and Pingback

	// new OHA
	'continueᝍto', // automatically navigates to this resource once the current one is displayed (assuming some timing/next/skip/no need?)

	// classic "well known" expected pages
	'about',
	'status',
	'support', // where users should go if they need help with your thing
	'security',
	'privacy-policy',
	'terms-and-conditions',
	'credits',
	'pricing',
	'blog',
	'docs',
	'faq',
	'source',
	'contact',
)
export type OHALinkRelation = Enum<typeof OHALinkRelation> // eslint-disable-line no-redeclare


type OHALinkTarget =
	// inspired by https://developer.mozilla.org/en-US/docs/Web/API/HTMLAnchorElement/target
	| '_self' // The current browsing context (default)
	//| '_blank'  // Usually a new tab, but users can configure browsers to open a new window instead.
	//| '_parent' // The parent browsing context of the current one. If no parent, behaves as _self.
	//| '_top'    // The topmost browsing context. To be specific, this means the "highest" context that's an ancestor of the current one. If no ancestors, behaves as _self.
	| string // The name of a browsing context (window or tab) in which to display the resource. If no such context exists, the user agent will create one with that name
	// special OHA
	| '_root' // the closest root, ~to a webapp (may not be the topmost HATEOAS context) = needed for immersion, ex. full-screen cutscene yet not necessarily topmost, ex. windowed game

interface OHAHyperLink extends OHAHyper {
	href: Uri‿x // mandatory for this subtype

	rel?: OHALinkRelation[]

	target?: OHALinkTarget

	// TODO some kind of feedback engagement? needed for links?
}

// "x" = "any [kind of format]"
type OHAHyperLink‿x =
	| OHAHyperLink
	| Uri‿x


/////////////////////////////////////////////////
// 2b. Hyperactions (improved ~forms)

// TODO move input in ts-types

// inspired by CRUD, obviously without the "read" part
// use cases:
// - hint to derive some UI, ex. icons, colors, confirmation…
type StateChangeCategory =
	| 'none'       // no risk, ex. dry runs, simulation, report…
	| 'create'     // usually low risk since no data loss
	| 'delete'     // usually high risk, ex. delete a file
	| 'update'     // implies low risk incremental maintenance/improvement, loss of previous data (~semver minor)
	| 'upgrade'    // technical migration, should be no risk, but we may want a backup (~semver minor)
	| 'permission' // no data loss risk but some access/disclosure risks
	//| 'admin'    // any kind of admin not covered by the above
	| 'reduce'     // any other change, moderate risk (~semver major)

type InputType =
	| 'string' // any string (not recommended)
	| 'string--email'
	| 'string--url'
	| 'string--url--http'
	| 'string--password'
	| 'number' // any number (not recommended)
	// useful for selecting an installer or an app store
	// will be autopopulated
	| 'number--integer--timestamp--utc--ms'
	| 'env--os'
	| 'env--arch'
	// TODO add more types
	// TODO inspired by HTML5 input types
	// TODO inspired by https://legacy.reactjs.org/docs/typechecking-with-proptypes.html
	// TODO inspired by schemas https://standardschema.dev/

interface InputSpec<T = JSONPrimitiveType> {
	type: InputType
	normalizers?: string[] // pre-defined normalizers (TODO)
	hidden?: boolean // if true, the input is not shown/requested to the user, implies a default/autopopulated value
	advanced?: boolean // if true, the input is only shown/requested to the user on their explicit request. implies a good, safe default/autopopulated value
	valueⵧdefault?: T // ~suggested/recommended
	valueⵧcurrent?: T // useful in case [intent = change] to discourage using the same value or move it last in UI
}

// a simple feedback on action, without waiting for a server answer
// ex. ack "your request has been received"
// ex. wait "processing..."
// ex. prepare transition "hyperspace" from planet A to planet B
interface OHAFeedback extends WithHints {
	tracking:
		| 'forget'     // as in "fire-and-forget" = no tracking UI of the action is needed. Ex. sending a mail
		| 'background' // tracking UI recommended but doesn't prevent sending other actions
		| 'foreground' // (default) full "waiting/loading" UI, no other action can be sent until this one is resolved

	story?: OHAStory // the message to show to the user. not mandatory bc can also be inferred from the action's CTA

	// TODO is this relevant for tracking = bg/fg?
	//[continueᝍto]?: Uri‿x // if present, ultimately navigate to this resource once the action is dispatched and no other UI/engagement is pending

	// XXX should this be in the story itself?
	/*hints?: {
	}*/
}

// anything not hypermedia.GET
// conceptually maps to an HTML form
// but should be enhanced
// yes, we provide a generic, non-strictly typed action interface
// this is intentional as the point is to decouple client & server
// actions dispatched from the client should originate from the server
// so the client shouldn't have to know about strict typing
interface OHAHyperActionBlueprint extends OHAHyper, ReducerAction {
	// required parameters we need to get from the user (or pre-supplied)
	// input as in "form"
	input?: Record<string, InputSpec>// the data of the action, could be anything (or nothing)

	hints?: OHAHyper['hints'] & {
		change?: StateChangeCategory
		// TODO some sort of risk?
	}

	// aftermath
	// this is needed in the blueprint so that the client knows what to do/show WITHOUT waiting for the server
	feedback?: OHAFeedback
}

// constructed from the above
// much simpler, correspond to a ~rpc
interface OHAHyperAction extends ReducerAction {
	payload?: Record<string, JSONPrimitiveType>

	// TODO requirements on previous state, see TBRPG
}

/////////////////////////////////////////////////

interface OHAPendingEngagement extends TrackedEngagement<OHAHyperMedia> {
	ack_action?: OHAHyperAction // the action to dispatch to acknowledge this engagement as seen
}

/////////////////////////////////////////////////

interface OHARichTextHints<UnderlyingData = JSON> extends RichTextHints<UnderlyingData, OHAHyperLink‿x> {
	links?:       Record<string, OHAHyperLink‿x>          // HATEOAS links to other related resources with appropriate rel. Record as it's extremely convenient for lookup. key should be core "rel" or anything
	actions?:     Record<string, OHAHyperActionBlueprint> // OHA actions. Record as it's extremely convenient for lookup. key should be the action key
	engagements?: Array<OHAPendingEngagement>             // array bc order is important
}

/////////////////////////////////////////////////


export {
	type Uri‿str, type Url‿str,
	type SchemeSpecificURIPart,
	type Uri‿x,
} from '@offirmo-private/ts-types-web'

export {
	type RichTextNodeLike,

	type OHAHyperMedia,
	type OHARichTextHints,

	type OHAHyper,
	type OHALinkTarget,	type OHAHyperLink,
	type OHAHyperLink‿x,

	type OHAHyperActionBlueprint, type OHAHyperAction,
	type OHAFeedback,

	type OHAStory,

	type OHAPendingEngagement,
}
