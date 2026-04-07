
## indentation
tabs. Tabs width = whatever you want, it's display only!

## EOL
unix (should be enforced by git)

## prettifying
not implemented yet as long as I'm the sole contributor

TODO one day prettify

## file structure

### JavaScript / TypeScript

* imports
  * by order of 1) system 2) external libs 3) internal libs 4) current libs
  * (TODO one day) cannot depend on lexicographically higher (prevent loops)

```ts
/* PROMPT
 * ’…
 */

import { assert, assert_from } from '@monorepo-private/assert'
import type { Immutable } from '@monorepo-private/ts--types'

import type {  } from './types.ts'

/////////////////////////////////////////////////

function create(): Immutable<> {
function getꓽXYZⵧfoo‿v2(): void {}
function deriveꓽXYZⵧfoo‿v2(): void {}
/*
assertꓽnode_is_xyz()
isꓽStory‿v2(x: Immutable<any>): s is Story‿v2 {

ↆasyncⵧfetch
ೱasyncⵧpromise

ϟevent
ǃerror
aꓺbꘌc
notᝍbadₓasⳇwell‿no
fooǃfooꓽfoo
fooꜛbarꜜfoo
ꓽpackageᝍlockᐧjson
matching? (formerly 𝝣 which causes issues)
TODO express a resilient function who technically should never crash?
ᄆComponent
 */

/** @deprecated Use xyz... */
// @ts-expect-error
// @ts-ignore

// prettier-ignore
// eslint-disable-next-line no-console
/* eslint-disable no-console */

}

/////////////////////////////////////////////////

export {

}
```

```ts
import { expect } from 'chai'

import { LIB } from './consts.ts'
import { getꓽSXC } from './sec.ts'

import {
  ...
} from './index.ts'

/////////////////////////////////////////////////

function expectㆍfileㆍstatesㆍdeepㆍequal(s1: Immutable<State>, s2: Immutable<State>, should_log = true): void {
  assert(...
}

describe(`${LIB} -- examples`, function() {

	describe('DEMO_STATE', function () {

		it('should be stable and up to date', () => {
			const migrated = migrate_toꓽlatest(getꓽSXC(), DEMO_STATE)
			expect(migrated).to.equal(DEMO_STATE)
		})
	})
})
```


```ts
import { expect } from 'chai'

import { LIB } from './consts.ts'
import { getꓽSXC } from './sec.ts'

import {
  ...
} from './index.ts'

/////////////////////////////////////////////////

function expectㆍfileㆍstatesㆍdeepㆍequal(s1: Immutable<State>, s2: Immutable<State>, should_log = true): void {
  assert(...
}

describe(`${LIB} -- examples`, function() {

	describe('DEMO_STATE', function () {

		it('should be stable and up to date', () => {
			const migrated = migrate_toꓽlatest(getꓽSXC(), DEMO_STATE)
			expect(migrated).to.equal(DEMO_STATE)
		})
	})
})
```

## Core unicode

Arrows and supplemental https://jrgraphix.net/r/Unicode/2190-21FF https://jrgraphix.net/r/Unicode/2900-297F https://jrgraphix.net/r/Unicode/2B00-2BFF
```
⇱   ↰ ↱       ↕ ↔
  ↖  ↑  ↗     ↢ ↣ 
  ←  ↻  → ↴   ⇐ ⇒
  ↙  ↓  ↘     ↻ ↩ ↪ ↺ ⟲ ⟳
  ↵ ↲ ↳   ⇲   ⇄ ⇅ ⇆ ⮂ ⮃
   ⮐ ⮑      ↯
  ˹  ˄  ˺
‹ « ˂ ˃ » ›
  ˻  ˅  ˼
```
Logs https://jrgraphix.net/r/Unicode/2600-26FF https://jrgraphix.net/r/Unicode/2700-27BF
```
☐ ☑ ☒ ⚿ ⛫ ⛉ ⛊ 
⚐ ⚑ ⚠ ⚡ ⚠️ ❓❔❕❗
⛀ ⛁ ⛂ ⛃
✓ ✕ ✗  ✔ ✘ ✖  ✅ ❎ ❌ ⛔
⌥ ⌦ ⌘
⚙

console.log(`🔄 <Component />`, { prop });
```

box drawing https://jrgraphix.net/r/Unicode/2500-257F
```
╔ ═ ━ ┉ ┅ ╍ ─ ┈ ┄ ╌ ╶┼╴
║                   ╺╋╸
┃ ╒═╤═╕ ╓─╥─╖ ╔═╦═╗    ╿
┋ ╞═╪═╡ ╟─╫─╢ ╠═╬═╣   ╾┼╼
┇ ╘═╧═╛ ╙─╨─╜ ╚═╩═╝    ╽
╏ ┌─┬─┐ ┍━┯━┑ ┎─┰─┒ ┏━┳━┓ ╭─╮
│ ├─┼─┤ ┝━┿━┥ ┠─╂─┨ ┣━╋━┫ │ │
┊ └─┴─┘ ┕━┷━┙ ┖─┸─┚ ┗━┻━┛ ╰─╯
┆ ┞┦ ┡┩ ┟┧ ┢┪
╎ ┭ ┮  ┱ ┲
╷ ┵ ┶  ┹ ┺
╵ ┽ ┾ ╀ ╁ ╃ ╄ ╅ ╆ ╇ ╈ ╉ ╊
╻
╹
```
