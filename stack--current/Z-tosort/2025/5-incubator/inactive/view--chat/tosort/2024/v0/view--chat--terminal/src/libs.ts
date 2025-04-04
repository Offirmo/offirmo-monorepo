import {
	injectꓽlibꓽchalk,
	prettifyꓽany as to_prettified_str,
} from '@offirmo-private/prettify-any'

import indent_string from 'indent-string'

import stylize_string from 'chalk'
injectꓽlibꓽchalk(stylize_string)

// https://github.com/AnAppAMonth/linewrap
import linewrap from 'linewrap'
function wrap_string(s, size) {
	return linewrap(size, {skipScheme: 'ansi-color'})(s)
}

////////////

export {
	to_prettified_str,
	stylize_string,
	indent_string,
	wrap_string,
}
