import { type Handler } from 'hono'

import type { FailureMode } from "./types.ts";
import { fail } from './index.ts'

/////////////////////////////////////////////////

export const all: Handler = (c) => {
	const mode = c.req.query('mode')

	return fail(mode, undefined)
}

/////////////////////////////////////////////////
