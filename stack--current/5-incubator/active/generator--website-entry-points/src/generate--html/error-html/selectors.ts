import assert from 'tiny-invariant'
import type { Immutable, IETFLanguageType } from '@offirmo-private/ts-types'
import type { Contentⳇweb } from '@offirmo-private/ts-types-web';
import {
	FeatureSnippets,
	HtmlMetas,
	HtmlMetaContentⳇViewport,
	HtmlFileSpec,
	getꓽfeatures as _getꓽfeatures,
} from '@offirmo-private/generator--html'

import type { WebPropertyEntryPointSpec } from '../../types.js'
import { LIB } from '../../consts.js'
import {
	prefersꓽorientation,
	getꓽfeatures,
	getꓽlang,
	getꓽcolorⵧtheme,
	getꓽcharset,
	isꓽuser_scalable,
	supportsꓽscreensⵧwith_shape,
	wantsꓽinstall,
} from '../../selectors/index.js'
import { ifꓽdebug } from '../../utils/debug.js'
import { getꓽhtml_doc_spec as _getꓽhtml_doc_spec } from '../index-html/selectors.js'

/////////////////////////////////////////////////

function getꓽhtml_doc_spec(spec: Immutable<WebPropertyEntryPointSpec>): HtmlFileSpec {
	const base = _getꓽhtml_doc_spec(spec)
	const result: HtmlFileSpec = {
		...base,

		features: (base.features ?? [])
			.filter(f => f !== 'htmlⳇreact-root')
			.filter(f => f !== 'normalize-url-trailing-slash') // we don't want extra redirects! It could be the cause of the error itself
			.filter(f => f !== 'cssⳇviewport--full' && f !== 'page-loader--offirmo'), // no fancies
		content: {
			...base.content,
			title: 'Error',
			js: [],
			html: [
				`<h1>Error</h1>`,
				`<p>An error happened.</p>`,
			]
		}
	}
	return result
}

/////////////////////////////////////////////////

export {
	getꓽhtml_doc_spec,
}
