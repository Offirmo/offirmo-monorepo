import { type ChatPrimitives } from '../implementation/types.js'

const CHAT_CONSOLE: ChatPrimitives<string> = {
	setup: async () => {
		console.log('[ChatPrimitives.setup()]')
	},

	display_message: async ({msg, choices}) => {
		console.log('[ChatPrimitives.display_message()]')

		console.log(msg)
		if (choices) console.log('Choices:', choices)
	},

	pretend_to_think: async ({duration_ms}) => { throw new Error('NO UI pretend_to_think') },

	pretend_to_work: async({
		msg_before,
		duration_ms,
		msg_after,
	}) => {
		console.log(msg_before)
		await new Promise(resolve => setTimeout(resolve, duration_ms))
		console.log(msg_after)
	},

	//read_answer: async () => { throw new Error('NO UI read_answer') },

	display_task: ({
		msg_before,
		progress_promise,
		msg_after,
	}) => {
		throw new Error(`NO UI display_task!`)
	},

	spin_until_resolution: async ({promise}) => promise,

	teardown: async () => {
		console.log('[ChatPrimitives.teardown()]')
	},
}

export default CHAT_CONSOLE
