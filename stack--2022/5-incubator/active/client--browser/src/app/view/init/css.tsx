
/////////////////////////////////////////////////

async function init(): Promise<void> {
	import('@offirmo-private/css--framework')
	import('@offirmo-private/css--utils')

	window.document.documentElement.dataset['oTheme'] = 'dark--colorhunt212'
	import('@offirmo-private/css--framework/src/themes/theme--dark--colorhunt212.css')

	window.document.documentElement.classList.add('omr⋄cursorꘌsword--standard')
	import('@oh-my-rpg/assets--cursors/src/style.css')

	window.document.documentElement.classList.add('omr⋄font⁚rpg--pixel')
	import('@oh-my-rpg/font--rpg--pixel')
}

/////////////////////////////////////////////////

export default init