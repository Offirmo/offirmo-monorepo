# cli-toolbox

A convenient aggregation of useful quality modules related to writing CLI node apps.


## Introduction

This module is an aggregation of frequently used terminal / CLI related modules that frequently work together.

When writing a CLI script/tool,
if you don't mind the extra space,
you just need this single dep + the interface is cleaner!

Goals:
- not have to depend on a flurry of small modules, depend on this single one instead
- wrap some modules for a more uniform API


## usage

### framework/cli-interface
Based on:
* meow v12.1.1
  * CLI app helper
```js
import createCliInterface from '@offirmo/cli-toolbox/framework/cli-interface'

const cli = createCliInterface('build', {
	importMeta: import.meta,
	flags: {
		watch: {
			type: 'boolean',
			default: false,
		},
	},
})

console.log('building…', { flags: cli.flags })
```
output:
```
building… { flags: { watch: false } }
```

### fs/json
Based on:
* write-json-file v5.0.0
  * Stringify and write JSON to a file atomically
* load-json-file v7.0.1
  * Read and parse a JSON file
```js
import json from '@offirmo/cli-toolbox/fs/extra/json'

const filepath = path.join(__dirname, '..', 'package.json')

function process_data({name, version, description, author, license}) {
	console.log({name, version, description, author, license})
}

process_data(json.readSync(filepath))

return json.read(filepath)
	.then(data => {
		process_data(data)
		return json.write('foo.json', data)
	})
// 2x output 1) sync 2) async
```
output:
```
{
  name: '@offirmo/cli-toolbox',
  version: '2.0.0',
  description: 'An aggregation of useful quality modules related to writing CLI node apps',
  author: 'Offirmo <offirmo.net@gmail.com>',
  license: 'Unlicense'
}
{
  name: '@offirmo/cli-toolbox',
  version: '2.0.0',
  description: 'An aggregation of useful quality modules related to writing CLI node apps',
  author: 'Offirmo <offirmo.net@gmail.com>',
  license: 'Unlicense'
}
```

### fs/extra
Based on:
* fs-extra v11.1.1
  * https://github.com/jprichardson/node-fs-extra
  * fs-extra contains methods that aren't included in the vanilla Node.js fs package. Such as recursive mkdir, copy, and remove.
```js
import fs from '@offirmo/cli-toolbox/fs/extra'

let dirs = fs.lsDirsSync(path.join(__dirname, '..'))
console.log('full path', dirs)

dirs = fs.lsDirsSync(path.join(__dirname, '..'), { full_path: false })
console.log('short path', dirs)

let files = fs.lsFilesSync(path.join(__dirname, '..'))
console.log('full path', files)

files = fs.lsFilesSync(path.join(__dirname, '..'), { full_path: false })
console.log('short path', files)

files = fs.lsFilesRecursiveSync(path.join(__dirname, '..', 'fs'))
console.log('recursive', files)
```
output:
```
full path [
  '/Users/offirmo/work/src/off/offirmo-monorepo/stack--current/3-advanced--node/cli-toolbox/_doc',
  '/Users/offirmo/work/src/off/offirmo-monorepo/stack--current/3-advanced--node/cli-toolbox/_tosort',
  '/Users/offirmo/work/src/off/offirmo-monorepo/stack--current/3-advanced--node/cli-toolbox/framework',
  '/Users/offirmo/work/src/off/offirmo-monorepo/stack--current/3-advanced--node/cli-toolbox/fs',
  '/Users/offirmo/work/src/off/offirmo-monorepo/stack--current/3-advanced--node/cli-toolbox/node_modules',
  '/Users/offirmo/work/src/off/offirmo-monorepo/stack--current/3-advanced--node/cli-toolbox/stdout',
  '/Users/offirmo/work/src/off/offirmo-monorepo/stack--current/3-advanced--node/cli-toolbox/string'
]
short path [
  '_doc',
  '_tosort',
  'framework',
  'fs',
  'node_modules',
  'stdout',
  'string'
]
full path [
  '/Users/offirmo/work/src/off/offirmo-monorepo/stack--current/3-advanced--node/cli-toolbox/.npmrc',
  '/Users/offirmo/work/src/off/offirmo-monorepo/stack--current/3-advanced--node/cli-toolbox/.tabset',
  '/Users/offirmo/work/src/off/offirmo-monorepo/stack--current/3-advanced--node/cli-toolbox/CHANGELOG.md',
  '/Users/offirmo/work/src/off/offirmo-monorepo/stack--current/3-advanced--node/cli-toolbox/LICENSE',
  '/Users/offirmo/work/src/off/offirmo-monorepo/stack--current/3-advanced--node/cli-toolbox/NOTES.md',
  '/Users/offirmo/work/src/off/offirmo-monorepo/stack--current/3-advanced--node/cli-toolbox/README.md',
  '/Users/offirmo/work/src/off/offirmo-monorepo/stack--current/3-advanced--node/cli-toolbox/index.ts',
  '/Users/offirmo/work/src/off/offirmo-monorepo/stack--current/3-advanced--node/cli-toolbox/package.json'
]
short path [
  '.npmrc',
  '.tabset',
  'CHANGELOG.md',
  'LICENSE',
  'NOTES.md',
  'README.md',
  'index.ts',
  'package.json'
]
recursive [
  '/Users/offirmo/work/src/off/offirmo-monorepo/stack--current/3-advanced--node/cli-toolbox/fs/extra/index.cjs',
  '/Users/offirmo/work/src/off/offirmo-monorepo/stack--current/3-advanced--node/cli-toolbox/fs/extra/index.mjs',
  '/Users/offirmo/work/src/off/offirmo-monorepo/stack--current/3-advanced--node/cli-toolbox/fs/extra/json/index.cjs',
  '/Users/offirmo/work/src/off/offirmo-monorepo/stack--current/3-advanced--node/cli-toolbox/fs/extra/json/index.mjs',
  '/Users/offirmo/work/src/off/offirmo-monorepo/stack--current/3-advanced--node/cli-toolbox/fs/extra/ls/index.cjs',
  '/Users/offirmo/work/src/off/offirmo-monorepo/stack--current/3-advanced--node/cli-toolbox/fs/extra/ls/index.mjs'
]
```

### stdout/clear-cli
Based on:
* ansi-escapes v6.2.0
  * ANSI escape codes for manipulating the terminal
```js
import clearCli from '@offirmo/cli-toolbox/stdout/clear-cli'

//clearCli()
```
output:
```
```

### string/stylize-string
Based on:
* chalk v5.3.0
  * Terminal string styling done right
```js
import stylize_string from '@offirmo/cli-toolbox/string/stylize'

console.log(stylize_string.red.bold.underline('Hello', 'world'))
console.log(stylize_string.red('red'),         stylize_string.bold.red('bold'))
console.log(stylize_string.green('green'),     stylize_string.bold.green('green'))
console.log(stylize_string.yellow('yellow'),   stylize_string.bold.yellow('yellow'))
console.log(stylize_string.blue('blue'),       stylize_string.bold.blue('blue'))
console.log(stylize_string.magenta('magenta'), stylize_string.bold.magenta('magenta'))
console.log(stylize_string.cyan('cyan'),       stylize_string.bold.cyan('cyan'))
console.log(stylize_string.white('white'),     stylize_string.bold.white('white'))
console.log(stylize_string.gray('gray'),       stylize_string.bold.gray('gray'))
```
output:
```
Hello world
red bold
green green
yellow yellow
blue blue
magenta magenta
cyan cyan
white white
gray gray
```

### string/boxify
Based on:
* boxen v7.1.1
  * Create boxes in the terminal
```js
import boxify from '@offirmo/cli-toolbox/string/boxify'

console.log(boxify('Hello'))
```
output:
```
┌─────┐
│Hello│
└─────┘
```

### string/columnify
Based on:
* cli-columns v4.0.0
  * https://github.com/shannonmoeller/cli-columns#readme
  * Columnated lists for the CLI.
```js
import columnify from '@offirmo/cli-toolbox/string/columnify'

const data = (await import('pokemon')).all()

console.log(columnify(data))
```
output:
```
Abomasnow     Chespin       Electivire    Heatmor       Magmortar     Phanpy        Shelgon       Torchic
Abra          Chewtle       Electrike     Heatran       Magnemite     Phantump      Shellder      Torkoal
Absol         Chikorita     Electrode     Heliolisk     Magneton      Pheromosa     Shellos       Tornadus
Accelgor      Chimchar      Elekid        Helioptile    Magnezone     Phione        Shelmet       Torracat
Aegislash     Chimecho      Elgyem        Heracross     Makuhita      Pichu         Shieldon      Torterra
Aerodactyl    Chinchou      Emboar        Herdier       Malamar       Pidgeot       Shiftry       Totodile
Aggron        Chingling     Emolga        Hippopotas    Mamoswine     Pidgeotto     Shiinotic     Toucannon
[truncated]
```

### string/arrayify
Based on:
* columnify v1.6.0
  * https://github.com/timoxley/columnify
  * Render data in text columns. Supports in-column text-wrap.
```js
import arrayify from '@offirmo/cli-toolbox/string/arrayify'

const data = {
	"commander@0.6.1": 1,
	"minimatch@0.2.14": 3,
	"mkdirp@0.3.5": 2,
	"sigmund@1.0.0": 3
}

console.log(arrayify(data))
```
output:
```
KEY              VALUE
commander@0.6.1  1
minimatch@0.2.14 3
mkdirp@0.3.5     2
sigmund@1.0.0    3
```

### string/log-symbols
Based on:
* log-symbols v5.1.0
  * Colored symbols for various log levels. Example: `✔︎ Success`
```js
import logSymbols from '@offirmo/cli-toolbox/string/log-symbols'

console.log(logSymbols.info, 'info')
console.log(logSymbols.success, 'success')
console.log(logSymbols.warning, 'warning')
console.log(logSymbols.error, 'error')
```
output:
```
ℹ info
✔ success
⚠ warning
✖ error
```
