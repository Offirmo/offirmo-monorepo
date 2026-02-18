import { once } from 'limit-once'

/////////////////////////////////////////////////

const init = once(async function loadꓽcss(): Promise<void> {
	console.log('loading css...')

	import('@offirmo-private/css--framework') //NO already imported through entry point (bc critical for some vars)
	//import('@offirmo-private/css--utils--diagnostics')

	//window.document.documentElement.dataset['oTheme'] = 'dark--colorhunt212'
	//import('@offirmo-private/css--framework/src/themes/theme--dark--colorhunt212.css')

	//window.document.documentElement.classList.add('omr⋄cursorꘌsword--standard')
	//import('@oh-my-rpg/assets--cursors/src/sword--standard/index.ts')

	//window.document.documentElement.classList.add('omr⋄font⁚rpg--pixel')
	//import('@oh-my-rpg/font--rpg--pixel')
})

/////////////////////////////////////////////////

export default init
