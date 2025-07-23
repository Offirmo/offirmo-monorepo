import type { BookCover } from '../model--book/types/types.ts'

import * as LOTR from './lotr/index.ts'
import * as WoW from './wow-alliance-of-lordaeron/index.ts'

export const LOTR_COVER = LOTR.COVER
export const WoW_COVER = WoW.COVER

export const COVERS: Array<BookCover> = [
	LOTR_COVER,
	WoW_COVER,
]
