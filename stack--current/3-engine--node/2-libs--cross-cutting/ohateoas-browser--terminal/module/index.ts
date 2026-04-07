import type { Immutable, JSONPrimitiveType } from '@monorepo-private/ts--types'
import { getꓽUTC_timestamp‿ms } from '@monorepo-private/timestamps'
import * as readline from 'node:readline'
import * as readlinePromise from 'node:readline/promises'
import { question } from 'zx'

import { renderⵧto_terminal } from '@monorepo-private/rich-text-format--to-terminal'
import { normalizeꓽuri‿str, type Uri‿str } from '@monorepo-private/ts--types--web'
import * as RichText from '@monorepo-private/rich-text-format'
import { prettifyꓽjson } from '@monorepo-private/prettify-any'
import {
	normalize,
	normalize_unicode,
	capitalizeⵧfirst,
	to_lower_case,
	trim,
	coerce_blanks_to_single_spaces,
	coerce_delimiters_to_space,
} from '@monorepo-private/normalize-string'

import { createꓽserver } from '../../../../1-isomorphic/2-libs--cross-cutting/ohateoas/module/src/__fixtures/example--01-hello-world/index.ts'
//import { createꓽserver } from '../__fixtures/example--02-hello-world-interactive/index.ts'
//import { createꓽserver } from '../../../../1-isomorphic/2-libs--cross-cutting/ohateoas/module/src/__fixtures/example--10-check-for-updates/index.ts'
//import { createꓽserver } from '../~~sandbox/example--tbrpg/server/index.ts'
//import { createꓽserver } from '../~~sandbox/example--tbrpg/server/index.ts'

import {
	type State as FrameState,
	create,
	deriveꓽaction,
	getꓽlinks, getꓽlink‿str,
	getꓽaction_blueprints,
	getꓽcta, OHALinkRelation,
} from '@monorepo-private/ohateoas'
import * as StateLib from '@monorepo-private/ohateoas'

import assert from '@monorepo-private/assert/v1'
import * as process from 'node:process'

/////////////////////////////////////////////////

const URI__ROOT = normalizeꓽuri‿str('')

const SERVER = createꓽserver()

/////////////////////////////////////////////////

interface State extends FrameState {

}

function _display_state(s: State) {
	console.log(`
┏━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╍╍╍
┃ 🏠 ⬅️ │ ${s.url}
┣━━━━━━━┷━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╍╍╍`)
}


async function main() {
	const { stdin: input, stdout: output } = await import('node:process');
	readline.clearScreenDown(output)
	readline.emitKeypressEvents(input)
	let { promise, resolve, reject } = Promise.withResolvers();
	input.on('keypress', (c, k) => {
		//console.log('got "keypress"', c, k)
		resolve([c, k])
	});
	const rl = readlinePromise.createInterface({ input, output });


	console.log(`\n\n[OHA browser starting...]`)

	let state = StateLib.create()

	loop: do {
		const $doc = await SERVER.ↆget(state.urlⵧload)
		state = StateLib.onꓽloaded(state, $doc)

		/////////////////////////////////////////////////
		// display representation

		console.log('------------------------------------')
		const view = renderⵧto_terminal($doc)
		console.log(view)
		console.log('------------------------------------')

		const action_blueprints = getꓽaction_blueprints($doc)
		const links = getꓽlinks($doc)

		if (links[OHALinkRelation.continueᝍto]) {
			const { href } = links[OHALinkRelation.continueᝍto]
			assert(href !== state.urlⵧload && href !== state.urlⵧself, `continue-to should be different!`)
			console.log(`[Continuing to "${OHALinkRelation.continueᝍto}"...]`)
			state = StateLib.navigate_to(state, href)
			continue loop
		}

		const choices = [
			...Object.values(action_blueprints),
			...Object.values(links).filter(({ href }) => {
				return (state.urlⵧload !== href && state.urlⵧself !== href)
			})
		]
		// TODO 1D back
		if (state.urlⵧload !== URI__ROOT && state.urlⵧself !== URI__ROOT) {
			choices.push(URI__ROOT)
		}
		choices.push('reload')
		choices.push('exit')

		choices.forEach((choice, index) => {
			let cta = choice === 'reload'
				? "Reload"
				: getꓽcta(choice)
			console.log(`[${index}] ${cta}`)
		})
			/*
		for (const key in action_blueprints) {
			const action_blueprint = action_blueprints[key]
			console.log(`- ${getꓽcta(action_blueprint)}`)
			//console.log(prettifyꓽjson(action_blueprints[key]))
		}

		for (const rel in links) {
			const link = links[rel]
			console.log(`- ${getꓽcta(link)}: ${getꓽlink‿str(link)}`);
		}
		console.log('- back')
		console.log('- reload')
		console.log('- home')
		/*
		const selected = await rl.question('Select an option:', {
			choices: ['A', 'B', 'C'],
		})
		console.log(selected)
		*/


		/////////////////////////////////////////////////
		// act

		console.log(`[Auto-browse: I don't know what to do...]`)
		break loop
	} while (true)
	rl.close()
}
main()
	.catch((err) => {
		console.error('\nXXX Error XXX')
		console.error(err)
	})
	.finally(() => {
		console.log(`[The OHA browser has exited.]`)
	})
