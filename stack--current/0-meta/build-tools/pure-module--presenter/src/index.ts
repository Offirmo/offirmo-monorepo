/* PROMPT
 * ’
 */
import * as path from 'node:path'
import * as fs from 'node:fs/promises'

import { writeJsonFile as write_json_file } from 'write-json-file' // full pkg is too useful, ex. preserve indent
import packageJson from 'package-json'
import semver from 'semver'

import { getꓽpure_module_details, type PureModuleDetails } from '@offirmo-private/pure-module--analyzer'

/////////////////////////////////////////////////

class PkgVersionResolver {
	#packageᐧjson_cache: Record<string, any> = {}
	#pending_promises: Record<string, Promise<any>> = {}

	/////////////////////////////////////////////////

	preload(pkg_name: string) {
		this.assert_allowed_package(pkg_name)

		if (this.#packageᐧjson_cache[pkg_name])
			return

		if (this.#pending_promises[pkg_name])
			return

		if (this.is_internal_package(pkg_name)) {
			// for now
			return
		}

		this.#pending_promises[pkg_name] = packageJson(pkg_name, { fullMetadata: true })
			.then(content => {
				this.#packageᐧjson_cache[pkg_name] = content
				console.log(`package.json loaded for "${pkg_name}" (has types? ${!!content?.typings})`)
				//console.log(`XXX content`, content)
				return content // for chaining
			})
			.finally(() => {
				delete this.#pending_promises[pkg_name]
			})

		if (!pkg_name.startsWith('@types') && !pkg_name.includes('/')) {
			// also preload types if needed
			const potential_types_pkg_name = `@types/${pkg_name}`
			this.#pending_promises[potential_types_pkg_name] = this.#pending_promises[pkg_name]
				.then(content => {
					if (content?.typings) {
						// no need for types
						return null
					}
					else if (content?.bin) {
						// it's a tool
						return null
					}
					else {
						return packageJson(potential_types_pkg_name, { fullMetadata: true })
							.then(content => {
								this.#packageᐧjson_cache[potential_types_pkg_name] = content
								console.log(`package.json loaded for "${potential_types_pkg_name}"`)

								return content // for chaining
							},
							err => {
								console.log(`Type pkg ${potential_types_pkg_name} not found, ignoring.`)
								return null
							})
					}
				})
				.finally(() => {
					delete this.#pending_promises[potential_types_pkg_name]
				})
		}
	}

	async all_pending_loaded() {
		await Promise.all(Object.values(this.#pending_promises))
	}

	// need to be sync for convenience (.map())
	get_target_version(pkg_name: string) {
		this.assert_allowed_package(pkg_name)

		if (this.is_internal_package(pkg_name))
			return '*'

		const packageᐧjson = this.#packageᐧjson_cache[pkg_name]
		if (!packageᐧjson) {
			throw new Error(`No package.json for "${pkg_name}" or no version!`)
		}

		const latest_pkg_version = semver.clean(packageᐧjson?.version)

		const major = semver.major(latest_pkg_version)
		//console.log(`XXX latest_pkg_version`, { pkg_name, latest_pkg_version, major })
		if (major !== 0)
			return `^${major}`
		const minor = semver.minor(latest_pkg_version)
		if (minor !== 0)
			return `^0.${minor}`

		return `^0.0.${semver.patch(latest_pkg_version)}`
	}

	/////////////////////////////////////////////////

	private assert_allowed_package(pkg_name: string): void {
		if ([
			// known blocklist of packages we no longer want
			'parcel-bundler', // parcel v1
		].includes(pkg_name)) {
			throw new Error(`⛔️ forbidden package "${pkg_name}" encountered!`)
		}
	}

	// internal = from this monorepo
	// vs. external = npm
	// TODO review is this needed?
	private is_internal_package(pkg_name: string) {
		return pkg_name.startsWith('@offirmo')
		// TODO more
	}
}

const pkg_version_resolver = new PkgVersionResolver()

/////////////////////////////////////////////////

function isAncestorDir(parent: string, child: string): boolean {
	const parentDirs = parent.split(path.sep).filter(dir => !!dir);
	const childDirs = child.split(path.sep).filter(dir => !!dir);
	return parentDirs.every((dir, i) => childDirs[i] === dir);
}

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


	if (isAncestorDir(pure_module_details.root‿abspath, dest_dir‿abspath)) {
		throw new Error(`Out-of-source build cannot target inside the pure-module!`)
	}

	if (isAncestorDir(dest_dir‿abspath, pure_module_details.root‿abspath)) {
		// the pure module is inside the target dir
		// do not remove any file
		// TODO one day clear everything except the pure-module
	}
	else {
		await fs.rm(dest_dir‿abspath, { recursive: true, force: true })
		await fs.mkdir(dest_dir‿abspath, { recursive: true })
	}

	const promises: Array<Promise<void>> = []

	const PURE_MODULE_CONTENT_RELPATH = path.basename(pure_module_path)
	promises.push(
		fs.symlink(
			pure_module_details.root‿abspath,
			path.resolve(dest_dir‿abspath, PURE_MODULE_CONTENT_RELPATH),
			'dir'
		)
	)

	promises.push(fs.writeFile(
		path.resolve(dest_dir‿abspath, '.npmrc'),
		`
registry=https://registry.npmjs.org/
package-lock=false
`.trimStart(),
		{ encoding: 'utf-8' },
	))

	promises.push(fs.writeFile(
		path.resolve(dest_dir‿abspath, 'README.md'),
		`
# ${pure_module_details.name}

${pure_module_details.description || 'TODO description'}
`.trimStart(),
		{ encoding: 'utf-8' },
	))

	const SRC_RELPATH = path.join(PURE_MODULE_CONTENT_RELPATH, pure_module_details.source.path‿rel)
	const SRC_DIR_RELPATH = path.dirname(SRC_RELPATH)

	promises.push(write_json_file(
		path.resolve(dest_dir‿abspath, 'tsconfig.json'),
		{
			"extends": path.relative(dest_dir‿abspath, ts__config__path),
			"include": [
				path.relative(dest_dir‿abspath, ts__custom_types__path) + '/*.d.ts',
				`${SRC_DIR_RELPATH}/**/*.ts`
			]
		}
	))


	if (pure_module_details.depsⵧvendored.size) {
		throw new Error(`Not implemented!`)
		// TODO link + declare in private entries
	}

	const packageᐧjson = await (async () => {
		const pkg: any = {
			"name": `${pure_module_details.namespace}/${pure_module_details.name}`,
			"description": pure_module_details.description,
			"version": pure_module_details.version,
			"author": pure_module_details.author,
			"license": pure_module_details.license,
			"private": pure_module_details.isꓽpublished,

			"sideEffects": pure_module_details.hasꓽside_effects,
			"type": "module",
			"exports": {
				".": {
					"import": './' + SRC_RELPATH,
				}
			},
				"source": SRC_RELPATH,
			}

		const all_declared_deps: Set<string> = (new Set<string>())
			.union(pure_module_details.depsⵧnormal)
			.union(pure_module_details.depsⵧdev)
			.union(pure_module_details.depsⵧpeer)
			.union(pure_module_details.depsⵧoptional)
			// vendored are copied, not declared

		Array.from(all_declared_deps.values()).forEach(dep => pkg_version_resolver.preload(dep))
		await pkg_version_resolver.all_pending_loaded()

		if (pure_module_details.depsⵧpeer.size) {
			pkg.peerDependencies = Object.fromEntries(
				Array.from(pure_module_details.depsⵧpeer).sort().map(dep => [dep, pkg_version_resolver.get_target_version(dep)])
			)
		}

		pkg.dependencies = Object.fromEntries(
			Array.from(pure_module_details.depsⵧnormal).sort().map(dep => [dep, pkg_version_resolver.get_target_version(dep)])
		)
		if (pure_module_details.depsⵧoptional.size) {
			throw new Error(`Not implemented!`)
		}

		pkg.scripts = (() => {
			const scripts: Record<string, string> = {}

			// aggregs
			const scriptsⵧclean = Object.keys(scripts).filter(k => k.startsWith('clean'))
			if (scriptsⵧclean.length) {
				scripts.clean = `npm-run-all ${scriptsⵧclean.join(' ')}`
			}

			if (pure_module_details.hasꓽtestsⵧunit) {
				scripts['test--unit'] =
					`node --experimental-strip-types ./node_modules/.bin/mocha -- --bail --config ./node_modules/@offirmo/unit-test-toolbox/mocharc.json ./node_modules/@offirmo/unit-test-toolbox/mocha-chai-init-node.mjs './${SRC_DIR_RELPATH}/**/*.tests.ts'`
					//  --experimental-require-module
			}

			if (pure_module_details.languages.has('ts')) {
				scripts['test--ts'] = 'tsc --noEmit'
				scripts['test--ts--watch'] = 'tsc --noEmit --watch'
				scripts['dev'] = scriptsⵧclean.length
					? `run-s clean test--ts--watch`
					: `run-s test--ts--watch`
			}

			const scriptsⵧtest = Object.keys(scripts).filter(k => k.startsWith('test') && !k.endsWith('--watch'))
			if (scriptsⵧtest.length) {
				scripts['test'] = `run-s ${scriptsⵧtest.join(' ')}`
			}

			return scripts
		})()

		if (pure_module_details.depsⵧdev.size) {
			pkg.devDependencies = Object.fromEntries(
				Array.from(pure_module_details.depsⵧdev).sort().map(dep => [dep, pkg_version_resolver.get_target_version(dep)])
			)
		}

		return pkg
	})()

	promises.push(write_json_file(
		path.resolve(dest_dir‿abspath, 'package.json'), packageᐧjson
	))
}

/////////////////////////////////////////////////

export {
	present,
}
