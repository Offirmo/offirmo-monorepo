import generator_func_tour from '../__fixtures/tour.js'
import InfiniteChatGenerator from '../__fixtures/infinite.js'

import { ChatPrimitivesConsole } from '../__fixtures/primitives--terminal--vanilla.js'

import { create } from './index.js'

const chat = create({
	DEBUG: false,
	//gen_next_step: generator_func_tour(),
	gen_next_step: new InfiniteChatGenerator(),
	primitives: new ChatPrimitivesConsole(),
})

await chat.start()
