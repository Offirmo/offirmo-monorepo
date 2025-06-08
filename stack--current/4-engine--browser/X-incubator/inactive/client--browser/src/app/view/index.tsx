import 'react'

import AppShell from './app-shell'
import AppContent from './app-content'
import loadꓽcss from './css'

/////////////////////////////////////////////////

export default function Root() {
	loadꓽcss()

	return (
		<AppShell>
			<AppContent />
		</AppShell>
	)
}
