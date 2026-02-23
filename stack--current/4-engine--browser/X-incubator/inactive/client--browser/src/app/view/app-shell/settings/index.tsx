import 'react'

import ErrorBoundary from '@monorepo-private/react--error-boundary'

import SettingsIconUrl from './icon2.png'

/////////////////////////////////////////////////

function on_click() {
	alert('TODO settings')
}

function Settings() {
	const NAME = '<Settings>'

	return (
		<button debug-id={NAME} key={NAME} onClick={on_click} className={'o⋄unstyled'} style={{
			minHeight: 'var(--o⋄min-target-size)',
			minWidth: 'var(--o⋄min-target-size)',
		}}>
			<img src={SettingsIconUrl} className='black-icon-to-color--fg o⋄img-visible-on-any-background' alt="" style={{
				backgroundColor: 'transparent',
				width: 'var(--o⋄icon-size--chrome)',
				height: 'var(--o⋄icon-size--chrome)',
				margin: 'auto',
				filter: 'var(--o⋄filter⁚black-icon-to-color--fg) var(--o⋄filter⁚img-visible-on-any-background)',
			}}/>
		</button>
	)
}

/////////////////////////////////////////////////

export default Settings
