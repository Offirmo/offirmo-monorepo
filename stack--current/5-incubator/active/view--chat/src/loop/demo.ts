import generator_func from '../__fixtures/tour.js'
import { ChatPrimitivesConsole } from '../__fixtures/primitives--console.js'

import { create } from './index.js'

const chat = create({
	DEBUG: false,
	gen_next_step: generator_func() as any,
	primitives: new ChatPrimitivesConsole(),
})

await chat.start()
