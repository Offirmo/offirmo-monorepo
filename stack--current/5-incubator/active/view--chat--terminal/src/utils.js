// TODO make a module

// https://stackoverflow.com/a/1917041/587407
function get_shared_start(strs) {
	if (strs.length <= 1) return ''

	const A = strs.toSorted()
	const a1 = A[0]
	const a2 = A[A.length - 1]
	const L = a1.length

	let i = 0
	while (i < L && a1.charAt(i) === a2.charAt(i)) { i++ }

	return a1.substring(0, i)
}


export {
	get_shared_start,
}
