

## File system arborescence

- `view`
  - strict hierarchical model: a component can only access sub-components, not siblings or parents
- `services`
  - data provider and manipulation
- `controllers`
  - Every time there is a need to share some state or stateful logic between different parts of the application it should be extracted into a component that we call a "controller".
  - Important: major purpose of the controller is to share state or stateful logic only, not to sync the state with remote data. For that purpose we have a concept of a "service"


### Package structure
Every package should ideally have exactly the same structure:

/docs (optional) - detailed docs for the package, that render integration examples and props API
/src - contains all the source code for this package, including unit tests
/src0 (optional) contains unusual / special case elements that are used to GENERATE the src folder. Ex. design notes, state-of-the-art reviews...
/dist (optional) - contains the built version of the package, if it is a library
package.json - just a normal package.json
README.md - lightweight docs for this package
CONTRIBUTING.md


### /src structure
As mentioned above, the src folder should contain all the source code of a package

We follow a **FOLDER based approach**, where each component is in a named folder which contains standard-named files.
This is bc source files usually have "related" files, ex:
/my-component/
↳ __fixtures for unit tests
↳ __snapshots for unit tests https://jestjs.io/docs/snapshot-testing
↳ __spec.tsx (unit tests)
↳ __specs for unit tests (when grouped)
↳ ??? examples.tsx for storybook
↳ ~~generation for codegen / LLM
↳ consts.ts const USED IN SEVERAL FILES (no need to put here if only used in one file, declare it closest to its use)
↳ index.css
↳ index.tsx
↳ reducers, selectors...
↳ types.ts

All the "components/parts" are organized in such a structure:
- `index.ts(x)` = the root, entry point
- `utils/` small utilities that could eventually be sent into a separate package
- ... (to clarify)
- `tosort/YYYY` temp to park files we may want to salvage / refer to. MUST have a year so that we know when it's time to part ;)
- `embedded-deps/`
- `controllers/` ??? components that are responsible for shared state management concerns and other stateful logic??
  - see also https://en.wikipedia.org/wiki/GRASP_(object-oriented_design)#Controller
- `services/` (optional) data providers? remote state?
- `view/` ui?


## Code

### case
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


### naming
In order to maximize readability, a few naming conventions:

#### BEM-inspired
Block / Element / Modifier
https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/

* sub-element: `SXC__root` `SXC__leaf`
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
import terminal_size from 'terminal-size'
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
