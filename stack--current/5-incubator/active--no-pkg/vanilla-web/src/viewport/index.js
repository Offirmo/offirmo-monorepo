
console.log('Hi from js')

import dumpMediaQueries from './data-sources/media-queries/index.js'
import dumpNavigator from './data-sources/navigator/index.js'
import dumpScreen from './data-sources/screen/index.js'
import dumpVisualViewPort from './data-sources/visual-viewport/index.js'
import dumpWindow from './data-sources/window/index.js'

/////////////////////////////////////////////////

/////////////////////////////////////////////////

//const DEBUG = true


/////////////////////////////////////////////////

/////////////////////////////////////////////////

/////////////////////////////////////////////////

/////////////////////////////////////////////////

/////////////////////////////////////////////////

window.addEventListener("resize", (event) => {
	console.log('⚡️resize', event)
});


window.addEventListener('load', (event) => {
	console.log('⚡️load')

	dumpWindow()
	dumpNavigator()
	dumpMediaQueries()
	dumpScreen()
	dumpVisualViewPort()

	// TODO layout viewport https://developer.mozilla.org/en-US/docs/Glossary/Layout_viewport
	// TODO get root element
})
