import { EOL } from 'node:os'
import getꓽterminal_size from 'terminal-size'

import type { DisplayOptions } from './types.ts'

/////////////////////////////////////////////////

const OPTIONS__DISPLAYⵧDEFAULT: DisplayOptions = {
	eol: EOL as DisplayOptions['eol'],
	max_width‿charcount: getꓽterminal_size().columns,
	outline: false,
	indent_size‿charcount: 3,
	max_primitive_str_size: null,
	should_recognize_constants: true,
	should_recognize_globals: true,
	should_sort_keys: false,
	should_compact_objects: true,
	should_warn_not_json: false,
	quote: '\'',
	date_serialization_fn: 'toLocaleString',
}

/////////////////////////////////////////////////

export {
	OPTIONS__DISPLAYⵧDEFAULT,
}
