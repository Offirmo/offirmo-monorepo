
import { promises as fs } from 'node:fs'

import { LIB, PATH_TO_OWN_PACKAGE_JSON } from './consts.mjs'

/////////////////////////////////////////////////

const { version } = JSON.parse(await fs.readFile(PATH_TO_OWN_PACKAGE_JSON))

const DEFAULT_BANNER = `[${LIB}] v${version}:`

function create_logger_state(banner = DEFAULT_BANNER) {
	return {
		banner,
		seen_any_output_yet: false,
	}
}

function display_banner_if_1st_output(logger_state) {
	if (!logger_state.seen_any_output_yet) {
		// TODO ONE DAY use a proper logger
		console.log(logger_state.banner)
		logger_state = {
			...logger_state,
			seen_any_output_yet: true,
		}
	}

	return logger_state
}

/////////////////////////////////////////////////

export {
	create_logger_state,
	display_banner_if_1st_output,
}
