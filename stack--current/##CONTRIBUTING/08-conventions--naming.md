

## File system arborescence

### Package structure
Every package should ideally have exactly the same structure:
* `package.json` just a normal package.json
* `README.md` lightweight docs for this package
* `/src/` contains all the source code for this package, including unit tests
* `/src/00-embedded-deps/` (optional) = deps we copied internally to be no-deps (rare, for very small packages)
* `/docs/` (optional) detailed docs for the package, that render integration examples and props API
* `/docs/storypad/` 
* `/dist/` (optional) contains the built version of the package, if it is a library
* `/tosort/YYYY/` (optional) - area for parking code for reference or later refactoring. MUST be in a subfolder with the year of parking (to help evaluate the staleness)
* `CONTRIBUTING.md` (if public)


### /src structure
As mentioned above, the src folder should contain all the source code of a package


All the "components/parts" are organized in such a structure:
- `index.ts(x)` = the root, entry point
- `utils/` small utilities that could eventually be sent into a separate package
- `view/` = ui. strict hierarchical model: a component can only access subcomponents, not siblings or parents
- `services/` (optional) data providers and manipulation? remote state?
  - TODO one day clarify
- `controllers/` ??? components that are responsible for shared state management concerns and other stateful logic??
  - Every time there is a need to share some state or stateful logic between different parts of the application it should be extracted into a component that we call a "controller".
  - Important: major purpose of the controller is to share state or stateful logic only, not to sync the state with remote data. For that purpose we have a concept of a "service"
  - see also https://en.wikipedia.org/wiki/GRASP_(object-oriented_design)#Controller
  - TODO one day clarify


We follow a **FOLDER based approach**, where each component is in a named folder which contains standard-named files.
This is bc source files usually have "related" files, ex:
/my-component/
- `__specs/` heavy specs...
- `__fixtures/` for unit tests
- `__snapshots/` for unit tests https://jestjs.io/docs/snapshot-testing
- `*.spec.ts` (unit tests)
- `*.stories.tsx` for storybook
- `~~gen/` special case elements that are used to GENERATE the **current** folder. Ex. design notes, state-of-the-art reviews...
- `consts.ts` const USED IN SEVERAL FILES (no need to put here if only used in one file, declare it closest to its use)
- `index.css`
- `types.ts`
- `index.tsx` (the infamous barrel file ;))
- `reducers.ts`, `selectors.ts`...
- `_entrypoint.ts`
```
// ./examples
export * from './index.ts'
```



## Code

### case
In order to maximize readability, this repo uses snake_case:
```
function square_root(x: number): number { ...
```

CamelCase is reserved for types:
```
export type DirPathⳇRelative = string
export type FilePathⳇRelative = string
```

Exception: since CamelCase is commonly used in JS,
we use Camelcase for the external API of **public modules** (= published to npm).


### naming
In order to maximize readability, a few naming conventions:

#### BEM-inspired
Block / Element / Modifier
https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/

* sub-element: `SXC__root` `SXC__leaf`
* modifier/variant `SXC--before`  `SXC--after`


### prefixes

#### local/private use
variables prefixed with `_` ex. `_updateꓽxyz()` hints at
- internal/local/private use = non-public API
- should not be exported unless for unit tests

#### Accessors
* `getꓽ`: `getꓽXYZ()`
  * even better, prefer `deriveꓽXYZ()` when extracting derived data 
* `setꓽ`: `setꓽXYZ()`
* other: `insertꓽnode()`, `deleteꓽnode()`

Bad example:
```
import terminal_size from 'terminal-size'
terminal_size.columns // error it's a function = unclean name
getꓽterminal__size = much better
```

#### Tests
* assertions `assert`: `assertꓽnode_is_xyz()`
* type guards `isꓽStory‿v2()`
* property tests `hasꓽsome_property()` `hasꓽlast_bitꘌ1()`

#### Converters

* "get representation of X as Y" or "convert X into Y": `toꓽStory‿v2()`
* "normalize X": `normalizeꓽStory‿v2()`
* "derive Y from X": `deriveꓽxyz()`

#### Type hints
* promises:
  * `ↆfoo` (if fetched)
  * `ೱfoo` (if long task)

### postfixes

#### units
* Unit: `getꓽduration‿days()` `getꓽduration‿seconds()` to clarify the unit if needed
* abbreviation only if readable:
  * ms = millisecond ✅
  * min = minutes 🚫
* if not abbreviated, the unit should be plural

### test helpers

`itᐧshouldᐧbeᐧaᐧvalidᐧengine()`
