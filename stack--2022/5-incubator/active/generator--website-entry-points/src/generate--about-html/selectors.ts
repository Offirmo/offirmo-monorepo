import assert from 'tiny-invariant'
import { Immutable, IETFLanguageType } from '@offirmo-private/ts-types'
import { Contentⳇweb } from '@offirmo-private/ts-types-web';
import {
	FeatureSnippets,
	HtmlMetas,
	HtmlMetaContentⳇViewport,
	HtmlDocumentSpec,
	getꓽfeatures as _getꓽfeatures,
} from '@offirmo-private/generator--html'

import { WebPropertyEntryPointSpec } from '../types.js'
import { LIB } from '../consts.js'
import {
	prefersꓽorientation,
	getꓽfeatures,
	getꓽlang,
	getꓽcolorⵧtheme,
	getꓽcharset,
	isꓽuser_scalable,
	supportsꓽscreensⵧwith_shape,
	wantsꓽinstall,
} from '../selectors/index.js'
import { ifꓽdebug } from '../utils/debug.js'
import { getꓽhtml_doc_spec as _getꓽhtml_doc_spec } from '../generate--index-html/selectors.js'

/////////////////////////////////////////////////

function getꓽhtml_doc_spec(spec: Immutable<WebPropertyEntryPointSpec>): HtmlDocumentSpec {
	const base = _getꓽhtml_doc_spec(spec)
	const result: HtmlDocumentSpec = {
		...base,

		content: {
			...base.content,
			title: base.content.title + ' - About',
			js: [],
			html: [
				`<h1>About ${base.content.title}</h1>`,
				`<p>TODO...</p>`],
		},
	}
	return result
}

/////////////////////////////////////////////////

export {
	getꓽhtml_doc_spec,
}
