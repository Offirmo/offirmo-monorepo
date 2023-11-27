import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import logger from '../logger'

/////////////////////////////////////////////////

//import { decorate_SEC } from '@tbrpg/definitions'
import logger from '../logger.ts'

async function init(): Promise<void> {


	if (false) {
		setTimeout(() => {
			console.group('Testing log levels...')
			;[
				'fatal',
				'emerg',
				'alert',
				'crit',
				'error',
				'warning',
				'warn',
				'notice',
				'info',
				'verbose',
				'log',
				'debug',
				'trace',
				'silly',
			].forEach(level => {
				//console.log(`logger demo with level "${level}":`)
				logger[level](`logger demo with level "${level}"`, {level})
			})
			console.groupEnd()
		}, 1000)
	}


	/*

	import { set_xoff_flag } from '@offirmo-private/xoff'
	import { overrideHook } from '@offirmo/universal-debug-api-browser'
	import get_loader from '@offirmo-private/iframe--loading'

	import { inject_text_encoder } from '@tbrpg/flux'

	import init_analytics from './services/analytics'
	import init_analytics_ga4 from './services/analytics-ga4'
	import init_cordova from './services/cordova'
	import init_SEC from './services/sec'
	import init_netlify from './services/user_account'
	import Root from './components/root'

	import './index-2.css'
	import '@oh-my-rpg/assets--cursors/src/style.css'

	init_SEC()

	get_loader().configure({
		bg_color: 'rgb(84, 61, 70)',
		fg_color: 'rgb(255, 235, 188)',
		legend: 'The Boring RPG, reborn',
		bg_picture: [
			window.getComputedStyle(document.querySelector('html')).backgroundImage,
			'38%', '99%',
		],
	})

	inject_text_encoder(TextEncoder)
	init_cordova()
	init_analytics()
	init_analytics_ga4()
	init_netlify()

	set_xoff_flag('debug_render', overrideHook('should_trace_renders', false))
	set_xoff_flag('is_paused', overrideHook('should_start_paused', false))
	if (overrideHook('should_start_paused', false)) {
		console.warn('🛠 GAME STARTING IN PAUSE MODE')
	}




//import { VERSION as ENGINE_VERSION, BUILD_DATE } from '@tbrpg/flux'
//logger.verbose(`Hello from "${LIB}" v${ENGINE_VERSION} from ${BUILD_DATE}! Logger up with level = "${logger.getLevel()}" ✔`)


	*/

}

/////////////////////////////////////////////////

export default init
