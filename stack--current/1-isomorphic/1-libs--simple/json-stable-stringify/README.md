private fork of https://github.com/substack/json-stable-stringify

turned to typescript + no incompatible cjs export + modernized

TODO add a feature to validate JSON

```
import stringifyⵧstable from '@offirmo-private/json-stable-stringify'
```

See also
* https://typia.io/docs/json/stringify/
* https://www.npmjs.com/package/fast-json-stringify
* "concern is with 512MB string literal size limitation"
* "At the least the code was not crashing (OOM) node  services while attempting to stringfy on a larger object"
  * "we are using safe-stable-stringify.
  We wanted something that would clear out circular refs
  and be able to redact sensitive fields for logging and it has done a great job for us,
  depending on your use case it might be a good fit
