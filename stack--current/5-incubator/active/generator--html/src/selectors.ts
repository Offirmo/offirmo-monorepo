import assert from 'tiny-invariant'
import { Enum } from 'typescript-string-enums'
import { Immutable, IETFLanguageType, Charset } from '@offirmo-private/ts-types'
import { hasꓽcontent } from '@offirmo-private/ts-utils'
import { Url‿str, Css‿str, Html‿str, JS‿str, Contentⳇweb } from '@offirmo-private/ts-types-web'
import * as Selectors from '@offirmo-private/ts-types-web'
import {
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
import snippetꓽhtmlⳇreact_root from './snippets/html/react-root.js'
import snippetꓽjsⳇnormalizeᝍtrailingᝍslash from './snippets/js/snippet--normalize-url.js'

/////////////////////////////////////////////////
// Contentⳇweb

function getꓽlang(spec: Immutable<HtmlDocumentSpec>): IETFLanguageType {
	return Selectors.getꓽlang(spec.content)
}
function getꓽcharset(spec: Immutable<HtmlDocumentSpec>): Charset {
	return Selectors.getꓽcharset(spec.content)
}

function getꓽcontent_blocksⵧhtml(spec: Immutable<HtmlDocumentSpec>): Immutable<Html‿str[]> {
	return Selectors.getꓽhtml(spec.content)
}
function getꓽcontent_blocksⵧcssⵧcritical(spec: Immutable<HtmlDocumentSpec>): Immutable<Css‿str[]> {
	return Selectors.getꓽcssⵧcritical(spec.content, { includesꓽtop: true })
}
function getꓽcontent_blocksⵧcss(spec: Immutable<HtmlDocumentSpec>): Immutable<Css‿str[]> {
	return Selectors.getꓽcss(spec.content)
}
function getꓽcontent_blocksⵧjsⵧcritical(spec: Immutable<HtmlDocumentSpec>): Immutable<JS‿str[]> {
	return Selectors.getꓽjsⵧcritical(spec.content)
}
function getꓽcontent_blocksⵧjs(spec: Immutable<HtmlDocumentSpec>): Immutable<JS‿str[]> {
	return Selectors.getꓽjs(spec.content)
}

function getꓽcontent_html__element__classes(spec: Immutable<HtmlDocumentSpec>, element_name: string): Immutable<string[]> {
	return spec.content?.htmlⵧelements__classes?.[element_name] ?? []
}

function getꓽtitleⵧpage(spec: Immutable<HtmlDocumentSpec>, fallback = 'Index'): string{
	return Selectors.getꓽtitle(spec.content) || fallback
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
	const content = ((): Contentⳇweb => {
		const content_expanded = structuredClone(spec.content) as Contentⳇweb

		function _add_layer_if_not_present(layer: string) {
			content_expanded.cssⵧtop__layers ??= []

			if (content_expanded.cssⵧtop__layers!.includes(layer)) return

			content_expanded.cssⵧtop__layers!.push(layer)
		}

		function _ensure_namespace(name: string, url: Url‿str) {
			content_expanded.cssⵧtop__namespaces ??= {}

			if (content_expanded.cssⵧtop__namespaces[name]) {
				if (content_expanded.cssⵧtop__namespaces[name] === url) return

				assert(content_expanded.cssⵧtop__namespaces[name] === url, `Namespace conflict: "${name}" already defined with a different URL!`)
			}
			else {
				content_expanded.cssⵧtop__namespaces[name] = url
			}
		}

		function _add_element_class_if_not_present(element: string, class_name: string) {
			content_expanded.htmlⵧelements__classes ??= {}
			content_expanded.htmlⵧelements__classes[element] ??= []

			if (content_expanded.htmlⵧelements__classes[element]!.includes(class_name)) return

			content_expanded.htmlⵧelements__classes[element]!.push(class_name)
		}

		const features = getꓽfeatures(spec)

		// check for mistakes
		if (features.includes('cssⳇfoundation--offirmo') && features.includes('cssⳇframework--offirmo')) {
			// framework includes foundation
			throw new Error(`Feature conflict: 'cssⳇfoundation--offirmo' and 'cssⳇframework--offirmo' are redundant!`)
		}

		if (features.includes('cssⳇviewport--full')) {
			_add_layer_if_not_present('temp-while-loading')
		}

		features.forEach(feature_id => {
			switch (feature_id) {
				case 'analytics--google':
				case 'site-verification--google':
				case 'page-loader--offirmo':
					console.warn(`[HTML gen] TODO implement feature: ${feature_id}!`)
					break

				case 'cssⳇbox-layout--natural':
					content_expanded.cssⵧcritical = [...Selectors.getꓽcssⵧcritical(content_expanded), snippetꓽcssⳇboxᝍlayoutⵧnatural]
					break

				case 'cssⳇviewport--full':
					content_expanded.cssⵧcritical = [...Selectors.getꓽcssⵧcritical(content_expanded), snippetꓽcssⳇviewportⵧfull]
					break

				case 'normalize-url-trailing-slash': {
					let snippet = String(snippetꓽjsⳇnormalizeᝍtrailingᝍslash)
					// TODO extract to a function
					assert(snippet.startsWith('function '), `A critical JS snippet should be a named function! (${snippet})}`)
					snippet = `;(${snippet})()`
					content_expanded.jsⵧcritical = [...Selectors.getꓽjsⵧcritical(content_expanded), snippet]
					break
				}
				case 'htmlⳇreact-root':
					content_expanded.html = [...Selectors.getꓽhtml(content_expanded), snippetꓽhtmlⳇreact_root(spec)]

					break

				case 'cssⳇfoundation--offirmo':
					content_expanded.css = [...Selectors.getꓽcss(content_expanded), `@import 'npm:@offirmo-private/css--foundation';`]
					_add_layer_if_not_present('offirmo--reset')
					_add_layer_if_not_present('offirmo--foundation')
					_ensure_namespace('svg', 'http://www.w3.org/2000/svg')
					break

				case 'cssⳇframework--offirmo':
					content_expanded.css = [...Selectors.getꓽcss(content_expanded), `@import 'npm:@offirmo-private/css--framework';`]
					// framework includes foundation
					_add_layer_if_not_present('offirmo--reset')
					_add_layer_if_not_present('offirmo--foundation') // bc included
					_ensure_namespace('svg', 'http://www.w3.org/2000/svg')

					_add_layer_if_not_present('offirmo--framework')
					break

				default:
					throw new Error(`Unknown feature: ${feature_id}!`)
			}
		})

		if (Selectors.getꓽhtml(content_expanded).length === 0) {
			content_expanded.html = [
				`
<header>TODO header</header>
<main id="root">
	<h1>${getꓽtitleⵧpage(spec)}</h1>
	<article>
		<p>Lorem ipsum dolor amet…</p>
	</article>
</main>
<footer>TODO footer</footer>
		`,
			]
		}

		const hasJS = Selectors.getꓽjs(content_expanded).length > 0 || features.includes('htmlⳇreact-root')
		if (hasJS) {
			content_expanded.html = [`<noscript>You need to enable JavaScript to run this app.</noscript>`, ...Selectors.getꓽhtml(content_expanded)]
		} else {
			//content_with_features_expanded.js = [ `console.log('Hello, world!')` ]
			// TODO something?
		}

		return content_expanded
	})()

	return {
		...spec,
		content,
	}
}

/////////////////////////////////////////////////
// Reminder: code will be prettified, no need to indent or format it.
// put the comments in the code, it's up to the consumer to optimize or not

const EOL = '\n'
const CRITICAL_CSS_LINK = `https://www.smashingmagazine.com/2015/08/understanding-critical-css/`

function _getꓽhtml__head__style‿str(spec: Immutable<HtmlDocumentSpec>): Html‿str {
	const blocks = getꓽcontent_blocksⵧcssⵧcritical(spec)
	if (!hasꓽcontent(blocks)) return ''

	return `
<style> /******* critical CSS ${CRITICAL_CSS_LINK} */
	${blocks.join(EOL)}
</style>
`
}

function _getꓽhtml__head__js‿str(spec: Immutable<HtmlDocumentSpec>): Html‿str {
	const blocks = getꓽcontent_blocksⵧjsⵧcritical(spec)
	if (!hasꓽcontent(blocks)) return ''

	return `
<script> /////// critical JS ///////
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
	const blocks = getꓽcontent_blocksⵧcss(spec)
	if (!hasꓽcontent(blocks)) return ''

	return `
<style> /******* NON-critical styles ${CRITICAL_CSS_LINK} */
	${blocks.join(EOL)}
</style>
`
}

function _getꓽhtml__body__js‿str(spec: Immutable<HtmlDocumentSpec>): Html‿str {
	const blocks = getꓽcontent_blocksⵧjs(spec)
	if (!hasꓽcontent(blocks)) return ''

	return `
<script type="module"> /* NON-critical JS */
	${blocks.join(EOL)}
</script>
`
}

function _getꓽhtml__body‿str(spec: Immutable<HtmlDocumentSpec>): Html‿str {
	const classes = getꓽcontent_html__element__classes(spec, 'body')

	return `
<body ${classes.length ? (`class="${classes.join(' ')}"`) : ''}>
	${getꓽcontent_blocksⵧhtml(spec).join(EOL)}
	${_getꓽhtml__body__style‿str(spec)}
	${_getꓽhtml__body__js‿str(spec)}
</body>
`
}

/////////////////////////////////////////////////

function getꓽhtml‿str(spec: Immutable<HtmlDocumentSpec>): Html‿str {
	spec = getꓽspecⵧwith_features_expanded(spec)
	const classes = getꓽcontent_html__element__classes(spec, 'html')

	const result: Html‿str = `
<!DOCTYPE html>
<!-- AUTOMATICALLY GENERATED, DO NOT EDIT MANUALLY! -->

<!-- maximum language hints to prevent Chrome from incorrectly suggesting a translation -->
<html lang="${getꓽlang(spec)}" xml:lang="${getꓽlang(spec)}" ${classes.length ? (`class="${classes.join(' ')}"`) : ''}>
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
	getꓽcontent_html__element__classes,
}