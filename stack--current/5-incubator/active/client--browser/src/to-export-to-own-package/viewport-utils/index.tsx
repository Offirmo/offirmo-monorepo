/* PROMPT
 */
import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'
import Deferred from '@offirmo/deferred'

/////////////////////////////////////////////////
// page loaded
// some viewport stuff is not fully resolved until page loaded

// XXX TODO review semantic
// XXX TODO review DOMContentLoaded vs load
const ೱᐧpage_loaded = new Deferred<void>()

if (document.readyState === "complete") {
	// page is already loaded
	ೱᐧpage_loaded.resolve()
}
else {
	window.addEventListener('DOMContentLoaded', (event) => {
		//console.log("ೱpage_loaded page load event", event);
		ೱᐧpage_loaded.resolve()
	});
}
ೱᐧpage_loaded.then(() => console.log("ೱpage_loaded resolved"))

/////////////////////////////////////////////////


/////////////////////////////////////////////////

export {
	ೱᐧpage_loaded,
}
