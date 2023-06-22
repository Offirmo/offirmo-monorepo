
## Casing
In order to maximize readability, this repo uses snake_case:
```
function square_root(x: number): number { ...
```

CamelCase is reserved for types:
```
export type RelativePath = string
export type AbsolutePath = string
```

Exception: since CamelCase is commonly used in JS,
we use Camelcase for the external API of **public modules** (= published to npm).


## naming
In order to maximize readability, a few naming conventions:

### BEM-inspired
Block / Element / Modifier
https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/

* sub-element: `SEC__root` `SEC__leaf`
  * TODO or use dot?
* modifier/variant `getꓽtimestamp--human_readable`


### prefixes

#### local use / not exported
variables prefixed with `_` hints at internal/local use / not exported `_updateꓽxyz()`

#### Accessors
* `getꓽ`: `getꓽXYZ()`
* `setꓽ`: `setꓽXYZ()`
* other: `insertꓽnode()`, `deleteꓽnode()`

Counter example:
```
import terminal_size from 'term-size'
terminal_size.columns // error it's a function = unclean name


```

#### Tests
* assertions `assert`: `assertꓽnode_is_xyz()`
* type guards `isꓽStory‿v2()`
* property tests TODO (ex. is last bit = 1)
  * `hasꓽsome_property()` ? `hasꓽlast_bitꘌ1()`

#### Converters

unclear, TODO
"get representation of X as Y"
"convert X into Y"
"normalize X"
* `toꓽStory‿v2()`

#### Type hints
* promises: `ↆfoo`

### postfixes

#### units
* Unit: `getꓽduration‿days()` `getꓽduration‿seconds()` to clarify the unit if needed
* abbreviation only if readable
  * ms = millisecond ✅
  * min = minutes 🚫
* if not abbreviated, the unit should be plural

### test helpers

`itᐧshouldᐧbeᐧaᐧvalidᐧengine()`
