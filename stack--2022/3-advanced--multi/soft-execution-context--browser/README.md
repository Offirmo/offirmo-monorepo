
```ts
import {
  listenToErrorEvents,
   listenToUnhandledRejections,
   decorateWithDetectedEnv,
   getRootSEC,
} from '@offirmo-private/soft-execution-context--browser'
listenToUncaughtErrors()
listenToUnhandledRejections()
decorateWithDetectedEnv()

import { getLogger } from '@offirmo/universal-debug-api-browser'
getRootSEC().injectDependencies({ logger: getLogger({ suggestedLevel: 'silly' }) })
```

Extra injections:
* bowser results
