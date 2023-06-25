import getꓽterminal_size from 'term-size'

import { DisplayOptions } from './types.js'

/////////////////////////////////////////////////

const OPTIONS__DISPLAYⵧDEFAULT: DisplayOptions = {
	eol: '', //EOL as RenderOptions['eol'],
	max_width‿charcount: getꓽterminal_size().columns,
	outline: false,
	indent_size‿charcount: 3,
	max_primitive_str_size: null,
	should_recognize_constants: true,
	should_recognize_globals: true,
	should_sort_keys: false,
	quote: '\'',
	date_serialization_fn: 'toLocaleString',
}

/////////////////////////////////////////////////

export {
	OPTIONS__DISPLAYⵧDEFAULT,
}
