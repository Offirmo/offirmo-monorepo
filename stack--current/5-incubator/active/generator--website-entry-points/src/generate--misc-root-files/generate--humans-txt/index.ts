import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { WebPropertyEntryPointSpec } from '../../types.js'
import {
	getꓽauthor__name,
	getꓽauthor__intro,
	getꓽcontactⵧhuman,
} from '../../selectors/index.js'

/////////////////////////////////////////////////

function generate(spec: Immutable<WebPropertyEntryPointSpec>): string {
	// TODO credits system
	return `
# https://humanstxt.org/

## Author
Hi, I'm ${getꓽauthor__name(spec)}, ${getꓽauthor__intro(spec) || 'creator'}.

If you need to get in touch: ${getꓽcontactⵧhuman(spec)}.

## Credits
(TODO one day)
`.trimStart()
}

/////////////////////////////////////////////////

export default generate
export {
	generate,
}
