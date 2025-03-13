import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

/////////////////////////////////////////////////

const __dirname = path.dirname(fileURLToPath(import.meta.url))
//console.log({ __dirname })

/////////////////////////////////////////////////

import { getꓽpure_module_details } from '@offirmo-private/pure-module--analyzer'

const pure_module_details = await getꓽpure_module_details(
	path.resolve(__dirname, '../../../../../stack--next/2-pure-modules/timestamps/'),
	{
		indent: '   ',
	},
)
console.log(pure_module_details)

/////////////////////////////////////////////////

import { present } from '@offirmo-private/pure-module--presenter'

await present({
	indent: '   ',

	pure_module_path: pure_module_details.root‿abspath,
	pure_module_details,

	//dest_dir: path.resolve(__dirname, 'output'),
	dest_dir: path.resolve(__dirname, '../../../../1-stdlib/timestamps/'),
	ts__config__path: path.resolve(__dirname, '../../../tsconfig.json'),
	ts__custom_types__path: path.resolve(__dirname, '../../../typescript-custom-typings'),
})
