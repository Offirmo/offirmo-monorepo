export { VERSION, NUMERIC_VERSION, SCHEMA_VERSION, BUILD_DATE, get_logger } from '@tbrpg/state'

export * from './game-instance'
export { Store } from './stores/types'
//export { inject_text_encoder } from '@offirmo-private/murmurhash' // due to parcel duplicating the packages :-/ TODO review!
export { StorageKey } from './stores/local-storage'
