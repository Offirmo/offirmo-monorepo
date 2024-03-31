import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import { Contentⳇweb } from '@offirmo-private/ts-types-web';
import {
	FeatureSnippets,
	HtmlDocumentSpec,
} from '@offirmo-private/generator--html'

import { WebPropertyEntryPointSpec } from '../../types.js'
import {
	getꓽfeatures,
} from '../../selectors/index.js'
import { getꓽhtml_doc_spec as _getꓽhtml_doc_spec } from '../index-html/selectors.js'

/////////////////////////////////////////////////

function getꓽhtml_doc_spec(spec: Immutable<WebPropertyEntryPointSpec>): HtmlDocumentSpec {
	const base = _getꓽhtml_doc_spec(spec)
	const result: HtmlDocumentSpec = {
		...base,

		features: (base.features ?? [])
			.filter(f => f !== 'htmlⳇreact-root')
			.filter(f => f !== 'normalize-url-trailing-slash') // we don't want extra redirects! It could be the cause of the 404 itself.
			.filter(f => f !== 'cssⳇviewport--full' && f !== 'page-loader--offirmo'), // no fancies

		content: {
			...base.content,
			title: '404 Not Found',
			js: [],
			html: [
				`<h1>404 Not Found</h1>`,
				`<p>Sorry, the page you were looking for doesn't exist.</p>`,
			],
		}
	}
	return result
}

/////////////////////////////////////////////////

export {
	getꓽhtml_doc_spec,
}
