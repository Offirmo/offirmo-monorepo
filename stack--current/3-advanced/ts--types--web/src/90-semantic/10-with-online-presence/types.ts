import type { WithOnlinePresence as SimplerWithOnlinePresence } from '@offirmo-private/ts-types'
import { Url‿str, SocialNetworkLink } from '../../01-links/index.js'

export interface WithOnlinePresence extends SimplerWithOnlinePresence {
	urlⵧcanonical: Url‿str
	urlsⵧsocial?: SocialNetworkLink[] // array because it conveys the Author's preference, earlier = preferred
}
