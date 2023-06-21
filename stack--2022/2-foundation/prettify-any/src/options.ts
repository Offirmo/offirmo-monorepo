
import { Immutable } from '@offirmo-private/ts-types'

import { Options } from './types.js'
import {
	DEFAULTS_PRETTIFY_OPTIONS,
	DEFAULTS_STYLE_OPTIONS,
	DEFAULTS_STYLIZE_OPTIONS__NONE,
} from './options--compatible.js'
import {
	getꓽstylize_optionsⵧansi
} from './options--ansi.js'
import {
	getꓽlibꓽchalk,
} from './injectable-lib--chalk.js'

/////////////////////////////////////////////////

function getꓽoptionsⵧdefault(): Options {
	return {
		...DEFAULTS_STYLE_OPTIONS,
		...DEFAULTS_PRETTIFY_OPTIONS,
		...DEFAULTS_STYLIZE_OPTIONS__NONE,
		...(getꓽlibꓽchalk() && getꓽstylize_optionsⵧansi(getꓽlibꓽchalk())),
	}
}

function getꓽoptions(options: Immutable<Partial<Options>> = {}): Options {
	return {
		...getꓽoptionsⵧdefault(),
		...options,
	}
}

/////////////////////////////////////////////////

export {
	getꓽoptionsⵧdefault,
	getꓽoptions,
}
