import { fileURLToPath } from 'node:url'
import * as path from 'node:path'

/////////////////////////////////////////////////

const LIB = 'node-typescript-compiler'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const PATH_TO_OWN_PACKAGE_JSON = path.join(__dirname, '..', '..', 'package.json')

const PATH_TO_PARENT_DIR = path.join(__dirname, '..', '..', '..')

/////////////////////////////////////////////////

export {
	LIB,
	PATH_TO_OWN_PACKAGE_JSON,
	PATH_TO_PARENT_DIR,
}
