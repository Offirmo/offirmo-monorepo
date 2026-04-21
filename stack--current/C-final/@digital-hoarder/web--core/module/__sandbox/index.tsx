console.log('index.tsx')

import { Fragment, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Root } from '@digital-hoarder/web--core'

/////////////////////////////////////////////////

const OptionalStrictCheck = StrictMode //: Fragment

/////////////////////////////////////////////////

import mm_txt from './mm.txt?raw'

const root = createRoot(document.body)
root.render(
<>
	<OptionalStrictCheck>
		<Root mm_txt={mm_txt} />
	</OptionalStrictCheck>
</>,
)
