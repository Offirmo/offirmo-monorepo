import { Immutable, Html‿str } from '@offirmo-private/ts-types'

import {
	getꓽtitleⵧpage,
} from '../../../selectors.js'
import { ifꓽdebug } from '../../../utils/debug.js'

import { WebsiteEntryPointSpec } from '../../../types'

/////////////////////////////////////////////////

function generate(spec: Immutable<WebsiteEntryPointSpec>): Html‿str {
	return `
<main id="react-root" class="o⋄full-viewport">
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
	</main>
`
}

/////////////////////////////////////////////////

export default generate
