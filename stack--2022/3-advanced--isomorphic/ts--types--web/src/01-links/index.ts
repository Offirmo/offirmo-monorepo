

import type {
	Url‿str as SimplerUrl‿str,
	SocialNetworkLink as SimplerSocialNetworkLink,
} from '@offirmo-private/ts-types'

/////////////////////////////////////////////////

export type Url‿str = SimplerUrl‿str
// protocol


export type SocialNetwork =
	| 'artstation'
	| 'github'
	| 'instagram'
	| 'producthunt'
	| 'reddit'
	| 'twitter'

export interface SocialNetworkLink extends SimplerSocialNetworkLink {
	url: Url‿str // mandatory
	handle?: string // ex @Offirmo, u/Offirmo
	network: SocialNetwork // helps to parse. Not optional bc I can add if missing
}

// TODO new Url spec

// TODO full "link" type with referrer etc.
export interface Link {

}


// https://en.wikipedia.org/wiki/Wikipedia:Bare_URLs
// https://en.wikipedia.org/wiki/Wikipedia:Link_rot
