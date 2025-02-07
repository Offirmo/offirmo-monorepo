import type { BookCover } from '../model--book/index.ts'

import * as LOTR from './lotr/index.ts'
import * as WoW from './wow-alliance-of-lordaeron/index.ts'

export const COVERS: Array<BookCover> = [
	LOTR.COVER,
	WoW.COVER,
]
