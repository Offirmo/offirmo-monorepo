import stylizeString from '@offirmo/cli-toolbox/string/stylize'
import boxify from '@offirmo/cli-toolbox/string/boxify'

import PKG_JSON from '../package.json' with { type: 'json' }

console.log(boxify(`
Using a generic logger: '${stylizeString.bold(PKG_JSON.name)}'

logger[level] = (message?: string, details?: Details) => void

logger.error('something happened!', { ... })
`.trim()))
