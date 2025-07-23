//import generator_func_tour from '../__fixtures/tour.js'
import InfiniteAreYouSureChatGenerator from '../__fixtures/demo--infinite-are-you-sure.js'
import generator_funcⵧyve from '../__fixtures/demo--yve.js'

import { ChatPrimitivesConsole } from '../__fixtures/primitives--terminal--vanilla.js'

import { create } from './index.js'

const chat = create({
	DEBUG: false,
	primitives: new ChatPrimitivesConsole(),

	gen_next_step: generator_funcⵧyve(),
	//gen_next_step: new InfiniteAreYouSureChatGenerator(),
})

await chat.start()
