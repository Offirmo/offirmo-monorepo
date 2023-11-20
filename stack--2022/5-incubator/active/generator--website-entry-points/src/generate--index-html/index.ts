import assert from 'tiny-invariant'
import { Immutable, Html‿str, JS‿str, Css‿str } from '@offirmo-private/ts-types'
import { normalize_unicode } from '@offirmo-private/normalize-string'

import { EOL } from '../consts.js'
import { WebsiteEntryPointSpec } from '../types.js'
import { HtmlMetaContentⳇViewport, HtmlMetas, HtmlString } from './types.js'
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
} from '../selectors.js'
import { ifꓽdebug } from '../utils/debug.js'
import { getꓽmetas } from './selectors.js'
import snippetꓽnormalizeᝍtrailingᝍslash from './snippets/js/snippet--normalize-url.js'
import {
	generateꓽinline as generateꓽfavicon__iconⵧinline,
} from '../generate--icons/index.js'

/////////////////////////////////////////////////

function _indent(multi_line_string: string, only_nth_lines: boolean = false): string {
	const lines = multi_line_string.split(EOL)

	return lines
		.map((line, index) => (index === 0 && only_nth_lines) ? line : '	' + line)
		.join(EOL)
}

function _has_content(x: any, prop?: string): boolean {
	if (!!prop)
		x = x[prop]

	switch (true) {
		case !!x === false: // null, undef, empty string, 0
			return false
		case Array.isArray(x):
			return x.length > 0
		case typeof x === 'number':
			return !isNaN(x) && x !== 0.
		default:
			return Object.keys(x).length > 0
	}
}

function generateꓽhtml__head__style(spec: Immutable<WebsiteEntryPointSpec>): HtmlString {
	// TODO https://medium.com/@stephenbunch/how-to-make-a-scrollable-container-with-dynamic-height-using-flexbox-5914a26ae336
	// TODO https://developer.chrome.com/blog/overscroll-behavior/

	// https://www.smashingmagazine.com/2015/08/understanding-critical-css/
	return `
<style>/******* critical CSS *******/

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
		// https://www.the-koi.com/projects/how-to-disable-pull-to-refresh/
		usesꓽpull_to_refresh(spec)
			? ''
			: 'overscroll-behavior: none;'
	}
	}

	${(spec.content.critical.css ?? [])
		.map(css‿str => {
			switch (css‿str) {
				case 'snippet:natural-box-layout':
					/* apply a natural box layout model to all elements
					 * https://www.paulirish.com/2012/box-sizing-border-box-ftw/
					 * https://github.com/mike-engel/a11y-css-reset/pull/12#issuecomment-516582884
					 */
					return _indent(`
:root                  { box-sizing: border-box; }
*, *::before, *::after { box-sizing: inherit; }
					`)
				default:
					assert(!css‿str.startsWith('snippet:'), `Unknown CSS snippet "${css‿str}"!`)
					return css‿str
			}
		})
		.map(s => s.trim())
		.join(EOL + EOL + '	')}
</style>
`.trim()
}

function generateꓽhtml__head__script(spec: Immutable<WebsiteEntryPointSpec>): HtmlString {

	return `
<script>/////// critical JS ///////

	${(spec.content.critical.js ?? [])
		.map(js‿str => {
			switch (js‿str) {
				case 'snippet:normalize-trailing-slash': {
					return String(snippetꓽnormalizeᝍtrailingᝍslash).replaceAll('    ', '	') // TODO improve re-indentation
				}
				default:
					assert(!js‿str.startsWith('snippet:'), `Unknown JS snippet "${js‿str}"!`)
					return js‿str
			}
		})
		.map(s => s.trim())
		.map(s => {
			assert(s.startsWith('function '), `All snippets should be a named fuction! (${s})}`)
			return _indent(`;(${s})()`)
		})
		.join(EOL + EOL + '	')}
</script>
`.trim()
}

// TODO
function generateꓽhtml__head__meta__twitter(spec: Immutable<WebsiteEntryPointSpec>): HtmlString {
	// https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards

	return [
	].join(EOL).trim()
}

// TODO
function generateꓽhtml__head__meta__opengraph(spec: Immutable<WebsiteEntryPointSpec>): HtmlString {
	// https://ogp.me/

	return [
		//`<meta property="og:title" content="${getꓽtitleⵧsocial(spec)}"/>`,
	].join(EOL).trim()
}

function _stringifyꓽmetaⵧviewport__content(viewport_spec: Immutable<HtmlMetaContentⳇViewport>): string {
	return Object.entries(viewport_spec)
		.map(([key, value]) => {
			assert(_has_content(value), `viewport entry "${key}" should not be empty: "${value}"!`)
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

function generateꓽhtml__head__meta(spec: Immutable<WebsiteEntryPointSpec>): HtmlString {
	const metas = getꓽmetas(spec)
	const links = _generateꓽlinks(spec)

	// TODO escape all content for attributes!! https://www.liquid-technologies.com/Reference/Glossary/XML_EscapingData.html

	return [
		// should be first!
		// https://github.com/h5bp/html5-boilerplate/blob/main/docs/html.md#the-order-of-the-title-and-meta-tags
		`<meta charset="${metas.charset}" />`,

		...Object.keys(metas.document)
			.filter(name => _has_content(metas.document, name))
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
			.filter(httpᝍequiv => _has_content(metas.pragmas, httpᝍequiv))
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
			.filter(property => _has_content(metas.properties, property))
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
			.filter(rel => _has_content(links, rel))
			.sort()
			.map(rel => {
				// @ts-ignore
				let href = links[rel]
				// TODO assertions
				return `<link rel="${rel}" href="${href}">`
			}),
		].join(EOL).trim()
}

function generateꓽhtml__head(spec: Immutable<WebsiteEntryPointSpec>): HtmlString {
	// https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML
	return `
<head>
	${_indent(generateꓽhtml__head__meta(spec), true)}

	<title>${ifꓽdebug(spec).prefixꓽwith(`[title--page]`, getꓽtitleⵧpage(spec))}</title>

	${_indent(generateꓽhtml__head__style(spec), true)}

	${_indent(generateꓽhtml__head__script(spec), true)}
</head>
	`.trim()
}

function generateꓽhtml__body(spec: Immutable<WebsiteEntryPointSpec>): HtmlString {

	const html_blocks: Html‿str[] = [
		...spec.content.html,
		...(spec.content.html.length === 0 ? [ 'snippet:auto-content' ] : []),
	].map(html‿str => {
		switch (html‿str) {
			case 'snippet:auto-content':
				return `
<header>TODO header</header>
<main id="root">
		<h1>${ifꓽdebug(spec).prefixꓽwith(`[title--page]`, getꓽtitleⵧpage(spec))}</h1>
	<article>
		<p>${ifꓽdebug(spec).prefixꓽwith(`[descr--page]`, getꓽdescriptionⵧpage(spec))}</p>
	</article>
</main>
<footer>TODO footer</footer>`.trim()
			case 'snippet:react-root' :
				return `
<main id="root">
	<!-- React will render here and replace this -->
	<section style="
		text-align: center;
		--width: 60ch;
		max-width: var(--width);
		margin: 0 max(1ch, (100vw - var(--width))/2);
		">
		<h1>${ifꓽdebug(spec).prefixꓽwith(`[title--page]`, getꓽtitleⵧpage(spec))}</h1>
		<em>Loading…</em>
	</section>
</main>`.trim()
			default:
				assert(!html‿str.startsWith('snippet:'), `Unknown HTML snippet "${html‿str}"!`)
				return html‿str
		}
	})

	const js_blocks: JS‿str[] = [
		...spec.content.js,
		...(spec.content.js.length === 0 ? [ 'snippet:auto-content' ] : []),
	].map(js‿str => {
		switch (true) {
			case js‿str === 'snippet:auto-content':
				return `
console.log('Hello, world!')
`.trim()
			case (js‿str.endsWith('.js') || js‿str.endsWith('.jsx') || js‿str.endsWith('.ts') || js‿str.endsWith('.tsx')):
				return `
			import '${js‿str}'
`.trim()
			default:
				assert(!js‿str.startsWith('snippet:'), `Unknown JS snippet "${js‿str}"!`)
				return js‿str
		}
	})

	return `
<body class="">
	<noscript>You need to enable JavaScript to run this app.</noscript>

	${html_blocks.join('\n\n')}

	<script type="module"> /////// NON critical JS ///////
		${js_blocks.join('\n\n')}
	</script>
</body>
`.trim()
}

/////////////////////////////////////////////////

function generate(spec: Immutable<WebsiteEntryPointSpec>): HtmlString {

	const result: HtmlString = [
		'<!DOCTYPE html>',
		'<!-- AUTOMATICALLY GENERATED, DO NOT EDIT MANUALLY! -->',

		// maximum language hints to prevent Chrome from incorrectly suggesting a translation
		`<html lang="${getꓽlang(spec)}" xml:lang="${getꓽlang(spec)}">`,

		_indent(generateꓽhtml__head(spec)),

		_indent(generateꓽhtml__body(spec)),

		`</html>`,
	].join(EOL)

	// TODO check IW10 <14k https://developers.google.com/speed/docs/insights/mobile#delivering-the-sub-one-second-rendering-experience
	return normalize_unicode(result)
}

/////////////////////////////////////////////////

export default generate
export {
	generate,
}
