/** Shell = basic, always present structure of the app.
 * This is a GAME app shell, so we want is as non-intrusive as possible,
 * to not break the immersion.
 * We also want the best display for Desktop / Mobile (2x most important targets)
 */
import 'react'

import ErrorBoundary from '@offirmo-private/react-error-boundary'

import useViewportGeometry from '../../../to-export-to-own-package/use-viewport-geometry'
import { title } from '../../../../entry-points/~~gen/logs/spec.json'
import { message as version } from '../../../../entry-points/build--badge--version.json'
import { message as build_time } from '../../../../entry-points/build--badge--time.json'

import Settings from './settings'

/////////////////////////////////////////////////

/** For marketing reasons, we want the "Game signature" (= game name) to be visible at all times.
 * So that it appears in all screenshots and videos
 * + brand awareness.
 * Since we're at it, we want to interweave debug infos: version, build, UUID...
 */
function Signature() {
	let styles: React.CSSProperties = {
		// default = mobile first's ideal position
		top: 'calc(var(--safe-area-inset-top))',
		right: 'calc(var(--safe-area-inset-right))',
	}

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
	}

	return (
		<div key="signature" style={{
			position: 'absolute',
			lineHeight: '1em',
			...styles,
		}}>
			<span>{/* TODO icon */ title /* TODO link to "about" */ /* TODO "by Offirmo" ? */}</span>
			<small className={'o⋄fontꘌsystem--mono'}>v{version} {build_time}</small>
			{/* TODO social links like Elvenar? */}
		</div>
	)
}


const HEIGTH = '25px'
const CORNER = '40px'
const already_has_inset = true // TODO url hash
function FakeInset() {
	if (already_has_inset)
		return null;

	/*console.log('render')
	if (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-top')) > 0) {
		// there is already an inset
		return null
	}*/

	// force inset
	document.documentElement.style.setProperty(
		'--safe-area-inset-top',
		'47px', // iphone 14
	)
	document.documentElement.style.setProperty(
		'--safe-area-inset-bottom',
		'34px', // iPhone 14
	)

	return (
		<div key="fakeInset" className={'o⋄full-viewport debug'} style={{ pointerEvents: 'none' }}>

			<div className={'debug'} style={{
				pointerEvents: 'auto', position: 'absolute',
				top: 0, left: '30%', width: '40%', height: HEIGTH, backgroundColor: 'black', textAlign: 'center', color: 'rgba(255, 255, 255, .2)' }}>
			</div>

			<div className={'debug'} style={{
				pointerEvents: 'auto', position: 'absolute',
				bottom: '10px',
				left: '30%', width: '40%',
				height: '6px',
				backgroundColor: 'black',
				borderRadius: '3px',
			}}>
			</div>

			<div className={'debug'} style={{
				pointerEvents: 'auto', position: 'absolute', top: 0, left: 0, width: CORNER, height: CORNER,
				borderTopLeftRadius: CORNER,
				backgroundColor: 'transparent',
				boxShadow: `-${CORNER} -${CORNER} 0 ${CORNER} black`,
			}}/>

			<div className={'debug'} style={{
				pointerEvents: 'auto', position: 'absolute', top: 0, right: 0, width: CORNER, height: CORNER,
				borderTopRightRadius: CORNER,
				backgroundColor: 'transparent',
				boxShadow: `${CORNER} -${CORNER} 0 ${CORNER} black`,
			}}/>

			<div className={'debug'} style={{
				pointerEvents: 'auto', position: 'absolute', bottom: 0, left: 0, width: CORNER, height: CORNER,
				borderBottomLeftRadius: CORNER,
				backgroundColor: 'transparent',
				boxShadow: `-${CORNER} ${CORNER} 0 ${CORNER} black`,
			}}/>

			<div className={'debug'} style={{
				pointerEvents: 'auto', position: 'absolute', bottom: 0, right: 0, width: CORNER, height: CORNER,
				borderBottomRightRadius: CORNER,
				backgroundColor: 'transparent',
				boxShadow: `${CORNER} ${CORNER} 0 ${CORNER} black`,
			}}/>

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

			<FakeInset />,
	])
}

/////////////////////////////////////////////////

export default AppShell
