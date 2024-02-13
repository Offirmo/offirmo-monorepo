

/////////////////////////////////////////////////

interface SpriteSheetDefinition {
	// asset
	url‿str: string
	padding: [number, number, number, number]

	// spritesheet
	rows: number
	cols: number
	frameRate: number
	row_spacing: number
	col_spacing: number

	adjustments: {
		row: {
			[row_index: number]: { dx?: number }
		},
		col: {
			[col_index: number]: { dy?: number }
		},
		frame: {
			[frame_index: number]: { skip?: true }
		},
	}
}

/////////////////////////////////////////////////

export {
	SpriteSheetDefinition
}
