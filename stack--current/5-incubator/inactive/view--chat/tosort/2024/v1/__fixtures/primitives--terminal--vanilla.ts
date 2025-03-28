/** trivial terminal chat primitives for quick testing
 * NO need to be fancy!
 */
import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

import {PProgress} from 'p-progress'

import * as RichText from '@offirmo-private/rich-text-format'
import to_terminal from '@offirmo-private/rich-text-format--to-terminal'

import { type ChatPrimitives, type InputParameters, type SelectParameters } from '../primitives/types.js'
import * as console from 'node:console'

const DEBUG = false

export class ChatPrimitivesConsole<ContentType = string | RichText.Document> implements ChatPrimitives<ContentType> {
	rli = readline.createInterface({ input, output })
	has_separation = false

	constructor() {
	}

	get_string_representation(content: ContentType | string): string {
		if (typeof content === 'string') return content

		if (RichText.isꓽNode(content)) {
			return to_terminal(content)
		}

		throw new Error(`ChatPrimitivesConsole: advanced content not implemented!!`)
	}

	async display_message({ msg }: Parameters<ChatPrimitives<ContentType>['display_message']>[0]) {
		DEBUG && console.log('[ChatPrimitives.display_message(…)]')
		if (!this.has_separation) {
			console.log()
		}

		console.log(this.get_string_representation(msg))

		this.has_separation = false
	}

	async pretend_to_think({ duration_ms }: Parameters<ChatPrimitives<ContentType>['pretend_to_think']>[0]) {
		DEBUG && console.log('[ChatPrimitives.pretend_to_think(${duration_ms})]')

		console.log('[…thinking…]')

		await new Promise(resolve => setTimeout(resolve, duration_ms))
		//console.log('↳ ✔')

		this.has_separation = true
	}

	async display_task({
		msg_before,
		promises,
		msg_after,
	}: Parameters<ChatPrimitives<ContentType>['display_task']>[0]) {
		DEBUG && console.log('[ChatPrimitives.display_task(…)]')

		console.log(this.get_string_representation(msg_before))
		let result: any = undefined
		let error: Error | undefined = undefined
		const success = await PProgress.all(promises).then(
			(_res) => {
				result = _res
				return true
			},
			(_err) => {
				error = _err as any // TODO one day coerce to error using error utils
				return false
			})
		console.log('↳ ' + this.get_string_representation(msg_after(success, result || error)))

		this.has_separation = false
	}

	async input<T>({
		prompt,
		// we ignore the rest in this basic implementation
	}: InputParameters<ContentType, T>): Promise<string> {
		DEBUG && console.log('[ChatPrimitives.input(…)]')

		this.has_separation = false

		return this.rli.question(this.get_string_representation(prompt) + ' ')
	}

	async select<T>({
		prompt,
		default_value,
		options,
	}: SelectParameters<ContentType, T>): Promise<T> {
		DEBUG && console.log('[ChatPrimitives.select(…)]')
		const keys = Object.keys(options)

		let is_valid = false
		let answer: T = options[keys[0]!]!.value ?? (keys[0] as any)
		do {
			console.log(this.get_string_representation(prompt))
			keys.forEach((key, index) => {
				const option = options[key]!
				console.log(`- ${index + 1}. ${this.get_string_representation(option.cta || key)}`, (default_value !== undefined && option.value === default_value) ? '(default)' : '')
			})

			const raw_input = await this.rli.question('Your choice? (enter a number) ')
			//console.log(`[ChatPrimitives.select(...): you said: "${raw_input}"`)
			if (raw_input.trim() === '' && default_value !== undefined) {
				answer = default_value
				is_valid = true
			} else {
				const choice = parseInt(raw_input.trim(), 10)
				if (!Number.isInteger(choice) || choice < 1 || choice > keys.length) {
					console.log('Invalid choice, please try again.')
				} else {
					answer = options[keys[choice - 1]!]!.value ?? (keys[choice - 1] as any)
					is_valid = true
				}
			}
		} while (!is_valid)

		this.has_separation = false

		return answer
	}

	async spin_until_resolution<T>(p: Promise<T>): Promise<T> {
		DEBUG && console.log('[ChatPrimitives.spin_until_resolution(...)]')

		//console.log('[ChatPrimitives.spin_until_resolution()] begin…')
		//console.log('...')
		await p
		//console.log('↳ end.')

		this.has_separation = false

		return p
	}

	async setup() {
		DEBUG && console.log('[ChatPrimitives.setup()]')
		console.log()
	}

	async teardown() {
		DEBUG && console.log('[ChatPrimitives.teardown()]')
		this.rli.close()
	}
}
