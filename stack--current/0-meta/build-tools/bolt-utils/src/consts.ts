import { fileURLToPath } from 'node:url'
import path from 'node:path'

/////////////////////////////////////////////////

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const MONOREPO_ROOT = path.join(__dirname, '../../../..')
const MONOREPO_PKG_JSON_PATH = path.join(MONOREPO_ROOT, 'package.json')

/////////////////////////////////////////////////

export {
	MONOREPO_ROOT,
	MONOREPO_PKG_JSON_PATH,
}
