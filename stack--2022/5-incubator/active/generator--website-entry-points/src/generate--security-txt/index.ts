import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { WebsiteEntryPointSpec } from '../types.js'
import {

} from '../selectors.js'
import { ifꓽdebug } from '../utils/debug.js'

/////////////////////////////////////////////////

function generate(spec: Immutable<WebsiteEntryPointSpec>): string {
	return `
# https://securitytxt.org/

In general, please report any security issue or danger to the community either to:
- https://github.com/Offirmo/offirmo-monorepo/issues
- offirmo.net «at» gmail.com

Thanks for your contribution!


## Source code

This repo contains the code for:
- public npm modules
- public webextensions
- public webapps

All code is open source.

Please report any security issues. Thanks for your contribution!

`.trimStart()
}

/////////////////////////////////////////////////

export default generate
export {
	generate,
}
