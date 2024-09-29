import generator_func from '../__fixtures/tour.js'
import primitives from '../__fixtures/primitives--console.js'

import { create } from './index.js'

const chat = create({
	DEBUG: true,
	gen_next_step: generator_func() as any,
	primitives,
})

await chat.start()
