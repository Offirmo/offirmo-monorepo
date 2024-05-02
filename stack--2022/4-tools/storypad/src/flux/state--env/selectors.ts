/* PROMPT
 */

/////////////////////////////////////////////////

console.log('installing popstate listener')
addEventListener("popstate", (event) => {
	console.log('Seen popstate!', event)
});

function isꓽiframe():boolean {
	return window.location !== window.parent.location
}

/////////////////////////////////////////////////

export {
	isꓽiframe,
}
