
/////////////////////////////////////////////////

const HAS_ALREADY_XLOGGER = !!console.xlog

if (!HAS_ALREADY_XLOGGER) {
	console.xgroup = (...args) => group(console.group.bind(console), ...args)
	console.xgroupCollapsed = (...args) => group(console.groupCollapsed.bind(console), ...args)
	console.xgroupEnd = (...args) => group(console.groupEnd.bind(console), ...args)

	// reminder: 4 levels filter-able in browser = verbose, info, warning, error
	// verbose
	console.xdebug = (...args) => sink('debug', ...args)

	// info
	console.xinfo = (...args) => sink('info', ...args)
	console.xlog = (...args) => sink('log', ...args)
	console.xtrace = (...args) => sink('trace', ...args)

	// warn
	console.xwarn = (...args) => sink('warn', ...args)

	// error
	console.xerror = (...args) => sink('error', ...args)

}

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

function sink(console_method_name, ...args) {
	let console__call__args = [''] // str + corresponding % args, starting empty

	if (!has_details_indicator(console_method_name)) {
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
		//LEVEL_TO_COLOR_STYLE[console_method_name],
		STYLEⵧFONT_SIZEⵧHEADER,
		STYLEⵧFONT_FAMILYⵧBETTER_MONOSPACE,
	)

	/*
	console__call__args = append_styled_string(console__call__args,
		console_method_name.padEnd(MIN_WIDTH, ' '),
		STYLEⵧORIGIN_DISCRIMINATOR,
		//LEVEL_TO_COLOR_STYLE[console_method_name],
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

	console[console_method_name](...console__call__args, ...args)
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

// TODO REVIEW doesn't work reliably
function get_iframe_depth() {
	// Empirically seen: walking up the tree of parents yields inconsistent results?? (why? TODO investigate)
	// so we switch to a set
	const windows = new Set()


	let current_window = self
	windows.add(current_window)

	let ancestors_count = 0
	while (current_window !== current_window.parent && ancestors_count<10) {
		ancestors_count++
		windows.add(current_window.parent)
		current_window = current_window.parent
	}

	if (windows.size !== (ancestors_count + 1)) {
		console.warn(`[${FILTER_RADIX}] strange window ancestors count`, {
			self,
			windows,
			ancestors_count,
			'windows.size': windows.size,
		})
	}

	return windows.size - 1
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

console.xgroupCollapsed(`👋 Hi from freshly loaded x-logger from "${window.origin}" ↳depth=${IFRAME_DEPTH} 👋 ${HAS_ALREADY_XLOGGER ? '(⚠dupl)' : ''}`)
console.xlog("origin =", window.origin)
try {
	console.xdebug('debug')

	console.xlog('log')
	console.xinfo('info')
	console.xtrace('trace')

	console.xwarn('warn')

	console.xerror('error')

	console.xlog("LS keys =", Array.from({length: localStorage.length}, (item, index) => localStorage.key(index)))
} catch {}
console.xgroupEnd()

export {
	get_iframe_depth,
	LSKⵧCOLORⵧBG,
}
