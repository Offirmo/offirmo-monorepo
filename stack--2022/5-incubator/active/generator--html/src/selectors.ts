import assert from 'tiny-invariant'
import { Enum } from 'typescript-string-enums'
import { Immutable, IETFLanguageType, Charset } from '@offirmo-private/ts-types'
import { hasꓽcontent } from '@offirmo-private/ts-utils'
import { Css‿str, Html‿str, JS‿str } from '@offirmo-private/ts-types-web'
import * as Selectors from '@offirmo-private/ts-types-web'
import {
	normalizeꓽIETFLanguageType,
	normalize_unicode,
} from '@offirmo-private/normalize-string'

import {
	FeatureSnippets,
	HtmlDocumentSpec,
	HtmlMetas,
	Links,
} from './types.js'

/////////////////////////////////////////////////

import snippetꓽcssⳇboxᝍlayoutⵧnatural from './snippets/css/box-layout--natural.js'
import snippetꓽcssⳇviewportⵧfull from './snippets/css/viewport--full.js'
import snippetꓽhtmlⳇreact_root from './snippets/html/react-root'
import snippetꓽjsⳇnormalizeᝍtrailingᝍslash from './snippets/js/snippet--normalize-url.js'

/////////////////////////////////////////////////
// Contentⳇweb

function getꓽlang(spec: Immutable<HtmlDocumentSpec>): IETFLanguageType {
	return normalizeꓽIETFLanguageType(spec.lang ?? '')
}
function getꓽcharset(spec: Immutable<HtmlDocumentSpec>): Charset {
	return 'utf-8'
}

function getꓽhtml(spec: Immutable<HtmlDocumentSpec>): Immutable<Html‿str[]> {
	return Selectors.getꓽhtml(spec.content)
}
function getꓽcssⵧcritical(spec: Immutable<HtmlDocumentSpec>): Immutable<Css‿str[]> {
	return Selectors.getꓽcssⵧcritical(spec.content)
}
function getꓽcss(spec: Immutable<HtmlDocumentSpec>): Immutable<Css‿str[]> {
	return Selectors.getꓽcss(spec.content)
}
function getꓽjsⵧcritical(spec: Immutable<HtmlDocumentSpec>): Immutable<JS‿str[]> {
	return Selectors.getꓽjsⵧcritical(spec.content)
}
function getꓽjs(spec: Immutable<HtmlDocumentSpec>): Immutable<JS‿str[]> {
	return Selectors.getꓽjs(spec.content)
}

function getꓽtitleⵧpage(spec: Immutable<HtmlDocumentSpec>): string {
	return Selectors.getꓽtitle(spec.content)
}

/////////////////////////////////////////////////

function getꓽmetas(spec: Immutable<HtmlDocumentSpec>): Immutable<HtmlMetas> {
	const charset = getꓽcharset(spec)
	const metas: HtmlMetas = {
		charset,
		document: {
			viewport: {
				// TODO defaults?
			},
			...spec?.metas?.document,
		},
		pragmas: {
			'content-language': getꓽlang(spec),
			'content-type': `text/html;charset=${charset}`,
			generator: '@offirmo-private/generator--html',
			keywords: [] as string[],
			...(spec?.metas?.pragmas as any),
		},
		properties: {
			...spec?.metas?.properties,
		},
		itemprops: {
			...spec?.metas?.itemprops,
		},
	}
	return metas as any
}

function getꓽlinks(spec: Immutable<HtmlDocumentSpec>): Immutable<Links> {
	// TODO normalize?
	return spec.links || {}
}


/////////////////////////////////////////////////
function getꓽfeatures(spec: Immutable<HtmlDocumentSpec>): FeatureSnippets[] {
	const features = new Set<FeatureSnippets>(spec.features ?? [])

	return Array.from(features).filter(f => {
		assert(Enum.isType(FeatureSnippets, f), `Unknown feature "${f}"!`)
		return true
	})
}

// alt
function getꓽspecⵧwith_features_expanded(spec: Immutable<HtmlDocumentSpec>): Immutable<HtmlDocumentSpec> {
	const content_with_features_expanded = { ...spec.content }

	const { features = [] } = spec

	features.forEach(feature_id => {

		switch (feature_id) {
			case 'analytics--google':
			case 'site-verification--google':
			case 'page-loader--offirmo':
				console.warn(`TODO implement feature: ${feature_id}!`)
				break

			case 'cssⳇbox-layout--natural':
				content_with_features_expanded.cssⵧcritical = [ ...Selectors.getꓽcssⵧcritical(content_with_features_expanded), snippetꓽcssⳇboxᝍlayoutⵧnatural ]
				break

			case 'cssⳇviewport--full':
				content_with_features_expanded.cssⵧcritical = [ ...Selectors.getꓽcssⵧcritical(content_with_features_expanded), snippetꓽcssⳇviewportⵧfull ]
				break

			case 'normalize-url-trailing-slash': {
				let snippet = String(snippetꓽjsⳇnormalizeᝍtrailingᝍslash)
				assert(snippet.startsWith('function '), `A critical JS snippet should be a named function! (${snippet})}`)
				snippet = `;(${snippet})()`
				content_with_features_expanded.jsⵧcritical = [ ...Selectors.getꓽjsⵧcritical(content_with_features_expanded), snippet ]
				break
			}
			case 'htmlⳇreact-root':
				content_with_features_expanded.html = [ ...Selectors.getꓽhtml(content_with_features_expanded), snippetꓽhtmlⳇreact_root(spec) ]
				break

			case 'cssⳇfoundation--offirmo':
				content_with_features_expanded.css = [ ...Selectors.getꓽcss(content_with_features_expanded), `@import 'npm:@offirmo-private/css--foundation' layer(foundation);` ]
				break

			case 'cssⳇframework--offirmo':
				content_with_features_expanded.css = [ ...Selectors.getꓽcss(content_with_features_expanded), `@import 'npm:@offirmo-private/css--framework'  layer(framework);` ]
				break

			default:
				throw new Error(`Unknown feature: ${feature_id}!`)
		}

	})

	if (Selectors.getꓽhtml(content_with_features_expanded).length === 0) {
		content_with_features_expanded.html = [ `
<header>TODO header</header>
<main id="root">
	<h1>${getꓽtitleⵧpage(spec)}</h1>
	<article>
		<p>Lorem ipsum dolor amet…</p>
	</article>
</main>
<footer>TODO footer</footer>
` ]
	}

	if (Selectors.getꓽjs(content_with_features_expanded).length === 0) {
		//content_with_features_expanded.js = [ `console.log('Hello, world!')` ]
	}
	else {
		content_with_features_expanded.html = [ `<noscript>You need to enable JavaScript to run this app.</noscript>`, ...Selectors.getꓽhtml(content_with_features_expanded) ]
	}

	return {
		...spec,
		content: content_with_features_expanded,
	}
}

/////////////////////////////////////////////////
// Reminder: code will be prettified, no need to indent or format it.
// put the comments in the code, it's up to the consumer to optimize or not

const EOL = '\n'
const CRITICAL_CSS_LINK = `https://www.smashingmagazine.com/2015/08/understanding-critical-css/`

function _getꓽhtml__head__style‿str(spec: Immutable<HtmlDocumentSpec>): Html‿str {
	const blocks = getꓽcssⵧcritical(spec)
	if (!hasꓽcontent(blocks)) return ''

	return `
<!-- critical CSS ${CRITICAL_CSS_LINK} -->
<style>
	${blocks.join(EOL)}
</style>
`
}

function _getꓽhtml__head__js‿str(spec: Immutable<HtmlDocumentSpec>): Html‿str {
	const blocks = getꓽjsⵧcritical(spec)
	if (!hasꓽcontent(blocks)) return ''

	return `
<!-- critical JS -->
<script>
	${blocks.join(EOL)}
</script>
`
}

function _stringifyꓽmetaⵧviewport__content(viewport_spec: Immutable<HtmlDocumentSpec>): string {
	return Object.entries(viewport_spec)
		.map(([key, value]) => {
			assert(hasꓽcontent(value), `viewport entry "${key}" should not be empty: "${value}"!`)
			return `${key}=${value}`
		})
		.join(',')
}

function _getꓽhtml__head__meta‿str(spec: Immutable<HtmlDocumentSpec>): Html‿str {
	const metas = getꓽmetas(spec)
	const links = getꓽlinks(spec)

	// TODO escape all content for attributes!! https://www.liquid-technologies.com/Reference/Glossary/XML_EscapingData.html

	return [
		`<!-- https://github.com/h5bp/html5-boilerplate/blob/main/docs/html.md#the-order-of-the-title-and-meta-tags -->`,
		`<meta charset="${metas.charset}" />`, // should be first!

		...Object.keys(metas.document)
			.filter(name => hasꓽcontent(metas.document, name))
			.sort()
			.map(name => {
				// @ts-ignore
				let content = metas.document[name]
				switch(name) {
					case 'viewport':
						content = _stringifyꓽmetaⵧviewport__content(content)
						break
					default:
						break
				}
				assert(typeof content === 'string' && !!content, `document meta "${name}" should be a non-empty string: "${content}"!`)
				return `<meta name="${name}" content="${content}">`
			}),

		...Object.keys(metas.pragmas)
			.filter(httpᝍequiv => hasꓽcontent(metas.pragmas, httpᝍequiv))
			.sort()
			.map(httpᝍequiv => {
				// @ts-ignore
				let content = metas.pragmas[httpᝍequiv]
				switch(httpᝍequiv) {
					// TODO stringify
					default:
						break
				}
				// TODO assertions
				return `<meta http-equiv="${httpᝍequiv}" content="${content}">`
			}),

		...Object.keys(metas.properties)
			.filter(property => hasꓽcontent(metas.properties, property))
			.sort()
			.map(property => {
				// @ts-ignore
				let content = metas.properties[property]
				switch(property) {
					// TODO stringify
					default:
						break
				}
				// TODO assertions
				return `<meta property="${property}" content="${content}">`
			}),

		...Object.keys(links)
			.filter(rel => hasꓽcontent(links, rel))
			.sort()
			.map(rel => {
				// @ts-ignore
				let href = links[rel]
				// TODO assertions
				return `<link rel="${rel}" href="${href}">`
			}),
	].join(EOL)
}

function _getꓽhtml__head‿str(spec: Immutable<HtmlDocumentSpec>): Html‿str {
	// https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML
	return `
<head>
	${_getꓽhtml__head__meta‿str(spec)}

	<title>${getꓽtitleⵧpage(spec)}</title>

	${_getꓽhtml__head__style‿str(spec)}

	${_getꓽhtml__head__js‿str(spec)}
</head>
`
}

/////////////////////////////////////////////////

function _getꓽhtml__body__style‿str(spec: Immutable<HtmlDocumentSpec>): Html‿str {
	const blocks = getꓽcss(spec)
	if (!hasꓽcontent(blocks)) return ''

	return `
<!-- NON-critical styles ${CRITICAL_CSS_LINK} -->
<style>
	${blocks.join(EOL)}
</style>
`
}

function _getꓽhtml__body__js‿str(spec: Immutable<HtmlDocumentSpec>): Html‿str {
	const blocks = getꓽjs(spec)
	if (!hasꓽcontent(blocks)) return ''

	return `
<!-- NON-critical JS -->
<script type="module">
	${blocks.join(EOL)}
</script>
`
}

function _getꓽhtml__body‿str(spec: Immutable<HtmlDocumentSpec>): Html‿str {
	spec = getꓽspecⵧwith_features_expanded(spec)


	return `
<body>
	${getꓽhtml(spec).join(EOL)}
	${_getꓽhtml__body__style‿str(spec)}
	${_getꓽhtml__body__js‿str(spec)}
</body>
`
}

/////////////////////////////////////////////////

function getꓽhtml‿str(spec: Immutable<HtmlDocumentSpec>): Html‿str {
	const result: Html‿str = `
<!DOCTYPE html>
<!-- AUTOMATICALLY GENERATED, DO NOT EDIT MANUALLY! -->

<!-- maximum language hints to prevent Chrome from incorrectly suggesting a translation -->
<html lang="${getꓽlang(spec)}" xml:lang="${getꓽlang(spec)}">
	${_getꓽhtml__head‿str(spec)}
	${_getꓽhtml__body‿str(spec)}
</html>`

	// TODO check IW10 <14k https://developers.google.com/speed/docs/insights/mobile#delivering-the-sub-one-second-rendering-experience
	return normalize_unicode(result)
}

/////////////////////////////////////////////////

export {
	getꓽfeatures,
	getꓽtitleⵧpage,
	getꓽhtml‿str,
}
