// Reminder: code will be prettified, no need to indent or format it.
// put the comments in the code, it's up to the consumer to optimize or not

import assert from 'tiny-invariant'
import { Immutable, Html‿str, JS‿str, Css‿str } from '@offirmo-private/ts-types'
import { normalize_unicode } from '@offirmo-private/normalize-string'

import { EOL } from '../consts.js'
import { WebsiteEntryPointSpec } from '../types.js'
import { HtmlDocumentSpec, FeatureSnippets, generate as generate_html } from '../utils/html/index.js'
import { HtmlMetaContentⳇViewport, HtmlMetas } from './types.js'
import {
	getꓽlang,
	getꓽtitleⵧpage,
	getꓽtitleⵧsocial,
	getꓽdescriptionⵧpage,
	getꓽcolorⵧtheme,
	getꓽcolorⵧbackground,
	getꓽcolorⵧforeground,
	usesꓽpull_to_refresh,
	needsꓽwebmanifest,
	getꓽbasenameⵧwebmanifest,
	shouldꓽgenerateꓽsourcecode,
	getꓽfeatures,
} from '../selectors.js'
import { ifꓽdebug } from '../utils/debug.js'
import { getꓽmetas } from './selectors.js'
import snippetꓽcssⳇcssⳇboxᝍlayoutⵧnatural from './snippets/css/box-layout--natural.js'
import snippetꓽcssⳇviewportⵧfull from './snippets/css/viewport--full.js'
import snippetꓽjsⳇnormalizeᝍtrailingᝍslash from './snippets/js/snippet--normalize-url.js'
import snippetꓽhtmlⳇcontentⵧauto from './snippets/html/content--auto.js'
import snippetꓽhtmlⳇreact_root from './snippets/html/react-root'

import {
	generateꓽinline as generateꓽfavicon__iconⵧinline,
} from '../generate--icons/index.js'

/////////////////////////////////////////////////

function generateꓽhtml__head__style(spec: Immutable<WebsiteEntryPointSpec>): Html‿str {
	// TODO https://medium.com/@stephenbunch/how-to-make-a-scrollable-container-with-dynamic-height-using-flexbox-5914a26ae336
	// TODO https://developer.chrome.com/blog/overscroll-behavior/

	const css_blocks: Css‿str[] = [
			...(spec.content?.critical?.css || []),
			...getꓽfeatures(spec).reduce((acc, feature_id: FeatureSnippets) => {
				switch (feature_id) {
					case 'cssⳇbox-layout--natural':
						acc.push(snippetꓽcssⳇcssⳇboxᝍlayoutⵧnatural)
						break
					case 'cssⳇviewport--full':
						acc.push(snippetꓽcssⳇviewportⵧfull)
						break
					default:
						// This feature does not have a critical CSS component
						break
				}
				return acc
			}, [] as Css‿str[]),
		]
		.filter(css => {
			assert(!css.trim().startsWith('npm:'))
			return true;
		})

	// TODO make that auto or configurable
	css_blocks.unshift(`@layer reset, offirmo--reset, foundation, offirmo--foundation, framework;`)

	return `
<style>/******* critical CSS *******/
/* https://www.smashingmagazine.com/2015/08/understanding-critical-css/ */

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

		${usesꓽpull_to_refresh(spec)
			? ''
			: `/* https://www.the-koi.com/projects/how-to-disable-pull-to-refresh/ */
overscroll-behavior: none;`
		}
	}

	${css_blocks.join(EOL)}
</style>
`
}

function generateꓽhtml__head__script(spec: Immutable<WebsiteEntryPointSpec>): Html‿str {

	const JS_blocks: JS‿str[] = [
		...(spec.content?.critical?.js || []),
		...getꓽfeatures(spec).reduce((acc, feature_id: FeatureSnippets) => {
			let snippet: JS‿str | undefined;
			switch (feature_id) {
				case 'normalize-url-trailing-slash':
					snippet = String(snippetꓽjsⳇnormalizeᝍtrailingᝍslash)
					break
				default:
					// This feature does not have a critical JS component
					break
			}
			if (snippet) {
				assert(snippet.startsWith('function '), `All critical JS snippets should be a named function! (${snippet})}`)
				acc.push(`;(${snippet})()`)
			}
			return acc
		}, [] as JS‿str[]),
	]

	return `
<script>/////// critical JS ///////
	${JS_blocks.join(EOL)}
</script>
`
}

function _stringifyꓽmetaⵧviewport__content(viewport_spec: Immutable<HtmlMetaContentⳇViewport>): string {
	return Object.entries(viewport_spec)
		.map(([key, value]) => {
			assert(_hasꓽcontent(value), `viewport entry "${key}" should not be empty: "${value}"!`)
			return `${key}=${value}`
		})
		.join(',')
}

function _generateꓽlinks(spec: Immutable<WebsiteEntryPointSpec>): { [rel: string]: string } {
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

function generateꓽhtml__head__meta(spec: Immutable<WebsiteEntryPointSpec>): Html‿str {
	const metas = getꓽmetas(spec)
	const links = _generateꓽlinks(spec)

	// TODO escape all content for attributes!! https://www.liquid-technologies.com/Reference/Glossary/XML_EscapingData.html

	return [
		// should be first!
		// https://github.com/h5bp/html5-boilerplate/blob/main/docs/html.md#the-order-of-the-title-and-meta-tags
		`<meta charset="${metas.charset}" />`,

		...Object.keys(metas.document)
			.filter(name => _hasꓽcontent(metas.document, name))
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
			.filter(httpᝍequiv => _hasꓽcontent(metas.pragmas, httpᝍequiv))
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
			.filter(property => _hasꓽcontent(metas.properties, property))
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
			.filter(rel => _hasꓽcontent(links, rel))
			.sort()
			.map(rel => {
				// @ts-ignore
				let href = links[rel]
				// TODO assertions
				return `<link rel="${rel}" href="${href}">`
			}),
		].join(EOL)
}

function generateꓽhtml__head(spec: Immutable<WebsiteEntryPointSpec>): Html‿str {
	// https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML
	return `
<head>
	${generateꓽhtml__head__meta(spec)}

	<title>${ifꓽdebug(spec).prefixꓽwith(`[title--page]`, getꓽtitleⵧpage(spec))}</title>

	${generateꓽhtml__head__style(spec)}

	${generateꓽhtml__head__script(spec)}
</head>
`
}

function generateꓽhtml__body(spec: Immutable<WebsiteEntryPointSpec>): Html‿str {

	// TODO extract HTML from files? ./esm/parser-html.mjsxxx
	const html_blocks: Html‿str[] = [
		...(spec.content?.html || []),
		...getꓽfeatures(spec).reduce((acc, feature_id: FeatureSnippets) => {
			switch (feature_id) {
				case 'htmlⳇreact-root':
					acc.push(snippetꓽhtmlⳇreact_root(spec))
					break
				default:
					// This feature does not have a html component
					break
			}
			return acc
		}, [] as Html‿str[]),
	]

	// TODO review import from js?
	const css_blocks: Css‿str[] = [
		...(spec.content?.critical?.css || []),
		...getꓽfeatures(spec).reduce((acc, feature_id: FeatureSnippets) => {
			switch (feature_id) {
				case 'cssⳇfoundation--offirmo':
					acc.push(`@import 'npm:@offirmo-private/css--foundation' layer(foundation);`)
					break
				case 'cssⳇframework--offirmo':
					acc.push(`@import 'npm:@offirmo-private/css--framework'  layer(framework);`)
					break
				default:
					// This feature does not have a body CSS component
					break
			}
			return acc
		}, [] as Css‿str[]),
	]

	const js_blocks: JS‿str[] = [
		...(spec.content?.js || []),
		...getꓽfeatures(spec).reduce((acc, feature_id: FeatureSnippets) => {
			let snippet: JS‿str | undefined;
			switch (feature_id) {
				default:
					// This feature does not have a body JS component
					break
			}
			if (snippet) {
				assert(snippet.startsWith('function '), `All snippets should be a named fuction! (${snippet})}`)
				acc.push(`;(${snippet})()`)
			}
			return acc
		}, [] as JS‿str[]),
	].map(js‿str => {
		if (js‿str.endsWith('.js') || js‿str.endsWith('.jsx') || js‿str.endsWith('.ts') || js‿str.endsWith('.tsx'))
			return `import '${js‿str}'`
		return js‿str
	})

	if (html_blocks.length === 0) {
		html_blocks.push(snippetꓽhtmlⳇcontentⵧauto(spec))
	}

	if (shouldꓽgenerateꓽsourcecode(spec)) {
		js_blocks.push(`import './app/index.ts'`)
	}

	if (js_blocks.length === 0) {
		js_blocks.push(`console.log('Hello, world!')`)
	}
	else {
		html_blocks.unshift(`<noscript>You need to enable JavaScript to run this app.</noscript>`)
	}

return `
<body>
	${html_blocks.join(EOL)}

	<style>/* non-critical CSS */
/* https://www.smashingmagazine.com/2015/08/understanding-critical-css/ */
	${css_blocks.join(EOL)}
</style>

	<script type="module">// NON critical JS
		${js_blocks.join(EOL)}
	</script>
</body>
`
}

/////////////////////////////////////////////////

function _generateꓽhtml_doc_spec(spec: Immutable<WebsiteEntryPointSpec>): HtmlDocumentSpec {

}

/////////////////////////////////////////////////

function generate(spec: Immutable<WebsiteEntryPointSpec>): Html‿str {
	const doc_spec = _generateꓽhtml_doc_spec(spec)
	const result = generate_html(doc_spec)

	// TODO check IW10 <14k https://developers.google.com/speed/docs/insights/mobile#delivering-the-sub-one-second-rendering-experience
	return normalize_unicode(result)
}

/////////////////////////////////////////////////

export default generate
export {
	generate,
}
