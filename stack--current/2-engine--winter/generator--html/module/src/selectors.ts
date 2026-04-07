import assert from '@monorepo-private/assert/v1'
import { Enum } from 'typescript-string-enums'
import type { Immutable, IETFLanguageType, Charset } from '@monorepo-private/ts--types'

import { hasꓽcontent } from '@monorepo-private/type-detection'
import type { Url‿str, Css‿str, Html‿str, JS‿str, Contentⳇweb } from '@monorepo-private/ts--types--web'
import * as Selectors from '@monorepo-private/ts--types--web'
import {
	normalize_unicode,
} from '@monorepo-private/normalize-string'

import {
	FeatureSnippets,
	type HtmlFileSpec,
	type HtmlMetas,
	type Links,
} from './types.ts'

/////////////////////////////////////////////////

import snippetꓽcssⳇboxᝍlayoutⵧnatural from './snippets/css/box-layout--natural.ts'
import snippetꓽcssⳇviewportⵧfull from './snippets/css/viewport--full.ts'
import snippetꓽhtmlⳇreact_root from './snippets/html/react-root.ts'
import snippetꓽjsⳇnormalizeᝍtrailingᝍslash from './snippets/js/snippet--normalize-url.ts'

/////////////////////////////////////////////////
// Contentⳇweb

function getꓽlang(spec: Immutable<HtmlFileSpec>): IETFLanguageType {
	return Selectors.getꓽlang(spec.content)
}
function getꓽcharset(spec: Immutable<HtmlFileSpec>): Charset {
	return Selectors.getꓽcharset(spec.content)
}

function getꓽcontent_blocksⵧhtml(spec: Immutable<HtmlFileSpec>): Immutable<Html‿str[]> {
	return Selectors.getꓽhtml(spec.content)
}
function getꓽcontent_blocksⵧcssⵧcritical(spec: Immutable<HtmlFileSpec>): Immutable<Css‿str[]> {
	// CSS has requirements on order:
	// 1. namespaces
	// 2. layers
	// 3. imports
	// 4. everything else
	const namespaces: Css‿str[] = Object.entries(Selectors.getꓽcssⵧtop__namespaces(spec.content)).length === 0
		? []
		: [
			`/* define namespaces for usage in following CSS, needs to be at the top https://github.com/parcel-bundler/parcel/issues/9534 */`,
			...Object.entries(Selectors.getꓽcssⵧtop__namespaces(spec.content)).map(([name, url]) => `@namespace ${name} url(${url});`),
		]
	const layer: Css‿str[] = Selectors.getꓽcssⵧtop__layers(spec.content).length === 0
		? []
		: [
			`/* define layers order, needs to be at the top to properly enforce the intended order */`,
			`@layer ${Selectors.getꓽcssⵧtop__layers(spec.content).join(', ')};`
		]
	const imports = Selectors.getꓽcssⵧcritical(spec.content).filter(s => s.startsWith('@import'))
	const rest = Selectors.getꓽcssⵧcritical(spec.content).filter(s => !s.startsWith('@import'))
	return [
		...namespaces,
		...layer,
		...imports,
		...rest,
	]
}
function getꓽcontent_blocksⵧcss(spec: Immutable<HtmlFileSpec>): Immutable<Css‿str[]> {
	const imports = Selectors.getꓽcss(spec.content).filter(s => s.startsWith('@import'))
	const rest = Selectors.getꓽcss(spec.content).filter(s => !s.startsWith('@import'))
	return [
		...imports,
		...rest,
	]
}
function getꓽcontent_blocksⵧjsⵧcritical(spec: Immutable<HtmlFileSpec>): Immutable<JS‿str[]> {
	return Selectors.getꓽjsⵧcritical(spec.content)
}
function getꓽcontent_blocksⵧjs(spec: Immutable<HtmlFileSpec>): Immutable<JS‿str[]> {
	return Selectors.getꓽjs(spec.content)
}

function getꓽcontent_html__root__attributes(spec: Immutable<HtmlFileSpec>): Immutable<NonNullable<Contentⳇweb['html__root__attributes']>> {
	return Selectors.getꓽhtml__root__attributes(spec.content)
}

function getꓽtitleⵧpage(spec: Immutable<HtmlFileSpec>, fallback = 'Index'): string{
	return Selectors.getꓽtitle(spec.content) || fallback
}

/////////////////////////////////////////////////

function getꓽmetas(spec: Immutable<HtmlFileSpec>): Immutable<HtmlMetas> {
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
			generator: '@monorepo-private/generator--html',
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

function getꓽlinks(spec: Immutable<HtmlFileSpec>): Immutable<Links> {
	// TODO normalize?
	return spec.links || {}
}

/////////////////////////////////////////////////
function getꓽfeatures(spec: Immutable<HtmlFileSpec>): FeatureSnippets[] {
	const features = new Set<FeatureSnippets>(spec.features ?? [])

	return Array.from(features).filter(f => {
		assert(Enum.isType(FeatureSnippets, f), `Unknown feature "${f}"!`)
		return true
	})
}

// alt
function getꓽspecⵧwith_features_expanded(spec: Immutable<HtmlFileSpec>): Immutable<HtmlFileSpec> {
	const content = ((): Contentⳇweb => {
		const content_expanded = structuredClone(spec.content) as Contentⳇweb

		function _enqueue_layer_if_not_present(layer: string) {
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

		const features = getꓽfeatures(spec)

		// check for mistakes
		if (features.includes('cssⳇfoundation--offirmo') && features.includes('cssⳇframework--offirmo')) {
			// framework includes foundation
			throw new Error(`Feature conflict: 'cssⳇfoundation--offirmo' and 'cssⳇframework--offirmo' are redundant!`)
		}

		if (features.includes('cssⳇviewport--full')) {
			_enqueue_layer_if_not_present('temp-while-loading')
		}

		features.forEach(feature_id => {
			switch (feature_id) {
				case 'analytics--google':
				case 'site-verification--google':
				case 'page-loader--offirmo':
					console.warn(`[HTML gen] TODO implement feature: ${feature_id}!`)
					break

				case 'cssⳇbox-layout--natural':
					content_expanded.cssⵧcritical = [
						snippetꓽcssⳇboxᝍlayoutⵧnatural,
						...Selectors.getꓽcssⵧcritical(content_expanded),
					]
					break

				case 'cssⳇviewport--full':
					content_expanded.cssⵧcritical = [
						snippetꓽcssⳇviewportⵧfull,
						...Selectors.getꓽcssⵧcritical(content_expanded),
					]
					break

				case 'normalize-url-trailing-slash': {
					let snippet = String(snippetꓽjsⳇnormalizeᝍtrailingᝍslash)
					// TODO extract to a function
					assert(snippet.startsWith('function '), `A critical JS snippet should be a named function! (${snippet})}`)
					snippet = `;(${snippet})()`
					content_expanded.jsⵧcritical = [
						snippet,
						...Selectors.getꓽjsⵧcritical(content_expanded),
					]
					break
				}
				case 'htmlⳇreact-root':
					content_expanded.html = [
						snippetꓽhtmlⳇreact_root(spec),
						...Selectors.getꓽhtml(content_expanded),
					]

					break

				case 'cssⳇfoundation--offirmo':
					content_expanded.css = [...Selectors.getꓽcss(content_expanded), `@import '@monorepo-private/css--foundation';`]
					// reminder: foundation includes reset
					_enqueue_layer_if_not_present('offirmo--reset')
					_enqueue_layer_if_not_present('offirmo--foundation')
					_ensure_namespace('svg', 'http://www.w3.org/2000/svg')
					break

				case 'cssⳇframework--offirmo':
					content_expanded.css = [...Selectors.getꓽcss(content_expanded), `@import '@monorepo-private/css--framework';`]
					// reminder: framework includes foundation which includes reset
					_enqueue_layer_if_not_present('offirmo--reset')
					_enqueue_layer_if_not_present('offirmo--foundation') // bc included in framework
					_enqueue_layer_if_not_present('offirmo--framework')
					_ensure_namespace('svg', 'http://www.w3.org/2000/svg')
					break

				default:
					throw new Error(`Unknown feature: ${feature_id}!`)
			}
		})

		if (Selectors.getꓽhtml(content_expanded).length === 0) {
			content_expanded.html = [
				// TODO better, using infos from author
				`
<header>
	<ul>
		<li><a href="/">Home</a></li>
	</ul>
</header>
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

function _getꓽhtml__head__style‿str(spec: Immutable<HtmlFileSpec>): Html‿str {
	const blocks = getꓽcontent_blocksⵧcssⵧcritical(spec)
	if (!hasꓽcontent(blocks)) return ''

	return `
<style> /******* critical CSS ${CRITICAL_CSS_LINK} */
	${blocks.join(EOL)}
</style>
`
}

function _getꓽhtml__head__js‿str(spec: Immutable<HtmlFileSpec>): Html‿str {
	const blocks = getꓽcontent_blocksⵧjsⵧcritical(spec)
	if (!hasꓽcontent(blocks)) return ''

	return `
<script> /////// critical JS ///////
	${blocks.join(EOL)}
</script>
`
}

function _stringifyꓽmetaⵧviewport__content(viewport_spec: Immutable<HtmlFileSpec>): string {
	return Object.entries(viewport_spec)
		.map(([key, value]) => {
			assert(hasꓽcontent(value), `viewport entry "${key}" should not be empty: "${value}"!`)
			return `${key}=${value}`
		})
		.join(',')
}

function _getꓽhtml__head__meta‿str(spec: Immutable<HtmlFileSpec>): Html‿str {
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

function _getꓽhtml__head‿str(spec: Immutable<HtmlFileSpec>): Html‿str {
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

function _getꓽhtml__body__style‿str(spec: Immutable<HtmlFileSpec>): Html‿str {
	const blocks = getꓽcontent_blocksⵧcss(spec)
	if (!hasꓽcontent(blocks)) return ''

	return `
<style> /* NON-critical styles ${CRITICAL_CSS_LINK} */
	${blocks.join(EOL)}
</style>
`
}

function _getꓽhtml__body__js‿str(spec: Immutable<HtmlFileSpec>): Html‿str {
	const blocks = getꓽcontent_blocksⵧjs(spec)
	if (!hasꓽcontent(blocks)) return ''

	return `
<script type="module"> /* NON-critical JS */
	${blocks.join(EOL)}
</script>
`
}

function _getꓽhtml__body‿str(spec: Immutable<HtmlFileSpec>): Html‿str {
	return `
<body>
	${getꓽcontent_blocksⵧhtml(spec).join(EOL)}
	${_getꓽhtml__body__style‿str(spec)}
	${_getꓽhtml__body__js‿str(spec)}
</body>
`
}

/////////////////////////////////////////////////

function getꓽhtml‿str(spec: Immutable<HtmlFileSpec>): Html‿str {
	spec = getꓽspecⵧwith_features_expanded(spec)
	const root__attributes = getꓽcontent_html__root__attributes(spec)
	const classes = root__attributes.filter(a => a.startsWith('.')).map(a => a.slice(1))
	const data_attributes = root__attributes.filter(a => a.startsWith('data-'))

	const result: Html‿str = `
<!DOCTYPE html>
<!-- AUTOMATICALLY GENERATED, DO NOT EDIT MANUALLY! -->

<!-- maximum language hints to prevent Chrome from incorrectly suggesting a translation -->
<html lang="${getꓽlang(spec)}" xml:lang="${getꓽlang(spec)}" ${classes.length ? (`class="${classes.join(' ')}"`) : ''} ${data_attributes.join(' ')}>
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
	getꓽcontent_html__root__attributes,
}
