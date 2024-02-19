import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { WebsiteEntryPointSpec } from '../types.js'
import {
	getꓽauthor__name,
	getꓽauthor__intro,
	getꓽcontactⵧhuman,
} from '../selectors.js'

/////////////////////////////////////////////////

function generate(spec: Immutable<WebsiteEntryPointSpec>): string {
	// TODO credits system
	return `
# https://humanstxt.org/

## Author
Hi, I'm ${getꓽauthor__name(spec)}, ${getꓽauthor__intro(spec) || 'creator'}.

If you need to get in touch: ${getꓽcontactⵧhuman(spec)}.

## Credits

`.trimStart()
}

/////////////////////////////////////////////////

export default generate
export {
	generate,
}
