import ReactDOM from 'react-dom'

import { schedule_when_idle_but_within_human_perception } from '@offirmo-private/async-utils'
import ErrorBoundary from '@offirmo-private/react-error-boundary'

schedule_when_idle_but_within_human_perception(() => {
	console.log('🔄 starting react…')
	ReactDOM.render(
		<ErrorBoundary name={'tbrpg_root'}>
			<Root />
		</ErrorBoundary>,
		document.getElementById('root'),
	)
})
