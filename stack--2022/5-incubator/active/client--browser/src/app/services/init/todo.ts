import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

/////////////////////////////////////////////////

async function init(): Promise<void> {
	console.log('Hello from init! (TODO)')



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
	*/

}

/////////////////////////////////////////////////

export default init
