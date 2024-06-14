import 'react'
import '@offirmo-private/css--framework'

import './index.css'
import AppShell from './app-shell'
import AppContent from './app-content'

/////////////////////////////////////////////////

export default function Root() {
	return (
		<AppShell>
			<AppContent />
		</AppShell>
	)
}
