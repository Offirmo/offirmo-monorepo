/** Shell = basic, always present structure of the app.
 */
import 'react'

import ErrorBoundary from '@offirmo-private/react-error-boundary'

/////////////////////////////////////////////////

function AppShell({ children }) {
	return ([
			<div key='app-shell__children' data-o-theme="dark--default" style={{ isolation: 'isolate' }}>
				<ErrorBoundary name={'app-shell__children'}>
					{children}
				</ErrorBoundary>
			</div>,

			// last to be always on top
			<div key='app-shell__chrome' style={{ isolation: 'isolate' }}>
				{/* nothing for now */}
			</div>,
	])
}

/////////////////////////////////////////////////

export default AppShell
