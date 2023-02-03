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

* `module` set to the latest ES we support
* `esModuleInterop` intentionally set to false in order to better detect non-ESM code https://www.typescriptlang.org/tsconfig#esModuleInterop
  * NO!!! moved back to "true" due to still using cjs, ex. pb importing "memoize-one"
* `allowSyntheticDefaultImports` intentionally set to false in order to better detect non-ESM code
  * NO!!! moved back to "true" due to still using cjs, ex. pb importing "fetch-ponyfill" or sindre
* [`moduleResolution`](https://www.typescriptlang.org/docs/handbook/module-resolution.html) kept to node as the ecosystem is not ready :-(
  * [https://github.com/microsoft/TypeScript/issues/46452](update marker)
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
