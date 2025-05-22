import { SpriteSheetDefinition } from '../../../../common/wc-animated-sprite-sheet/types.ts'
import url‿str from './sprite-sheet.png'

/////////////////////////////////////////////////

const DEF: SpriteSheetDefinition = {
	url‿str,
	rows: 6,
	cols: 7,
	frameRate: 7,

	// adjust this first
	padding: [ 15, 25, 28, 15 ],
	// then this
	row_spacing: 20,
	col_spacing: 15,
	// then this
	adjustments: {
		row: {
			0: {
				d: -2,
			},
			1: {
				d: -10,
			},
			2: {
				d: -18,
			},
			3: {
				d: -12,
			},
			4: {
				d: -4,
			},
			5: {
				d: -2,
			},
		},
		col: {
			0: {
				d: -7,
			},
			1: {
				d: -6,
			},
			2: {
				d: -7,
			},
			3: {
				d: -7,
			},
			4: {
				d: 0,
			},
			5: {
				d: 2,
			},
			6: {
				d: 0,
			},
		},
		frame: {},
	}
}

/////////////////////////////////////////////////

export {
	DEF,
}
