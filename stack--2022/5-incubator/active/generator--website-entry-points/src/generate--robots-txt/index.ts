import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import { WebsiteEntryPointSpec } from '../types.js'
import {
	isꓽpublic
} from '../selectors.js'
import { ifꓽdebug } from '../utils/debug.js'

/////////////////////////////////////////////////

function generate(spec: Immutable<WebsiteEntryPointSpec>): string {
	// TODO only allowed from the top!!

	if (isꓽpublic(spec)) {
		// TODO Sitemap: http://www.example.com/sitemap.xml
		return `
## https://www.robotstxt.org/
## https://en.wikipedia.org/wiki/Robots_exclusion_standard
## https://support.google.com/webmasters/answer/6062596
User-agent: *
Allow: /
`.trimStart()
	}

	return `
## www.robotstxt.org/
## https://en.wikipedia.org/wiki/Robots_exclusion_standard
## https://support.google.com/webmasters/answer/6062596
User-agent: *
Disallow: /
`.trimStart()
}

/////////////////////////////////////////////////

export default generate
export {
	generate,
}
