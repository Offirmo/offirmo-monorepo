import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'

import type { WebPropertyEntryPointSpec } from '../../types.ts'
import {
	getꓽcontactⵧsecurity,
} from '../../selectors/index.ts'

/////////////////////////////////////////////////

function generate(spec: Immutable<WebPropertyEntryPointSpec>): string {
	return `
# https://securitytxt.org/

Please report any security issue or danger to the community to:
- ${getꓽcontactⵧsecurity(spec)}

Thanks for your contribution!
`.trimStart()
}

/////////////////////////////////////////////////

export default generate
