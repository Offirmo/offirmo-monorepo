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

app.notFound((c) => {
	return c.text('404!', 404)

	/*const url404 = new URL('404.html', c.req.url)
	return c.env.ASSETS.fetch(url404)*/
})

/////////////////////////////////////////////////
// middlewares

app.use(async function injectSXC(c, next): Promise<void> {
	const operation = `${c.req.method}:${c.req.path}`
	console.log(`Hono begin`, operation)

	await getRootSXC().xPromiseTry(operation, async ({SXC}) => {
		c.set('SXC', SXC)
		await next()
	})

	console.log(`Hono end`, operation)
})

/////////////////////////////////////////////////

import v1‿app from './endpoints/v1/index.ts'
app.route('v1', v1‿app)

import _utils‿app from './endpoints/_utils/index.ts'
app.route('_utils', _utils‿app)

/////////////////////////////////////////////////

export default app
