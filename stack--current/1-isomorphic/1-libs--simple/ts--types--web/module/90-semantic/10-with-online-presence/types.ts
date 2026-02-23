import type { WithOnlinePresence as SimplerWithOnlinePresence } from '@monorepo-private/ts--types'
import type { Url‿str, SocialNetworkLink } from '../../01-links/index.ts'

export interface WithOnlinePresence extends SimplerWithOnlinePresence {
	urlⵧcanonical: Url‿str
	urlsⵧsocial?: SocialNetworkLink[] // array because it conveys the Author's preference, earlier = preferred
}
