# human readable timestamps

Set of functions generating string timestamps.

Killer feature = generating UTC (no TZ), human readable timestamps.


```js
import {
  getꓽUTC_timestamp‿ms,

  getꓽUTC_timestampⵧhuman_readable‿days,
  getꓽUTC_timestampⵧhuman_readable‿minutes,
  getꓽUTC_timestampⵧhuman_readable‿seconds,
  getꓽUTC_timestampⵧhuman_readable‿ms,

  getꓽISO8601ⵧextended‿ms,
  getꓽISO8601ⵧsimplified‿minutes,
  getꓽISO8601ⵧsimplified‿days,

  TEST_TIMESTAMP_MS,
} from '@offirmo-private/timestamps'
```

Examples:
getꓽUTC_timestamp‿ms()
1542780045627


getꓽUTC_timestampⵧhuman_readable‿ms()
20181121_06h00+45.632

getꓽUTC_timestampⵧhuman_readable‿seconds()
20190608_04h23+15

getꓽUTC_timestampⵧhuman_readable‿minutes()
20181121_06h00

getꓽUTC_timestampⵧhuman_readable‿days()
20181121


getꓽISO8601ⵧextended‿ms()
2024-03-21T21:49:33.344Z

getꓽISO8601ⵧsimplified‿minutes()
2024-03-21T21:49

getꓽISO8601ⵧsimplified‿days()
2024-03-21


## Roadmap
TODO valid in URLs ?
TODO valid in filenames ?
TODO https://devdocs.io/javascript/global_objects/date/parse
TODO stricter return types using TS format
