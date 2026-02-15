async function init(): Promise<void> {
	// for stability
	document.documentElement.setAttribute('lang', 'en')

	if (!document.getElementById('react-root')) {
		const elt = document.createElement('div')
		elt.id = 'react-root'
		document.body.appendChild(elt)
	}
}

/////////////////////////////////////////////////

export default init
