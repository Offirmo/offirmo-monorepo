#!/usr/bin/env zx
// using https://github.com/google/zx
const path = require('path')
const fs = require('fs')

const write_json_file = require('write-json-file') // TODO remove dep

const { lsDirsSync } = require('../../../3-advanced--node/cli-toolbox/fs/extra')

/////////////////////

console.log(`🛠  🔻 tweaking the monorepo…`)

/////////////////////

function get_pkg_1st_level_dependencies_relpaths(pkg_abs_path) {
	const NODE_MODULES_PATH = path.join(pkg_abs_path, 'node_modules')
	try {
		const node_module_children_basenames = lsDirsSync(NODE_MODULES_PATH, { full_path: false })
		return node_module_children_basenames.reduce((acc, basename) => {
			if (basename === '.bin' || basename === '.cache') return acc

			return acc.concat(
				basename.startsWith('@')
					? lsDirsSync(path.join(NODE_MODULES_PATH, basename), { full_path: false }).map(b => path.join(basename, b))
					: [basename]
			)
		}, [])
	}
	catch (err) {
		if (err.code === 'ENOENT') return []
		throw err
	}
}

/////////////////////

const MONOREPO_ROOT = path.join(__dirname, '../../..')
const MONOREPO_PKG_JSON_PATH = path.join(MONOREPO_ROOT, 'package.json')
const MONOREPO_PKG_JSON = require(MONOREPO_PKG_JSON_PATH)
/*
const CURRENT_PKG_PATH = process.cwd()
const CURRENT_PKG_JSON = require(path.join(CURRENT_PKG_PATH, 'package.json'))
*/
/////////////////////
// 1. gathering environment data

const MONOREPO_WORKSPACE_RELPATHS = MONOREPO_PKG_JSON.bolt.workspaces.map(p => p.slice(0, -2)) // slice to remove trailing "/*"
const MONOREPO_PKG_ABSPATHS = MONOREPO_WORKSPACE_RELPATHS.reduce((acc, val) => {
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
const MONOREPO_PKG_NAMESPACES = new Set()
let MONOREPO_PKG_NAMES = new Set()
const MONOREPO_PKG_DEPENDENCIES = new Map()
const MONOREPO_PKG_ABSPATHS_BY_PKG_NAME = {}
MONOREPO_PKG_ABSPATHS.forEach(monorepo_pkg_path => {
	const PKG_JSON = require(path.join(monorepo_pkg_path, 'package.json'))

	const PKG_NAME = PKG_JSON.name
	const split = PKG_NAME.split('/')
	if (split.length > 1) {
		MONOREPO_PKG_NAMESPACES.add(split[0])
	}
	MONOREPO_PKG_ABSPATHS_BY_PKG_NAME[PKG_NAME] = monorepo_pkg_path
	MONOREPO_PKG_NAMES.add(PKG_NAME)

	const { dependencies, devDependencies, peerDependencies, optionalDependencies } = PKG_JSON
	const all_dependencies = {
		...dependencies,
		...devDependencies,
		...peerDependencies,
		...optionalDependencies,
	}
	Object.keys(all_dependencies).forEach(dep_name => {
		const dep_version = all_dependencies[dep_name]

		if (!MONOREPO_PKG_DEPENDENCIES.has(dep_name)) {
			MONOREPO_PKG_DEPENDENCIES.set(dep_name, dep_version)
		}
		else {
			const existing_version = MONOREPO_PKG_DEPENDENCIES.get(dep_name)
			if (existing_version !== dep_version) {
				console.error(`⛔️ version conflict for "${dep_name}": "${dep_version}" vs. "${existing_version}"!`)
				throw new Error('⛔️ version conflict for "${dep_name}"!')
			}
		}
	})
})
// "sort" the set
MONOREPO_PKG_NAMES = new Set([...MONOREPO_PKG_NAMES].sort())

/*console.log('[DEBUG] environment data gathered so far:', {
	MONOREPO_ROOT,
	MONOREPO_WORKSPACE_RELPATHS,
	MONOREPO_SRCPKG_NAMESPACES: MONOREPO_PKG_NAMESPACES,
	MONOREPO_SRCPKG_NAMES: MONOREPO_PKG_NAMES,
	//MONOREPO_SRCPKG_ABSPATHS,
	MONOREPO_SRCPKG_ABSPATHS_BY_PKG_NAME: MONOREPO_PKG_ABSPATHS_BY_PKG_NAME,
})*/

/////////////////////

console.log(`🛠  🔷 found a monorepo with ${MONOREPO_PKG_NAMES.size} modules across ${MONOREPO_PKG_NAMESPACES.size} namespaces: ${[...MONOREPO_PKG_NAMESPACES.keys()].join(', ')}`)

/////////////////////
// 2. Checks

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

	Object.keys(all_root_dependencies).forEach(dep_name => {
		const dep_version = all_root_dependencies[dep_name]

		if (!MONOREPO_PKG_DEPENDENCIES.has(dep_name)) {
			if (dependencies[dep_name]) {
				// allowed, prod deps on the root package
				// = minimal modules needed for the scripts (clean, build) to work
			}
			else {
				console.warn(`⚠️ extraneous root DEV dependency "${dep_name}" in the root package.json! Will clean.`)
				delete candidate_root_package_json.dependencies[dep_name]
				delete candidate_root_package_json.devDependencies[dep_name]
				needs_update = true
			}
		}
		else {
			const existing_version = MONOREPO_PKG_DEPENDENCIES.get(dep_name)
			if (existing_version !== dep_version) {
				console.error(`⛔️ version conflict for "${dep_name}" at the root: "${dep_version}" vs. "${existing_version}"!`)
				throw new Error(`⛔️ root version conflict for "${dep_name}"!`)
			}
		}
	})

	for (const [dep_name, dep_version] of MONOREPO_PKG_DEPENDENCIES) {
		if (MONOREPO_PKG_NAMES.has(dep_name)) {
			// own pkg, should NOT be in the root pkg.json
			// (will be more exhaustively filtered in the next loop)
			continue
		}

		if (candidate_root_package_json.dependencies[dep_name])
			continue

		if (candidate_root_package_json.devDependencies[dep_name])
			continue

		candidate_root_package_json.devDependencies[dep_name] = dep_version
		needs_update = true
	}

	for (let pkg_name of MONOREPO_PKG_NAMES) {
		// own pkg, no need to be in the root pkg.json
		if (candidate_root_package_json.dependencies[pkg_name]) {
			delete candidate_root_package_json.dependencies[pkg_name]
			needs_update = true
		}
		if (candidate_root_package_json.devDependencies[pkg_name]) {
			delete candidate_root_package_json.devDependencies[pkg_name]
			needs_update = true
		}
	}

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

/////////////////////
// 3. major

if (MONOREPO_PKG_JSON.bolt) (function _hoist_local_packages_to_root_node_modules() {
	// yarn workspace does it, not bolt :(

	MONOREPO_PKG_NAMESPACES.forEach(ns => {
		const namespace_abspath = path.join(MONOREPO_ROOT, 'node_modules', ns)
		try {
			fs.mkdirSync(namespace_abspath)
			//console.log('created dir: ' + namespace_abspath)
		}
		catch (err) { if (err.code !== 'EEXIST') throw err }
	})

	let hoisted_count = 0
	Array.from(MONOREPO_PKG_NAMES).forEach(pkg_name => {
		const pkg_src_abspath = MONOREPO_PKG_ABSPATHS_BY_PKG_NAME[pkg_name]
		const link_path = path.join(MONOREPO_ROOT, 'node_modules', pkg_name)
		try {
			fs.symlinkSync(pkg_src_abspath, link_path)
			console.log('hoisted: ' + link_path + ' ← ' + pkg_src_abspath)
		}
		catch (err) { if (err.code !== 'EEXIST') throw err }
		hoisted_count++
	})
	if (hoisted_count)
		console.log(`🛠  🔶 hoisted ${hoisted_count} local packages to the monorepo's root ✔`)
})()

/////////////////////

/*

const WHITELIST = [ // TODO whitelist for what?
	'@offirmo/unit-test-toolbox',
].sort()

const stats = {
}

const MONOREPO_1ST_LEVEL_DEPS‿RELPATH = get_pkg_1st_level_dependencies_relpaths(MONOREPO_ROOT)
const CURRENT_PKG_1ST_LEVEL_DEPS‿RELPATH = get_pkg_1st_level_dependencies_relpaths(CURRENT_PKG_PATH)

//console.log(JSON.stringify(MONOREPO_1ST_LEVEL_DEPS‿RELPATH))
/*
const PARENT_DEPS_RELPATH = CURRENT_PKG_JSON.name === MONOREPO_PKG_JSON.name
	? MONOREPO_1ST_LEVEL_DEPS‿RELPATH
	: CURRENT_PKG_1ST_LEVEL_DEPS‿RELPATH
*/
/*
MONOREPO_1ST_LEVEL_DEPS‿RELPATH.forEach(relpath1 => {
	//console.log('reviewing deps of ' + relpath1 + '…')

	const module1_abspath = path.join(MONOREPO_ROOT, 'node_modules', relpath1)
	const second_level_deps‿relpath = get_pkg_1st_level_dependencies_relpaths(module1_abspath)

	const redundant_dependencies‿relpaths = second_level_deps‿relpath.filter(relpath2 => {

		if (!MONOREPO_1ST_LEVEL_DEPS‿RELPATH.includes(relpath2)) return false // obviously

		// NON nodejs
		// CSS
		if (relpath2.endsWith('.css') || relpath2.endsWith('-css')) return false
		// HTML
		if (relpath2.includes('iframe--')) return false

		// Special cases, ex. test tools
		if (relpath2 === '.bin' || relpath2 === '.cache') return false
		if (WHITELIST.includes(relpath2)) return false

		// now we have a candidate...
		// is it the same version?
		const is_same_version = (() => {
			//console.log('  HERE', relpath1, relpath2, MONOREPO_SRCPKG_NAMES.has(relpath2))
			if (MONOREPO_SRCPKG_NAMES.has(relpath1)) return true // obviously

			// TODO
			if ([ 'bn.js', 'readable-stream'].includes(relpath2)) return true
			// we assume false for now
			return false
		})()

		//if (!is_same_version) console.log('  TODO compare version of ' + relpath2)

		return is_same_version
	})

	/*console.log({
		module1_abspath,
		second_level_deps‿relpath,
		redundant_dependencies‿relpaths,
	})*/
/*
	redundant_dependencies‿relpaths.forEach(relpath => {
		const abspath = path.join(module1_abspath, 'node_modules', relpath)
		if (MONOREPO_SRCPKG_NAMES.has(relpath1)) {
			fs.unlinkSync(abspath)
			console.log('From ' + module1_abspath + ', Unlinked ' + abspath)
		} else {
			// TODO true rm
			console.log('TODO From ' + module1_abspath + ', delete ' + abspath)
		}
		stats.cleaned_redundant_deps++
	})
})

cd(MONOREPO_ROOT)
await Promise.all([
	// TODO should be automated
	$`rm -fr node_modules/browserify-rsa/node_modules/bn.js`,
	$`rm -fr node_modules/browserify-sign/node_modules/bn.js`,
	$`rm -fr node_modules/browserify-sign/node_modules/readable-stream`,
])

console.log(stats)
*/
console.log(`🛠  🔺 tweaked the monorepo ✔`)
