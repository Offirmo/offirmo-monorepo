/* PROMPT
 * ’
 */
import * as path from 'node:path'
import * as fs from 'node:fs/promises'

import { writeJsonFile as write_json_file } from 'write-json-file' // full pkg is too useful, ex. preserve indent

import { getꓽpure_module_details, type PureModuleDetails } from '@offirmo-private/pure-module--analyzer'

/////////////////////////////////////////////////

interface Params {
	pure_module_path: string
	pure_module_details?: PureModuleDetails
	dest_dir: string
	ts__config__path: string
	ts__custom_types__path: string

	indent: string
}
async function present({
	indent = '',

	pure_module_path,
	pure_module_details = getꓽpure_module_details(pure_module_path, { indent }),

	dest_dir,
	ts__config__path,
	ts__custom_types__path,
}: Params) {
	const dest_dir‿abspath = path.resolve(dest_dir)
	console.log(`${indent}🗃  exposing pure code module to "${dest_dir‿abspath}"…`)

	await fs.rm(dest_dir‿abspath, { recursive: true, force: true })
	await fs.mkdir(dest_dir‿abspath, { recursive: true })

	const promises: Array<Promise<void>> = []

	promises.push(fs.writeFile(
		path.resolve(dest_dir‿abspath, '.npmrc'),
		`
registry=https://registry.npmjs.org/
package-lock=false
`.trimStart(),
		{ encoding: 'utf-8' },
	))

	promises.push(write_json_file(
		path.resolve(dest_dir‿abspath, 'tsconfig.json'),
		{
			"extends": path.relative(dest_dir‿abspath, ts__config__path),
			"include": [
				path.relative(dest_dir‿abspath, ts__custom_types__path) + '/*.d.ts',
				"src/**/*.ts"
			]
		}
	))

	promises.push(
		fs.symlink(
			pure_module_details.root‿abspath,
			path.resolve(dest_dir‿abspath, 'src'),
			'dir'
		)
	)

	promises.push(write_json_file(
		path.resolve(dest_dir‿abspath, 'package.json'),
		{
			"name": `${pure_module_details.namespace}/${pure_module_details.name}`,
			"description": pure_module_details.description,
			"version": pure_module_details.version,
			"author": pure_module_details.author,
			"license": pure_module_details.license,
			"private": pure_module_details.isꓽprivate,

			"sideEffects": false,
			"type": "module",
			"exports": {
				".": {
					"import": "./src/index.ts"
				}
			},
			"source": "src/index.ts",

			"peerDependencies": {
			},
			"dependencies": {
			},
			"scripts": {
			},
			"devDependencies": {
			}
		}
	))
}

/////////////////////////////////////////////////

export {
	present,
}
