import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { existsSync, renameSync } from 'node:fs'

/////////////////////////////////////////////////

const __dirname = path.dirname(fileURLToPath(import.meta.url))
//console.log({ __dirname })

/////////////////////////////////////////////////

import { lsDirsSync } from '@offirmo-private/fs--ls'
import { getꓽdefault_namespace } from '@offirmo-private/monorepo'
import { PkgInfosResolver } from '@offirmo-private/pkg-infos-resolver'
import { getꓽpure_module_details, type PureModuleDetails, type Options as PureModuleAnalyzerOptions } from '@offirmo-private/pure-module--analyzer'
import { present } from '@offirmo-private/pure-module--presenter'

const pkg_infos_resolver = new PkgInfosResolver()
// TODO feed with bolt knowledge!!!

const PURE_MODULE__DETAILS: Record<string, PureModuleDetails> = {}

async function refresh_pure_module(pure_module_path: string, getꓽdefault_namespace: PureModuleAnalyzerOptions['getꓽdefault_namespace']) {
	console.log('---------------------------------------')
	const pure_module_abspath = path.resolve(__dirname, pure_module_path)
	const pure_module_details = await getꓽpure_module_details(
		pure_module_abspath,
		{
			indent: '   ',
			getꓽdefault_namespace,
			pkg_infos_resolver,
		},
	)
	console.log(pure_module_details)

	PURE_MODULE__DETAILS[pure_module_details.fqname] = pure_module_details

	await present({
		indent: '   ',

		pure_module_path,
		pure_module_details,

		//dest_dir: path.resolve(__dirname, 'output'),
		//dest_dir: path.resolve(__dirname, '../../../../1-stdlib/timestamps/'),
		dest_dir: path.dirname(pure_module_abspath),

		ts__config__path: path.resolve(__dirname, '../../../../tsconfig.json'),
		ts__custom_types__path: path.resolve(__dirname, '../../../../typescript-custom-typings'),

		pkg_infos_resolver,
	})
}


// xxx to replace with bolt utils
async function convert_and_refresh_pure_modules(parent_path: string, getꓽdefault_namespace: PureModuleAnalyzerOptions['getꓽdefault_namespace']) {
	const dirs = lsDirsSync(path.resolve(__dirname, parent_path), { full_path: true })
		.filter(p => !p.includes('~~'))

	for (const dir of dirs) {
		if (!existsSync(path.resolve(__dirname, dir, 'module'))) {
			renameSync(path.resolve(__dirname, dir, 'src'), path.resolve(__dirname, dir, 'module'))
		}
		await refresh_pure_module(dir + '/module/', getꓽdefault_namespace)
	}
}

/////////////////////////////////////////////////



//await refresh_pure_module( '../../../../../0-meta/build-tools/pkg-infos-resolver/module/', getꓽdefault_namespace)
//await refresh_pure_module( '../../../../../0-meta/build-tools/pure-module--analyzer/module/', getꓽdefault_namespace)
//await refresh_pure_module( '../../../../../0-meta/build-tools/pure-module--presenter/module/', getꓽdefault_namespace)

//await convert_and_refresh_pure_modules('../../../../../1-stdlib/', getꓽdefault_namespace)
//await refresh_pure_module( '../../../../../1-stdlib/timestamps/module/', getꓽdefault_namespace)

//await convert_and_refresh_pure_modules('../../../../../2-foundation/', getꓽdefault_namespace)
//await refresh_pure_module( '../../../../../2-foundation/prettify-any/module/', getꓽdefault_namespace)

//await convert_and_refresh_pure_modules('../../../../../3-advanced/', getꓽdefault_namespace)
//await convert_and_refresh_pure_modules('../../../../../3-advanced--multi/', getꓽdefault_namespace)
//await convert_and_refresh_pure_modules('../../../../../3-advanced--browser/', getꓽdefault_namespace)
//await convert_and_refresh_pure_modules('../../../../../3-advanced--node/', getꓽdefault_namespace)

await convert_and_refresh_pure_modules('../../../../../9-rpg/', getꓽdefault_namespace)

//await convert_and_refresh_pure_modules('../../../../../A-apps--core/the-boring-rpg/', getꓽdefault_namespace)


// TODO circular deps
// TODO a published module must not depend on an unpublished one
