import assert from 'tiny-invariant'
import type { Immutable, IETFLanguageType } from '@monorepo-private/ts--types'

import type { Contentⳇweb } from '@monorepo-private/ts--types--web';
import {
	type HtmlFileSpec,
} from '@monorepo-private/generator--html'

import type { WebPropertyEntryPointSpec } from '../../types.ts'
import { LIB } from '../../consts.ts'
import {
	prefersꓽorientation,
	getꓽfeatures,
	getꓽlang,
	getꓽcolorⵧtheme,
	getꓽcharset,
	isꓽuser_scalable,
	supportsꓽscreensⵧwith_shape,
	wantsꓽinstall,
} from '../../selectors/index.ts'
import { ifꓽdebug } from '../../utils/debug.ts'
import { getꓽhtml_doc_spec as _getꓽhtml_doc_spec } from '../pages--common/selectors.ts'

/////////////////////////////////////////////////

function getꓽhtml_doc_spec(spec: Immutable<WebPropertyEntryPointSpec>): HtmlFileSpec {
	const base = _getꓽhtml_doc_spec(spec)
	const result: HtmlFileSpec = {
		...base,

		// TODO if the site itself is an "about", should redirect to root

		features: (base.features ?? [])
			.filter(f => f !== 'htmlⳇreact-root')
			.filter(f => f !== 'cssⳇviewport--full' && f !== 'page-loader--offirmo'), // no fancies
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
