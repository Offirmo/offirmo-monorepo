Useful TypeScript utilities

```ts
import { Comparator, compare as _compare } from '@offirmo-private/ts-utils'

export { Comparator } // for convenience
export function compare(level_a: RelationshipLevel, comparator: Comparator, level_b: RelationshipLevel): boolean {
  return _compare<RelationshipLevel>(level_a, comparator, level_b, getꓽcorresponding_index)
}

import { isꓽarrayⵧempty } from '@offirmo-private/ts-utils'
import { isꓽcontainerⵧempty } from '@offirmo-private/ts-utils'
```


TODO https://www.typescriptlang.org/play?#code/MYewdgzgLgBCBGArGBeGBvAUDGALApgDaEgBcMA5AO4gBOhAJhQDTYygCuYU5AjAAwAmVgF9MmAPQSYUAJ4AHfHABmMAAYBrfLIhqYASwgxotfWADmAbQC6AbkyhIsLTtQwA8knzAoAOhcQABQIiACU9pjKdIGO0DAuKvHaEKEYbFIwgDLkgLwbgLR7MriGBkYAhmAwXBAlykogirQlUPrgMPDeJRwQSmohesBlYCCwJcDA+PLDYLLqJmbmei5ssSCE+L4k5sFIli7W4ZhiktIAMvhQFEYAtiVaMCUwylw+zeVQIDDmZ61nUPi0BmAorRrk0WiV4CAOLAoAQ4F4fEkdJEnqDyp8oABpZIAHk8yHwAA9fmAGEYAEreOgMbGzCzMCpgDSDKhgAB8rK2iHIeNC5ECLhAqh5NjSOFoZw4tHKeO8fgCnP2hwyckUiU0yUEeiKgQoBGIIAoMAAPpRONwKKEbPZYs4NW50VidAqIkCYuA4glBYiIIJUlgcBlAKDkgD4NwCUuwUikV7lUanB6o0Xt9+p0lFQlCVxXAwIRpvgAG5-CoQObxZnlAJZ9S9JbulZrDacnbaPb2ERAA
