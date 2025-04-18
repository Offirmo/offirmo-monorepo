import type { LogPayload, LogSink } from '@offirmo/practical-logger-types'

import {
	LEVEL_TO_CONSOLE_METHOD,
	to_uniform_level,
} from '../common.ts'
import {
	FONT_FAMILY_BETTER_PROPORTIONAL,
	FONT_FAMILY_BETTER_MONOSPACE,
	LEVEL_TO_COLOR_STYLE,
	add_styled_string,
	build_args,
} from './common.ts'


function has_details_indicator(console_method_name: string, details: any): boolean {
	return details || console_method_name === 'error'
}

const HEADER_FONT_SIZE_STYLE = 'font-size: 9px'
export const sink: LogSink = (payload: Readonly<LogPayload>): void => {
	const { level, name, msg, details } = payload
	const console_method_name: string = LEVEL_TO_CONSOLE_METHOD[level]
	const console_method: Console['log'] = (console as any)[console_method_name]

	let line = ['']

	if (!has_details_indicator(console_method_name, details)) {
		line = add_styled_string(line, '▷', LEVEL_TO_COLOR_STYLE[level], 'font-size: 10px', FONT_FAMILY_BETTER_PROPORTIONAL, 'margin-left: .15em', 'margin-right: .4em')
	}
	line = add_styled_string(line, '[', LEVEL_TO_COLOR_STYLE[level], HEADER_FONT_SIZE_STYLE, FONT_FAMILY_BETTER_PROPORTIONAL)
	line = add_styled_string(line, to_uniform_level(level), LEVEL_TO_COLOR_STYLE[level], HEADER_FONT_SIZE_STYLE, FONT_FAMILY_BETTER_MONOSPACE)
	line = add_styled_string(line, '] ', LEVEL_TO_COLOR_STYLE[level], HEADER_FONT_SIZE_STYLE, FONT_FAMILY_BETTER_PROPORTIONAL)
	line = add_styled_string(line, '', 'font-size: unset')

	if (name) {
		line = add_styled_string(line, `${name} › `, LEVEL_TO_COLOR_STYLE[level], FONT_FAMILY_BETTER_PROPORTIONAL)
	}
	line = add_styled_string(line, msg, LEVEL_TO_COLOR_STYLE[level], FONT_FAMILY_BETTER_PROPORTIONAL)

	console_method(...build_args(line, payload))
}

export default sink
