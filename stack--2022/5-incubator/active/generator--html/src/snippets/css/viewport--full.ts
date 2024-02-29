import { Css‿str } from '@offirmo-private/ts-types-web'

/////////////////////////////////////////////////

// keep the top containers clean of anything but content
const CSS: Css‿str = `
/* make this app use the full viewport */
html, body {
	margin: 0;
	padding: 0;
	border: initial;
}
body, .o⋄full-viewport {
/* In order to get a true fullscreen when pinned on iPhone
 * - position must NOT be "fixed", or it strangely crops to the small viewport! (2023/11 iOs 16.6.1 iPhone 14)
 *   - absolute is ok
 * - height MUST be 100lvh;
 *
 * If :root has 0 padding, margin & border, no need to explicitly position, BUT:
 * - if the first child has a margin, it collapses with the parent!
 * Thus it's safer to position.
 */
	position: absolute;
	top: 0;
	left: 0;
	overflow: hidden;
	width: 100lvw;
	height: 100lvh;
}
`

/////////////////////////////////////////////////

export default CSS
