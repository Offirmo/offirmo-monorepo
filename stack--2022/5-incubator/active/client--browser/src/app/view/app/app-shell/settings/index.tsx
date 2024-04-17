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
	let styles: React.CSSProperties = {
		// default, mobile first ideal position
		top: 'calc(var(--safe-area-inset-top) + var(--o⋄margin-from-screen-border--touch))',
		right: 'calc(var(--safe-area-inset-right) + var(--o⋄margin-from-screen-border--touch))',
	}

	const has_titlebar_area = true; // TODO dynamic with hook
	if (has_titlebar_area) {
		// We want to use the title bar of course!
		styles = {
			top: 'calc(var(--titlebar-area-y))',
			left: 'calc(var(--titlebar-area-x) + var(--titlebar-area-width) - var(--titlebar-area-height))',
			height: 'var(--titlebar-area-height)',
			width: 'var(--titlebar-area-height)',
		}
	}
	else {
		// we need to put that out of the user's way...

	}

	return (
		<button key="settings" className={'o⋄unstyled'} style={{
			position: 'absolute',
			minHeight: 'var(--o⋄min-target-size)',
			minWidth: 'var(--o⋄min-target-size)',
			maxHeight: 'var(--o⋄min-target-size)',
			...styles,
		}} onClick={on_click}>
			<img src={IconUrl} className={'black-icon-to-color--fg'} alt="" style={{
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
