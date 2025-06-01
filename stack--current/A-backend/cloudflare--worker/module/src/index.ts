import { dumpꓽanyⵧprettified } from '@offirmo-private/prettify-any'

import { Hono } from 'hono'

import { type Bindings } from './types.ts'
import { FOO } from './endpoints/users/index.ts'

const app = new Hono<{ Bindings: Bindings }>()



app.notFound((c) => {
	return c.text('404 from Hono!', 404)
	//return c.html(p404, 404)

	//return c.env.ASSETS.fetch('404.html');
})

app.onError((err, c) => {
	console.error(`${err}`)

	return c.text('Error from Hono', 500)
})

app.use(async (c, next) => {
	console.log(`Hone before`, c.req.url)
	dumpꓽanyⵧprettified('hello', c)
	await next()
	console.log(`Home after`, c.req.url)
})

app.get('/api', (c) => c.text(`Hello Cloudflare Workers! ${FOO}`))
app.get('/test', (c) => c.text('Hono!'))

export default app
