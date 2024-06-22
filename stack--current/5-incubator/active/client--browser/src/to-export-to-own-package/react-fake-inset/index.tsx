/** IF NOT PRESENT Add fake inset to the viewport to simulate a notch and/or a bottom bar
 * useful for TESTING, should not happen in prod!
 */
import { useState } from 'react'


/////////////////////////////////////////////////

const HEIGHT = '25px'
const CORNER = '40px'
let globalⳇhasꓽinitial_inset: boolean | undefined = undefined
function FakeInset() {
	const NAME = "<FakeInset>"
	const [ hasꓽinitial_inset, setꓽhasꓽinitial_inset ] = useState<boolean | undefined>(globalⳇhasꓽinitial_inset)
	console.log(`${NAME} render...`, {
		globalⳇhasꓽinitial_inset,
		hasꓽinitial_inset,
	})

	if (document.readyState !== 'complete') {
		// viewport sizing is not always available before the page is loaded
		return null
	}

	const computed_styles = getComputedStyle(document.documentElement)
	const currentInsetTop = computed_styles.getPropertyValue('--safe-area-inset-top')
	if (String(currentInsetTop) === '') {
		// we need Offirmo CSS framework to be loaded
		return null
	}

	if (globalⳇhasꓽinitial_inset === undefined) {
		// first execution of this!
		console.log(`${NAME} render... 1st exec! Detecting initial inset...`)

		// the variable is set, we can now check if we naturally have an inset
		globalⳇhasꓽinitial_inset = currentInsetTop !== '0px'
			|| computed_styles.getPropertyValue('--safe-area-inset-bottom') !== '0px'
			|| computed_styles.getPropertyValue('--safe-area-inset-left') !== '0px'
			|| computed_styles.getPropertyValue('--safe-area-inset-right') !== '0px'

		if (globalⳇhasꓽinitial_inset) {
			console.log(`${NAME} render... inset already present.`)
		}
		else {
			console.log(`${NAME} render... faking an inset!`)

			// TODO better fake one depending on the device orientation
			document.documentElement.style.setProperty(
				'--safe-area-inset-top',
				'47px', // iphone 14
			)
			document.documentElement.style.setProperty(
				'--safe-area-inset-bottom',
				'34px', // iPhone 14
			)
		}
		setꓽhasꓽinitial_inset(globalⳇhasꓽinitial_inset)
	}

	if (globalⳇhasꓽinitial_inset) {
		// nothing to do
		return null
	}

	return (
		<div debug-id={NAME} key={NAME} className={'o⋄full-viewport'} style={{ pointerEvents: 'none' }}>

			<div key='notch' className={'debug'} style={{
				pointerEvents: 'auto', position: 'absolute',
				top: 0, left: '30%', width: '40%', height: HEIGHT, backgroundColor: 'black', textAlign: 'center', color: 'rgba(255, 255, 255, .2)' }}>
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
