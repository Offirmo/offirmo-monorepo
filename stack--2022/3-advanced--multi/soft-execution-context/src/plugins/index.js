import { PLUGIN as PLUGIN_LOGICAL_STACK } from './logical-stack/index.js'
import { PLUGIN as PLUGIN_DI } from './dependency-injection/index.js'
import { PLUGIN as PLUGIN_ERROR_HANDLING } from './error-handling/index.js'
import { PLUGIN as PLUGIN_ANALYTICS } from './analytics/index.js'


const PLUGINS_BY_ID = {
	[PLUGIN_ANALYTICS]: PLUGIN_ANALYTICS,
	[PLUGIN_LOGICAL_STACK.id]: PLUGIN_LOGICAL_STACK,
	[PLUGIN_DI.id]: PLUGIN_DI,
	[PLUGIN_ERROR_HANDLING.id]: PLUGIN_ERROR_HANDLING,
}

const PLUGINS = Object.values(PLUGINS_BY_ID)

export {
	PLUGINS_BY_ID,
	PLUGINS,
}
