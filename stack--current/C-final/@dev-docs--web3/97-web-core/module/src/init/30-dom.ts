/* because we use "web property generator" at the end,
 * we can't rely on the HTML/body to have a pre-made structure
 * => we ensure that ourselves
 */
async function init(): Promise<void> {
	document.documentElement.setAttribute('lang', 'en')

	let root‿elt = document.getElementById('react-root')
	if (!root‿elt) {
		root‿elt = document.createElement('div')
		root‿elt.id = 'react-root'
		document.body.appendChild(root‿elt)
	}

	root‿elt.classList.add('o⋄full-viewport')
}

/////////////////////////////////////////////////

export default init
