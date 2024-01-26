import { strict as assert } from 'node:assert'
import * as fs from 'node:fs'
import * as path from 'node:path'
import os from 'node:os'
import {
	coerce_to_quasi_code,
	normalize_unicode,
} from '@offirmo-private/normalize-string'

/////////////////////////////////////////////////

const EXT = '.prompt'
const DEBUG = false

function loadꓽprompt(file‿path) {
	let promptⵧsystem = ''
	let promptⵧbase = ''
	DEBUG && console.log(`loadꓽprompt(${file‿path})…`)

	const file‿abspath = (() => {
		if (file‿path.endsWith(EXT)) {
			// all good
			return file‿path
		}

		try {
			fs.readFileSync(file‿path, 'utf8')
		}
		catch (err) {
			if (err.code === 'EISDIR')
				return path.resolve(file‿path, `main` + EXT)

			return file‿path + EXT
		}
	})()
	if (file‿abspath !== file‿path) {
		DEBUG && console.log('  resolved to:', file‿abspath)
	}
	assert(path.extname(file‿abspath) === '.prompt')

	function setꓽpromptⵧsystem(line) {
		assert(!promptⵧsystem)
		promptⵧsystem = line
	}

	const content = fs.readFileSync(file‿abspath, 'utf8')
	const linesⵧraw = content.trim().split(os.EOL)
	const lines = linesⵧraw
		.map(l => l.trim())
		.map(line => {

			switch(true) {
				case (line.startsWith('⮑')): {
					line = line.slice('⮑'.length).trim()
					const keyword = coerce_to_redeemable_code(line).split(':')[0]
					console.log({keyword})
					switch(keyword) {
						case 'continued_from': {
							const target‿path = line.slice(15).trim()
							let target‿abspath = path.resolve(path.dirname(file‿abspath), target‿path)
							const [ps, pb] = loadꓽprompt(target‿abspath)
							DEBUG && console.log({ps, pb})
							if (ps) setꓽpromptⵧsystem(ps)
							return pb.join(os.EOL)
						}
						default:
							throw new Error(`Keyword "${keyword}" unknown!`)
					}
				}

				case (line.startsWith('👤')): {
					setꓽpromptⵧsystem(line.slice('👤'.length).trim())
					return undefined
				}

				case (line.startsWith('--')): {
					// comment
					return undefined
				}

				default:
					return line
			}
		})

	promptⵧbase = lines.join(os.EOL).split(os.EOL)
	//console.log(lines)
	return [ promptⵧsystem, promptⵧbase ]
}

/////////////////////////////////////////////////
const [ __node, __filename, ...params ] = process.argv
false && console.log({
	__node,
	__filename,
	params,
	cwd: process.cwd(),
})

function main() {
	console.log('Hello from Offirmo’s prompt runner...')

	let [ promptⵧsystem, promptⵧbase ] = loadꓽprompt(path.resolve(__filename, params.shift()))
	DEBUG && console.log({ promptⵧsystem, promptⵧbase })

	promptⵧsystem ||= 'You’re a helpful assistant'

	console.log(`------- PROMPT BEGIN -------`)
	//console.log(`------- 👤 System prompt -------`)
	console.log(promptⵧsystem)
	//console.log(`------- Question -------`)
	console.log(promptⵧbase.join(os.EOL))
	console.log(`------- PROMPT END -------`)
}
main()
