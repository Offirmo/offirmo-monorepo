import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import { normalize_unicode } from '@offirmo-private/normalize-string'

import { WebsiteEntryPointSpec } from '../types.js'
import { HtmlString } from './types.js'
import {
	getꓽlang,
	getꓽtitleⵧpage,
	getꓽtitleⵧsocial,
	getꓽcolorⵧtheme,
} from '../selectors.js'

/////////////////////////////////////////////////
const EOL = '\n'

function indent(multi_line_string: string): string {
	const lines = multi_line_string.split(EOL)

	return lines
		.map((line, index) => '	' + line)
		.join(EOL)
}


function generateꓽhtml__head__style(spec: Immutable<WebsiteEntryPointSpec>): HtmlString {
	// TODO mandatory background color!!!
	// TODO display? https://developer.mozilla.org/en-US/docs/Web/Manifest/display
	// TODO inset vars
	// TODO titlebar vars https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/how-to/window-controls-overlay
	// TODO https://medium.com/@stephenbunch/how-to-make-a-scrollable-container-with-dynamic-height-using-flexbox-5914a26ae336
	return `
<style>
	:root {
		/* TODO colors */
	}
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

function generateꓽhtml__head__meta(spec: Immutable<WebsiteEntryPointSpec>): HtmlString {
	// XXX keywords are ignored bc spammers were abusing them
	// https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML#metadata_the_meta_element
	const keywords = [ 'game', 'incremental', 'fantasy', 'rpg', 'free', 'indie']

//		<meta name="viewport" content="width=device-width, viewport-fit=cover, initial-scale=1, maximum-scale=1, user-scalable=no">
	const meta__vieport = 'TODO!!!'

	// TODO manifest 	<link rel="manifest" href="./app--viewport--03.webmanifest">
	return [
		`<meta charset="${charset‿lc}" />`,
		`<meta http-equiv="Content-Type" content="text/html; charset=${charset‿lc}" />`,

		// maximum language hints to prevent Chrome from incorrectly suggesting a translation
		`<meta http-equiv="Content-Language" content="${getꓽlang(spec)}" />`,

		`<meta name="viewport" content="${meta__vieport}">`,

		generateꓽhtml__head__meta__opengraph(spec),
		generateꓽhtml__head__meta__twitter(spec),
		generateꓽhtml__head__meta__pwa(spec),
	].join(EOL).trim()
}

function generateꓽhtml__head(spec: Immutable<WebsiteEntryPointSpec>): HtmlString {
	// https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML


	// TODO link to webmanifest!!
	return `
<head>
	${generateꓽhtml__head__meta(spec)}

	<title>${getꓽtitleⵧpage(spec)}</title>

	${generateꓽhtml__head__style(spec)}
</head>
	`.trim()
}

function generateꓽhtml__body(spec: Immutable<WebsiteEntryPointSpec>): HtmlString {
	return `
<body class="">
	<noscript>You need to enable JavaScript to run this app.</noscript>

	<div id="root" class="o⋄top-container">
		<!-- React will render here -->
		Loading…
	</div>
</body>
	`.trim()
}

/////////////////////////////////////////////////

function generate(spec: Immutable<WebsiteEntryPointSpec>): HtmlString {

	const result: HtmlString = [
		'<!DOCTYPE html>',
		'<!-- AUTOMATICALLY GENERATED, DO NOT EDIT MANUALLY! -->',

		// maximum language hints to prevent Chrome from incorrectly suggesting a translation
		`<html lang="${getꓽlang(spec)}" xml:lang="${getꓽlang(spec)}" class="o⋄top-container">`,

		indent(generateꓽhtml__head(spec)),

		indent(generateꓽhtml__body(spec)),

		`</html>`,
	].join(EOL)

	return normalize_unicode(result)
}


/////////////////////////////////////////////////

export default generate
export {
	generate,
}
