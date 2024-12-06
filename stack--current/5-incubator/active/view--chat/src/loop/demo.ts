//import generator_func_tour from '../__fixtures/tour.js'
import InfiniteAreYouSureChatGenerator from '../__fixtures/demo--infinite-are-you-sure.js'

import { ChatPrimitivesConsole } from '../__fixtures/primitives--terminal--vanilla.js'

import { create } from './index.js'

const chat = create({
	DEBUG: false,
	//gen_next_step: generator_func_tour(),
	gen_next_step: new InfiniteAreYouSureChatGenerator(),
	primitives: new ChatPrimitivesConsole(),
})

await chat.start()
