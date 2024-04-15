/** basic, always present structure of the app
 */
import 'react'

import ErrorBoundary from '@offirmo-private/react-error-boundary'

import IconUrl from './icon2.png'

/////////////////////////////////////////////////

function on_click() {
	alert('TODO settings')
}

function Settings() {
	return (
		<button className={'o⋄unstyled'} style={{
			position: 'absolute',
			top: 'calc(var(--safe-area-inset-top) + var(--o⋄touch-margin-from-screen-border))',
			right: 'calc(var(--safe-area-inset-right) + var(--o⋄touch-margin-from-screen-border))',
			minHeight: 'var(--o⋄min-target-size)',
			maxHeight: 'var(--o⋄min-target-size)',
			minWidth: 'var(--o⋄min-target-size)',
		}} onClick={on_click}>
			<img src={IconUrl} className={'black-icon-to-color--fg o⋄fill-parent'} alt="" style={{
				backgroundColor: 'transparent',
				width: 'var(--o⋄icon-size--chrome)',
				height: 'var(--o⋄icon-size--chrome)',
				margin: 'auto',
			}}/>
		</button>
	)
}

/////////////////////////////////////////////////

export default Settings
