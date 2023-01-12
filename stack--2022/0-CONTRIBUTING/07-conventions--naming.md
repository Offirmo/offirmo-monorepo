
### Casing
In order to maximize readability, this repo uses snake_case:
```
function get_square_root(x: number): number { ...
```

CamelCase is reserved for types:
```
export type RelativePath = string
export type AbsolutePath = string
```

Exception: since CamelCase is commonly used in JS, we use Camelcase for public modules APIs.


### naming
In order to maximize readability, a few naming conventions:

* variables prefixed with _ hints at local use / not exported.
* get_XYZ
*
