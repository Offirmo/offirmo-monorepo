// https://developer.mozilla.org/en-US/docs/Web/API/Window

/////////////////////////////////////////////////

function dump(w = globalThis.top) {
	console.group(`Window`)

	console.log(`window =`, w, { top: w === w.top})

	// outer = outside of the browser window
	const outerHeight = w.outerHeight
	const outerWidth = w.outerWidth
	console.log('outer', {
		width: outerWidth,
		height: outerHeight,
	})

	// https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight
	// includes the scroll bar if present
	const innerHeight = w.innerHeight
	const innerWidth = w.innerWidth
	console.log('inner', {
		width: innerWidth,
		height: innerHeight,
	})

	// https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
	// classic = 96
	console.log('devicePixelRatio', w.devicePixelRatio)
	// see also pixel density

	// TODO https://developer.mozilla.org/en-US/docs/Web/API/Window_Management_API

	// todo Window.getScreenDetails()

	// TODO https://developer.mozilla.org/en-US/docs/Web/API/Window_Controls_Overlay_API
	// but only Edge

	console.groupEnd()
}

/////////////////////////////////////////////////

export default dump

/*


Window.mozInnerScreenX Read only Non-standard
Returns the horizontal (X) coordinate of the top-left corner of the window's viewport, in screen coordinates. This value is reported in CSS pixels. See mozScreenPixelsPerCSSPixel in nsIDOMWindowUtils for a conversion factor to adapt to screen pixels if needed.

Window.mozInnerScreenY Read only Non-standard

Window.pageXOffset Read only
An alias for window.scrollX.

Window.pageYOffset Read only
An alias for window.scrollY.



Window.screenX and Window.screenLeft Read only
Both properties return the horizontal distance from the left border of the user's browser viewport to the left side of the screen.

Window.screenY and Window.screenTop Read only
Both properties return the vertical distance from the top border of the user's browser viewport to the top side of the screen.

Window.scrollMaxX Non-standard Read only
The maximum offset that the window can be scrolled to horizontally, that is the document width minus the viewport width.

Window.scrollMaxY Non-standard Read only
The maximum offset that the window can be scrolled to vertically (i.e., the document height minus the viewport height).

Window.scrollX Read only
Returns the number of pixels that the document has already been scrolled horizontally.

Window.scrollY Read only
Returns the number of pixels that the document has already been scrolled vertically.

Window.getDefaultComputedStyle() Non-standard
Gets default computed style for the specified element, ignoring author stylesheets.

 Experimental Secure context
Returns a Promise that fulfills with a ScreenDetails object instance representing the details of all the screens available to the user's device.


 */
