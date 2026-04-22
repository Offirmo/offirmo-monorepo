console.log('index.tsx')

import { Fragment, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Root, DEMO‿mm_txt } from '@digital-hoarder/web--core'

/////////////////////////////////////////////////

const OptionalStrictCheck = StrictMode //: Fragment

/////////////////////////////////////////////////

const root = createRoot(document.body)
root.render(
	<>
		<OptionalStrictCheck>
			<Root mm_txt={DEMO‿mm_txt} />
		</OptionalStrictCheck>
	</>,
)
