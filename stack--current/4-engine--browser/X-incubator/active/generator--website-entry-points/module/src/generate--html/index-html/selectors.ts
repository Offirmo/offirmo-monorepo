import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'

import type {
	FeatureSnippets,
	HtmlFileSpec,
} from '@offirmo-private/generator--html'

import type { WebPropertyEntryPointSpec } from '../../types.ts'
import { getꓽhtml_doc_spec as _getꓽhtml_doc_spec } from '../pages--common/selectors.ts'

import snippetꓽjsⳇredirect_extensionless_known_pathes from '../snippets/js/snippet--github-pages--redirect-extensionless.ts'

/////////////////////////////////////////////////

function getꓽhtml_doc_spec(spec: Immutable<WebPropertyEntryPointSpec>): HtmlFileSpec {
	const base = _getꓽhtml_doc_spec(spec)
	const result: HtmlFileSpec = {
		...base,

		content: {
			...base.content,
			jsⵧcritical: [


				`// for parcel serve which defaults every non-matching path to /index.html
				;if (location.hostname === 'localhost') {
					(${String(snippetꓽjsⳇredirect_extensionless_known_pathes)})()
				}`,

				...(base.content.jsⵧcritical || []),
			],
		}
	}
	return result
}

/////////////////////////////////////////////////

export {
	getꓽhtml_doc_spec,
}
