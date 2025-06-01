import { Hono } from 'hono'

import { FOO } from './endpoints/users/index.ts'

const app = new Hono()

app.notFound((c) => {
	return c.text('404 from Hono!', 404)
})

app.onError((err, c) => {
	console.error(`${err}`)
	return c.text('Error from Hono', 500)
})

app.use(async (c, next) => {
	console.log(`Hone before`, c.req.url)
	await next()
	console.log(`Hone after`, c.req.url)
})

app.get('/api', (c) => c.text(`Hello Cloudflare Workers! ${FOO}`))
app.get('/test', (c) => c.text('Hono!'))

export default app
