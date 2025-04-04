// Reminder: code will be prettified, no need to indent or format it.
// put the comments in the code, it's up to the consumer to optimize or not

import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'

import type { WebPropertyEntryPointSpec, EntryPoints } from '../types.ts'
import {
	getꓽbasenameⵧindexᐧhtml,
	getꓽbasenameⵧaboutᐧhtml,
	getꓽbasenameⵧcontactᐧhtml,
	getꓽbasenameⵧerrorᐧhtml,
} from '../selectors/index.ts'

import generateꓽindexᐧhtml from './index-html/index.ts'
import { getꓽhtml_doc_spec } from './index-html/selectors.ts'
import generateꓽaboutᐧhtml from './about-html/index.ts'
import generateꓽcontactᐧhtml from './contact-html/index.ts'
import generateꓽerrorᐧhtml from './error-html/index.ts'
import generateꓽ404ᐧhtml from './404-html/index.ts'

/////////////////////////////////////////////////

function generateꓽerror_handling(spec: Immutable<WebPropertyEntryPointSpec>): EntryPoints {
	if (spec.isꓽcatching_all_routes)
		return {}

	const needsꓽerrorᐧhtml = !spec.host || spec.host === 'cloudfront'
	const needsꓽ404ᐧhtml = !spec.host || !needsꓽerrorᐧhtml

	return {
			...(needsꓽerrorᐧhtml && { [getꓽbasenameⵧerrorᐧhtml(spec)]: generateꓽerrorᐧhtml(spec) }),
			...(needsꓽ404ᐧhtml && { '404.html': generateꓽ404ᐧhtml(spec) }),
		}
}

function generateꓽcomplimentary(spec: Immutable<WebPropertyEntryPointSpec>): EntryPoints {
	if (spec.isꓽcatching_all_routes)
		return {}

	return {
		[getꓽbasenameⵧaboutᐧhtml(spec)]: generateꓽaboutᐧhtml(spec),
		[getꓽbasenameⵧcontactᐧhtml(spec)]: generateꓽcontactᐧhtml(spec),

		...generateꓽerror_handling(spec),
	}
}

function generate(spec: Immutable<WebPropertyEntryPointSpec>): EntryPoints {
	return {
		[getꓽbasenameⵧindexᐧhtml(spec)]: generateꓽindexᐧhtml(spec),
		'~~gen/logs/spec.html.json': JSON.stringify(getꓽhtml_doc_spec(spec), undefined, '	'),

		...generateꓽcomplimentary(spec),
	}
}

/////////////////////////////////////////////////

export default generate
