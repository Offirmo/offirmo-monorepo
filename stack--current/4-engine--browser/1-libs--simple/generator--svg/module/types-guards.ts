
import { type SVG } from './types.ts'

/////////////////////////////////////////////////

function is_SVG(x: any): x is SVG {
	return !!x.viewBox
}

/////////////////////////////////////////////////

export {
	is_SVG,
}
