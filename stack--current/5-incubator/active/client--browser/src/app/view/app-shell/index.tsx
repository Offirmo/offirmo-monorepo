/** Shell = basic, always present structure of the app.
 * This is a GAME app shell, so we want is as non-intrusive as possible,
 * to not break the immersion.
 * We also want the best display for Desktop / Mobile (2x most important targets)
 */
import 'react'

import ErrorBoundary from '@offirmo-private/react-error-boundary'

import { title } from '../../../entry-points/~~gen/logs/spec.json'
import { message as version } from '../../../entry-points/build--badge--version.json'
import { message as build_time } from '../../../entry-points/build--badge--time.json'

import Settings from './settings'

/////////////////////////////////////////////////

/** For marketing reasons, we want the "Game signature" (= game name) to be visible at all times.
 * So that it appears in all screenshots and videos
 * + brand awareness.
 * Since we're at it, we want to interweave debug infos: version, build, UUID...
 */
function Signature() {
	console.log('render Signature')
	let styles: React.CSSProperties = {
		// default = mobile first's ideal position
		top: 'calc(var(--safe-area-inset-top) + var(--o⋄margin-from-screen-border--visual))',
		left: 'calc(var(--safe-area-inset-left) + var(--o⋄margin-from-screen-border--visual))',
		fontSize: 'var(--o⋄icon-size--chrome)',
	}

	/*
	const { hasꓽtitle_bar_area } = useViewportGeometry()
	if (hasꓽtitle_bar_area) {
		// We want to use it of course!
		styles = {
			top: 'calc(var(--titlebar-area-y) + var(--o⋄margin-from-screen-border--visual))',
			left: 'calc(var(--titlebar-area-x) + var(--o⋄margin-from-screen-border--visual))',
			fontSize: 'calc(var(--titlebar-area-height) - 1.5 * var(--o⋄margin-from-screen-border--visual))',
		}
	}
	else {
		// we need to put that out of the user's way...
		// TODO desktop / mobile
	}*/

	return (
		<div key="signature" style={{
			position: 'absolute',
			lineHeight: '1em',
			...styles,
		}}>
			<span className={'o⋄text-readable-on-any-background'}>{/* TODO icon */ title /* TODO link to "about" */ /* TODO "by Offirmo" ? */}</span>
			<small className={'o⋄fontꘌsystem--mono'}>v{version} {build_time}</small>
			{/* TODO social links like Elvenar? */}
		</div>
	)
}

function AppShell({ children }) {
	return ([
			<div key='app-shell__children' style={{ isolation: 'isolate' }}>
				<ErrorBoundary name={'app-shell__children'}>
					{children}
				</ErrorBoundary>
			</div>,

			// last to be always on top
			<div key='app-shell__chrome' style={{ isolation: 'isolate' }}>
				<Signature/>
				<Settings/>
			</div>,
	])
}

/////////////////////////////////////////////////

export default AppShell
