import { COMMON_ERROR_FIELDS_EXTENDED as ERROR_FIELDS } from '@offirmo/error-utils'

console.log('Known error fields:')
Array.from(ERROR_FIELDS.values()).forEach(field => console.log(`- ${field}`))

// TODO aggregate array or list (flatten)
// TODO serialize
