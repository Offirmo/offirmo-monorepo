/* TypeScript types useful when manipulating email related data
 */

import type { Email‿str } from '@offirmo-private/ts-types'
import { hasꓽemail_structure } from '@offirmo-private/normalize-string'

/////////////////////////////////////////////////

function isꓽEmail‿str(possible_email: string): possible_email is Email‿str {
	return hasꓽemail_structure(possible_email)
}

/////////////////////////////////////////////////

export {
	type Email‿str,
	isꓽEmail‿str,
 }
