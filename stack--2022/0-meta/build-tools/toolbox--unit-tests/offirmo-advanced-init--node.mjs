/* This file inits some advanced global libs from Offirmo
 * This won't have any impact if you don't use them.
 *
 * The env var OFFIRMO_GLOBAL_DEBUG_ENV_EXPECTED will trigger error message if the setup fails.
 */

const ansi_fgⵧred = '\u001b[31m'
const ansi_reset = '\u001b[39m'

///////
let lib_udaⵧnode

	// this global debug lib should be loaded as early as possible
lib_udaⵧnode = await import('@offirmo/universal-debug-api-node')
		.catch(err => {
			if (process.env['OFFIRMO_GLOBAL_DEBUG_ENV_EXPECTED'])
				console.warn(`${ansi_fgⵧred}(@offirmo/universal-debug-api-node install skipped, require() failure)${ansi_reset}`, err)
		})

try {
	let lib_secⵧnode = await
		import('@offirmo-private/soft-execution-context-node')
			.catch(err => import('../../../3-advanced--multi/soft-execution-context-node/src/index.mjs'))

	lib_udaⵧnode = lib_udaⵧnode || await import('../../../3-advanced--multi/universal-debug-api-node/dist/src.es2022.esm/index.js')

	const {
		listenToUncaughtErrors,
		listenToUnhandledRejections,
		decorateWithDetectedEnv,
		getRootSEC,
	} = lib_secⵧnode

	listenToUncaughtErrors()
	listenToUnhandledRejections()
	decorateWithDetectedEnv()

	const { getLogger } = lib_udaⵧnode
	getRootSEC().injectDependencies({ logger: getLogger({ name: 'UTT', suggestedLevel: 'silly' }) })
} catch (err) {
	// monorepo case where this module is not available / broken / not built yet
	if (process.env['OFFIRMO_GLOBAL_DEBUG_ENV_EXPECTED'])
		console.warn(`${ansi_fgⵧred}(@offirmo-private/soft-execution-context-node init skipped, require() failure)${ansi_reset}`, err)
}
