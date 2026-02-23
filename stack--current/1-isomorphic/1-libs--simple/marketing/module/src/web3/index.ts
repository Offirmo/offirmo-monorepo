import type { Author, SocialNetworkLink, Url‿str } from '@monorepo-private/ts--types--web'

/////////////////////////////////////////////////

const EMAIL = 'TODO@gmail.com'

const WEBSITE = 'https://TODO/' as Url‿str

// prettier-ignore
const SOCIAL_LINKⵧGITHUB: SocialNetworkLink      = { network: 'github',      handle: 'Offirmo',   url: 'https://github.com/Offirmo'           } satisfies SocialNetworkLink
const SOCIAL_LINKⵧPRODUCTHUNT: SocialNetworkLink = { network: 'producthunt', handle: '@offirmo',  url: 'https://www.producthunt.com/@offirmo' } satisfies SocialNetworkLink
const SOCIAL_LINKⵧTWITTER: SocialNetworkLink     = { network: 'twitter',     handle: 'Offirmo',   url: 'https://twitter.com/Offirmo'          } satisfies SocialNetworkLink

const AUTHOR: Author = {
	name: 'TODO',
	intro: 'software engineer, open-source developer & creator',
	email: EMAIL,

	urlⵧcanonical: WEBSITE,

	urlsⵧsocial: [
		SOCIAL_LINKⵧGITHUB,
		SOCIAL_LINKⵧPRODUCTHUNT,
		SOCIAL_LINKⵧTWITTER
	],
}

/////////////////////////////////////////////////

export {
	EMAIL,
	WEBSITE,

	SOCIAL_LINKⵧGITHUB,
	SOCIAL_LINKⵧPRODUCTHUNT,
	SOCIAL_LINKⵧTWITTER,

	AUTHOR,
}
