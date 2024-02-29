
/////////////////////////////////////////////////

function hasꓽcontent(x: any, prop?: string): boolean {
	if (!!prop)
		x = x[prop]

	switch (true) {
		case !x: // null, undef, empty string, 0
			return false
		case Array.isArray(x):
			return x.length > 0
		case typeof x === 'number':
			return !isNaN(x) && x !== 0
		default:
			return Object.keys(x).length > 0
	}
}

/////////////////////////////////////////////////

export {
	hasꓽcontent,
}
