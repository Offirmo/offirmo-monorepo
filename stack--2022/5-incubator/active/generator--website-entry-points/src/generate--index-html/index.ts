import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import { normalize_unicode } from '@offirmo-private/normalize-string'

import { WebsiteEntryPointSpec } from '../types.js'
import { HtmlMetaContentⳇViewport, HtmlMetas, HtmlString } from './types.js'
import {
	getꓽlang,
	getꓽtitleⵧpage,
	getꓽtitleⵧsocial,
	getꓽcolorⵧtheme,
	getꓽcolorⵧbackground,
	getꓽcolorⵧforeground,
	usesꓽpull_to_refresh, needsꓽwebmanifest, getꓽbasenameⵧwebmanifest,
} from '../selectors.js'
import { getꓽmetas } from './selectors.js'

/////////////////////////////////////////////////
const EOL = '\n'

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
<style>
	/* critical CSS */

	:root {
		--color--bg: ${getꓽcolorⵧbackground(spec)};
		--color--fg: ${getꓽcolorⵧforeground(spec)};
		--font: -apple-system, ui-sans-serif, sans-serif;

		margin: 0;
		padding: 0;

		color: var(--color--fg);
		background-color: var(--color--bg);
		font-family: var(--font);

		${usesꓽpull_to_refresh(spec) ? '' : 'overscroll-behavior: none;'}
	}

	${(spec.styles ?? [])
		.map(style => {
			switch (style) {
				case 'snippet:natural-box-layout':
					/* apply a natural box layout model to all elements
					 * https://www.paulirish.com/2012/box-sizing-border-box-ftw/
					 * https://github.com/mike-engel/a11y-css-reset/pull/12#issuecomment-516582884
					 */
					return _indent(`
/* apply a natural box layout model to all elements
 * https://www.paulirish.com/2012/box-sizing-border-box-ftw/
 * https://github.com/mike-engel/a11y-css-reset/pull/12#issuecomment-516582884
 */
:root                  { box-sizing: border-box; }
*, *::before, *::after { box-sizing: inherit; }
					`)
				default:
					return style
			}
		})
		.map(s => s.trim())
		.join(EOL + EOL + '	')}
</style>
`.trim()
}

function generateꓽhtml__head__meta__pwa(spec: Immutable<WebsiteEntryPointSpec>): HtmlString {
	// TODO check if PWA
	// 2023 https://www.computerworld.com/article/3688575/why-is-apple-making-big-improvements-to-web-apps-for-iphone.html

	// TODO theme color https://www.w3.org/TR/appmanifest/#theme_color-member
	// https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html
	//`<meta name="format-detection" content="telephone=no">`,

	return `
<meta name="theme-color" content="${getꓽcolorⵧtheme(spec)}">
	`.trim()
}

function generateꓽhtml__head__meta__twitter(spec: Immutable<WebsiteEntryPointSpec>): HtmlString {
	// https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards

	return [
	].join(EOL).trim()
}

function generateꓽhtml__head__meta__opengraph(spec: Immutable<WebsiteEntryPointSpec>): HtmlString {
	// https://ogp.me/

	return [
		//`<meta property="og:title" content="${getꓽtitleⵧsocial(spec)}"/>`,
	].join(EOL).trim()
}

function _generateꓽmeta__contentⵧviewport__value(viewport_spec: Immutable<HtmlMetaContentⳇViewport>): string {
	return Object.entries(viewport_spec)
		.map(([key, value]) => {
			assert(_has_content(value), `viewport entry "${key}" should not be empty: "${value}"!`)
			return `${key}=${value}`
		})
		.join(',')
}

function _generateꓽlinks(spec: Immutable<WebsiteEntryPointSpec>): { [rel: string]: string } {

	/* TODO
	https://medium.com/swlh/are-you-using-svg-favicons-yet-a-guide-for-modern-browsers-836a6aace3df
			<link rel="preconnect" href="https://identity.netlify.com">
	<link rel="icon" href="./favicons/favicon.svg">
	<link rel="apple-touch-icon" href="./favicons/apple-touch-icon-180x180.png">
	<link rel="mask-icon" href="./favicons/safari-mask-icon.svg" color="#543d46">
	 */

	return {
		...(needsꓽwebmanifest(spec) && { manifest: './' + getꓽbasenameⵧwebmanifest(spec) }),
	}
}

function generateꓽhtml__head__meta(spec: Immutable<WebsiteEntryPointSpec>): HtmlString {
	const metas = getꓽmetas(spec)
	const links = _generateꓽlinks(spec)

	return [
		`<meta charset="${metas.charset}" />`,

		...Object.keys(metas.document)
			.filter(name => _has_content(metas.document, name))
			.sort()
			.map(name => {
				// @ts-ignore
				let content = metas.document[name]
				switch(name) {
					case 'viewport':
						content = _generateꓽmeta__contentⵧviewport__value(content)
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


	// TODO link to webmanifest!!
	// TODO manifest 	<link rel="manifest" href="./app--viewport--03.webmanifest">


	return `
<head>
	${_indent(generateꓽhtml__head__meta(spec), true)}

	<title>${getꓽtitleⵧpage(spec)}</title>

	${_indent(generateꓽhtml__head__style(spec), true)}
</head>
	`.trim()
}

function generateꓽhtml__body(spec: Immutable<WebsiteEntryPointSpec>): HtmlString {
	return `
<body class="">
	<noscript>You need to enable JavaScript to run this app.</noscript>

	<main id="root" class="o⋄top-container">
		<!-- React will render here and replace this -->
		<section style="
			text-align: center;
			--width: 60ch;
			max-width: var(--width);
			margin: 0 max(1ch, (100vw - var(--width))/2);
			">
			<h1>${getꓽtitleⵧpage(spec)}</h1>
			<em>Loading…</em>
		</section>
	</main>
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

	// TODO check IW10
	return normalize_unicode(result)
}


/////////////////////////////////////////////////

export default generate
export {
	generate,
}
