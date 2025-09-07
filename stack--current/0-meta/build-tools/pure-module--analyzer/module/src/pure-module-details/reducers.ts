import * as path from 'node:path'

import assert from 'tiny-invariant'

import type { AbsolutePath, ProgLang } from '../types.ts'
import type { PureModuleDetails, PureModuleManifest } from './types.ts'

/////////////////////////////////////////////////

function create(root‿abspath: AbsolutePath): PureModuleDetails {
	const name = (() => {
		let _path = path.resolve(root‿abspath).split(path.sep)
		if (_path.at(-1) === 'src')
			_path.pop()
		if (_path.at(-1) === 'module')
			_path.pop()

		let segment = _path.pop()!
		while ('0123456789-'.includes(segment[0]))
			segment = segment.slice(1)
		return segment
	})()

	return {
		root‿abspath,

		status: 'stable',
		namespace: 'unknown',
		name,
		fqname: 'unknown',
		version: '0.0.1',
		//description?: string
		isꓽpublished: false,
		author: 'Offirmo <offirmo.net@gmail.com> (https://www.offirmo.net/)', // https://docs.npmjs.com/cli/v11/configuring-npm/package-json#people-fields-author-contributors
		//license: 'Unlicense',

		entrypointⵧmain: null as any, // hack, will be set during the parse and will throw if still null
		entrypointⵧexports: {},
		entrypointsⵧbuild: {},

		isꓽapp: false, // most common case
		hasꓽside_effects: false,

		hasꓽtestsⵧunit: false,
		hasꓽtestsⵧevals: false,
		//hasꓽtestsⵧsmoke: false,
		hasꓽstories: false,

		depsⵧnormal: new Set<string>(),
		depsⵧdev: new Set<string>([
			// implicit deps:

			// common tools
			'npm-run-all',
			// obvious in our monorepo
			'@offirmo-private/monorepo-scripts',
			// encourage unit tests
			'@offirmo/unit-test-toolbox',
		]),
		depsⵧpeer: new Set<string>(),
		depsⵧoptional: new Set<string>(),
		depsⵧvendored: new Set<string>(),

		languages: new Set<ProgLang>(),
		engines: {},

		_manifest: {},
	}
}

// mutate!
function updateⵧfrom_manifest(details: PureModuleDetails, _manifest: PureModuleManifest): void {
	details._manifest = _manifest

	const unprocessed_keys = new Set<string>(Object.keys(_manifest))

	;([
		'name',
		'namespace',
		'license',
		'description',
		'version',
		'isꓽpublished',
		'isꓽapp',
		'hasꓽside_effects',
		'engines',
		'status',
	] satisfies Array<keyof PureModuleManifest>).forEach(k => {
		if (unprocessed_keys.has(k)) {
			assert(!!details._manifest[k])
			;(details as any)[k] = details._manifest[k]
			unprocessed_keys.delete(k)
		}
	})
	// special ones that don't map to details
	unprocessed_keys.delete('_dontꓽpresent')
	unprocessed_keys.delete('_overrides')
	if (unprocessed_keys.size) {
		throw new Error(`Unknown keys in manifest: "${Array.from(unprocessed_keys).join(', ')}"!`)
	}
}

/////////////////////////////////////////////////

export {
	create,
	updateⵧfrom_manifest,
}
