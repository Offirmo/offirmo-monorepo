import { Immutable, Html‿str } from '@offirmo-private/ts-types'

import {
	getꓽtitleⵧpage,
	getꓽdescriptionⵧpage,
} from '../../../selectors.js'
import { ifꓽdebug } from '../../../utils/debug.js'

import { WebsiteEntryPointSpec } from '../../../types'

/////////////////////////////////////////////////

function generate(spec: Immutable<WebsiteEntryPointSpec>): Html‿str {
	return `
<header>TODO header</header>
<main id="root">
	<h1>${ifꓽdebug(spec).prefixꓽwith(`[title--page]`, getꓽtitleⵧpage(spec))}</h1>
	<article>
		<p>${ifꓽdebug(spec).prefixꓽwith(`[descr--page]`, getꓽdescriptionⵧpage(spec))}</p>
	</article>
</main>
<footer>TODO footer</footer>
`
}

/////////////////////////////////////////////////

export default generate
