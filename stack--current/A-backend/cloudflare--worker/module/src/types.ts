/// <reference path="../../worker-configuration.d.ts" />
import { type Env as HonoDefaultEnv } from 'hono'

type Bindings = Cloudflare.Env

interface Variables {

}

export interface HonoEnv extends Required<HonoDefaultEnv> {
	Binding: Bindings
	Variables: Variables
}
