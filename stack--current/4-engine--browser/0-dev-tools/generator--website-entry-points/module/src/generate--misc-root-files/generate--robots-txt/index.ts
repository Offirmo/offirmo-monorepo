import assert from 'tiny-invariant'
import type { Immutable } from '@monorepo-private/ts--types'

import type { WebPropertyEntryPointSpec } from '../../types.ts'
import {
	isꓽpublic
} from '../../selectors/index.ts'

/////////////////////////////////////////////////

function generate(spec: Immutable<WebPropertyEntryPointSpec>): string {
	// TODO only allowed from the top!!
	// TODO Sitemap: http://www.example.com/sitemap.xml

	return `
## www.robotstxt.org/
## https://en.wikipedia.org/wiki/Robots_exclusion_standard
## https://support.google.com/webmasters/answer/6062596
User-agent: *
${isꓽpublic(spec) ? 'Allow' : 'Disallow'}: /
`.trimStart()
}

/////////////////////////////////////////////////

export default generate
export {
	generate,
}
