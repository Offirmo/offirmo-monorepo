/// <reference path="../../worker-configuration.d.ts" />

import { type Env as HonoDefaultEnv } from 'hono'
import type { XSoftExecutionContext } from './services/sxc.ts'


/////////////////////////////////////////////////



/////////////////////////////////////////////////

export type Bindings = Cloudflare.Env

export interface Variables {
	SXC: XSoftExecutionContext
}

/////////////////////////////////////////////////

export interface HonoEnv extends Required<HonoDefaultEnv> {
	Binding: Bindings
	Variables: Variables
}
