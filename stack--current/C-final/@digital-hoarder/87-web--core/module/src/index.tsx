import { assert_from } from '@monorepo-private/assert'
import type { Immutable } from '@monorepo-private/ts--types'

import '@monorepo-private/css--framework'
import './index.css'

import * as DHLib from '@digital-hoarder/model'
import { Memeplex } from "./memeplex";

import DEMO‿mm_txt from './mm.txt?raw'

/////////////////////////////////////////////////

export interface Props {
	mm_txt: string
}

export function Root({mm_txt = DEMO‿mm_txt}: Props) {
	console.log('🔄 <Root/>', {mm_txt})

	const memplex = DHLib.createꓽDigitalHordingMemeplexⵧfrom_mm_txt(mm_txt)

	return <Memeplex memeplex={memplex} _debug={false} />
}

/////////////////////////////////////////////////

export { DEMO‿mm_txt }
