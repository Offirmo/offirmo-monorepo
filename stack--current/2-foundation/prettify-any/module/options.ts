import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'

import type { Options } from './types.ts'
import { OPTIONS__DISPLAYⵧDEFAULT } from './options--display.ts'
import { OPTIONS__PRETTIFYⵧDEFAULT } from './options--prettify.ts'
import { OPTIONS__STYLIZEⵧNONE } from './options--stylize--none.ts'
import { getꓽstylize_optionsⵧterminal } from './options--stylize--terminal.ts'
import { getꓽlibꓽchalk } from './injectable-lib--chalk.ts'

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
