/** trivial console-based chat primitives for testing
 * no need to be fancy.
 */
import { type ChatPrimitives } from '../implementation/types.js'

const DEBUG = false

const CHAT_CONSOLE: ChatPrimitives<string> = {
	setup: async () => {
		DEBUG && console.log('[ChatPrimitives.setup()]')
	},

	display_message: async ({msg, choices}) => {
		DEBUG && console.log('[ChatPrimitives.display_message()]')

		console.log(msg)
		if (choices) {
			console.log('Choices:', choices)
		}
	},

	pretend_to_think: async ({duration_ms}) => {
		DEBUG && console.log('[ChatPrimitives.pretend_to_think(${duration_ms})]')

		console.log('…')
		await new Promise(resolve => setTimeout(resolve, duration_ms))
		console.log('↳ ✔')
	},

	pretend_to_work: async ({
		msg_before,
		duration_ms,
		msg_after,
	}) => {
		DEBUG && console.log(`[ChatPrimitives.pretend_to_work(${duration_ms})]`)

		console.log(msg_before)
		await new Promise(resolve => setTimeout(resolve, duration_ms))
		console.log('↳ ' + msg_after)
	},

	//read_answer: async () => { throw new Error('NO UI read_answer') },

	display_task: async ({
		msg_before,
		promise,
		msg_after,
	}) => {
		DEBUG && console.log('[ChatPrimitives.display_task(...)]')

		console.log(msg_before)
		let result: any = undefined
		let error: Error | undefined = undefined
		const success = await promise.then(
				(_res) => {
					result = _res
					return true
				},
				(_err) => {
					error = _err as any // TODO one day coerce to error using error utils
					return false
				})
		console.log('↳ ' + msg_after(success, result || error))
	},

	spin_until_resolution: async ({promise}) => {
		DEBUG && console.log('[ChatPrimitives.spin_until_resolution(...)]')

		console.log('[ChatPrimitives.spin_until_resolution()] begin…')
		await promise
		console.log('↳ end.')
		return promise
	},

	teardown: async () => {
		DEBUG && console.log('[ChatPrimitives.teardown()]')
	},
}

export default CHAT_CONSOLE
