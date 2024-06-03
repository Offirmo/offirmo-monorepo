import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import { Contentⳇweb, Css‿str, Html‿str, JS‿str } from '@offirmo-private/ts-types-web';
import * as ContentⳇwebᐧSelectors from '@offirmo-private/ts-types-web';
import {
	HtmlMetas,
	HtmlMetaContentⳇViewport,
	HtmlDocumentSpec,
} from '@offirmo-private/generator--html'

import { WebPropertyEntryPointSpec } from '../../types.js'
import { LIB } from '../../consts.js'
import {
	getꓽtitleⵧpage,
	getꓽfeatures,
	getꓽlang,
	getꓽcolorⵧtheme,
	getꓽcharset,
	isꓽuser_scalable,
	supportsꓽscreensⵧwith_shape,
	wantsꓽinstall,
	usesꓽpull_to_refresh,
	getꓽcolorⵧbackground, getꓽcolorⵧforeground,
	needsꓽwebmanifest, getꓽbasenameⵧwebmanifest,
	shouldꓽgenerateꓽjscode
} from '../../selectors/index.js'
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
		charset: getꓽcharset(spec.content),

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
			'content-type': `text/html;charset=${getꓽcharset(spec.content)}`,
			'content-language': getꓽlang(spec.content),

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

const TOKEN__COLOR__BG = '--o⋄color⁚bg--main' //'color--bg'
const TOKEN__COLOR__FG = '--o⋄color⁚fg--main' //color--fg'
const TOKEN__FONT__SYSTEMⵧSANS = '--o⋄font-family--system--sans'

function getꓽcontentⵧinitial(spec: Immutable<WebPropertyEntryPointSpec>): Immutable<Contentⳇweb> {
	return spec.content
}

function getꓽcontentⵧweb__css(spec: Immutable<WebPropertyEntryPointSpec>): Pick<Contentⳇweb, 'css' | 'cssⵧtop__layers' | 'cssⵧtop__namespaces' | 'cssⵧcritical'> {
	const result: ReturnType<typeof getꓽcontentⵧweb__css> = {
		css: [ ...ContentⳇwebᐧSelectors.getꓽcss(spec.content) ],
		cssⵧtop__layers: [ ...ContentⳇwebᐧSelectors.getꓽcssⵧtop__layers(spec.content) ],
		cssⵧtop__namespaces: { ...ContentⳇwebᐧSelectors.getꓽcssⵧtop__namespaces(spec.content) },
		cssⵧcritical: [ ...ContentⳇwebᐧSelectors.getꓽcssⵧcritical(spec.content) ],
	}

	// TODO check if the system font stack works on major OS/browser
	result.cssⵧcritical!.unshift(`/* critical minimal design system */
:root {
	/* FG+BG colors are the basics of identity */
	${TOKEN__COLOR__BG}: ${getꓽcolorⵧbackground(spec)};
	${TOKEN__COLOR__FG}: ${getꓽcolorⵧforeground(spec)};
	/* https://systemfontstack.com/ simplified */
	${TOKEN__FONT__SYSTEMⵧSANS}: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;

	margin: 0;
	padding: 0;

	color: var(${TOKEN__COLOR__FG});
	background-color: var(${TOKEN__COLOR__BG});
	font-family: var(${TOKEN__FONT__SYSTEMⵧSANS});

	${usesꓽpull_to_refresh(spec)
		? ''
		: `/* https://www.the-koi.com/projects/how-to-disable-pull-to-refresh/ */
	overscroll-behavior: none;`
	}
}`)

	return result
}

function getꓽcontentⵧweb__html(spec: Immutable<WebPropertyEntryPointSpec>): Pick<Contentⳇweb, 'html'> {
	// TODO extract HTML from files? ./esm/parser-html.mjsxxx
	return {
		html: [ ...(getꓽcontentⵧinitial(spec).html ?? [])],
	}
}

function getꓽcontentⵧweb__js(spec: Immutable<WebPropertyEntryPointSpec>): Pick<Contentⳇweb, 'js' | 'jsⵧcritical'> {
	const result = {
		js: [ ...ContentⳇwebᐧSelectors.getꓽjs(spec.content) ],
		jsⵧcritical: [ ...ContentⳇwebᐧSelectors.getꓽjsⵧcritical(spec.content) ],
	}

	if (shouldꓽgenerateꓽjscode(spec))
		result.js.push(`import './app/index.js'`)

	return result
}

function getꓽcontentⵧweb(spec: Immutable<WebPropertyEntryPointSpec>): Contentⳇweb {

	const result: Contentⳇweb = {
		...(structuredClone(getꓽcontentⵧinitial(spec)) as Contentⳇweb), // remove immutability
		title: ifꓽdebug(spec).prefixꓽwith('[title--page]', getꓽtitleⵧpage(spec)), // always override

		...getꓽcontentⵧweb__html(spec),
		...getꓽcontentⵧweb__js(spec),
		...getꓽcontentⵧweb__css(spec),
	}
	return result
}

/////////////////////////////////////////////////

function getꓽhtml_doc_spec(spec: Immutable<WebPropertyEntryPointSpec>): HtmlDocumentSpec {
	const result: HtmlDocumentSpec = {
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
