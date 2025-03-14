
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import * as fs from 'node:fs'

import { loadJsonFile } from 'load-json-file';
/////////////////////////////////////////////////

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const MONOREPO_ROOT = path.resolve(__dirname, '../../../..')
