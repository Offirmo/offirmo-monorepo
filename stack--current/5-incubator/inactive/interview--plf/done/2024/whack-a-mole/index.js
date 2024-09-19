console.log('Hi from js')

/////////////////////////////////////////////////

const DEBUG = true

/////////////////////////////////////////////////

function random(max) {
	return Math.floor(Math.random() * (max + 1));
}

/////////////////////////////////////////////////

const REDUCERS = {
	create({width = 500, height = 500} = {}) {
		return {
			width,
			height,
			err: null,
			targets: [
				//[ width/2, height/2, Number(new Date()), 'alive']
			],
			hits: [],
			score: 0,
		}
	},
	miss(state, {x, y}) {
		DEBUG && console.log(`.miss()`, { x, y })
		return {
			...state,
			hits: [ ...state.hits, [x, y]],
		}
	},
	hit(state, { id, now = Number(new Date())}) {
		DEBUG && console.log(`.hit()`, { id })
		let age = Number.POSITIVE_INFINITY
		return {
			...state,
			targets: state.targets.reduce((targets, target, i) => {
				if (i === id) {
					target = [...target]
					target[3] = 'dead'
					age = now - target[2]
				}
				targets.push(target)
				return targets
			}, []),
			score: state.score + Math.max(0, 3000 - age),
		}
	},
	updateToNow(state, {now = Number(new Date())}) {

		let alive_count = 0
		state.targets.filter(target => target[3] === 'alive').forEach(target => {
			const age = now - target[2]
			// TODO die if target too old
			alive_count++
		})

		const targets = [ ...state.targets]
		if (alive_count === 0) {
			targets.push(
				[
					random(state.width),
					random(state.height),
					now,
					'alive',
				]
			)
		}

		state = {
			...state,
			targets,
		}

		return state
	}
}

let state = undefined


/////////////////////////////////////////////////

const _cache = {
	target_elts: {},
	miss_elts: {},
}

function render() {
	console.log('render', structuredClone(state))
	const area_elt = document.querySelector('.game > .area')
	const now = Number(new Date())

	const children = []
	let cache_miss = false

	state.hits.forEach((miss, id) => {
		const [ left, top ] = miss

		_cache.miss_elts[id] ||= (() => {
			cache_miss = true
			const elt = document.createElement('div')
			elt.classList.add('miss')
			elt.style.left = left + 'px'
			elt.style.top = top + 'px'
			return elt
		})()

		const elt = _cache.miss_elts[id]

		children.push(elt)
	})

	state.targets.forEach((target, id) => {
		const [ left, top, creationDate_UTC_ms, status ] = target
		const age_ms = now - creationDate_UTC_ms

		_cache.target_elts[id] ||= (() => {
			cache_miss = true
			const elt = document.createElement('div')
			elt.classList.add('target')
			elt.style.left = left + 'px'
			elt.style.top = top + 'px'
			elt.dataset['id'] = id
			return elt
		})()
		const elt = _cache.target_elts[id]
		elt.dataset['status'] = status
		elt.style.setProperty('--diameter', status === 'alive' ? String(age_ms / 1000. * 100) + 'px' : '30px')

		children.push(elt)
	})

	if (cache_miss)
		area_elt.replaceChildren(...children)

	const p_elt = document.querySelector('.game > p')
	if (p_elt) {
		p_elt.innerText = `Score: ${state.score} points`
	}
}

let renderPending = false
function scheduleRender() {
	if (renderPending) return

	setTimeout(() => {
		renderPending = false
		render()
	})
	renderPending = true
}
const MAX_RAF_ITERATIONS = 300 //1000 // debug
let animationFramesCount = 0
let actualAnimationFramesCount = 0
let first_elapsedFromOrigin_ms = 0
let last_elapsedFromOrigin_ms = 0
function onAnimationFrame(elapsedFromOrigin_ms) {
	animationFramesCount++
	//console.log('oaf')

	if (first_elapsedFromOrigin_ms === 0) {
		first_elapsedFromOrigin_ms = elapsedFromOrigin_ms
	}

	if (elapsedFromOrigin_ms === last_elapsedFromOrigin_ms) {
		console.error(`duplicate RAF???`, { elapsedFromOrigin_ms }) // should never happen
		return
	}
	last_elapsedFromOrigin_ms = elapsedFromOrigin_ms

	if (animationFramesCount % 2 === 0) {
		actualAnimationFramesCount++
		state = REDUCERS.updateToNow(state, {})
		scheduleRender()
	}

	if (MAX_RAF_ITERATIONS && animationFramesCount >= MAX_RAF_ITERATIONS) {
		const total_elapsed_ms = elapsedFromOrigin_ms - first_elapsedFromOrigin_ms
		if (animationFramesCount === MAX_RAF_ITERATIONS) {
			// It's OBVIOUSLY debug
			console.warn(`stopping requestAnimationFrame for safety`, {
				first_elapsedFromOrigin_ms,
				elapsedFromOrigin_ms,
				total_elapsed_ms,
			})
			console.log(`overall RAF fps =`, actualAnimationFramesCount * 1000 / total_elapsed_ms)
			return
		}
	}

	// re-arm
	window.requestAnimationFrame(onAnimationFrame)
}

/////////////////////////////////////////////////

window.addEventListener('click', event => {
	console.log('click', event)

	const { target } = event
	if (!target) return

	const area_elt = document.querySelector('.game > .area')
	if (!area_elt) return

	if (target === area_elt) {
		const x = event.offsetX
		const y = event.offsetY

		state = REDUCERS.miss(state, {x, y})
	}
	else if (target.classList.contains('target')) {
		if (target.dataset['status'] === 'alive') {
			state = REDUCERS.hit(state, { id: Number(target.dataset['id'])})
		}
	}

	scheduleRender()
})

/////////////////////////////////////////////////

window.addEventListener('load', () => {
	console.log('load')

	state = REDUCERS.create()
	scheduleRender()

	window.requestAnimationFrame(onAnimationFrame)
})
