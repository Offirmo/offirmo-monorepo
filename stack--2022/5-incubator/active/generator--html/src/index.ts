// Reminder: code will be prettified, no need to indent or format it.
// put the comments in the code, it's up to the consumer to optimize or not

import assert from 'tiny-invariant'
import { Immutable, Html‿str } from '@offirmo-private/ts-types'
import { normalize_unicode } from '@offirmo-private/normalize-string'

import { EOL } from '../../consts.js'
import { HtmlDocumentSpec } from './types.js'
import {
	getꓽlang,
	getꓽtitleⵧpage,

	getꓽhtml,
	getꓽcssⵧcritical,
	getꓽcss,
	getꓽjsⵧcritical,
	getꓽjs,

	getꓽspecⵧwith_features_expanded,
} from './selectors.js'

/////////////////////////////////////////////////


function generateꓽhtml__head(spec: Immutable<HtmlDocumentSpec>): Html‿str {
	// https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML
	return `
<head>
	{generateꓽhtml__head__meta(spec)}

	<title>${getꓽtitleⵧpage(spec)}</title>

	{generateꓽhtml__head__style(spec)}

	{generateꓽhtml__head__script(spec)}
</head>
`
}

/////////////////////////////////////////////////

function generateꓽhtml__body(spec: Immutable<HtmlDocumentSpec>): Html‿str {
	spec = getꓽspecⵧwith_features_expanded(spec)

	// TODO extract HTML from files? ./esm/parser-html.mjsxxx
	// TODO review import from js?

return `
<body>
	${getꓽhtml(spec).join(EOL)}

	<style> /* non-critical CSS */
		/* https://www.smashingmagazine.com/2015/08/understanding-critical-css/ */
		${getꓽcss(spec).join(EOL)}
	</style>

	<script type="module"> // NON critical JS
		${getꓽjs(spec).join(EOL)}
	</script>
</body>
`
}

/////////////////////////////////////////////////

function generate(spec: Immutable<HtmlDocumentSpec>): Html‿str {

	const result: Html‿str = `
<!DOCTYPE html>
<!-- AUTOMATICALLY GENERATED, DO NOT EDIT MANUALLY! -->

<!-- maximum language hints to prevent Chrome from incorrectly suggesting a translation -->
<html lang="${getꓽlang(spec)}" xml:lang="${getꓽlang(spec)}">
	${generateꓽhtml__head(spec)}
	${generateꓽhtml__body(spec)}
</html>`

	// TODO check IW10 <14k https://developers.google.com/speed/docs/insights/mobile#delivering-the-sub-one-second-rendering-experience
	return normalize_unicode(result)
}

/////////////////////////////////////////////////

export default generate
export {
	generate,
}
export * from './types.js'
