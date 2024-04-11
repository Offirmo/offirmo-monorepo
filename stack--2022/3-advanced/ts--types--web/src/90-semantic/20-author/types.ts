import type { Author as SimplerAuthor } from '@offirmo-private/ts-types'

import { Url‿str } from '../../01-links/index.js'
import { Email‿str } from '../../40-email/index.js'
import { WithOnlinePresence } from '../10-with-online-presence/types.js'


/////////////////////////////////////////////////

export interface Author extends WithOnlinePresence {
	name: string
	intro?: string // very short intro. TODO refine
	email?: Email‿str
	contact?: Url‿str // should NOT duplicate email
}
