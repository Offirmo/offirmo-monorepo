/// <reference path="../../worker-configuration.d.ts" />

import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { normalizeError } from '@offirmo/error-utils'
import { create_server_response_body__error } from '@offirmo-private/offirmo-api--interface'

import { APP } from './consts.ts'
import type { HonoEnv } from './types.ts'
import { getRootSXC } from './services/sxc.ts'

/////////////////////////////////////////////////
console.log()
console.log('///')
console.log('///////')
console.log('/////////////////////////////////////////////////')
console.log(`Hello from "${APP}" root file!`)

const app = new Hono<HonoEnv>()

/////////////////////////////////////////////////

app.onError((raw_err, c) => {
	console.error(`${raw_err}`)

	const SXC = c.get('SXC')
	const err = normalizeError(raw_err)
	const body = create_server_response_body__error(err)

	return c.json(body, {
		status: (err?.statusCode || 500) as any,
	})
})

/////////////////////////////////////////////////

app.notFound(async (c) => {

	switch (c.req.header('Sec-Fetch-Mode')) {
		case 'navigate': {
			try {
				const html = await c.env.ASSETS.fetch(new URL('404.html', c.req.url)).then(r => r.blob())
				return new Response(html, {
					status: 404,
				})
			} catch (err) {
				// don't care
			}
			break
		}
		default:
			break
	}

	return c.text('404!', 404) // TODO json?
})

/////////////////////////////////////////////////
// middlewares

app.use(async function injectSXC(c, next): Promise<void> {
	const operation = `${c.req.method}:${c.req.path}`
	console.log(`Hono begin`, operation)
	console.log(c.req.header('Sec-Fetch-Mode'))

	await getRootSXC().xPromiseTry(operation, async ({SXC}) => {
		c.set('SXC', SXC)
		await next()
	})

	console.log(`Hono end`, operation)
})

/////////////////////////////////////////////////

import v1‿app from './api/v1/index.ts'
app.route('/api/v1', v1‿app)

import _utils‿app from './api/_utils/index.ts'
app.route('/api/_utils', _utils‿app)

/////////////////////////////////////////////////

export default app
