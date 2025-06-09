
document.addEventListener('click', event => {
	console.group(`👆 click!`)
	console.log({ event, location: window.location })

	try {
		const { target: clicked‿elt } = event
		if (!clicked‿elt) {
			console.log(`no element clicked??`)
		}
		else {
			console.log(`clicked element =`, { clicked‿elt })

			const href = clicked‿elt.href
			if (href) {
				event.preventDefault()
				console.log(`———————————— NAVIGATION ? ————————————`)
				const target‿url = new URL(href, window.location.origin)
				const is_same_origin = target‿url.origin ===  window.location.origin
				console.log({ target‿url, is_same_origin })

				const fragment = document.createDocumentFragment()

				fragment.appendChild(document.createComment('Created by LIB'))
				const dialog‿elt = document.createElement('dialog')
				dialog‿elt.innerHTML = 'Hello from dialog'
				fragment.appendChild(dialog‿elt)

				document.body.append(fragment)

				dialog‿elt.showModal()
			}
		}
	} catch (err) {
		console.error(`on click:`, {err})
	}

	console.groupEnd()
})

document.addEventListener('auxclick', event => {

	console.group(`👆 auxclick!`)
	console.log({ event, location: window.location })

	try {
		const { target: clicked‿elt } = event
		if (!clicked‿elt) {
			console.log(`no element clicked??`)
		}
		else {
			console.log(`clicked element =`, { clicked‿elt })

			const href = clicked‿elt.href
			if (href) {
				event.preventDefault()
				console.log(`———————————— NAVIGATION ? ————————————`)
				const target‿url = new URL(href, window.location.origin)
				const is_same_origin = target‿url.origin ===  window.location.origin
				console.log({ target‿url, is_same_origin })
			}
		}
	} catch (err) {
		console.error(`on click:`, {err})
	}

	/*
	if (event.button === 1) { // 1 represents the middle mouse button
		event.preventDefault(); // Prevent the default browser action (e.g., opening in a new tab)
		console.log("Middle click intercepted!");
		// Your custom logic here
	}*/

	console.groupEnd()
});

document.addEventListener('contextmenu', event => {

	console.group(`👆 contextmenu!`)
	console.log({ event, location: window.location })


	console.groupEnd()
});


document.addEventListener('dblclick', event => {

	console.group(`👆 dblclick!`)
	console.log({ event, location: window.location })


	console.groupEnd()
});
