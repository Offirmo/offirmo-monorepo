
### Explanation

* `"process": "^0"`
  * seen requested upon parcel error 2025/04
```
@parcel/resolver-default: ENOENT: no such file or directory, stat 
'~/work/src/off/offirmo-monorepo/stack--current/3-engine--browser/0-dev-tools/parcel--toolbox/node_modules/process'
```
* `"sharp": "^0.31"`
  * needed by image manipulation
  * seen requested upon parcel error 2025/04
```
@parcel/resolver-default: ENOENT: no such file or directory, stat 
'~/work/src/off/offirmo-monorepo/stack--current/3-engine--browser/0-dev-tools/parcel--toolbox/node_modules/sharp'
```

## Tosort


* `"@parcel/reporter-bundle-analyzer": "^2"`
  * for https://parceljs.org/features/production/#bundle-analyzer
* `"@offirmo-private/parcel-resolver": "*"`
  * this monorepo custom resolver for hacks
* `"@parcel/config-default": "^2"`
  * no need, transitively installed by `@offirmo-private/parcel-config`

* `"@parcel/core": "^2"`
  * was it needed at some point?
