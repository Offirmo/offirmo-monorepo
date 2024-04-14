/** basic, always present structure of the app
 */
import 'react'

import ErrorBoundary from '@offirmo-private/react-error-boundary'

import Settings from './settings'

/////////////////////////////////////////////////

function Login() {
	return (
		<div>
			TODO App Shell login
		</div>
	)
}

function Signature() {
	return (
		<div>
			TODO App Shell signature
		</div>
	)
}

function AppShell({children}) {
	return (
		<div>
			<Settings />
			<Login />
			<Signature />
			{children}
			<p className={'offirmo--layer--debug'}>test</p>
		</div>
	)
}

/////////////////////////////////////////////////

export default AppShell
