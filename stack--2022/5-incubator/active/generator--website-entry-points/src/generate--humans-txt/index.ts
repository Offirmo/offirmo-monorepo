import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { WebsiteEntryPointSpec } from '../types.js'
import {

} from '../selectors.js'
import { ifꓽdebug } from '../utils/debug.js'

/////////////////////////////////////////////////

function generate(spec: Immutable<WebsiteEntryPointSpec>): string {
	return `
# https://humanstxt.org/

Hi, I'm Offirmo, a software engineer, open-source developer & creator.

If you need to get in touch: https://github.com/Offirmo/offirmo-monorepo/issues


`.trimStart()
}

/////////////////////////////////////////////////

export default generate
export {
	generate,
}
