/* PROMPT
 */

import { type State } from './types'

/////////////////////////////////////////////////
/*
console.log('installing popstate listener')
addEventListener("popstate", (event) => {
	console.log('Seen popstate!', event)
});*/

// TODO rewrite
function isꓽiframe(window: Window): boolean {
	return window.location !== window.parent.location
}

/////////////////////////////////////////////////

export {
	isꓽiframe,
}
