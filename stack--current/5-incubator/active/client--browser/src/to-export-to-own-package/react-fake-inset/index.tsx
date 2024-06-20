/**
 */
import 'react'


/////////////////////////////////////////////////

const HEIGTH = '25px'
const CORNER = '40px'
const already_has_inset = true // TODO url hash
function FakeInset() {
	console.log(`<FakeInset> render...`)

	if (already_has_inset)
		return null;

	/*if (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-top')) > 0) {
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
		<div key="fakeInset" className={'o⋄full-viewport'} style={{ pointerEvents: 'none' }}>

			<div key='notch' className={'debug'} style={{
				pointerEvents: 'auto', position: 'absolute',
				top: 0, left: '30%', width: '40%', height: HEIGTH, backgroundColor: 'black', textAlign: 'center', color: 'rgba(255, 255, 255, .2)' }}>
			</div>

			<div key='bottom' className={'debug'} style={{
				pointerEvents: 'auto', position: 'absolute',
				bottom: '10px',
				left: '30%', width: '40%',
				height: '6px',
				backgroundColor: 'black',
				borderRadius: '3px',
			}}>
			</div>

			<div key='corner--tl' className={'debug'} style={{
				pointerEvents: 'auto', position: 'absolute', top: 0, left: 0, width: CORNER, height: CORNER,
				borderTopLeftRadius: CORNER,
				backgroundColor: 'transparent',
				boxShadow: `-${CORNER} -${CORNER} 0 ${CORNER} black`,
			}}/>

			<div key='corner--tr' className={'debug'} style={{
				pointerEvents: 'auto', position: 'absolute', top: 0, right: 0, width: CORNER, height: CORNER,
				borderTopRightRadius: CORNER,
				backgroundColor: 'transparent',
				boxShadow: `${CORNER} -${CORNER} 0 ${CORNER} black`,
			}}/>

			<div key='corner--bl' className={'debug'} style={{
				pointerEvents: 'auto', position: 'absolute', bottom: 0, left: 0, width: CORNER, height: CORNER,
				borderBottomLeftRadius: CORNER,
				backgroundColor: 'transparent',
				boxShadow: `-${CORNER} ${CORNER} 0 ${CORNER} black`,
			}}/>

			<div key='corner--br' className={'debug'} style={{
				pointerEvents: 'auto', position: 'absolute', bottom: 0, right: 0, width: CORNER, height: CORNER,
				borderBottomRightRadius: CORNER,
				backgroundColor: 'transparent',
				boxShadow: `${CORNER} ${CORNER} 0 ${CORNER} black`,
			}}/>

		</div>
	)
}

/////////////////////////////////////////////////

export default FakeInset
