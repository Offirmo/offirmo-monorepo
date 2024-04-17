import 'react'

import AppShell from './app-shell'
import AppContent from './app-content'
//import AppContent from './app-content--debug-viewport'
//const AppContent = () => null

/////////////////////////////////////////////////

export default function App() {
	return (
		<AppShell>
			<AppContent />
		</AppShell>
	)
}
