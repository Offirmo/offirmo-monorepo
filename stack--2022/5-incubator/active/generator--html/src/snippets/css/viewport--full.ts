import { Css‿str } from '@offirmo-private/ts-types-web'

/////////////////////////////////////////////////

// complex CSS,
// This is a COPY
// keep it in sync with ../../../../../../3-advanced--browser/css--framework/src/atomic/atomic--dimension.css
const CSS: Css‿str = `
/* make this app use exactly the full viewport.
 * This is VERY TRICKY CSS,
 * and it also requires a bit of JS in some situations.
 * see full explanation: https://github.com/Offirmo/offirmo-monorepo/blob/main/stack--2022/3-advanced--browser/css--framework/src/atomic/atomic--dimension.css
 */
:root, body {
	margin: 0;
	padding: 0;
	border: initial;
}
@layer temp-while-loading {
	o⋄full-viewport {
		position: absolute;
		top: 0;
		left: 0;
		overflow: hidden;
		width: 100lvw;
		height: 100lvh;
		max-width: initial;
	}
}
`

/////////////////////////////////////////////////

export default CSS
