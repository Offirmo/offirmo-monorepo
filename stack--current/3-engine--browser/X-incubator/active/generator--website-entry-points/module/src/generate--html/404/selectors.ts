import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'

import type {
	FeatureSnippets,
	HtmlFileSpec,
} from '@offirmo-private/generator--html'

import type { WebPropertyEntryPointSpec } from '../../types.ts'
import { getꓽhtml_doc_spec as _getꓽhtml_doc_spec } from '../index-html/selectors.ts'

/////////////////////////////////////////////////

function getꓽhtml_doc_spec(spec: Immutable<WebPropertyEntryPointSpec>): HtmlFileSpec {
	const base = _getꓽhtml_doc_spec(spec)
	const result: HtmlFileSpec = {
		...base,

		features: (base.features ?? [])
			.filter(f => f !== 'htmlⳇreact-root') // no need, we'll provide content
			.filter(f => f !== 'normalize-url-trailing-slash') // we don't want extra redirects! It could be the cause of this 404!
			.filter(f => f !== 'cssⳇviewport--full' && f !== 'page-loader--offirmo'), // no fancies

		content: {
			...base.content,
			title: '404 Not Found',
			js: [],
			html: [
				`
<h1>404 Not Found</h1>
<p>Sorry, the page you were looking for doesn't exist.</p>
<nav>
	<ul>
		<li><a href="/">Go home</a></li>
		<li><button onclick="history.back()">Navigate back</button></li>
	</ul>
</nav>
				`
				// TODO auto-link to /support and /status
			],
		}
	}
	return result
}

/////////////////////////////////////////////////

export {
	getꓽhtml_doc_spec,
}
