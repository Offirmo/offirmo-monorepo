import assert from 'tiny-invariant'
import { Immutable, IETFLanguageType } from '@offirmo-private/ts-types'
import { Contentⳇweb, Css‿str, Html‿str } from '@offirmo-private/ts-types-web';
import {
	FeatureSnippets,
	HtmlMetas,
	HtmlMetaContentⳇViewport,
	HtmlDocumentSpec,
	getꓽfeatures as _getꓽfeatures,
} from '@offirmo-private/generator--html'

import { WebPropertyEntryPointSpec } from '../../types.js'
import { LIB } from '../../consts.js'
import { getꓽtitleⵧpage, prefersꓽorientation, getꓽfeatures, getꓽlang, getꓽcolorⵧtheme, getꓽcharset, isꓽuser_scalable, supportsꓽscreensⵧwith_shape, wantsꓽinstall, usesꓽpull_to_refresh, getꓽcolorⵧbackground, getꓽcolorⵧforeground, needsꓽwebmanifest, getꓽbasenameⵧwebmanifest } from '../../selectors/index.js'
import { generateꓽinline as generateꓽfavicon__iconⵧinline } from '../../generate--icons/index.js'
import { ifꓽdebug } from '../../utils/debug.js'

/////////////////////////////////////////////////

function _getꓽmetasⵧviewport(spec: Immutable<WebPropertyEntryPointSpec>): HtmlMetaContentⳇViewport {
	return {
		// which site is not mobile friendly those day?
		// and those who are not are obviously NOT using this tool ;)
		width: 'device-width',
		//height: 'device-height', NO this seems to be a default, no site use it
		'initial-scale': 1,

		// scalability
		// - either we explicitly don't want it
		// - or/and we support orientation change => we need to lock the scale
		//   bc the viewport doesn't fit on orientation change (cf. https://stackoverflow.com/a/12114397)
		//   TODO review this case!
		...((!isꓽuser_scalable(spec) /*|| !prefersꓽorientation(spec)*/) && {
			'user-scalable': 'no',
			'minimum-scale': 1,
			'maximum-scale': 1,
		}),

		'viewport-fit': supportsꓽscreensⵧwith_shape(spec) ? 'cover' : 'contain',

		// TODO 'interactive-widget'
	}
}

function getꓽmetas(spec: Immutable<WebPropertyEntryPointSpec>): HtmlMetas {

	const result: HtmlMetas = {
		charset: getꓽcharset(spec),

		// document-level metadata
		// <meta name="<KEY>" content="<VALUE>">
		document: {
			viewport: _getꓽmetasⵧviewport(spec),


			...(wantsꓽinstall(spec) && {
				'apple-mobile-web-app-capable': 'yes',
				'apple-mobile-web-app-status-bar-style': supportsꓽscreensⵧwith_shape(spec)
					? 'black-translucent'
					: 'black',
			}),

			'format-detection': 'telephone=no', // TODO only if explicit?
		},

		// pragma directives, equivalent to http headers
		// <meta http-equiv="<KEY>" content="<VALUE>" />
		pragmas: {
			'content-security-policy': {
				// TODO
			},
			'content-type': `text/html;charset=${getꓽcharset(spec)}`,
			'content-language': getꓽlang(spec),

			//description: unknown
			generator: LIB,
			keywords: [],

			// TODO only if explicit?
			'theme-color': getꓽcolorⵧtheme(spec),
		},

		// <meta property="<KEY>" content="<VALUE>"/>
		properties: {
			//TODO Open Graph & co

		},

		itemprops: {},
	}

	return result
}

function getꓽlinks(spec: Immutable<WebPropertyEntryPointSpec>): { [rel: string]: string } {
	const favicon_candidate = generateꓽfavicon__iconⵧinline(spec)
	const shouldꓽinline_favicon = !favicon_candidate.includes('"') && favicon_candidate.length < 256 // arbitrary number

	return {
		//canonical: `https://TODO`,

		icon: shouldꓽinline_favicon
			? `data:image/svg+xml;utf8,${favicon_candidate}`
			: `./icon.svg`,

		...(needsꓽwebmanifest(spec) && {

			// tests
			// 2023/10 iOs  relative ./xyz.webmanifest = works
			// 2023/10 iOs  relative   xyz.webmanifest = works
			// 2023/10 iOs  saw queries to <parent>/index.webmanifest ???
			manifest: `./${getꓽbasenameⵧwebmanifest(spec)}`,
		}),
	}
}

/////////////////////////////////////////////////

function getꓽcssⵧcritical(spec: Immutable<WebPropertyEntryPointSpec>): Css‿str[] {

	return [
	// TODO make that auto or configurable
	`@layer reset, offirmo--reset, foundation, offirmo--foundation, framework;`,
	// TODO xml namespace

	// TODO use custom token names
	`
/* critical minimal design system */
:root {
	--color--bg: ${getꓽcolorⵧbackground(spec)};
	--color--fg: ${getꓽcolorⵧforeground(spec)};
	--font: -apple-system, ui-sans-serif, sans-serif;

	margin: 0;
	padding: 0;

	color: var(--color--fg);
	background-color: var(--color--bg);
	font-family: var(--font);

	${
		usesꓽpull_to_refresh(spec)
			? ''
			: `/* https://www.the-koi.com/projects/how-to-disable-pull-to-refresh/ */
	overscroll-behavior: none;`
}
	`
]
}

function getꓽhtml(spec: Immutable<WebPropertyEntryPointSpec>): Html‿str[] {
	return [
		// TODO
	]
}

function getꓽcontentⵧweb(spec: Immutable<WebPropertyEntryPointSpec>): Contentⳇweb {
	// TODO extract HTML from files? ./esm/parser-html.mjsxxx
	// TODO review import from js?

	const result: Contentⳇweb = {
		html: getꓽhtml(spec),
		title: getꓽtitleⵧpage(spec),

		cssⵧcritical: getꓽcssⵧcritical(spec),
	}
	return result
}

function getꓽhtml_doc_spec(spec: Immutable<WebPropertyEntryPointSpec>): HtmlDocumentSpec {
	const result: HtmlDocumentSpec = {
		lang: getꓽlang(spec),
		content: getꓽcontentⵧweb(spec),
		links: getꓽlinks(spec),
		metas: getꓽmetas(spec),
		features: getꓽfeatures(spec),
	}
	return result
}

/////////////////////////////////////////////////

export {
	getꓽhtml_doc_spec,
}
