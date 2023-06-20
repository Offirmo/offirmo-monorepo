
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

function get(): void {
/*
getꓽXYZ()
setꓽXYZ()
insertꓽnode()
assertꓽnode_is_xyz()
isꓽStory‿v2()
ↆfoo
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
import { get_lib_SEC } from './sec.js'

import {
  ...
} from './index.js'

/////////////////////////////////////////////////

describe(`${LIB} -- examples`, function() {

	describe('DEMO_STATE', function () {

		it('should be stable and up to date', () => {
			const migrated = migrate_to_latest(get_lib_SEC(), DEMO_STATE)
			expect(migrated).to.equal(DEMO_STATE)
		})
	})
})

```
