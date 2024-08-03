

import type {
	Url‿str as SimplerUrl‿str,
	SocialNetworkLink as SimplerSocialNetworkLink,
} from '@offirmo-private/ts-types'

import { WithLang } from '../00-base/index.js'

/////////////////////////////////////////////////

type Url‿str = SimplerUrl‿str
// protocol

////////////

type SocialNetworkId =
	| 'artstation'
	| 'facebook'
	| 'github'
	| 'instagram'
	| 'linkedin'
	| 'producthunt'
	| 'reddit'
	| 'twitter' // we keep "twitter" as an internal id, "X" is too generic

interface SocialNetworkLink extends SimplerSocialNetworkLink {
	url: Url‿str // mandatory
	handle?: string // ex @Offirmo, u/Offirmo
	network: SocialNetworkId // helps to parse. Not optional bc I can add if missing
}

////////////

// TODO new Url spec
// https://en.wikipedia.org/wiki/Wikipedia:Bare_URLs
// https://en.wikipedia.org/wiki/Wikipedia:Link_rot
// TODO https://developer.apple.com/library/archive/featuredarticles/iPhoneURLScheme_Reference/Introduction/Introduction.html#//apple_ref/doc/uid/TP40007899
// skip link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#skip_links
interface Link extends WithLang {
	// do we endorse this link?
	// should we add ref?
	// follow?
	// etc...

	// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
	// download
	// href
	// ping
	// referrer policy
	// target...
	// attribution https://wicg.github.io/attribution-reporting-api/?sjid=5871821160398133867-AP#monkeypatch-attributionsrc

	/*
	Using target="_blank" without rel="noreferrer" and rel="noopener" makes the website vulnerable to window.opener API exploitation attacks,
	although note that, in newer browser versions setting target="_blank" implicitly provides the same protection as setting rel="noopener".
	See browser compatibility for details.
	(beware Android WebView!)
	*/
}

/////////////////////////////////////////////////

export {
	type Url‿str,
	type SocialNetworkId,
	type SocialNetworkLink,

	type Link,
}
