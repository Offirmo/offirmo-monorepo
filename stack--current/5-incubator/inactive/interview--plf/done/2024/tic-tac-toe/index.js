console.log('Hi from js')

/////////////////////////////////////////////////

const REQUIRED_ALIGNED_FOR_WIN = 3

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
			winning_streak: null,
		}
	},
	add_move(state, { x, y }) {
		const move = [ x, y, state.player, false ]
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
		if (current_player_moves.length >= REQUIRED_ALIGNED_FOR_WIN) {
			const diag_streak = [[x, y]]
			const horz_streak = [[x, y]]
			const vert_streak = [[x, y]]

			const board = current_player_moves.reduce((board, move) => {
				const [x, y] = move
				board[x] ||= []
				board[x][y] = true
				return board
			}, [])

			function is_owner(x, y) {
				if (x < 0 || y < 0) return false
				return board?.[x]?.[y] ?? false
			}

			for (let dx = -1; dx <= 1; ++dx) {
				for (let dy = -1; dy <= 1; ++dy) {
					if (dx === 0 && dy === 0) continue

					let distance = 0
					do {
						distance++
						const neighbour_coords = [ x + dx * distance, y + dy * distance ]
						if (!is_owner(...neighbour_coords))
							break

						if (dx === 0) {
							vert_streak.push(neighbour_coords)
						}
						else if(dy === 0) {
							horz_streak.push(neighbour_coords)
						}
						else {
							diag_streak.push(neighbour_coords)
						}
					} while (true)
				}
			}

			const winning_streak = [diag_streak, horz_streak, vert_streak].find(streak => streak.length >= REQUIRED_ALIGNED_FOR_WIN)
			if (winning_streak) {
				console.log('WINNER DETECTED!', winning_streak)
				state = {
					...state,
					winning_streak,
				}
			}
		}

		return state
	}
}

const SELECTORS = {
	has_winner(state) {
		return !!state.winning_streak
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

	if (state.winning_streak) {
		for (let coords of state.winning_streak) {
			const [ x, y ] = coords
			const selector = `.cell[data-x="${x}"][data-y="${y}"]`
			const cell = document.querySelector(selector)
			cell.style.border =  "solid 2px black"
		}
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
