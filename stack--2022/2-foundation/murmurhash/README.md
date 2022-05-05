## tiny Typescript wrapper around [murmurhash3js-revisited](https://github.com/cimi/murmurhash3js-revisited)

## Usage

### Node

```js
const create = require('@offirmo-private/murmurhash')
const { TextEncoder } = require('util')

let Murmur = create(TextEncoder)
const result = Murmur.v3.x64.hash_string_to_128(str)
                             hash_object_to_128(x)
```

### Browser

```js
import create from '@offirmo-private/murmurhash'

let Murmur = create(TextEncoder)
const result = Murmur.v3.x64.hash_string_to_128(str)
                             hash_object_to_128(x)
```

### Common

```js
import { inject_text_encoder } from '@offirmo-private/murmurhash'

inject_text_encoder(TextEncoder)

let Murmur = create()
const result = Murmur.v3.x64.hash_string_to_128(str)
                             hash_object_to_128(x)
```


See also https://opensource.googleblog.com/2014/03/introducing-farmhash.html
