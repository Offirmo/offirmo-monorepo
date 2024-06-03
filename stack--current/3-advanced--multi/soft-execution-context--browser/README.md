
```ts
import {
  listenToErrorEvents,
   listenToUnhandledRejections,
   decorateWithDetectedEnv,
   getRootSXC,
} from '@offirmo-private/soft-execution-context--browser'
listenToUncaughtErrors()
listenToUnhandledRejections()
decorateWithDetectedEnv()

import { getLogger } from '@offirmo/universal-debug-api-browser'
getRootSXC().injectDependencies({ logger: getLogger({ suggestedLevel: 'silly' }) })
```

Extra injections:
* bowser results
