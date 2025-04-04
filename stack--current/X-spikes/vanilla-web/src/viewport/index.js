
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

	// TODO layout viewport?
	// https://developer.mozilla.org/en-US/docs/Glossary/Layout_viewport
	// through root element?

	console.group('Multi screens')
		console.group('Screen:', getBoundingRect‿str(getBoundingRectꓽScreen()))
			console.group('Available screen:', getBoundingRect‿str(getBoundingRectꓽScreenⵧavailable(), getBoundingRectꓽScreen()))
				console.group('Browser window')
					console.log('Browser window:', 'todo')
	// TODO frames
					console.group('Visual viewport (dynamic)')
						console.log('Visual viewport (dynamic):', 'todo')
					console.groupEnd()
				console.groupEnd()
			console.groupEnd()
		console.groupEnd()
	console.groupEnd()
})

function getBoundingRectꓽScreen(s = globalThis.top.screen) {
	return {
		w: s.width,
		h: s.height,
	}
}
function getBoundingRectꓽScreenⵧavailable(s = globalThis.top.screen) {
	return {
		w: s.availWidth,
		h: s.availHeight,
	}
}

function hasꓽdimensions(rect) {
	return rect && (Object.hasOwn(rect, 'w') || Object.hasOwn(rect,'h'))
}

function getBoundingRect‿str(rect, parentRect) {
	let result = ''

	if (hasꓽdimensions(rect)) {
		result += `${rect.w}×${rect.h}`

		if (hasꓽdimensions(parentRect)) {
			const surfaceⵧparent = parentRect.w * parentRect.h
			const surface = rect.w * rect.h
			const ratio = surface / surfaceⵧparent
			result += `[${Math.round(ratio * 100)}%]`
		}
	}

	if (rect && (Object.hasOwn(rect, 'x') || Object.hasOwn(rect, 'y'))) {
		result += `(${rect.x},${rect.y})`
	}



	return result
}
