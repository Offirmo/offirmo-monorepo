import assert from 'tiny-invariant'
import { type Immutable } from '@offirmo-private/ts-types'


/////////////////////////////////////////////////

type SectUID = string

interface Sect {
	uid: SectUID
	//alignment: 'orthodox' | 'evil'
	name: string
	//sect_master: NPC
	//ancestral_founder: NPC
}

/////////////////////////////////////////////////

export {
	type SectUID,
	type Sect,
}
