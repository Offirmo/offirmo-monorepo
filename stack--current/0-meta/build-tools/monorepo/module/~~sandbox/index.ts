import * as path from 'node:path'

import { PkgInfosResolver } from '@offirmo-private/pkg-infos-resolver'
import { getꓽpure_module_details, type PureModuleDetails, type Options as PureModuleAnalyzerOptions } from '@offirmo-private/pure-module--analyzer'
import { present } from '@offirmo-private/pure-module--presenter'

import {
	GIT_ROOT,
	MONOREPO_ROOT,
	MONOREPO__ROOT_TSCONFIG‿abs,
	MONOREPO__SHARED_TS_TYPINGS‿abs,
} from '../src/consts.ts'
import { getꓽdefault_namespace, getꓽall_known_pure_module__dirs‿abspath } from '../src/index.ts'
import * as process from 'node:process'

console.log(`\n~~~~~~~~~~~~~~~~\nHello!!!`)

/////////////////////////////////////////////////

async function refreshꓽmonorepo() {
	console.log(`🛠 🗂 Refreshing Offirmo’s monorepo "${MONOREPO_ROOT}"…`)

	const pkg_infos_resolver = new PkgInfosResolver()

	const PURE_MODULE__DETAILS = await ↆgetꓽall_pure_module_details(pkg_infos_resolver)

	for (const pure_module_details of Object.values(PURE_MODULE__DETAILS)) {
		await present({
			indent: '   ',

			pure_module_path: pure_module_details.root‿abspath,
			pure_module_details,

			git_root: GIT_ROOT,
			bolt_root: MONOREPO_ROOT,

			dest_dir: path.dirname(pure_module_details.root‿abspath),

			ts__config__path: MONOREPO__ROOT_TSCONFIG‿abs,
			ts__custom_types__path: MONOREPO__SHARED_TS_TYPINGS‿abs,

			pkg_infos_resolver,
		})
	}

	// _aliases--projects.sh
	for (const pure_module_details of Object.values(PURE_MODULE__DETAILS)) {
		const dest_dir = path.dirname(pure_module_details.root‿abspath)
		const relpath = path.relative(MONOREPO_ROOT, dest_dir)
		const relpath_split = relpath.split(path.sep).filter(s => !!s)
		const radix = relpath_split.map(s => s[0]).join('')
		console.log([
			'alias',
			`mono${radix}='cd`.padStart(12),
			`~/${path.relative(process.env['HOME']!, MONOREPO_ROOT)}/;`,
			'nvm use;',
			'git--offirmo.sh;',
			`cd ${relpath_split.slice(0, -2).join(path.sep)}/;`.padEnd(20),
			`cd ${relpath_split.slice(-2).join(path.sep)}/;`.padEnd(53),
			`tabset --color "#006EDB" --badge mono${radix}'`
		].join(' '))
	}
}

/////////////////////////////////////////////////

async function resurrectꓽfrom(rootpkg_name) {
	console.log(`🛠 🗂 Resurrecting Offirmo’s monorepo "${MONOREPO_ROOT}" from package "${rootpkg_name}"…`)

	const pkg_infos_resolver = new PkgInfosResolver()

	const PURE_MODULE__DETAILS = await ↆgetꓽall_pure_module_details(pkg_infos_resolver)


	// TODO graph from root
	// TODO check dep loops
	// TODO check tiers
	// TODO compute graph degrees
	// TODO a published module must not depend on an unpublished one
}

/////////////////////////////////////////////////

refreshꓽmonorepo()
//resurrectꓽfrom('@tbrpg/sandbox')

/////////////////////////////////////////////////

async function ↆgetꓽall_pure_module_details(pkg_infos_resolver: PkgInfosResolver): Promise<Record<string, PureModuleDetails>> {
	const all_known_pure_module__dirs‿abspath = getꓽall_known_pure_module__dirs‿abspath()
	console.log(all_known_pure_module__dirs‿abspath)

	return await all_known_pure_module__dirs‿abspath
		.reduce(async (ೱacc, pure_module_abspath) => {
			const acc = await ೱacc
			const pure_module_details = await getꓽpure_module_details(
				pure_module_abspath,
				{
					indent: '   ',
					getꓽdefault_namespace,
					pkg_infos_resolver,
				},
			)
			console.log(pure_module_details)
			acc[pure_module_details.fqname] = pure_module_details
			pkg_infos_resolver.inject({
				name: pure_module_details.fqname,
				version: pure_module_details.version || '0.0.1',
				types: pure_module_details.languages.has('ts') ? '[xxx present hack]' : undefined,
			}, { force: true })
			return acc
		}, Promise.resolve({} as Record<string, PureModuleDetails>))
}
