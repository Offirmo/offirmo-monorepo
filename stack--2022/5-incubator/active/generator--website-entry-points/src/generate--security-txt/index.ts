import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { WebsiteEntryPointSpec } from '../types.js'
import {
	getꓽcontactⵧsecurity,
} from '../selectors.js'

/////////////////////////////////////////////////

function generate(spec: Immutable<WebsiteEntryPointSpec>): string {
	return `
# https://securitytxt.org/

Please report any security issue or danger to the community to:
- ${getꓽcontactⵧsecurity(spec)}

Thanks for your contribution!

`.trimStart()
}

/////////////////////////////////////////////////

export default generate
export {
	generate,
}
