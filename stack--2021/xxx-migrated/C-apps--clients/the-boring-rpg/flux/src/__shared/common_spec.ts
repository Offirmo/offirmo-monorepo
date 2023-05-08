const { TextEncoder } = require('util')
const { inject_text_encoder } = require('@offirmo-private/murmurhash')
inject_text_encoder(TextEncoder)
