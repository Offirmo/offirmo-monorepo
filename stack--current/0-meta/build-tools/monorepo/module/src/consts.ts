import { strict as assert } from 'node:assert'
import { fileURLToPath } from 'node:url'
import * as path from 'node:path'
import * as fs from 'node:fs'

/////////////////////////////////////////////////

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const MONOREPO_ROOT = path.join(__dirname, '../../../../..')
assert(fs.existsSync(MONOREPO_ROOT), `MONOREPO_ROOT dir "${MONOREPO_ROOT}" does not exist!`)

const MONOREPO__ROOT_TSCONFIG‿abs = path.join(__dirname, '../../../../tsconfig.json')
assert(fs.existsSync(MONOREPO__ROOT_TSCONFIG‿abs), `MONOREPO__ROOT_TSCONFIG‿abs "${MONOREPO__ROOT_TSCONFIG‿abs}" does not exist!`)
const MONOREPO__SHARED_TS_TYPINGS‿abs = path.join(__dirname, '../../../../typescript-custom-typings')
assert(fs.existsSync(MONOREPO__SHARED_TS_TYPINGS‿abs), `MONOREPO__SHARED_TS_TYPINGS‿abs dir "${MONOREPO__SHARED_TS_TYPINGS‿abs}" does not exist!`)

/////////////////////////////////////////////////

export {
	MONOREPO_ROOT,
	MONOREPO__ROOT_TSCONFIG‿abs,
	MONOREPO__SHARED_TS_TYPINGS‿abs,
}
