import { Immutable } from '@offirmo-private/ts-types'
import { Html‿str } from '@offirmo-private/ts-types-web'

import {
	getꓽtitleⵧpage,
} from '../../selectors.js'

import { HtmlDocumentSpec } from '../../types.js'

/////////////////////////////////////////////////

function generate(spec: Immutable<HtmlDocumentSpec>): Html‿str {
	return `
<main id="react-root" class="o⋄full-viewport">
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
`
}

/////////////////////////////////////////////////

export default generate
