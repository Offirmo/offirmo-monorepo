import type { BookCover } from '../model--book/index.ts'

import * as LOTR from './lotr/cover.ts'
import * as WoW from './wow-alliance-of-lordaeron/cover.ts'

export const COVERS: Array<BookCover> = [
	LOTR.COVER,
	WoW.COVER,
]
