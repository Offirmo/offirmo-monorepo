import stylizeString from '@offirmo/cli-toolbox/string/stylize.mjs'
import boxify from '@offirmo/cli-toolbox/string/boxify.mjs'

import PKG_JSON from '../package.json' assert { type: 'json' }

console.log(boxify(`
import { RichText } from '${stylizeString.bold(PKG_JSON.name)}'

const doc = RichText.fragmentⵧinline()
   .pushText('Hello ')
   .pushStrong('world!')
   .done()

console.log('to text:' + RichText.to_text(doc))
`.trim()))
