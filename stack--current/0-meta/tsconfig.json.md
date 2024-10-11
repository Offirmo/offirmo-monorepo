# tsconfig

Too bad we can't add comments to the file ;)

## Introduction

This is a base config meant to be *extended* (through https://www.typescriptlang.org/tsconfig#extends)

REMINDER: the build script relax a few rules in dev mode (--watch), see `build-typescript.mjs`


## References

* "What is a tsconfig.json" https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
* "reference" https://www.typescriptlang.org/tsconfig
* VERY IMPORTANT https://www.typescriptlang.org/docs/handbook/module-resolution.html
* list of "bases" https://github.com/tsconfig/bases
* ? https://www.totaltypescript.com/tsconfig-cheat-sheet


## changelog

[https://devblogs.microsoft.com/typescript/](update marker)

### TODO

* 5.6 https://devblogs.microsoft.com/typescript/announcing-typescript-5-6/
* DOESNT WORK use  "typeRoots": ["node_modules/@types", "typings"] instead of replicating the reference to types?
* added nouncheckedsideeffectimports https://devblogs.microsoft.com/typescript/announcing-typescript-5-6/#the---nouncheckedsideeffectimports-option
* 

### PENDING 2024/10/11 5.7
https://devblogs.microsoft.com/typescript/announcing-typescript-5-7-beta/

path rewriting `allowImportingTsExtensions true 		"rewriteRelativeImportExtensions": true,`
es2024 

### 2024/08/29

big pass following some issues

latest version is 5.5 https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-5.html


### 2022/03/21

## content
https://www.typescriptlang.org/tsconfig/

### Type Checking

relaxed:
* `"noUnusedLocals": false,` intentionally set to false. This is not a correctness risk and my editor already outlines unused vars.
  It's convenient to over-import and this options makes it a chore to clean unused imports all the time.
* `"noUnusedParameters": false,` TODO one day set to true. This is not a correctness risk, my editor already outlines unused vars and don't see much danger.

### Modules

Very complicated!

Current understanding: by default, especially for building libs, the settings should be set to the most standard + modern + strict settings (ESM, ES2022, no tolerance)
HOWEVER when building a final app (especially node app) then we ad-hoc relax the setting, cf. tools/memory-sorter (seen experimentally, still don't fully understand)

Example of errors:
> import path from 'path'
> -> error TS1259: Module '"path"' can only be default-imported using the 'allowSyntheticDefaultImports' flag. This module is declared with 'export =', and can only be used with a default import when using the 'allowSyntheticDefaultImports' flag.
>
> error TS2349: This expression is not callable. (node_modules/micro-memoize/index")' has no call signatures.


* `useUnknownInCatchVariables` TODO understand
* `allowImportingTsExtensions` Not yet since it prevents Emit... We tweaked a Parcel resolver in the meantime.
* `allowUmdGlobalAccess` set to false to detect outdated modules

* `module` https://www.typescriptlang.org/tsconfig#module
  * IDEALLY set to the latest ES we support
  * this prop affects code GENERATION
  * XXX this property affects `moduleResolution` (see below)
    * 2023/09 especially since 5.2!!! https://devblogs.microsoft.com/typescript/announcing-typescript-5-2/#breaking-changes-and-correctness-fixes
* `moduleResolution` https://www.typescriptlang.org/docs/handbook/module-resolution.html
  * UNCLEAR allowed values
  * AFAIU particularly affects node.js apps
  * CURRENTLY (2023/09) a total mess since 5.2!!! https://devblogs.microsoft.com/typescript/announcing-typescript-5-2/#breaking-changes-and-correctness-fixes
  * CURRENTLY set to "bundler", let's see what happens...
* `resolveJsonModule` why not?
* `resolvePackageJsonExports` `resolvePackageJsonImports` should be true by default but doesn't hurt to re-force it


### Emit

* `downlevelIteration` seems to be desirable, together with "importHelpers" https://www.typescriptlang.org/tsconfig/#downlevelIteration
  * https://stackoverflow.com/questions/53441292/why-downleveliteration-is-not-on-by-default
  * HOWEVER the typescript playground present it as "Emit more compliant, but verbose and less performant JavaScript for iteration"
* `importHelpers` https://www.typescriptlang.org/tsconfig#importHelpers
  * according to TS playground "Allow importing helper functions from tslib once per project, instead of including them per-file."
  * AFAIU it's about avoiding duplication of helper functions
  * IDEALLY we want it to `true`:
    * smaller output ✔️
    * better performance ✔️
    * EXCEPT if publishing a very small package, could be better to have no deps
  * CURRENTLY set to true by default

### Interop

* `allowSyntheticDefaultImports` https://www.typescriptlang.org/tsconfig#allowSyntheticDefaultImports
  * AFAIU doesn't add any code, it's just type checking (cf. official doc)
  * IDEALLY we want it to `false`:
    * better detect non-ESM code ✔️
  * CURRENTLY intentionally set to `false` by default since we switched all to pure ESM, ad-hoc relaxing in specific module as needed
* `esModuleInterop` https://www.typescriptlang.org/tsconfig#esModuleInterop
  * AFAIU makes the generated code use helper functions
  * IDEALLY we want it to `false`:
    * no extra helper functions ✔️
    * better detect non-ESM code ✔️
  * BUT we may have to relax it to `true` due to: "most libraries with CommonJS/AMD/UMD modules didn’t conform as strictly as TypeScript’s implementation"
  * CURRENTLY set to false by default, ad-hoc relaxing in specific module as needed
* `isolatedModules` https://www.typescriptlang.org/tsconfig#isolatedModules
  * set to true always bc. parcel needs it, cf. https://parceljs.org/languages/typescript/#isolatedmodules
* `"verbatimModuleSyntax": true,` TODO!

### Backwards Compatibility

no need, we're using state-of-the-art syntax

### Language and Environment


### Projects


### Output Formatting






## TOSORT

TODO `	"extends": "@tsconfig/strictest/tsconfig.json",` cf. https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#supporting-multiple-configuration-files-in-extends


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
