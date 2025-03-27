import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

/////////////////////////////////////////////////

const __dirname = path.dirname(fileURLToPath(import.meta.url))
//console.log({ __dirname })

/////////////////////////////////////////////////

import { getꓽpure_module_details } from '@offirmo-private/pure-module--analyzer'
import { present } from '@offirmo-private/pure-module--presenter'

async function refresh_pure_module(pure_module_abspath: string) {

	const pure_module_details = await getꓽpure_module_details(
		pure_module_abspath,
		{
			indent: '   ',
		},
	)
	console.log(pure_module_details)

	await present({
		indent: '   ',

		pure_module_path: pure_module_abspath,
		pure_module_details,

		//dest_dir: path.resolve(__dirname, 'output'),
		//dest_dir: path.resolve(__dirname, '../../../../1-stdlib/timestamps/'),
		dest_dir: path.dirname(pure_module_abspath),

		ts__config__path: path.resolve(__dirname, '../../../tsconfig.json'),
		ts__custom_types__path: path.resolve(__dirname, '../../../typescript-custom-typings'),
	})
}

/////////////////////////////////////////////////

await refresh_pure_module(
	//path.resolve(__dirname, '../../../../1-stdlib/timestamps/module/'),
	//path.resolve(__dirname, '../../../../1-stdlib/random/module/'),
	path.resolve(__dirname, '../../../../0-meta/build-tools/pure-module--analyzer/src/'),
)
