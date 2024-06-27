/** For marketing reasons, we want the "Game signature" (= game name) to be visible at all times.
 * So that it appears in all screenshots and videos
 * + brand awareness.
 * Since we're at it, we want to interweave debug infos: version, build, UUID...
 */
import 'react'

import { CSS_CLASS as SMALL_FONT_CLASS } from '@offirmo-private/font--smallest'

import { title } from '../../../../entry-points/~~gen/logs/spec.json'
import { message as version } from '../../../../entry-points/build--badge--version.json'
import { message as build_time } from '../../../../entry-points/build--badge--time.json'

/////////////////////////////////////////////////

function on_click() {
	alert('TODO about')
}

function Signature() {
	const NAME = '<Signature>'

	return (
		<button debug-id={NAME} key={NAME} onClick={on_click} className={'o⋄unstyled'} style={{
			minHeight: 'var(--o⋄min-target-size)',
			minWidth: 'var(--o⋄min-target-size)',
		}}>
			<div style={{
				lineHeight: '1em',
			}}>
				<span className={'o⋄text-readable-on-any-background'}>{/* TODO icon */ title /* TODO link to "about" */ /* TODO "by Offirmo" ? */}</span>
				<small className={SMALL_FONT_CLASS}>v{version} {build_time}</small>
				{/* TODO social links like Elvenar? */}
			</div>
		</button>
	)
}

/////////////////////////////////////////////////

export default Signature
