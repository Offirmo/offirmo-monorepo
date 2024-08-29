import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'

import { Options } from './types.js'
import { OPTIONS__DISPLAYⵧDEFAULT } from './options--display.js'
import { OPTIONS__PRETTIFYⵧDEFAULT } from './options--prettify.js'
import { OPTIONS__STYLIZEⵧNONE } from './options--stylize--none.js'
import { getꓽstylize_optionsⵧterminal } from './options--stylize--terminal.js'
import { getꓽlibꓽchalk } from './injectable-lib--chalk.js'

/////////////////////////////////////////////////

function getꓽoptionsⵧdefault(): Options {
	return {
		...OPTIONS__DISPLAYⵧDEFAULT,
		...OPTIONS__PRETTIFYⵧDEFAULT,
		...OPTIONS__STYLIZEⵧNONE,
		...(getꓽlibꓽchalk() && getꓽstylize_optionsⵧterminal(getꓽlibꓽchalk())),
	}
}

function getꓽoptionsⵧfull(options: Immutable<Partial<Options>> = {}): Options {
	const final_options = {
		...getꓽoptionsⵧdefault(),
		...options,
	}

	if (!final_options.eol) {
		final_options.indent_size‿charcount = 0
	}

	return final_options
}

/////////////////////////////////////////////////

export {
	getꓽoptionsⵧdefault,
	getꓽoptionsⵧfull,
}
