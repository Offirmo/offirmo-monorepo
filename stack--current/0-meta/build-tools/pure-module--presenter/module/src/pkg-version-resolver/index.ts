/**
 * Fetch the latest version of a npm package
 */

import packageJson from 'package-json'
import semver from 'semver'

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

		if (!this.is_npm_package(pkg_name)) {
			// for now
			return
		}

		if (this.is_internal_package(pkg_name)) {
			// for now
			return
		}

		this.#pending_promises[pkg_name] = packageJson(pkg_name, { fullMetadata: true })
			.then(content => {
				this.#packageᐧjson_cache[pkg_name] = content
				console.log(`     package.json loaded for "${pkg_name}" v${semver.clean(content.version)} (${pkg_name.startsWith('@types/') ? 'is @type' : `includes types? ${!!content?.typings}`})`)
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
									console.log(`auto package.json loaded for "${potential_types_pkg_name}" v${semver.clean(content.version)}`)

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

	private is_npm_package(pkg_name: string): boolean {
		if (pkg_name.startsWith('node:')) {
			return false
		}

		return true
	}

	// internal = from this monorepo
	// vs. external = npm
	// TODO review is this needed?
	private is_internal_package(pkg_name: string) {
		return pkg_name.startsWith('@offirmo')
		// TODO more
	}
}

/////////////////////////////////////////////////

export {
	PkgVersionResolver,
}
