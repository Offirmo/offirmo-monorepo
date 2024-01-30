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

// "from" is optional
// "from" is the FILE path of the file that is including the prompt
function resolveꓽprompt(any_path_or_keyword, from‿abspath) {
	any_path_or_keyword = any_path_or_keyword.trim()
	DEBUG && console.log(`resolveꓽprompt(${any_path_or_keyword})…`)

	const file‿path = (() => {
		if (any_path_or_keyword.endsWith(EXT)) {
			// all good, it's pointing to a file
			return any_path_or_keyword
		}

		if (any_path_or_keyword.endsWith('.md')) {
			throw new Error('Please fix your file name! Not markdown!')
		}

		// if no from‿abspath, means it's the first file = should have matched the lines above
		assert(!!from‿abspath, `resolveꓽprompt() called without from‿abspath!`)
		switch(any_path_or_keyword) {
			case '{{parent}}':
				if (from‿abspath && path.basename(from‿abspath, EXT) === 'root')
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

						// maybe it's a file without extension?
						if (!module_name.endsWith(EXT) && !module_name.endsWith(path.sep)) {
							let candidate_abspath = path.resolve(modules_dir, '~modules', module_name + EXT)

							try {
								fs.readFileSync(candidate_abspath, 'utf8')
								return candidate_abspath
							}
							catch (err) {
								if (err.code !== 'ENOENT')
									throw err

								//swallow
							}
						}

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
		let candidate = any_path_or_keyword
		if (!candidate.startsWith(path.sep)) {
			// this is clearly a relative path
			// we want to resolve it from the current "from"
			// so we need to resolve it now
			candidate = path.resolve(path.dirname(from‿abspath), candidate)
		}
		try {
			fs.readFileSync(candidate, 'utf8')
			return candidate
		}
		catch (err) {
			switch (err.code) {
				case 'EISDIR': {
					candidate = path.resolve(candidate, `main` + EXT)
					break
				}
				case 'ENOENT': {
					if (candidate.endsWith(EXT)) {
						console.error(candidate)
						throw err
					}

					candidate = candidate + EXT
					break
				}

				default:
					throw err
			}

			fs.readFileSync(candidate, 'utf8')
			return candidate
		}
	})()

	if (file‿path === undefined)
		return undefined

	const file‿abspath = from‿abspath ? path.resolve(path.dirname(from‿abspath), file‿path) : file‿path

	if (file‿abspath !== any_path_or_keyword) {
		DEBUG && console.log('  resolved to:', file‿path)
	}
	assert(path.extname(file‿abspath) === EXT, `resolveꓽprompt() resolved to a non-prompt file!`)

	return file‿abspath
}


// TODO move "from" to here?
function loadꓽprompt(any_path_or_keyword, from‿abspath) {
	DEBUG && console.group(`loadꓽprompt(${any_path_or_keyword})…`)

	const file‿abspath = resolveꓽprompt(any_path_or_keyword, from‿abspath)
	const content = file‿abspath ? fs.readFileSync(file‿abspath, 'utf8') : ''
	const linesⵧraw = content.trim().split(os.EOL)
	let lines = linesⵧraw
		.map(normalize_unicode)
		.map(coerce_blanks_to_single_spaces)
		.map(l => l.trim())
		.map((line) => {
			switch(true) {

				case (line.startsWith('↳')): {
					line = line.slice('↳'.length).trim()
					const keyword = coerce_to_tokens(line.split(':')[0])
					switch(keyword) {
						case 'continued from': {
							const target = line.split(':')[1].trim()
							const lines_from_target = loadꓽprompt(target, file‿abspath)
							return lines_from_target.join(os.EOL)
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
							const lines_from_target = loadꓽprompt(target, file‿abspath)
							return lines_from_target.join(os.EOL)
						}
						default:
							throw new Error(`→ keyword "${keyword}" unknown!`)
					}
				}

				default:
					return line
			}
		})

	lines = lines.join(os.EOL).trim().split(os.EOL) // flatten
	DEBUG && console.log(`loadꓽprompt(…) loaded:`, lines)
	DEBUG && console.groupEnd()

	if (!from‿abspath) {
		// top level
		// do final processing
		lines = lines.reduce((acc, line, i, arr) => {
			if (line.startsWith('--')) {
				// comment, remove it
				return acc
			}

			if (line === '') {
				/*const has_eol_before = arr?.[i-1] === ''
				const has_eol_after = arr?.[i+1] === ''
				if (has_eol_before || has_eol_after) {
					// too many consecutive eol
					return acc
				}
				if (!has_eol_before && !has_eol_after) {
					// not enough consecutive eol
					return acc
				}*/
				// keep it, with a twist
				//line = '[EOL]'
			}

			acc.push(line)

			return acc
		}, [])

		//lines = lines.join('').split('[EOL]')
	}

	return lines
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
	console.log(path.sep)

	let promptⵧraw = loadꓽprompt(path.resolve(__filename, params.shift()))
	DEBUG && console.log({ promptⵧraw })

	const promptⵧsystem = 'You’re a helpful assistant'
	const promptⵧbase = promptⵧraw.join(os.EOL)
	//const promptⵧbase = promptⵧraw.join('"' + os.EOL + '"')

	console.log(`------- PROMPT BEGIN -------`)
	console.log(`------- 👤 System prompt -------`)
	console.log(promptⵧsystem)
	console.log(`------- 💬 Question -------`)
	console.log(promptⵧbase)
	console.log(`------- PROMPT END -------`)

	// TODO tokenize and give a cost estimate?
}
main()
