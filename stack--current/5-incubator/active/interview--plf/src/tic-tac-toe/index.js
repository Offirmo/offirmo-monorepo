console.log('Hi from js')

/////////////////////////////////////////////////

let state = {}

const REDUCERS = {
	create({ width, height }) {
		return {
			err: null,
			width,
			height,
			player: 'X',
			moves: [
				[1, 1, 'X'],
				[0, 1, 'O'],
				[2, 2, 'X'],
				[0, 2, 'O'],
			],
			//cells_to_c: new Map(),
			//board: new Array(height),
		}
	},
	add_move(state, { x, y }) {
		const move = [ x, y, state.player ]
		state = {
			...state,
			moves: [
				...state.moves,
				move,
			],
			player: state.player === 'X' ? 'O' : 'X',
		}

		// is it a winning move?
		const current_player_moves = state.moves.filter(m => m[2] === move[2])

	}
}

const SELECTORS = {
	has_winner(state) {
		return false
	}
}

/////////////////////////////////////////////////

function render() {
	const legend_elt = document.querySelector('.tic-tac-toe > p')
	switch (true) {
		case state.err:
			legend_elt.innerText = `[ERROR] ` + String(state.err.message)
			break
		case SELECTORS.has_winner(state):
			legend_elt.innerText = `Player ${state.moves.at(-1)[2]} wins!`
			break
		default:
			legend_elt.innerText = `your turn: ` + state.player
			break
	}

	for (let move of state.moves) {
		const [ x, y, player ] = move
		const selector = `.cell[data-x="${x}"][data-y="${y}"]`
		console.log(selector)
		const cell = document.querySelector(selector)
		console.log(cell)
		cell.innerText = player
		cell.dataset['owner'] = player
	}
}

/////////////////////////////////////////////////

document.addEventListener('click', event => {
	console.log('click', { event })

	const { target } = event
	if (!target) return

	const x = Number(target.dataset['x'])
	if (isNaN(x)) return
	const y = Number(target.dataset['y'])
	if (isNaN(y)) return

	if (target.dataset['owner']) return
	console.log({x, y})

	//target.innerText = target.dataset['owner'] = state.player
	state = REDUCERS.add_move(state, { x, y})

	render()
})

/////////////////////////////////////////////////

window.addEventListener('load', () => {
	console.log('load')

	const board_elt = document.querySelector('.tic-tac-toe > .board')
	if (!board_elt) throw new Error('Unexpected!')

	const board_styles = getComputedStyle(board_elt)
	const width = Number(board_styles.getPropertyValue('--width'))
	const height = Number(board_styles.getPropertyValue('--height'))

	state = REDUCERS.create({width, height})

	const cells = []
	for (let y = 0; y < height; ++y ) {
		for (let x = 0; x < width; ++x ) {
			const cell_elt = document.createElement('div')
			cell_elt.classList.add('cell')
			cell_elt.dataset['x'] = x
			cell_elt.dataset['y'] = y
			cell_elt.innerText = ''

			cells.push(cell_elt)
		}
	}

	board_elt.replaceChildren(...cells)

	render()
})
