import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
//console.log({ __dirname })

import { readFileSync } from '@offirmo/cli-toolbox/fs/extra'
import { lsFilesRecursiveSync } from '@offirmo/cli-toolbox/fs/extra/ls'
import { parse } from "parse-imports-ts"

const INPUT_PATH = path.join(__dirname, '../../1-stdlib/promise-try/src/')

const files = lsFilesRecursiveSync(INPUT_PATH)

const depsⵧnormal = new Set()
const depsⵧdev = new Set()

files.forEach(filepath => {
	const ext = path.extname(filepath)
	const base = path.basename(filepath, ext)
	console.log(filepath, base, ext)

	if (base.endsWith('spec') && !base.endsWith('.spec')) {
		throw new Error('Please normalize file "${filepath}"!')
	}

	const content = readFileSync(filepath, 'utf8')
	const imports = parse(content)
	console.log(imports)
})


// node --experimental-strip-types ./X-spikes/parse-import-ts/index.mjs
