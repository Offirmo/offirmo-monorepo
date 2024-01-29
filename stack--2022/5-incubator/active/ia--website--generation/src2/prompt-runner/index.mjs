import { strict as assert } from 'node:assert'
import * as fs from 'node:fs'
import * as path from 'node:path'
import os from 'node:os'
import {
	coerce_to_tokens,
	normalize_unicode,
} from '@offirmo-private/normalize-string'
import { coerce_blanks_to_single_spaces } from '@offirmo-private/normalize-string'

/////////////////////////////////////////////////

const EXT = '.prompt'
const DEBUG = true

function resolveꓽprompt(any_path_or_keyword, from‿abspath) {
	any_path_or_keyword = any_path_or_keyword.trim()
	DEBUG && console.log(`resolveꓽprompt(${any_path_or_keyword})…`)

	const file‿path = (() => {
		if (any_path_or_keyword.endsWith(EXT)) {
			// all good, it's pointing to a file
			return any_path_or_keyword
		}

		switch(any_path_or_keyword) {
			case '{{parent}}':
				if (path.basename(from‿abspath, EXT) === 'root')
					return null // no more parent, we're at the root

				return (() => {
					// recursively try to find a parent
					let parent_dir = path.dirname(from‿abspath)
					while (parent_dir) {
						let candidate_abspath = path.resolve(parent_dir, `main` + EXT)
						if (candidate_abspath !== from‿abspath) {
						// test it
							try {
								fs.readFileSync(candidate_abspath, 'utf8')
								return candidate_abspath
							}
							catch (err) {
								if (err.code !== 'ENOENT')
									throw err

								// try "root"
								candidate_abspath = path.resolve(parent_dir, `root` + EXT)

								try {
									fs.readFileSync(candidate_abspath, 'utf8')
									return candidate_abspath
								}
								catch (err) {
									if (err.code !== 'ENOENT')
										throw err
									// swallow
								}
							}
						}
						// not found, try higher
						const new_parent = path.dirname(parent_dir)
						parent_dir = (new_parent !== parent_dir) ? new_parent : null
					}

					// no parent found, this is allowed
					return undefined
				})()
			default:
				if(any_path_or_keyword.startsWith('{{')) {
					throw new Error(`resolveꓽprompt() unrecognized keyword "${any_path_or_keyword}"!`)
				}
				break
		}

		if (any_path_or_keyword.startsWith('[[')) {
			const module_name = any_path_or_keyword.slice('[['.length, -']]'.length)
			// module inclusion
			// recursively try to find a parent
			let modules_dir = path.dirname(from‿abspath)
			while (modules_dir) {
				let candidate_abspath = path.resolve(modules_dir, '~modules', module_name, ...(module_name.endsWith(EXT) ? [] : ['main' + EXT]))
				if (candidate_abspath !== from‿abspath) {
					// test it
					try {
						fs.readFileSync(candidate_abspath, 'utf8')
						return candidate_abspath
					}
					catch (err) {
						if (err.code !== 'ENOENT')
							throw err

						// swallow
					}
				}
				// not found, try higher
				const new_parent = path.dirname(modules_dir)
				modules_dir = (new_parent !== modules_dir) ? new_parent : null
			}
			// not found, error!
			throw new Error(`resolveꓽprompt() module "${module_name}" not found!`)
		}

		// not a keyword, could be a path or file
		try {
			fs.readFileSync(any_path_or_keyword, 'utf8')
		}
		catch (err) {
			if (err.code === 'EISDIR')
				return path.resolve(any_path_or_keyword, `main` + EXT)

			return any_path_or_keyword + EXT
		}
	})()

	const file‿abspath = file‿path ? path.resolve(path.dirname(from‿abspath), file‿path) : file‿path

	if (file‿abspath !== any_path_or_keyword) {
		DEBUG && console.log('  resolved to:', file‿path)
	}
	if (!!file‿abspath) {
		assert(path.extname(file‿abspath) === EXT)
	}

	return file‿abspath
}


// TODO move "from" to here?
function loadꓽprompt(file‿abspath) {
	let promptⵧsystem = ''
	let promptⵧbase = ''
	DEBUG && console.group(`loadꓽprompt(${file‿abspath})…`)

	function setꓽpromptⵧsystem(line) {
		assert(!promptⵧsystem)
		promptⵧsystem = line
	}

	const content = file‿abspath ? fs.readFileSync(file‿abspath, 'utf8') : ''
	const linesⵧraw = content.trim().split(os.EOL)
	const lines = linesⵧraw
		.map(normalize_unicode)
		.map(coerce_blanks_to_single_spaces)
		.map(l => l.trim())
		.map(line => {
			switch(true) {
				case (line.startsWith('--')): {
					// comment
					return undefined
				}

				case (line.startsWith('↳')): {
					line = line.slice('↳'.length).trim()
					const keyword = coerce_to_tokens(line.split(':')[0])
					switch(keyword) {
						case 'continued from': {
							const target = line.split(':')[1].trim()
							const target‿abspath = resolveꓽprompt(target, file‿abspath)
							const [ps, pb] = loadꓽprompt(target‿abspath)
							DEBUG && console.log({ps, pb})
							if (ps) setꓽpromptⵧsystem(ps)
							return pb.join(os.EOL)
						}
						default:
							throw new Error(`↳ keyword "${keyword}" unknown!`)
					}
				}

				case (line.startsWith('→')): {
					line = line.slice('→'.length).trim()
					const keyword = coerce_to_tokens(line.split(':')[0])
					console.log({keyword})
					switch(keyword) {
						case 'include': {
							const target = line.split(':')[1].trim()
							const target‿abspath = resolveꓽprompt(target, file‿abspath)
							const [ps, pb] = loadꓽprompt(target‿abspath)
							DEBUG && console.log({ps, pb})
							if (ps) setꓽpromptⵧsystem(ps)
							return pb.join(os.EOL)
						}
						default:
							throw new Error(`→ keyword "${keyword}" unknown!`)
					}
				}

				case (line.startsWith('👤')): {
					setꓽpromptⵧsystem(line.slice('👤'.length).trim())
					return undefined
				}



				default:
					return line
			}
		})

	promptⵧbase = lines.join(os.EOL).split(os.EOL)
	//console.log(lines)
	DEBUG && console.groupEnd()

	return [ promptⵧsystem, promptⵧbase ]
}

/////////////////////////////////////////////////
const [ __node, __filename, ...params ] = process.argv
DEBUG && console.log({
	__node,
	__filename,
	params,
	cwd: process.cwd(),
})

function main() {
	console.log()
	console.log('------------------------------------------')
	console.log('Hello from Offirmo’s Prompt Runner...')
	console.log('------------------------------------------')
	console.log()

	let [ promptⵧsystem, promptⵧbase ] = loadꓽprompt(path.resolve(__filename, params.shift()))
	DEBUG && console.log({ promptⵧsystem, promptⵧbase })

	promptⵧsystem ||= 'You’re a helpful assistant'

	console.log(`------- PROMPT BEGIN -------`)
	//console.log(`------- 👤 System prompt -------`)
	console.log(promptⵧsystem)
	//console.log(`------- Question -------`)
	console.log(promptⵧbase.join(os.EOL))
	console.log(`------- PROMPT END -------`)

	// TODO tokenize and give a cost estimate?
}
main()
