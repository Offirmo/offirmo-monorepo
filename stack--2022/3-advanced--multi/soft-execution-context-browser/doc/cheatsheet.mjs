import stylizeString from '@offirmo/cli-toolbox/string/stylize.mjs'
import boxify from '@offirmo/cli-toolbox/string/boxify.mjs'

import PKG_JSON from '../package.json' assert { type: 'json' }

console.log(boxify(`
import { TODO } from '${stylizeString.bold(PKG_JSON.name)}'

TODO
`.trim()))
