/**
 * Fetch the latest version of a npm package
 */

import packageJson from 'package-json'
import semver from 'semver'

/////////////////////////////////////////////////

interface PackageJson {
	version?: string
}


class PkgVersionResolver {
	#packageᐧjson_cache: Record<string, any> = {}
	#pending_promises: Record<string, Promise<any>> = {}

	/////////////////////////////////////////////////

	async ↆgetꓽpackageᐧjson(pkg_name: string): Promise<PackageJson> {
		this.assert_allowed_package(pkg_name)

		this.preload(pkg_name) // just in case, harmless to call several times
		await this.all_pending_loaded() // simpler

		return this.ǃgetꓽpackageᐧjson(pkg_name)
	}

	async ↆgetꓽextra_typings_pkg_name_for(pkg_name: string): Promise<string | undefined> {
		if (pkg_name.startsWith('@types/'))
			return undefined

		if (this.is_unpublished_monorepo_package(pkg_name)) {
			// no way this can appear in the public @types project!
			return undefined
		}

		this.preload(pkg_name) // just in case, harmless to call several times
		const potential_types_pkg_name = _get_at_types_for_pkg_name(pkg_name)
		await this.all_pending_loaded() // bc cascade

		if (_has_types(this.#packageᐧjson_cache[pkg_name])) {
			// not needed
			return undefined
		}

		if (!this.#packageᐧjson_cache[potential_types_pkg_name]) {
			// not found = doesn't exist
			console.log(`Extra typings for "${pkg_name}" not found. ("${potential_types_pkg_name}")`)
			return undefined
		}

		return potential_types_pkg_name
	}

	/////////////////////////////////////////////////
	// sync version for convenience (.map())

	preload(pkg_name: string, auto: boolean = false): void {
		this.assert_allowed_package(pkg_name)

		if (this.#packageᐧjson_cache[pkg_name])
			return

		if (this.#pending_promises[pkg_name])
			return

		if (!this.is_npm_package(pkg_name)) {
			// for now
			return
		}

		if (this.is_unpublished_monorepo_package(pkg_name)) {
			// for now
			return
		}

		console.log(`PkgVersionResolver querying "${pkg_name}"…`)
		this.#pending_promises[pkg_name] = packageJson(pkg_name, { fullMetadata: true })
			.then(
				content => {
					this.#packageᐧjson_cache[pkg_name] = content
					console.log(`${auto ? 'auto' : '    '} package.json loaded for "${pkg_name}" v${semver.clean(content.version)} (${`includes types? ${_has_types(content)}`})`)
					//console.log(`XXX content`, content)
					return content // for chaining
				},
				err => {
					if (auto && err?.name === 'PackageNotFoundError') {
						console.log(`Auto pkg ${pkg_name} not found, ignoring.`)
						return
					}
					throw err
				}
			)
			.finally(() => {
				delete this.#pending_promises[pkg_name]
			})

		if (!pkg_name.startsWith('@types/')) {
			// pre-emptively try to load types as well (BUT may not be needed or not exist)
			// we need to launch this sync for being in #pending_promises as well
			const potential_types_pkg_name = _get_at_types_for_pkg_name(pkg_name)
			console.log(`PkgVersionResolver pre-emptively querying "${potential_types_pkg_name}"…`)
			const pending_id = 'auto-' + potential_types_pkg_name
			this.#pending_promises[pending_id] = this.#pending_promises[pkg_name]
				.then(content => {
					if (_has_types(content)) {
						// no need to search for a types package, it's already included
						return
					}

					// this will replace the previous promise
					// MAY FAIL, it's ok
					this.preload(potential_types_pkg_name, true)
					return this.#pending_promises[potential_types_pkg_name]
				})
				.finally(() => {
					delete this.#pending_promises[pending_id]
				})
		}
	}

	async all_pending_loaded(): Promise<void> {
		await Promise.all(Object.values(this.#pending_promises))
	}

	ǃgetꓽpackageᐧjson(pkg_name: string): PackageJson {
		this.assert_allowed_package(pkg_name)

		if (this.#packageᐧjson_cache[pkg_name])
			return this.#packageᐧjson_cache[pkg_name]

		if (this.#pending_promises[pkg_name])
			throw new Error(`Package "${pkg_name}" is still loading, please wait!`)

		if (!this.is_npm_package(pkg_name)) {
			throw new Error(`Package "${pkg_name}" is not a npm package!`)
		}

		throw new Error(`No package.json for "${pkg_name}" found! Did you forgot to preload?`)
	}

	ǃgetꓽversionⵧlatest(pkg_name: string) {
		this.assert_allowed_package(pkg_name)

		const packageᐧjson = this.ǃgetꓽpackageᐧjson(pkg_name)

		return semver.clean(packageᐧjson.version)
	}

	ǃgetꓽversionⵧfor_dep(pkg_name: string) {
		this.assert_allowed_package(pkg_name)

		if (this.should_use_joker_version_for_dep(pkg_name))
			return '*'

		const latest_pkg_version = this.ǃgetꓽversionⵧlatest(pkg_name)

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
			// known blocklist of packages we absolutely don't want to use
			// due to migrations or known issues
			'parcel-bundler', // parcel v1 -> we migrated to v2, should never appear
		].includes(pkg_name)) {
			throw new Error(`⛔️ forbidden package "${pkg_name}" encountered!`)
		}
	}

	private is_npm_package(pkg_name: string): boolean {
		if (pkg_name.startsWith('node:')) {
			return false
		}

		return true
	}

	// TODO review usage!!
	// internal = from this monorepo
	// vs. external = npm
	private is_unpublished_monorepo_package(pkg_name: string) {
		return pkg_name.startsWith('@offirmo-private')
			|| pkg_name.startsWith('@oh-my-rpg')
			|| pkg_name.startsWith('@tbrpg')
	}

	private should_use_joker_version_for_dep(pkg_name: string): boolean {
		// TRICKY!!!
		// TODO if published, use the version in package.json
		// NOOO it's if the CALLER is published, use an exact version
		return this.is_unpublished_monorepo_package(pkg_name)
	}
}

/////////////////////////////////////////////////

function _get_at_types_for_pkg_name(pkg_name: string): string {
	if (pkg_name.startsWith('@types/'))
		throw new Error(`Already a @types/ package!`)

	// https://github.com/DefinitelyTyped/DefinitelyTyped?tab=readme-ov-file#npm
	if (pkg_name.includes('/')) {
		const [scope, name] = pkg_name.split('/')
		return `@types/${scope!.slice(1)}__${name}`
	}

	return `@types/${pkg_name}`
}

function _has_types(packageᐧjson: PackageJson): boolean {
	return (!!packageᐧjson?.typings || !!packageᐧjson?.types)
}

/////////////////////////////////////////////////

export {
	type PackageJson,

	PkgVersionResolver,
}
