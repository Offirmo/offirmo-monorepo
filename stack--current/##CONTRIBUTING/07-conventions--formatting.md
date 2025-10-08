
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

import assert from 'tiny-invariant'
import type { Immutable } from '@offirmo-private/ts-types'

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
fooǃfooꓽfoo𖾚foo
fooꜛbarꜜfoo
ꓽpackageᝍlockᐧjson
matching? (formerly 𝝣 which causes issues)
TODO express a resilient function who technically should never crash?
ᄆComponent
 */
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
