import { Author, SocialNetworkLink, Url‿str } from '@offirmo-private/ts-types'

/////////////////////////////////////////////////

const EMAIL = 'offirmo.net@gmail.com'

const WEBSITE = 'https://www.offirmo.net/' as Url‿str

const SOCIAL_LINKⵧARTSTATION: SocialNetworkLink  = { network: 'artstation',  handle: 'Offirmo',   url: 'https://www.artstation.com/offirmo'   } satisfies SocialNetworkLink
const SOCIAL_LINKⵧGITHUB: SocialNetworkLink      = { network: 'github',      handle: 'Offirmo',   url: 'https://github.com/Offirmo'           } satisfies SocialNetworkLink
const SOCIAL_LINKⵧINSTAGRAM: SocialNetworkLink   = { network: 'instagram',   handle: 'offirmo',   url: 'https://www.instagram.com/offirmo'    } satisfies SocialNetworkLink
const SOCIAL_LINKⵧPRODUCTHUNT: SocialNetworkLink = { network: 'producthunt', handle: '@offirmo',  url: 'https://www.producthunt.com/@offirmo' } satisfies SocialNetworkLink
const SOCIAL_LINKⵧREDDIT: SocialNetworkLink      = { network: 'reddit',      handle: 'u/Offirmo', url: 'https://www.reddit.com/user/Offirmo'  } satisfies SocialNetworkLink
const SOCIAL_LINKⵧTWITTER: SocialNetworkLink     = { network: 'twitter',     handle: 'Offirmo',   url: 'https://twitter.com/Offirmo'          } satisfies SocialNetworkLink

const AUTHOR: Author = {
	name: 'Offirmo',
	email: EMAIL,
	//contact: `mailto:${EMAIL}`,

	urlⵧcanonical: WEBSITE,

	urlsⵧsocial: [
		SOCIAL_LINKⵧARTSTATION,
		SOCIAL_LINKⵧGITHUB,
		SOCIAL_LINKⵧINSTAGRAM,
		SOCIAL_LINKⵧPRODUCTHUNT,
		SOCIAL_LINKⵧREDDIT,
		SOCIAL_LINKⵧTWITTER
	],
}

/////////////////////////////////////////////////

export {
	EMAIL,
	WEBSITE,

	SOCIAL_LINKⵧARTSTATION,
	SOCIAL_LINKⵧGITHUB,
	SOCIAL_LINKⵧINSTAGRAM,
	SOCIAL_LINKⵧPRODUCTHUNT,
	SOCIAL_LINKⵧREDDIT,
	SOCIAL_LINKⵧTWITTER,

	AUTHOR,
}
