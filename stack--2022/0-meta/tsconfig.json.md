## tsconfig

Too bad we can't add comments to the file ;)

### Introduction

This is a base config meant to be *extended* (through https://www.typescriptlang.org/tsconfig#extends)

REMINDER: the build script relax a few rules in dev mode (--watch), see `build-typescript.mjs`

Last update: [https://devblogs.microsoft.com/typescript/](update marker) 2022/03/21

### References

* "What is a tsconfig.json" https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
* "reference" https://www.typescriptlang.org/tsconfig
* VERY IMPORTANT https://www.typescriptlang.org/docs/handbook/module-resolution.html


### strictness
Relaxed:
* `"noUncheckedIndexedAccess": false,` TODO set to true. Meanwhile, this triggers too many errors and would need a long time to fix
* `"noUnusedParameters": false,` TODO one day set to true. This is not a correctness risk, my editor already outlines unused vars and don't see much value in this one.
* `"noUnusedLocals": false,` intentionally set to false. This is not a correctness risk and my editor already outlines unused vars.
                             It's convenient to over-import and this options makes it a chore to clean unused imports all the time.

### modules

Very complicated!

Current understanding: by default, especially for building libs, the settings should be set to the most standard + modern + strict settings (ESM, ES2022, no tolerance)
HOWEVER when building a final app (especially node app) then we ad-hoc relax the setting, cf. tools/memory-sorter (seen experimentally, still don't fully understand)

Example of errors:
> import path from 'path'
> -> error TS1259: Module '"path"' can only be default-imported using the 'allowSyntheticDefaultImports' flag. This module is declared with 'export =', and can only be used with a default import when using the 'allowSyntheticDefaultImports' flag.

> error TS2349: This expression is not callable. (node_modules/micro-memoize/index")' has no call signatures.

* `module` set to the latest ES we support https://www.typescriptlang.org/tsconfig#module
  * this prop affects code GENERATION
  * XXX this property affects `moduleResolution` (see below)

Compatibility:
* `esModuleInterop` https://www.typescriptlang.org/tsconfig#esModuleInterop
  * AFAIU makes the generated code use helper functions
  * IDEALLY we want it to `false`:
    * no extra helper functions ✔️
    * better detect non-ESM code ✔️
  * BUT we may have to relax it to `true` due to: "most libraries with CommonJS/AMD/UMD modules didn’t conform as strictly as TypeScript’s implementation"
  * CURRENTLY set to false by default, ad-hoc relaxing in specific module as needed
* `allowSyntheticDefaultImports` https://www.typescriptlang.org/tsconfig#allowSyntheticDefaultImports
  * AFAIU adds wrappers to the generated code that ends up undefined (?)
  * intentionally set to `false` in order to better detect non-ESM code
  * NO!! moved back to `true` due to still using cjs, ex. pb importing "fetch-ponyfill" or sindre
  * CURRENTLY set to false by default since we switched all to pure ESM, ad-hoc relaxing in specific module as needed
* `moduleResolution` https://www.typescriptlang.org/docs/handbook/module-resolution.html
  * AFAIU particularly affects node.js apps
  * CURRENTLY be set to "NodeNext" = most recent
  * BUT seen a need in node tools, ad-hoc relaxing in specific module as needed
* `isolatedModules` set to true always bc. parcel needs it, cf. https://parceljs.org/languages/typescript/#isolatedmodules


### TOSORT

* ??? https://www.typescriptlang.org/tsconfig#downlevelIteration
  * useful for older JS runtimes, we are not concerned
* ??? https://www.typescriptlang.org/tsconfig#preserveConstEnums
* TODO https://www.typescriptlang.org/tsconfig#plugins
* composite: disabled for now as it needs rootDir and not sure of the benefits


notes:

cjs+ESM cohabitation standard
```json
"esModuleInterop": true,
"allowSyntheticDefaultImports": true,
```
https://www.typescriptlang.org/tsconfig#allowSyntheticDefaultImports

Also the correct way to import React is `import * as React from 'react'`, cf. https://github.com/facebook/react/pull/18102
