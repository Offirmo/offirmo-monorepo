/** basic, always present structure of the app
 */
import 'react'

import ErrorBoundary from '@offirmo-private/react-error-boundary'

import { title } from '../../../../entry-points/~~gen/logs/spec.json'
import { message as version } from '../../../../entry-points/build--badge--version.json'
import { message as build_time } from '../../../../entry-points/build--badge--time.json'

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
			{title} {version} {build_time}
		</div>
	)
}


const HEIGTH = '25px'
const CORNER = '40px'
const has_inset_at_start = true
function FakeInset() {
	if (has_inset_at_start)
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
		<div className={'o⋄full-viewport debug'} style={{ pointerEvents: 'none' }}>

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
	return (
		<div>
			<div style={{ isolation: 'isolate' }}>
				{children}
			</div>

			{/* always on top */}
			<Signature/>
			<Settings/>
			<Login/>

			<div className={'o⋄usable-viewport debug'} style={{ border: 'dashed 2px yellow', pointerEvents: 'none' }}>{'&nbsp'}</div>

			<FakeInset />
		</div>
	)
}

/*
			<p className={'offirmo--layer--debug'}>test</p>
 */

/////////////////////////////////////////////////

export default AppShell
