
console.log('Hi from js')

import data from './assets/data.js'

/////////////////////////////////////////////////

//const DEBUG = true

function getTagName(node) {
	const { type, attrs } = node

	switch (type) {
		case 'heading': {
			return `h` + (attrs?.level || 1)
		}

		case 'unordered-list':
			return 'ul'

		case 'list-item':
			return 'li'

		case 'image':
			return 'img'

		default:
			// TODO throw / report
			return 'p'
	}
}
/////////////////////////////////////////////////

function createElementsFromNodeArray(nodes) {
	const result = []

	nodes.forEach((node, i) => {
		result.push(createElementFromNode(node))
	})

	return result
}

function createElementFromNode(node) {
	const { type = 'p', children = [], value, attrs } = node

	if (type === 'text') {
		return new Text(value)
	}

	const elt = document.createElement(getTagName(node))

	if (type === 'image') {
		elt.src = attrs.src
		elt.style.width = attrs.width + 'px'
		elt.style.height = attrs.height + 'px'
		elt.style.display = 'block'
		elt.alt = attrs.alt || ''
	}

	// TODO handle if no children
	elt.replaceChildren(
		...createElementsFromNodeArray(children),
	)

	return elt
}

function createElementFromBlob({blob, designTokens}) {
	const elt = document.createElement('div')

	elt.replaceChildren(
		...createElementsFromNodeArray(blob),
	)

	elt.style.setProperty('--color-fg', designTokens.fg)
	elt.style.setProperty('--color-bg', designTokens.bg)
	elt.dataset['theme'] = 'custom'

	return elt
}

/////////////////////////////////////////////////

function render({ theme = 'light', designTokens } = {}) {

	designTokens ??= (() => {
		switch (theme) {
			default:
				return { fg: 'black', bg: 'white'}
		}
	})()

	document.body.replaceChildren(
		createElementFromBlob({blob: data, designTokens}),
		//createElementFromBlob({blob: data, designTokens}),
	)
}

/////////////////////////////////////////////////

/////////////////////////////////////////////////

function getPreferredColorScheme() {
	if (window.matchMedia) {
		//console.log('mq', window.matchMedia('(prefers-color-scheme: dark)'))
		if(window.matchMedia('(prefers-color-scheme: dark)').matches)
			return 'dark'
	}
	return 'light'
}

/////////////////////////////////////////////////

window.addEventListener("load", (event) => {
	console.log('load')

	render({
		designTokens: {
			fg: 'red',
			bg: 'yellow',
		}
	})
})
