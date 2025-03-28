import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

/////////////////////////////////////////////////

const __dirname = path.dirname(fileURLToPath(import.meta.url))
//console.log({ __dirname })


import { getꓽpure_module_details } from '@offirmo-private/pure-module--analyzer'

const result = await getꓽpure_module_details(
	__dirname + '/../../../../../1-stdlib/timestamps/module',
	{
		indent: '   ',
	},
)
console.log(result)
