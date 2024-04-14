/** basic, always present structure of the app
 */
import 'react'

import ErrorBoundary from '@offirmo-private/react-error-boundary'

import IconUrl from './icon.png'

/////////////////////////////////////////////////

function Settings() {
	return (
		<div>
			<img src={IconUrl} alt="" style={{
				backgroundColor: 'transparent',
				maxWidth: '44px',
				maxHeight: '44px',
			}}/>
			TODO App Shell settings
		</div>
	)
}

/////////////////////////////////////////////////

export default Settings
