
let fn_count = 0
export function fn() {
	let id = fn_count++
	let calls = 0
	return () => {
		calls++
		console.log(`fn() #${id} call #${calls}!`)
	}
}

export function within() {
	console.warn('TODO $storybook/test { within }')
}

export function userEvent() {
	console.warn('TODO $storybook/test { userEvent }')
}

export function expect() {
	console.warn('TODO $storybook/test { expect }')
}