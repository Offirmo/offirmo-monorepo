A **node** module to conveniently and clearly print any object in the console, for debug


## Introduction

For debug, we need to display a full representation of any object, cf. https://stackoverflow.com/questions/10729276/how-can-i-get-the-full-object-in-node-jss-console-log-rather-than-object

When printing to the console (node.js), one has to use [`util.inspect`](https://nodejs.org/api/util.html#utilinspectobject-options)

I wrote this lib while being unaware of `util.inspect` 🤦

However, I'm keeping it for extra features:
* ✅ ability to copy/paste back to normal code (as much as possible)
  * ✅ and thus overall more readable
* ✅ can help outline wrong JSON
* ✅ highlights "problem-ish" values = NaN, errors, -0, circular references…
* ✅ doesn't expand errors (not the same as error logging)
* ✴️ custom displays for own types

Missing features (worse than util.inspect)
- Promises
- exotic functions: async, gen
- regexps

## Usage

```ts
// "@offirmo-private/prettify-any": "*",
import chalk from 'chalk'
import {
	injectꓽlibꓽchalk,
	prettifyꓽany,
	prettifyꓽjson,
} from '@offirmo-private/prettify-any'

injectꓽlibꓽchalk(chalk)

prettifyꓽjson(foo)
prettifyꓽjson({foo}, {outline: true})

import { dumpꓽanyⵧprettified } from '@offirmo-private/prettify-any'

dumpꓽanyⵧprettified('hello', {foo}, {outline: true})

```


https://www.json.org/json-en.html
https://thecodebarbarian.com/the-80-20-guide-to-json-stringify-in-javascript


Note: was formerly using prettyjson and got inspired by it.
"prettyjson": "^1"
"@types/prettyjson": "^0.0.30",

TODO review https://github.com/jestjs/jest/tree/main/packages/pretty-format
TODO review https://www.npmjs.com/package/@parischap/pretty-print
