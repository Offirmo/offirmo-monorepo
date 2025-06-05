/// <reference path="../../worker-configuration.d.ts" />


import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { normalizeError } from '@offirmo/error-utils'
import { create_server_response_body__data, create_server_response_body__error } from '@offirmo-private/offirmo-api--interface'

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
	console.log(`Hono notFound`, c.req.url)
	//debugger

	return c.text('404 from Hono!', 404)

	/*const url404 = new URL('404.html', c.req.url)
	return c.env.ASSETS.fetch(url404)*/
})

/////////////////////////////////////////////////
// middlewares

app.use(async (c, next) => {
	const operation = `${c.req.method}:${c.req.path}`
	console.log(`Hono begin`, operation)

	await getRootSXC().xPromiseTry(operation, async ({SXC}) => {
		c.set('SXC', SXC)
		await next()
	})

	console.log(`Hono end`, operation)
})

/////////////////////////////////////////////////

// @ts-expect-error
import routes from './endpoints/**/adapter--hono.ts'
console.log(`Endpoints from wildcard import =`, routes)
Object.entries(routes).forEach(([path, handlers]) => {
	Object.entries(handlers as Record<string, any>).forEach(([method, handler]) => {
		console.log(`* Registering ${method.toUpperCase()} /${path}`, handler, '…')
		;(app as any)[method](path, handler)
	})
})

app.all('*', (c) => {
	const SXC = c.get('SXC')
	const { logger } = SXC.getInjectedDependencies()

	console.log(`Hono All`, c.req.url)
	logger.log('Hono all')

	const body = create_server_response_body__data({ 'hello': 'from catch all! Is this what you were expecting??' })
	return c.json(body)
})

/////////////////////////////////////////////////

export default app
