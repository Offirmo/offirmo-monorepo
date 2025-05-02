
/*
function getꓽpkg_1st_level_dependencies_relpaths(pkg_abs_path) {
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

const WHITELIST = [ // TODO whitelist for what?
	'@offirmo/unit-test-toolbox',
].sort()

const stats = {
}

const MONOREPO_1ST_LEVEL_DEPS‿RELPATH = getꓽpkg_1st_level_dependencies_relpaths(MONOREPO_ROOT)
const CURRENT_PKG_1ST_LEVEL_DEPS‿RELPATH = getꓽpkg_1st_level_dependencies_relpaths(CURRENT_PKG_PATH)

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
	const second_level_deps‿relpath = getꓽpkg_1st_level_dependencies_relpaths(module1_abspath)

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
console.log(`🔧  🔺 tweaked the monorepo ✔`)

/////////////////////
