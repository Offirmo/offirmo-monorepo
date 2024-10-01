/** trivial console-based chat primitives for testing
 * no need to be fancy.
 */
import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
const rl = readline.createInterface({ input, output })

import { type ChatPrimitives, type InputParameters } from '../primitives/types.js'
import type { InputStep } from '../steps'
import { Parameters } from '@offirmo-private/storypad/src/types/csf'

const DEBUG = false

const CHAT_CONSOLE: ChatPrimitives<string> = {


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

	input: async <T>({
		prompt,

		// we ignore the rest in this primitive implementation
		input_type,
		default_value,
		placeholder,
		normalizer,
		validators,
	}: InputParameters<string, T>): Promise<string> => {
		return rl.question(prompt + ' ')
	},

	spin_until_resolution: async ({promise}) => {
		DEBUG && console.log('[ChatPrimitives.spin_until_resolution(...)]')

		console.log('[ChatPrimitives.spin_until_resolution()] begin…')
		await promise
		console.log('↳ end.')
		return promise
	},

	setup: async () => {
		DEBUG && console.log('[ChatPrimitives.setup()]')
	},
	teardown: async () => {
		DEBUG && console.log('[ChatPrimitives.teardown()]')
	},
}

export default CHAT_CONSOLE
