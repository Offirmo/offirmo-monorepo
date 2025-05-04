/** Shell = basic, always present structure of the app.
 * This is a GAME app shell, so we want is as non-intrusive as possible,
 * to not break the immersion.
 * We also want the best display for Desktop / Mobile (2x most important targets)
 */
import 'react'

import ErrorBoundary from '@offirmo-private/react-error-boundary'


import Meta from './meta/index.tsx'
import FakeInset from '../../../to-export-to-own-package/react-fake-inset/index.tsx'

/////////////////////////////////////////////////


function SignatureX() {
	console.log('render Signature')
	let styles: React.CSSProperties = {
		// default = mobile first's ideal position
		top: 'calc(var(--safe-area-inset-top) + var(--o⋄margin-from-screen-border--visual))',
		left: 'calc(var(--safe-area-inset-left) + var(--o⋄margin-from-screen-border--visual))',
		fontSize: 'var(--o⋄icon-size--chrome)',
	}

	/*
	const { hasꓽtitle_bar_area } = useViewportGeometry()
	if (hasꓽtitle_bar_area) {
		// We want to use it of course!
		styles = {
			top: 'calc(var(--titlebar-area-y) + var(--o⋄margin-from-screen-border--visual))',
			left: 'calc(var(--titlebar-area-x) + var(--o⋄margin-from-screen-border--visual))',
			fontSize: 'calc(var(--titlebar-area-height) - 1.5 * var(--o⋄margin-from-screen-border--visual))',
		}
	}
	else {
		// we need to put that out of the user's way...
		// TODO desktop / mobile
	}*/

	return null
}

function AppShell({ children }) {
	return ([
			<div debug-id="<AppShell>__children" key='app-shell__children' style={{ isolation: 'isolate' }}>
				<ErrorBoundary name={'app-shell__children'}>
					{children}
				</ErrorBoundary>
			</div>,

			// last to be always on top
			<div debug-id='<AppShell>__chrome' key='app-shell__chrome' style={{ isolation: 'isolate' }}>
				<Meta />
			</div>,

			// special
			<FakeInset key='fake-inset'/>
	])
}

/////////////////////////////////////////////////

export default AppShell
