import { LIB, INTERNAL_PROP } from './consts.ts'
import { type SoftExecutionContext } from './types.ts'
import { ROOT_PROTOTYPE } from './root-prototype.ts'
import * as State from './state.ts'
import { PLUGINS } from './plugins/index.ts'
import { decorateWithDetectedEnv } from './common.ts'

/////////////////////////////////////////////////

ROOT_PROTOTYPE.createChild = function createChild(args: any) {
	return _createSXC({
		...args,
		parent: this,
	})
}

PLUGINS.forEach(PLUGIN => {
	PLUGIN.augment(ROOT_PROTOTYPE)
})

/////////////////////////////////////////////////

function isSXC(SXC: any): SXC is SoftExecutionContext {
	return (SXC && SXC[INTERNAL_PROP])
}

// this function should normally NOT be called directly
// use getRootSXC() or make a getLibSXC()
function _createSXC<Injections, AnalyticsDetails, ErrorDetails>(args: any = {}): SoftExecutionContext<Injections, AnalyticsDetails, ErrorDetails> {
	/////// PARAMS ///////

	if (args.parent && !isSXC(args.parent))
		throw new Error(`${LIB}›createSXC() argument error: parent must be a valid SXC!`)

	let unhandled_args = Object.keys(args)

	const SXC = Object.create(ROOT_PROTOTYPE)

	/////// STATE ///////
	const parent_state = args.parent ? args.parent[INTERNAL_PROP] : undefined
	let state = State.create(parent_state)
	unhandled_args = unhandled_args.filter(arg => arg !== 'parent')

	PLUGINS.forEach(PLUGIN => {
		state = State.activate_plugin(state, PLUGIN)
	})

	SXC[INTERNAL_PROP] = state

	// auto injections
	if (!args.parent) {
		SXC.injectDependencies({
			logger: console, // use universal debug API? NO because the placeholder = NOOP = would cause no logs visible by default
		})

		decorateWithDetectedEnv(SXC)
	}
	SXC.injectDependencies({ SXC })

	//console.log('createSXC', SXC, args.parent)

	// Here we could send an event on the SXC bus. No usage for now.
	// Here we could have lifecycle methods. No usage for now.

	if (unhandled_args.length)
		throw new Error(`${LIB}›createSXC() argument error: unknown args: [${unhandled_args.join(',')}]!`)

	/////////////////////

	return SXC
}

/////////////////////////////////////////////////

export {
	isSXC,
	_createSXC,
}
