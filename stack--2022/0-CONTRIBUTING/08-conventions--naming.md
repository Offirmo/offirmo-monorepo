
### Casing
In order to maximize readability, this repo uses snake_case:
```
function square_root(x: number): number { ...
```

CamelCase is reserved for types:
```
export type RelativePath = string
export type AbsolutePath = string
```

Exception: since CamelCase is commonly used in JS, we use Camelcase for public modules APIs.


### naming
In order to maximize readability, a few naming conventions:

* BEM-like variants: `SECⵧroot` `SECⵧleaf`


#### prefixes

* variables prefixed with `_` hints at local use / not exported `_updateꓽxyz()`
* Standard function names:
  * accessors:
    * `getꓽ`: `getꓽXYZ()`
    * `setꓽ`: `setꓽXYZ()`
    * `insert`: `insertꓽnode()`
  * assertions `assert`: `assertꓽnode_is_xyz()`
  * type guards `isꓽStory‿v2()`
* promises: `ↆfoo`

#### postfixes

* Unit: `getꓽduration‿days()` `getꓽduration‿seconds()` to clarify the unit if needed


#### TOSORT
