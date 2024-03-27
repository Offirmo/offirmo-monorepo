

import type {
	Url‿str as SimplerUrl‿str,
	SocialNetworkLink as SimplerSocialNetworkLink,
} from '@offirmo-private/ts-types'

/////////////////////////////////////////////////

type Url‿str = SimplerUrl‿str
// protocol

////////////

type SocialNetworkId =
	| 'artstation'
	| 'github'
	| 'instagram'
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
// TODO full "link" type with referrer etc.
interface Link {

}

/////////////////////////////////////////////////

export {
	type Url‿str,
	type SocialNetworkId,
	type SocialNetworkLink,

	type Link,
}
