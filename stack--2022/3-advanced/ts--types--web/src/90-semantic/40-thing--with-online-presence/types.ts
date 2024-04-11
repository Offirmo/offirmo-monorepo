
import { Url‿str } from '../../01-links/index.js'
import { WithOnlinePresence } from '../10-with-online-presence/types.js'
import { Thing } from '../30-thing/types.js'

/////////////////////////////////////////////////

export interface ThingWithOnlinePresence extends Thing, WithOnlinePresence {
	//lang?: IETFLanguageType
	//description: string // must be simple, a paragraph at most
	//author: Author | undefined // undef = unknown :-(
	//since‿y?: number // for copyright notice

	//urlⵧcanonical: Url‿str
	//urlsⵧsocial?: SocialNetworkLink[]

	contact?: Url‿str // if not provided, default to author's Ideally should be a "contact center" https://docs.aws.amazon.com/connect/latest/adminguide/connect-concepts.html
	contactⵧsecurity?: Url‿str // if not provided, default to contact
	contactⵧsupport?: Url‿str // if not provided, default to contact
}
