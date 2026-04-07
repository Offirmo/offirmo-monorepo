// Reminder: code will be prettified, no need to indent or format it.
// put the comments in the code, it's up to the consumer to optimize or not

import assert from '@monorepo-private/assert/v1'
import type { Immutable } from '@monorepo-private/ts--types'

import { DIR_FILES_TO_SERVE } from '../consts.ts'
import type { WebPropertyEntryPointSpec, EntryPoints } from '../types.ts'
import {
	getꓽbasenameⵧindexᐧhtml,
	getꓽbasenameⵧaboutᐧhtml,
	getꓽbasenameⵧcontactᐧhtml,
	getꓽbasenameⵧerrorᐧhtml,
	getꓽbasenameⵧprivacy_policyᐧhtml,
	getꓽbasenameⵧsupportᐧhtml,
	getꓽbasenameⵧterms_and_conditionsᐧhtml,
} from '../selectors/index.ts'

import generateꓽindexᐧhtml from './index-html/index.ts'
import generateꓽ404ᐧhtml from './page--404/index.ts'
import generateꓽaboutᐧhtml from './about/index.ts'
import generateꓽcontactᐧhtml from './contact/index.ts'
import generateꓽerrorᐧhtml from './page--error/index.ts'
import generateꓽprivacy_policyᐧhtml from './page--privacy-policy/index.ts'
import generateꓽsupportᐧhtml from './page--support/index.ts'
import generateꓽterms_and_conditionsᐧhtml from './page--terms-and-conditions/index.ts'
import { getꓽhtml_doc_spec } from './pages--common/selectors.ts'

/////////////////////////////////////////////////

function generateꓽerror_handling(spec: Immutable<WebPropertyEntryPointSpec>): EntryPoints {
	if (spec.isꓽcatching_all_routes)
		return {}

	const needsꓽerrorᐧhtml = !spec.host || spec.host === 'aws--cloudfront'
	const needsꓽ404ᐧhtml = !spec.host || !needsꓽerrorᐧhtml

	return {
			...(needsꓽerrorᐧhtml && { [`${DIR_FILES_TO_SERVE}/${getꓽbasenameⵧerrorᐧhtml(spec)}`]: generateꓽerrorᐧhtml(spec) }),
			...(needsꓽ404ᐧhtml && { [`${DIR_FILES_TO_SERVE}/404.html}`]: generateꓽ404ᐧhtml(spec) }),
		}
}

function generateꓽcomplimentary(spec: Immutable<WebPropertyEntryPointSpec>): EntryPoints {
	if (spec.isꓽcatching_all_routes) {
		// TODO review, could be more complex than that, ex. priorities to assets
		return {}
	}

	// ex. footer https://clerk.com/blog/zod-fellowship
	return {
		/////// technical
		...generateꓽerror_handling(spec),

		/////// Resources
		// TODO changelog

		/////// Org/Company details
		[`${DIR_FILES_TO_SERVE}/${getꓽbasenameⵧaboutᐧhtml(spec)}`]: generateꓽaboutᐧhtml(spec),
		// TODO careers
		// TODO blog
		[`${DIR_FILES_TO_SERVE}/${getꓽbasenameⵧsupportᐧhtml(spec)}`]: generateꓽsupportᐧhtml(spec),
		[`${DIR_FILES_TO_SERVE}/${getꓽbasenameⵧcontactᐧhtml(spec)}`]: generateꓽcontactᐧhtml(spec),
		// TODO brand assets

		/////// Legal
		[`${DIR_FILES_TO_SERVE}/${getꓽbasenameⵧterms_and_conditionsᐧhtml(spec)}`]: generateꓽterms_and_conditionsᐧhtml(spec),
		// TODO Terms of engagement = support <=> users
		[`${DIR_FILES_TO_SERVE}/${getꓽbasenameⵧprivacy_policyᐧhtml(spec)}`]: generateꓽprivacy_policyᐧhtml(spec),
		// TODO Data Processing Addendum
		// TODO cookie management
	}
}

function generate(spec: Immutable<WebPropertyEntryPointSpec>): EntryPoints {
	return {
		[`${DIR_FILES_TO_SERVE}/${getꓽbasenameⵧindexᐧhtml(spec)}`]: generateꓽindexᐧhtml(spec),

		'~~gen/logs/spec.html.json': JSON.stringify(getꓽhtml_doc_spec(spec), undefined, '	'),

		...generateꓽcomplimentary(spec),
	}
}

/////////////////////////////////////////////////

export default generate
