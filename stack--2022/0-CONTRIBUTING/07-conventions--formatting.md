
## indentation
tabs. Tabs width = whatever you want, it's display only!

## EOL
unix (should be enforced by git)

## prettifying
not implemented yet as long as I'm the sole contributor

## file structure

### JavaScript / TypeScript

* imports by order of

```ts
import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'

import {  } from './types.js'

/////////////////////////////////////////////////

function create(): Immutable<> {
function getꓽXYZ(): void {}
/*
setꓽXYZ()
insertꓽnode()
assertꓽnode_is_xyz()
isꓽStory‿v2(x: Immutable<any>): s is Story‿v2 {
ↆfoo ⵧ fetch
ೱfoo ⵧ promise
ϟbestↆofꓺaꘌb
notᝍbadₓasⳇwell‿noǃ
bar𝝣fooǃfooꓽfoo𖾚foo
fooꜛbarꜜfoo
fooⵧbar
ꓽfooᐧfoo
 */
}

/////////////////////////////////////////////////

export {

}

```

```ts
import { expect } from 'chai'

import { LIB } from './consts.js'
import { getꓽSEC } from './sec.js'

import {
  ...
} from './index.js'

/////////////////////////////////////////////////

describe(`${LIB} -- examples`, function() {

	describe('DEMO_STATE', function () {

		it('should be stable and up to date', () => {
			const migrated = migrate_to_latest(getꓽSEC(), DEMO_STATE)
			expect(migrated).to.equal(DEMO_STATE)
		})
	})
})

```
