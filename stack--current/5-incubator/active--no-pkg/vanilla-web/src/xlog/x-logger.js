
/////////////////////////////////////////////////

console.xgroup = (...args) => group(console.group.bind(console), ...args)
console.xgroupCollapsed = (...args) => group(console.groupCollapsed.bind(console), ...args)
console.xgroupEnd = (...args) => group(console.groupEnd.bind(console), ...args)

console.xlog = (...args) => sink('log', ...args)
console.xwarn = (...args) => sink('warn', ...args)
console.xerror = (...args) => sink('error', ...args)
console.xtrace = (...args) => sink('trace', ...args)

/////////////////////////////////////////////////

const IFRAME_DEPTH = get_iframe_depth()

const LSKⵧCOLORⵧBG = `xlogⳇcolorⵧbgⵧ${String(IFRAME_DEPTH).padStart(2, '0')}`

const COLORⵧBGⵧDEFAULT = [
	// credits http://davidbau.com/colors/
	'palegreen',
	//'lavenderblush',
	'paleturquoise',
	'mistyrose',
][IFRAME_DEPTH] || 'gainsboro';

const COLORⵧBG = (() => {
	const existing_color = (() => {
		try {
			return localStorage.getItem(LSKⵧCOLORⵧBG)
		}
		catch (e) {
			return 'orangered' // strong hint at issue
		}
	})()

	const final_color = existing_color || COLORⵧBGⵧDEFAULT

	return final_color
})()

const STYLEⵧORIGIN_DISCRIMINATOR = `background-color: ${COLORⵧBG}`

/////////////////////////////////////////////////

const FILTER_RADIX = 'XXX'

const MIN_WIDTH = 5

const STYLEⵧFONT_SIZEⵧHEADER = 'font-size: 8px'
const STYLEⵧFONT_SIZEⵧMESSAGE = 'font-size: 11px'
const STYLEⵧFONT_FAMILYⵧBETTER_PROPORTIONAL = 'font-family: ' + [
	'-apple-system',
	'BlinkMacSystemFont', // good sans-serif available in blink = Chrome
	'noto',
	'roboto',
	'sans-serif',
	//'unset', // default back to the devtools one
].join(', ')
const STYLEⵧFONT_FAMILYⵧBETTER_MONOSPACE = 'font-family: ' + [
	'"Fira Code"',
	'Menlo', // default chrome devtools one
	'Consolas',
	'monospace',
].join(', ')

function group(originalFn, ...args) {
	let console__call__args = [''] // str + corresponding % args, starting empty

	console__call__args = append_styled_string(console__call__args,
		FILTER_RADIX,
		STYLEⵧORIGIN_DISCRIMINATOR,
		STYLEⵧFONT_SIZEⵧHEADER,
		STYLEⵧFONT_FAMILYⵧBETTER_MONOSPACE,
	)

	console__call__args = append_styled_string(console__call__args,
		`「${String(IFRAME_DEPTH).padStart(2, '0')}」`,
		STYLEⵧORIGIN_DISCRIMINATOR,
		//LEVEL_TO_COLOR_STYLE[level],
		STYLEⵧFONT_SIZEⵧHEADER,
		STYLEⵧFONT_FAMILYⵧBETTER_MONOSPACE,
	)

	while (args.length && (['number', 'string'].includes(typeof args[0]))) {
		console__call__args = append_styled_string(console__call__args,
			' ' + args.shift(),
			STYLEⵧORIGIN_DISCRIMINATOR,
			STYLEⵧFONT_FAMILYⵧBETTER_PROPORTIONAL,
			STYLEⵧFONT_SIZEⵧMESSAGE,
		)
	}

	originalFn(...console__call__args, ...args)
}

function sink(level, ...args) {
	let console__call__args = [''] // str + corresponding % args, starting empty

	if (!has_details_indicator(level)) {
		console__call__args = append_styled_string(console__call__args,
			'▷',
			'font-size: 8px', STYLEⵧFONT_FAMILYⵧBETTER_PROPORTIONAL, 'margin-left: .55em', 'margin-right: .4em',
		)
	}

	console__call__args = append_styled_string(console__call__args,
		FILTER_RADIX,
		STYLEⵧORIGIN_DISCRIMINATOR,
		STYLEⵧFONT_SIZEⵧHEADER,
		STYLEⵧFONT_FAMILYⵧBETTER_MONOSPACE,
	)

	console__call__args = append_styled_string(console__call__args,
		`「${String(IFRAME_DEPTH).padStart(2, '0')}」`,
		STYLEⵧORIGIN_DISCRIMINATOR,
		//LEVEL_TO_COLOR_STYLE[level],
		STYLEⵧFONT_SIZEⵧHEADER,
		STYLEⵧFONT_FAMILYⵧBETTER_MONOSPACE,
	)

	/*
	console__call__args = append_styled_string(console__call__args,
		level.padEnd(MIN_WIDTH, ' '),
		STYLEⵧORIGIN_DISCRIMINATOR,
		//LEVEL_TO_COLOR_STYLE[level],
		STYLEⵧFONT_SIZEⵧHEADER,
		STYLEⵧFONT_FAMILYⵧBETTER_MONOSPACE,
	)
	*/

	while (args.length && (['number', 'string'].includes(typeof args[0]))) {
		console__call__args = append_styled_string(console__call__args,
			' ' + args.shift(),
			STYLEⵧORIGIN_DISCRIMINATOR,
			STYLEⵧFONT_FAMILYⵧBETTER_PROPORTIONAL,
			STYLEⵧFONT_SIZEⵧMESSAGE,
		)
	}

	console[level](...console__call__args, ...args)
}

/////////////////////////////////////////////////

function has_details_indicator(console_method_name) {
	return ['error', 'warn', 'trace'].includes(console_method_name)
}

function append_styled_string(console__call__args, str, ...styles) {
	const [ existing_str, ...existing_styles ] = console__call__args
	return [
		existing_str + '%c' + str,
		...existing_styles,
		styles.join(';') + ';',
	]
}

function get_iframe_depth() {
	// TODO REVIEW doesn't work reliably
	let depth = 0
	let current_window = window
	while (current_window !== current_window.parent && depth<10) {
		depth++
		current_window = current_window.parent
	}
	return depth
}

/////////////////////////////////////////////////

setInterval(() => {
	try {
		const existing = localStorage.getItem(LSKⵧCOLORⵧBG)
		if (typeof existing !== 'string') {
			localStorage.setItem(LSKⵧCOLORⵧBG,
				COLORⵧBG === COLORⵧBGⵧDEFAULT
					? ''
					: COLORⵧBG
			)
		}
	} catch(err) {
		// swallow, LS is notoriously unreliable
	}
}, 10000) // every 10s to rewrite in case of LS clearing

/////////////////////////////////////////////////

console.xgroup('👋 Hi from x-logger 👋')
console.xlog("origin =", window.origin)
try {
	console.xlog("LS keys =", Array.from({length: localStorage.length}, (item, index) => localStorage.key(index)))
} catch {}
console.xgroupEnd()

/////////////////////////////////////////////////

export {
	get_iframe_depth,
	LSKⵧCOLORⵧBG,
}