## tiny Typescript wrapper around [murmurhash3js-revisited](https://github.com/cimi/murmurhash3js-revisited)

# THIS HASH ALGO IS ***NON-CRYPTOGRAPHIC***!!
## Usage


```ts
import { injectꓽtext_encoder } from '@monorepo-private/murmurhash'

import { TextEncoder } from 'node:util' // node.js only
injectꓽtext_encoder(TextEncoder) // node & browser


import MurmurHash from '@monorepo-private/murmurhash'

const result = MurmurHash.v3.x64ⵧ128.hashꓽstring(str)
                                     hashꓽobject(x)
```


See also https://opensource.googleblog.com/2014/03/introducing-farmhash.html
