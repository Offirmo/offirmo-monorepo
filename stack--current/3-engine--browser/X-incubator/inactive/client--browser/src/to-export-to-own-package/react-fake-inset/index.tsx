/** IF NOT PRESENT Add fake inset to the viewport to simulate a notch and/or a bottom bar
 * useful for TESTING, should not happen in prod!
 */
import { useState } from 'react'


/////////////////////////////////////////////////

const CORNER‿px = 40
const CORNER = `${CORNER‿px}px`
const NOTCH_HEIGHT = `${CORNER‿px * .9}px`
const NOTCH_BORDER_RADIUS = `${CORNER‿px * .9 * .75}px`
let globalⳇhasꓽinset: boolean | undefined = undefined
let globalⳇhasꓽfold: boolean | undefined = undefined
let globalⳇhasꓽtitlebar: boolean | undefined = undefined
let globalⳇhasꓽscreen_geometry: boolean | undefined = undefined // geometry bc. can have insets OR fold OR titlebar
const DEBUG = false

function FakeInset() {
	const NAME = "<FakeInset>"
	const [ hasꓽscreen_geometry, setꓽhasꓽscreen_geometry ] = useState<boolean | undefined>(globalⳇhasꓽscreen_geometry)
	DEBUG && console.log(`${NAME} render...`, {
		globalⳇhasꓽinset,
		globalⳇhasꓽfold,
		globalⳇhasꓽtitlebar,
		globalⳇhasꓽscreen_geometry,
		hasꓽscreen_geometry,
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

	if (globalⳇhasꓽscreen_geometry === undefined) {
		// first execution of this!
		DEBUG && console.log(`${NAME} render... 1st exec! Detecting initial screen geometry...`, {
			it: computed_styles.getPropertyValue('--safe-area-inset-top').trim(),
			ft: computed_styles.getPropertyValue('--fold-top').trim(),
			tx: computed_styles.getPropertyValue('--titlebar-area-x').trim(),
		})

		// the variable is set, we can now check if we naturally have an inset
		globalⳇhasꓽinset = computed_styles.getPropertyValue('--safe-area-inset-top').trim() !== '0px'
			|| computed_styles.getPropertyValue('--safe-area-inset-bottom').trim() !== '0px'
			|| computed_styles.getPropertyValue('--safe-area-inset-left').trim() !== '0px'
			|| computed_styles.getPropertyValue('--safe-area-inset-right').trim() !== '0px'

		globalⳇhasꓽfold = computed_styles.getPropertyValue('--fold-top').trim() !== '0px'
			|| computed_styles.getPropertyValue('--fold-bottom').trim() !== '0px'
			|| computed_styles.getPropertyValue('--fold-left').trim() !== '0px'
			|| computed_styles.getPropertyValue('--fold-right').trim() !== '0px'

		globalⳇhasꓽtitlebar = computed_styles.getPropertyValue('--titlebar-area-x').trim() !== '0px'
			|| computed_styles.getPropertyValue('--titlebar-area-y').trim() !== '0px'
			|| computed_styles.getPropertyValue('--titlebar-area-width').trim() !== '0px'
			|| computed_styles.getPropertyValue('--titlebar-area-height').trim() !== '0px'

		globalⳇhasꓽscreen_geometry = globalⳇhasꓽinset
			|| globalⳇhasꓽfold
			|| globalⳇhasꓽtitlebar // means it's intentionally desktop with titlebar activated = we don't want to fake an inset

		DEBUG && console.log(`${NAME} detected:`, {
			globalⳇhasꓽinset,
			globalⳇhasꓽfold,
			globalⳇhasꓽtitlebar,
		})

		if (globalⳇhasꓽscreen_geometry) {
			console.log(`🖼️ ${NAME}: screen already has funny geometry, not faking inset.`)
		}
		else {
			console.log(`🖼️ ${NAME}: plain screen detected: faking an inset!`)

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
		setꓽhasꓽscreen_geometry(globalⳇhasꓽscreen_geometry)
	}

	if (globalⳇhasꓽscreen_geometry) {
		// nothing to do
		return null
	}

	return (
		<div debug-id={NAME} key={NAME} className={'o⋄full-viewport'} style={{ pointerEvents: 'none' }}>

			<div key='notch' className={'debug'} style={{
				pointerEvents: 'auto', position: 'absolute',
				top: 0, left: '30%', width: '40%', height: NOTCH_HEIGHT,
				backgroundColor: 'black', textAlign: 'center', color: 'rgba(255, 255, 255, .2)',
				borderRadius: `0 0 ${NOTCH_BORDER_RADIUS} ${NOTCH_BORDER_RADIUS}`,
			}}>
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
