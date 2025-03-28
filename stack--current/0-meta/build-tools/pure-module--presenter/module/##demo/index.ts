import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

/////////////////////////////////////////////////

const __dirname = path.dirname(fileURLToPath(import.meta.url))
//console.log({ __dirname })

/////////////////////////////////////////////////

import { getꓽpure_module_details } from '@offirmo-private/pure-module--analyzer'
import { PkgVersionResolver, present } from '@offirmo-private/pure-module--presenter'

const pkg_version_resolver = new PkgVersionResolver()

async function refresh_pure_module(pure_module_path: string) {
	console.log('---------------------------------------')
	const pure_module_abspath = path.resolve(__dirname, pure_module_path)
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

		ts__config__path: path.resolve(__dirname, '../../../../tsconfig.json'),
		ts__custom_types__path: path.resolve(__dirname, '../../../../typescript-custom-typings'),

		pkg_version_resolver,
	})
}

/////////////////////////////////////////////////

await refresh_pure_module( '../../../../../1-stdlib/timestamps/module/' )
await refresh_pure_module( '../../../../../1-stdlib/random/module/')
await refresh_pure_module( '../../../../../0-meta/build-tools/pure-module--analyzer/module/')
await refresh_pure_module( '../../../../../0-meta/build-tools/pure-module--presenter/module/')
