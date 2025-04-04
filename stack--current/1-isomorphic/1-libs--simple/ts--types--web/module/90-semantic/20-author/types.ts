import type { Author as SimplerAuthor } from '@offirmo-private/ts-types'

import type { Url‿str } from '../../01-links/index.ts'
import type { Email‿str } from '../../40-email/index.ts'
import type { WithOnlinePresence } from '../10-with-online-presence/types.ts'


/////////////////////////////////////////////////

export interface Author extends WithOnlinePresence {
	name: string
	intro?: string // very short intro. TODO refine
	email?: Email‿str
	contact?: Url‿str // should NOT duplicate email
	since‿y?: number // for copyright notice
}
