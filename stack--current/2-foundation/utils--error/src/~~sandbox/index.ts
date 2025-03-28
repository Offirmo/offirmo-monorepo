
import { COMMON_ERROR_FIELDS_EXTENDED as ERROR_FIELDS } from '../index.ts' // TODO self ref

console.log('Known error fields:')
Array.from(ERROR_FIELDS.values()).forEach(field => console.log(`- ${field}`))
