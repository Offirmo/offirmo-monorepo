#!/usr/bin/env zx
// using https://github.com/google/zx
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import * as fs from 'node:fs'

import { writeJsonFile as write_json_file } from 'write-json-file' // full pkg is too useful, ex. preserve indent
import { lsDirsSync } from '../../../3-advanced--node/cli-toolbox/fs/extra/ls/index.mjs'

// extracted from https://github.com/sindresorhus/load-json-file/blob/main/index.js
// in order to have as few external deps as possible
function load_json_file(filePath) {
	const buffer = fs.readFileSync(filePath)
	// Unlike `buffer.toString()` and `fs.readFile(path, 'utf8')`, `TextDecoder`` will remove BOM.
	const data = new TextDecoder().decode(buffer)
	return JSON.parse(data)
}

/////////////////////////////////////////////////
console.log(`🔧  🔻 tweaking the monorepo…`)


/////////////////////////////////////////////////
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const MONOREPO_ROOT = path.join(__dirname, '../../..')
const MONOREPO_PKG_JSON_PATH = path.join(MONOREPO_ROOT, 'package.json')
const MONOREPO_PKG_JSON = load_json_file(MONOREPO_PKG_JSON_PATH)

/////////////////////////////////////////////////
// 1. gathering environment data

const MONOREPO_WORKSPACES_RELPATHS = MONOREPO_PKG_JSON.bolt.workspaces.map(p => p.slice(0, -2)) // slice to remove trailing "/*"
const MONOREPO_PKGS_ABSPATHS = MONOREPO_WORKSPACES_RELPATHS.reduce((acc, val) => {
	try {
		const module_dirs = lsDirsSync(path.join(MONOREPO_ROOT, val))
		acc.push(...module_dirs)
	}
	catch (err) {
		if (!val.startsWith('xx'))
			console.error(`⛔️ Error accessing workspace "${val}"!`)
	}
	return acc
}, []).sort()
const MONOREPO_PKGS_NAMESPACES = new Set()
let MONOREPO_PKGS_NAMES = new Set()
const MONOREPO_PKGS_DEPENDENCIES = new Map()
const MONOREPO_PKGS_ABSPATHS_BY_PKG_NAME = {}
MONOREPO_PKGS_ABSPATHS.forEach(monorepo_pkg_path => {
	const PKG_JSON = load_json_file(path.join(monorepo_pkg_path, 'package.json'))

	const PKG_NAME = PKG_JSON.name
	const split = PKG_NAME.split('/')
	if (split.length > 1) {
		MONOREPO_PKGS_NAMESPACES.add(split[0])
	}
	MONOREPO_PKGS_ABSPATHS_BY_PKG_NAME[PKG_NAME] = monorepo_pkg_path
	MONOREPO_PKGS_NAMES.add(PKG_NAME)

	const { dependencies, devDependencies, peerDependencies, optionalDependencies } = PKG_JSON
	const all_dependencies = {
		...dependencies,
		...devDependencies,
		...peerDependencies,
		...optionalDependencies,
	}
	Object.keys(all_dependencies).forEach(dep_name => {
		const dep_version = all_dependencies[dep_name]

		if (!MONOREPO_PKGS_DEPENDENCIES.has(dep_name)) {
			MONOREPO_PKGS_DEPENDENCIES.set(dep_name, dep_version)
		}
		else {
			const existing_version = MONOREPO_PKGS_DEPENDENCIES.get(dep_name)
			if (existing_version !== dep_version) {
				console.error(`⛔️ version conflict for "${dep_name}": "${dep_version}" vs. "${existing_version}"!`)
				throw new Error('⛔️ version conflict for "${dep_name}"!')
			}
		}
	})
})
// "sort" the set
MONOREPO_PKGS_NAMES = new Set([...MONOREPO_PKGS_NAMES].sort())
/*
console.log('[DEBUG] environment data gathered so far:', {
	MONOREPO_ROOT,
	MONOREPO_WORKSPACES_RELPATHS,
	MONOREPO_PKGS_NAMESPACES,
	MONOREPO_PKGS_NAMES,
	MONOREPO_PKGS_ABSPATHS_BY_PKG_NAME,
	MONOREPO_PKGS_DEPENDENCIES,
})
*/

/////////////////////////////////////////////////
console.log(`🛠  🔷 found a monorepo with ${MONOREPO_PKGS_NAMES.size} modules across ${MONOREPO_PKGS_NAMESPACES.size} namespaces: ${[...MONOREPO_PKGS_NAMESPACES.keys()].join(', ')}`)

/////////////////////////////////////////////////
// 2. Check and fix the root package.json

if (MONOREPO_PKG_JSON.bolt) (function _update_root_dependencies_for_bolt() {
	// bolt requires every sub-packages' dependencies to be reflected in the root package.json
	// (it's redundant, cf. yarn workspace doesn't require this.)
	// better to automate it.

	const { dependencies, devDependencies, peerDependencies, optionalDependencies } = MONOREPO_PKG_JSON
	if (optionalDependencies) {
		throw new Error(`Unexpected optionalDependencies in the root package.json!`)
	}
	if (peerDependencies) {
		throw new Error(`Unexpected peerDependencies in the root package.json!`)
	}
	const all_root_dependencies = {
		...dependencies,
		...devDependencies,
		...peerDependencies,
		...optionalDependencies,
	}

	const candidate_root_package_json = {
		...MONOREPO_PKG_JSON,
		dependencies: {
			...MONOREPO_PKG_JSON.dependencies,
		},
		devDependencies: {
			...MONOREPO_PKG_JSON.devDependencies,
		}
	}
	let needs_update = false // so far

	Object.keys(all_root_dependencies).forEach(function _ensure_existing_root_dep_is_not_extraneous_and_has_unique_semver(dep_name) {
		const dep_version = all_root_dependencies[dep_name]

		// extraneous check:
		const is_meta_script_dependency = dep_name in dependencies // ok, minimal modules needed for the scripts (clean, build) to work
		const is_known_global_dev_dep = [
			'parcel-resolver-typescript-esm', // https://github.com/b8kkyn/parcel-resolver-typescript-esm
		].includes(dep_name) // global dev deps on the root package, we don't require individual pkg to declare the dep
		const is_package_dependency = MONOREPO_PKGS_DEPENDENCIES.has(dep_name) // ok, needed by a package
		const is_type_for_package_dependency = dep_name.startsWith('@types/') && MONOREPO_PKGS_DEPENDENCIES.has(dep_name.slice(7)) // typings for a package (we don't require the types to be declared as dependency in the package)
		const is_extraneous = !(
				is_package_dependency
				|| is_type_for_package_dependency
				|| is_meta_script_dependency
				|| is_known_global_dev_dep
			)
		if (is_extraneous) {
			console.warn(`⚠️⚠️⚠️ extraneous root DEV dependency "${dep_name}" in the root package.json! Will clean.`, {
				is_meta_script_dependency,
				is_known_global_dev_dep,
				is_package_dependency,
				is_type_for_package_dependency,
			})
			delete candidate_root_package_json.dependencies[dep_name]
			delete candidate_root_package_json.devDependencies[dep_name]
			needs_update = true
			return
		}

		if (is_package_dependency) {
			const existing_version = MONOREPO_PKGS_DEPENDENCIES.get(dep_name)
			if (existing_version !== dep_version) {
				console.error(`⛔️ version conflict for "${dep_name}" at the root: "${dep_version}" vs. in package(s) "${existing_version}"!`)
				throw new Error(`⛔️ root version conflict for "${dep_name}"!`)
			}
		}

		// special case of packages changing name when changing version
		if ([
			// known blocklist of packages we no longer want
			'parcel-bundler',
		].includes(dep_name)) {
			console.error(`⛔️ legacy package "${dep_name}" at the root!`)
			throw new Error(`⛔️ legacy package "${dep_name}" at the root!`)
		}
	})

	MONOREPO_PKGS_DEPENDENCIES.forEach(function _ensure_subpkg_dep_is_in_root(dep_version, dep_name) {
		if (MONOREPO_PKGS_NAMES.has(dep_name)) {
			// own pkg, should NOT be in the root pkg.json
			// (will be more exhaustively filtered in the next loop)
			return
		}

		if (dep_name.startsWith('@offirmo')) {
			// own pkg but not known as such, should NOT be in the root pkg.json
			// happen rarely when migrating workspaces 1 by 1, for ex. when migrating to a new stack
			throw new Error(`Likely subpackage not found! "${dep_name}"!`)
		}

		if (candidate_root_package_json.dependencies[dep_name]) {
			// already in the root
			return
		}

		if (candidate_root_package_json.devDependencies[dep_name]) {
			// already in the root
			return
		}

		console.log(`Adding missing root dependency "${dep_name}"`)
		candidate_root_package_json.devDependencies[dep_name] = dep_version
		needs_update = true
	})

	MONOREPO_PKGS_NAMES.forEach(function _ensure_no_subpkg_in_the_root(pkg_name) {
		if (candidate_root_package_json.dependencies[pkg_name]) {
			delete candidate_root_package_json.dependencies[pkg_name]
			needs_update = true
		}
		if (candidate_root_package_json.devDependencies[pkg_name]) {
			delete candidate_root_package_json.devDependencies[pkg_name]
			needs_update = true
		}
	})

	if (needs_update) {
		candidate_root_package_json.dependencies = Object.fromEntries(
			Object.entries(candidate_root_package_json.dependencies).sort()
		)
		candidate_root_package_json.devDependencies = Object.fromEntries(
			Object.entries(candidate_root_package_json.devDependencies).sort()
		)
		console.info(`🛠  🔶 Updating root package.json...`)
		write_json_file(MONOREPO_PKG_JSON_PATH, candidate_root_package_json)
	}
})()

/////////////////////////////////////////////////
// 3. Check and fix node_modules

if (MONOREPO_PKG_JSON.bolt) (function _hoist_local_packages_to_root_node_modules() {
	// yarn workspace does it, not bolt.
	// Use cases?
	// - CONS hoisting make pkgs immune to forgetting to declare a dep in package.json
	// - PROS it helps for complex monorepo situations such as @offirmo-private/parcel-config--default
	//return // TODO from time to time, uncomment this return to check whether pkgs have their deps properly declared

	MONOREPO_PKGS_NAMESPACES.forEach(ns => {
		const namespace_abspath = path.join(MONOREPO_ROOT, 'node_modules', ns)
		try {
			fs.mkdirSync(namespace_abspath, { recursive: true })
			//console.log('created dir: ' + namespace_abspath)
		}
		catch (err) {
			if (err.code !== 'EEXIST') {
				console.error('failed to create a directory while hoisting')
				throw err
			}
		}
	})

	let hoisted_count = 0
	Array.from(MONOREPO_PKGS_NAMES).forEach(pkg_name => {
		const pkg_src_abspath = MONOREPO_PKGS_ABSPATHS_BY_PKG_NAME[pkg_name]
		const link_path = path.join(MONOREPO_ROOT, 'node_modules', pkg_name)
		try {
			fs.symlinkSync(pkg_src_abspath, link_path)
			//console.log('hoisted: ' + link_path + ' ← ' + pkg_src_abspath)
		}
		catch (err) {
			if (err.code !== 'EEXIST') {
				console.error('failed to symlink while hoisting')
				throw err
			}
		}
		hoisted_count++
	})
	if (hoisted_count)
		console.log(`🛠  🔶 hoisted ${hoisted_count} local packages to the monorepo's root ✔`)
})()

/////////////////////////////////////////////////
console.log(`🔧  🔺 tweaked the monorepo ✔`)
