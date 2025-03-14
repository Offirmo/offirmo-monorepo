import stylizeString from '@offirmo/cli-toolbox/string/stylize'
import boxify from '@offirmo/cli-toolbox/string/boxify'

import PKG_JSON from '../package.json' with { type: 'json' }

console.log(boxify(`
import { RichText } from '${stylizeString.bold(PKG_JSON.name)}'

const doc = RichText.fragmentⵧinline()
   .pushText('Hello ')
   .pushStrong('world!')
   .done()

console.log('to text:' + RichText.renderⵧto_text(doc))
`.trim()))
