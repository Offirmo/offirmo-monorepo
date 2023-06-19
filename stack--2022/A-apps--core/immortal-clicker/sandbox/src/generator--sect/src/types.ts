import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'


/////////////////////////////////////////////////

interface NPC {

}

interface Sect {
	//alignment: 'orthodox' | 'evil'
	name: string
	//sect_master: NPC
	//ancestral_founder: NPC
}

/////////////////////////////////////////////////

export {
	type Sect,
}
