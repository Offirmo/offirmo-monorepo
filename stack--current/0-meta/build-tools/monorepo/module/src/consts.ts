import { strict as assert } from 'node:assert'
import { fileURLToPath } from 'node:url'
import * as path from 'node:path'
import * as fs from 'node:fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/////////////////////////////////////////////////

const GIT_ROOT = path.resolve(path.join(__dirname, '../../../../../..'))
assert(fs.existsSync(GIT_ROOT), `GIT_ROOT dir "${GIT_ROOT}" should exist!`)

/////////////////////////////////////////////////

const MONOREPO_ROOT = path.resolve(path.join(GIT_ROOT, 'stack--current'))
assert(fs.existsSync(MONOREPO_ROOT), `MONOREPO_ROOT dir "${MONOREPO_ROOT}" should exist!`)

const MONOREPO__ROOT_TSCONFIG‿abs = path.join(__dirname, '../../../../tsconfig.json')
assert(fs.existsSync(MONOREPO__ROOT_TSCONFIG‿abs), `MONOREPO__ROOT_TSCONFIG‿abs "${MONOREPO__ROOT_TSCONFIG‿abs}" should exist!`)

const MONOREPO__SHARED_TS_TYPINGS‿abs = path.join(__dirname, '../../../../typescript-custom-typings')
assert(fs.existsSync(MONOREPO__SHARED_TS_TYPINGS‿abs), `MONOREPO__SHARED_TS_TYPINGS‿abs dir "${MONOREPO__SHARED_TS_TYPINGS‿abs}" should exist!`)

/////////////////////////////////////////////////

export {
	GIT_ROOT,
	MONOREPO_ROOT,
	MONOREPO__ROOT_TSCONFIG‿abs,
	MONOREPO__SHARED_TS_TYPINGS‿abs,
}
