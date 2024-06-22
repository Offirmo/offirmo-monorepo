/** basic, always present structure of the app
 */
import 'react'

import ErrorBoundary from '@offirmo-private/react-error-boundary'

import Signature from '../signature/index.tsx'
import Help from '../help/index.tsx'
import Settings from '../settings/index.tsx'

/////////////////////////////////////////////////

function Meta() {
	const NAME = '<Meta>'

	let styles: React.CSSProperties = {
		// default, mobile first ideal position
		top: 'calc(var(--safe-area-inset-top) + var(--o⋄margin-from-screen-border--touch))',
		right: 'calc(var(--safe-area-inset-right) + var(--o⋄margin-from-screen-border--touch))',
		//maxWidth: ''
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
	 */

	return (
		<div debug-id={NAME} key={NAME} className='o⋄flex--directionꘌrow' style={{
			backgroundColor: `rgba(0, 0, 0, 0.3)`,
			position: 'absolute',
			...styles,
		}}>
			<Signature />
			<Help />
			<Settings />
		</div>
	)
}

/////////////////////////////////////////////////

export default Meta
