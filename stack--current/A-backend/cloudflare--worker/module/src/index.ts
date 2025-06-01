//import { dumpꓽanyⵧprettified } from '@offirmo-private/prettify-any'

import { Hono } from 'hono'

//import { type Bindings } from './types.ts'
import { FOO } from './endpoints/users/index.ts'

/////////////////////////////////////////////////

const app = new Hono()

/////////////////////////////////////////////////

app.onError((err, c) => {
	console.error(`${err}`)

	return c.text('Error from Hono', 500)
})

/////////////////////////////////////////////////

app.notFound((c) => {
	console.log(`Hono notFound`, c.req.url)
	//debugger

	//return c.text('404 from Hono!', 404)

	const url404 = new URL('404.html', c.req.url)
	return c.env.ASSETS.fetch(url404)
})

/////////////////////////////////////////////////

app.use(async (c, next) => {
	console.log(`Hono before`, c.req.url)
	await next()
	console.log(`Hono after`, c.req.url)
})

app.get('/api', (c) => c.text(`Hello Cloudflare Workers! ${FOO}`))
app.get('/test', (c) => c.text('Hono!'))

/*
app.all('*', c => {
	console.log(`Hono All`, c.req.url)

	// https://developers.cloudflare.com/workers/static-assets/binding/#runtime-api-reference
	//return c.env.ASSETS.fetch(c.req.raw);
})*/

export default app
