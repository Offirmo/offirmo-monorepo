import { SpriteSheetDefinition } from '../../../../common/wc-animated-sprite-sheet/types.ts'
import url‿str from './sprite-sheet.png'

/////////////////////////////////////////////////

const DEF: SpriteSheetDefinition = {
	url‿str,
	padding: [40, 30, 50, 30],

	rows: 4,
	cols: 5,
	frameRate: 5,
	row_spacing: 20,
	col_spacing: 20,

	adjustments: {
		row: {
			0: {
				dy: 14,
			},
			1: {
				dy: 13,
			},
			2: {
				dy: 15,
			},
			3: {
				dy: 15,
			},
		},
		col: {
			0: {
				dx: 10,
			},
			1: {
				dx: 7,
			},
			2: {
				dx: 0,
			},
			3: {
				dx: 5,
			},
			4: {
				dx: 7,
			},
		},
		frame: {
		},
	}
}

/////////////////////////////////////////////////

export {
	DEF,
}
