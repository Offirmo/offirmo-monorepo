/** basic, always present structure of the app
 */
import 'react'

import ErrorBoundary from '@offirmo-private/react-error-boundary'

//import useViewportGeometry from '../../../../to-export-to-own-package/use-viewport-geometry'
import SettingsIconUrl from './icon2.png'
import HelpIconUrl from './noun-question-1157126.svg'

/////////////////////////////////////////////////

function on_clickⵧsettings() {
	alert('TODO settings')
}
function on_clickⵧhelp() {
	alert('TODO help')
}

function Settings() {
	console.log('render Settings')

	let styles: React.CSSProperties = {
		// default, mobile first ideal position
		top: 'calc(var(--safe-area-inset-top) + var(--o⋄margin-from-screen-border--touch))',
		right: 'calc(var(--safe-area-inset-right) + var(--o⋄margin-from-screen-border--touch))',
		height: 'var(--o⋄min-target-size)',
		width: 'var(--o⋄min-target-size)',
	}

	/*const { hasꓽtitle_bar_area} = useViewportGeometry()
	if (hasꓽtitle_bar_area) {
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
	}*/

	return (<>
		<div debug-id="<Settings>" className='o⋄flex--directionꘌcolumn' style={{
			position: 'absolute',
			direction: 'rtl',
			...styles,
		}}>
			<button key="settings" onClick={on_clickⵧsettings} className={'o⋄unstyled'} style={{
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

			<button key="help" onClick={on_clickⵧhelp} className={'o⋄unstyled'} style={{
				minHeight: 'var(--o⋄min-target-size)',
				minWidth: 'var(--o⋄min-target-size)',
			}}>
				<img src={HelpIconUrl} className='black-icon-to-color--fg o⋄img-visible-on-any-background' alt="" style={{
					backgroundColor: 'transparent',
					width: 'calc(var(--o⋄icon-size--chrome) - 2px)',
					height: 'calc(var(--o⋄icon-size--chrome) - 2px)',
					margin: 'auto',
					filter: 'var(--o⋄filter⁚black-icon-to-color--fg) var(--o⋄filter⁚img-visible-on-any-background)',
				}}/>
			</button>
		</div>

	</>)
}

/////////////////////////////////////////////////

export default Settings
