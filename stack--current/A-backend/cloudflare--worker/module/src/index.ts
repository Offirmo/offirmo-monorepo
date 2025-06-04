console.log('Hello from Worker root file!')

/// <reference path="../../worker-configuration.d.ts" />

//import { dumpꓽanyⵧprettified } from '@offirmo-private/prettify-any'

import { create_server_response_body__data } from '@offirmo-private/offirmo-api--interface'

import { Hono } from 'hono'

import logger from './services/logger.ts'
//import { getRootSXC } from './services/sxc.ts'
import type { HonoEnv } from './types.ts'


/////////////////////////////////////////////////

const app = new Hono<HonoEnv>()

/////////////////////////////////////////////////

app.onError((err, c) => {
	console.error(`${err}`)

	return c.text('Error!', 500)
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
	console.log(`Hono begin`, c.req.url)
	await next()
	console.log(`Hono end`, c.req.url)
})

/////////////////////////////////////////////////

// @ts-expect-error
import routes from './endpoints/**/adapter--honox.ts'
console.log(`Endpoints from wildcard import =`, routes)
Object.entries(routes).forEach(([path, handlers]) => {
	Object.entries(handlers as Record<string, any>).forEach(([method, handler]) => {
		console.log(method, handler)
		;(app as any)[method](path, handler)
	})
})

app.all('*', (c) => {
	console.log(`Hono All`, c.req.url)
	logger.log('Hono all')

	const body = create_server_response_body__data({ 'hello': 'from catch all! Is this what you were expecting??' })
	return c.json(body)
})

/////////////////////////////////////////////////

export default app
