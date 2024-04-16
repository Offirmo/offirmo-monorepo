import { Immutable } from '@offirmo-private/ts-types'
import { Html‿str } from '@offirmo-private/ts-types-web'

import {
	getꓽfeatures,
	getꓽtitleⵧpage,
	getꓽcontent_html__element__classes,
} from '../../selectors.js'

import { HtmlDocumentSpec } from '../../types.js'

/////////////////////////////////////////////////

function generate(spec: Immutable<HtmlDocumentSpec>): Html‿str {
	const classes = [...getꓽcontent_html__element__classes(spec, 'main')]
	if (getꓽfeatures(spec).includes('cssⳇviewport--full') && !classes.includes('o⋄full-viewport'))
		classes.push('o⋄full-viewport')

	return `
<main id="react-root" ${classes.length ? (`class="${classes.join(' ')}"`) : ''}>
		<!-- React will render here and replace this -->
		<section style="
			text-align: center;
			--width: 60ch;
			max-width: var(--width);
			margin: 0 max(1ch, (100vw - var(--width))/2);
			">
			<h1>${getꓽtitleⵧpage(spec, 'Loading…')}</h1>
			<em>Loading…</em>
		</section>
	</main>
`
}

/////////////////////////////////////////////////

export default generate
