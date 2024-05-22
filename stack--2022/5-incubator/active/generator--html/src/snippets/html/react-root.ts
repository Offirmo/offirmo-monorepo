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

	return `
<main id="react-root" ${classes.length ? (`class="${classes.join(' ')}"`) : ''}>
		<!-- React will render here and replace this -->
		<section style="
			text-align: center;
			max-width: 60ch;
			margin: 0 auto;
			">
			<h1>${getꓽtitleⵧpage(spec, 'Loading…')}</h1>
			<em>Loading…</em>
		</section>
	</main>
`
}

/////////////////////////////////////////////////

export default generate
