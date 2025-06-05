import { type Handler } from 'hono'
import { create_server_response_body__data } from '@offirmo-private/offirmo-api--interface'

/////////////////////////////////////////////////

export const get: Handler = (c) => {
	const all_the_things = {
		request: {
			method:       c.req.method,
			url:          c.req.url,
			path:         c.req.path,
			queryRecord:  c.req.query(),
			paramRecord:  c.req.param(),
			headerRecord: c.req.header(),
		},
		env: {},
		processing: {
			routePath: c.req.routePath,
		}
	}

	const body = create_server_response_body__data(all_the_things)

	return c.json(body, {})
}

/////////////////////////////////////////////////
