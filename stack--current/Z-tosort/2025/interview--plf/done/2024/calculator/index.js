
console.log('Hi from js')

/////////////////////////////////////////////////

let state = {
	err: null,
	input_buffer: '0'
}

const REDUCERS = {
	on_error(state, err) {
		return {
			...state,
			err,
		}
	},
	on_input(state, input) {
		let new_buffer = state.input_buffer
		if (new_buffer === '0')
			new_buffer = input
		else
			new_buffer += input

		return {
			...state,
			input_buffer: new_buffer,
		}
	},
	clear(state) {
		return {
			...state,
			input_buffer: '0',
			err: null,
		}
	},
	evaluate(state) {
		const input = state.input_buffer
		const result = eval(input)

		return {
			...state,
			input_buffer: result,
		}
	}
}

/////////////////////////////////////////////////

function render() {
	const output_elt = document.querySelector('.calculator .output')

	if (state.err) {
		output_elt.innerText = 'ERROR! ' + String(state.err?.message || 'Unknown error!')
		return
	}

	output_elt.innerText = state.input_buffer
}

/////////////////////////////////////////////////


/// detect key press
// https://medium.com/@uistephen/keyboardevent-key-for-cross-browser-key-press-check-61dbad0a067a
document.addEventListener('keyup', (event) => {
	console.log('keyup', event)

	if (String(Number(event.key)) === event.key) {
		state = REDUCERS.on_input(state, event.key)
		render()
	}
})

/// event delegation
//document.addEventListener('change', event => {
document.addEventListener('click', event => {

	const { target } = event
	if (!target) return

	const input = target.dataset['input']
	const command = target.dataset['cmd']

	if (!(input || command)) return

	console.log('click', {
		event,
		input,
		command,
	})

	try {

		if (input) {
			state = REDUCERS.on_input(state, input)
		}

		if (command) {
			switch (command) {
				case 'clear': {
					state = REDUCERS.clear(state)
					break
				}
				case 'evaluate': {
					state = REDUCERS.evaluate(state)
					break
				}
				default:
					throw new Error(`Unknown command "${command}"!`)
			}
		}
	}
	catch (err) {
		state = REDUCERS.on_error(state, err)
	}

	render()
})
