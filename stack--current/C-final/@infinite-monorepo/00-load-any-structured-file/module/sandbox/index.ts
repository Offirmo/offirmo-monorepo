import { ↆloadꓽfile } from '@infinite-monorepo/load-any-structured-file'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const __root = path.resolve(__dirname, '../../../../../')

// 'import' // js/ts exporting a default JSONObject
const result1 = await ↆloadꓽfile(path.join(__root, '.monorepo/index.ts'))
console.log(result1)

// 'json5' // https://json5.org/
const result2 = await ↆloadꓽfile(path.join(__root, 'package.json'))
console.log(result2)

// 'yaml'

// 'kv-simple' // multiple lines `k v` ex. .yarnrc
//const result4 = await ↆloadꓽfile(path.join(__root, '.yarnrc'))
//console.log(result4)

// 'lines' // multiple lines  ex. .gitignore WILL STRIP COMMENTS
const result5 = await ↆloadꓽfile(path.join(__root, '.gitignore'))
console.log(result5)

// 'single-value' // single line, ex .nvmrc
const result6 = await ↆloadꓽfile(path.join(__root, '.nvmrc'))
console.log(result6)

// 'raw' // fallback
const result7 = await ↆloadꓽfile(path.join(__root, '../README.md'))
console.log(result7)
