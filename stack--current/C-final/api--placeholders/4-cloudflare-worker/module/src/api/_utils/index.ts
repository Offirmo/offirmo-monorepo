import { Hono } from 'hono'
import { create_server_response_body__data } from "@offirmo-private/offirmo-api--interface";

const app = new Hono()

// @ts-expect-error
import routes from './*/adapter--hono.ts'
console.log(`Endpoints from wildcard import =`, routes)
Object.entries(routes).forEach(([path, handlers]) => {
	Object.entries(handlers as Record<string, any>).forEach(([method, handler]) => {
		console.log(`* Registering ${method.toUpperCase()} /${path}`, handler, '…')
		;(app as any)[method](path, handler)
	})
})

app.all('*', (c) => {
	return c.text(`404! (from ${c.req.routePath})`, 404)
})

export default app
