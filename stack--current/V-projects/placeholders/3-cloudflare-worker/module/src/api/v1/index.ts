import { Hono } from 'hono'
import { normalizeError } from '@offirmo/error-utils'
import { create_server_response_body__data, create_server_response_body__error } from '@offirmo-private/offirmo-api--interface'

const app = new Hono()

/////////////////////////////////////////////////

app.all('*', (c) => {
	return c.text('404 from Hono /v1!', 404)
})

export default app
