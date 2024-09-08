
console.log('Hi from js')

/////////////////////////////////////////////////

const DEBUG = true

/////////////////////////////////////////////////

const REDUCERS = {
	create({width = 500, height = 500} = {}) {
		return {
			width,
			height,
			hits: [],
		}
	},
	hit(state, {x, y}) {
		DEBUG && console.log(`.hit()`, { x, y })
		return {
			...state,
			hits: [ ...state.hits, [x, y]],
		}
	}
}

let state = {}

/////////////////////////////////////////////////

function render() {
	const area_elt = document.querySelector('.game > .area')

	const children = []
	state.hits.forEach(hit => {
		const [ left, top ] = hit
		const elt = document.createElement('div')
		elt.classList.add('hit')
		elt.style.left = left + 'px'
		elt.style.top = top + 'px'

		children.push(elt)
	})

	area_elt.replaceChildren(...children)
}

/////////////////////////////////////////////////

document.addEventListener('click', event => {
	console.log('click', event)

	const { target } = event
	if (!target) return

	const area_elt = document.querySelector('.game > .area')
	if (!area_elt) return
	if (target !== area_elt) return

	const x = event.offsetX
	const y = event.offsetY

	state = REDUCERS.hit(state, {x, y})
	render()
})

/////////////////////////////////////////////////

window.addEventListener('load', () => {
	console.log('load')

	state = REDUCERS.create()
	render()
})
