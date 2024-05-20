/* This file inits some advanced global libs from Offirmo
 * This won't have any impact if you don't use them.
 *
 * The env var OFFIRMO_GLOBAL_DEBUG_ENV_EXPECTED will trigger error message if the setup fails.
 */

const terminal_escapeꘌfgⵧred = '\u001b[31m'
const terminal_escapeꘌreset  = '\u001b[39m'

///////
let lib_udaⵧnode

// this global debug lib should be loaded as early as possible
lib_udaⵧnode = await import('@offirmo/universal-debug-api-node')
	.catch(err => {
		if (process.env['OFFIRMO_GLOBAL_DEBUG_ENV_EXPECTED']) {
			console.warn(`${terminal_escapeꘌfgⵧred}([from @offirmo/unit-test-toolbox] @offirmo/universal-debug-api-node install skipped, require() failure)${terminal_escapeꘌreset}`, err)
		}
		return null
	})

try {
	let lib_secⵧnode = await
		import('@offirmo-private/soft-execution-context--node')
			.catch(err => import('../../../3-advanced--multi/soft-execution-context--node/src/index.mjs'))
			.catch(err => {
				if (process.env['OFFIRMO_GLOBAL_DEBUG_ENV_EXPECTED']) {
					throw new Error('[from @offirmo/unit-test-toolbox] Local Offirmo monorepo import should always work!')
				}
				return null
			})

	lib_udaⵧnode = lib_udaⵧnode || await import('../../../3-advanced--multi/universal-debug-api-node/dist/src.es2022.esm/index.js')

	const {
		listenToUncaughtErrors,
		listenToUnhandledRejections,
		decorateWithDetectedEnv,
		getRootSXC,
	} = lib_secⵧnode

	listenToUncaughtErrors()
	listenToUnhandledRejections()
	decorateWithDetectedEnv()

	const { getLogger } = lib_udaⵧnode
	getRootSXC().injectDependencies({ logger: getLogger({ name: 'UTT', suggestedLevel: 'silly' }) })
}
catch (err) {
	// monorepo case where this module is not available / broken / not built yet
	if (process.env['OFFIRMO_GLOBAL_DEBUG_ENV_EXPECTED']) {
		console.warn(`${terminal_escapeꘌfgⵧred}([from @offirmo/unit-test-toolbox] @offirmo-private/soft-execution-context--node init skipped, require() failure)${terminal_escapeꘌreset}`, err)
	}
}
