import stylizeString from '@offirmo/cli-toolbox/string/stylize.mjs'
import boxify from '@offirmo/cli-toolbox/string/boxify.mjs'

import PKG_JSON from '../package.json' assert { type: 'json' }

const {
	getꓽUTC_timestamp‿ms,
	getꓽUTC_timestampⵧhuman_readable‿ms,
	getꓽUTC_timestampⵧhuman_readable‿seconds,
	getꓽUTC_timestampⵧhuman_readable‿minutes,
	getꓽUTC_timestampⵧhuman_readable‿days,
} = await import('../' + PKG_JSON.main)


console.log(boxify(`
import {  } from '${stylizeString.bold(PKG_JSON.name)}'

getꓽUTC_timestamp‿ms()                     "${getꓽUTC_timestamp‿ms()}"
getꓽUTC_timestampⵧhuman_readable‿ms()      "${getꓽUTC_timestampⵧhuman_readable‿ms()}"
getꓽUTC_timestampⵧhuman_readable‿seconds() "${getꓽUTC_timestampⵧhuman_readable‿seconds()}"
getꓽUTC_timestampⵧhuman_readable‿minutes() "${getꓽUTC_timestampⵧhuman_readable‿minutes()}"
getꓽUTC_timestampⵧhuman_readable‿days()    "${getꓽUTC_timestampⵧhuman_readable‿days()}"
`.trim()))
