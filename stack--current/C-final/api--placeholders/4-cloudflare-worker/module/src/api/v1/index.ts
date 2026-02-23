import { Hono } from 'hono'

import * as SvgGenLib from '@monorepo-private/generator--svg'
import { getꓽcontentꘌcat } from '@monorepo-private/generator--svg/examples'

/////////////////////////////////////////////////

const app = new Hono()

/////////////////////////////////////////////////

app.get('/placeholder.svg', (c) => {

	// TODO get params

	const svg = (() => {
		let svg = SvgGenLib.createꓽempty()

		svg = SvgGenLib.addꓽcontent(svg, getꓽcontentꘌcat())

		return svg
	})(

	)
	return new Response(SvgGenLib.getꓽsvg‿str(svg), {
		headers: {
			'Content-Type': 'image/svg+xml'
		}
	})
})

/////////////////////////////////////////////////

app.all('*', (c) => {
	// TODO link to doc
	return c.text('404 from Hono /v1!', 404)
})

export default app
