import stylizeString from '@offirmo/cli-toolbox/string/stylize.mjs'
import boxify from '@offirmo/cli-toolbox/string/boxify.mjs'

import PKG_JSON from '../package.json' assert { type: 'json' }

const {
	get_UTC_timestamp_ms,
	get_human_readable_UTC_timestamp_ms,
	get_human_readable_UTC_timestamp_seconds,
	get_human_readable_UTC_timestamp_minutes,
	get_human_readable_UTC_timestamp_days,
} = await import('../' + PKG_JSON.main)


console.log(boxify(`
import {  } from '${stylizeString.bold(PKG_JSON.name)}'

get_UTC_timestamp_ms()                     "${get_UTC_timestamp_ms()}"
get_human_readable_UTC_timestamp_ms()      "${get_human_readable_UTC_timestamp_ms()}"
get_human_readable_UTC_timestamp_seconds() "${get_human_readable_UTC_timestamp_seconds()}"
get_human_readable_UTC_timestamp_minutes() "${get_human_readable_UTC_timestamp_minutes()}"
get_human_readable_UTC_timestamp_days()    "${get_human_readable_UTC_timestamp_days()}"
`.trim()))
