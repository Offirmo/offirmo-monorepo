import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/state-utils'

import { ChatPrimitivesConsole } from '@offirmo-private/view--chat/primitives--terminal--vanilla'
import { create } from '@offirmo-private/view--chat'
import { HypermediaBrowserWithChatInterface } from './browser.js'
import { AppHateoasServer } from './server.js'

/////////////////////////////////////////////////

const chat = create({
	DEBUG: false,
	gen_next_step: new HypermediaBrowserWithChatInterface(new AppHateoasServer()),
	primitives: new ChatPrimitivesConsole(),
})

console.log('/////////////////////////////////////////////////')
await chat.start()

/////////////////////////////////////////////////
