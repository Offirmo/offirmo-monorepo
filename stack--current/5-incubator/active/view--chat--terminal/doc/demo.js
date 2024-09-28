import to_prettified_str from '@offirmo-private/prettify-any'

import { create as create_chat } from '@offirmo-private/view--chat'

import { create as create_tty_chat_ui } from '../src'

import { get_next_step1 } from '../../view--chat/doc/demo'

/////////////////////////////////////////////////

const DEBUG = false

const no_ui = {
	setup: async () => {},
	display_message: async () => { throw new Error('NO UI display_message') },
	read_answer: async () => { throw new Error('NO UI read_answer') },
	spin_until_resolution: async () => { throw new Error('NO UI spin_until_resolution') },
	pretend_to_think: async () => { throw new Error('NO UI pretend_to_think') },
	display_progress: async () => { throw new Error('NO UI display_progress') },
	teardown: async () => {},
}

/////////////////////////////////////////////////

const chat = create_chat({
	DEBUG,
	gen_next_step: get_next_step1(),
	ui: process.stdout.isTTY
		? create_tty_chat_ui({DEBUG})
		: no_ui,
	to_prettified_str,
})

chat.start()
	.then(() => console.log('bye'))
	.catch(console.error)
