import { ೱwriteꓽfile } from '@infinite-monorepo/read-write-any-structured-file/write'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const data = {
	foo: 42,
	bar: ['hello', 'world'],
}

await ೱwriteꓽfile(path.join(__dirname, 'foo.yaml'), data)
await ೱwriteꓽfile(path.join(__dirname, 'foo.json5'), data)
await ೱwriteꓽfile(path.join(__dirname, 'fooignore'), { entries: ['hello', 'world'] })
await ೱwriteꓽfile(path.join(__dirname, 'foorc'), { value: data.foo })
await ೱwriteꓽfile(path.join(__dirname, 'foo.jsonc'), data)
