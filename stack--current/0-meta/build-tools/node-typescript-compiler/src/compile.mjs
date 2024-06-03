import { EOL } from 'node:os'
import path from 'node:path'

import { spawn } from 'cross-spawn'
import tildify from 'tildify'

import { EXECUTABLE, find_tsc } from './find-tsc.mjs'
import { LIB } from './consts.mjs'
import { create_logger_state, display_banner_if_1st_output } from './logger.mjs'

///////////////////////////////////////////////////////

const RADIX = EXECUTABLE

///////////////////////////////////////////////////////

export async function compile(tscOptions, files, options) {
	tscOptions = tscOptions || {}
	files = files || []
	options = options || {}
	options.verbose = Boolean(options.verbose)
	let logger__state = create_logger_state(options.banner)

	if (options.verbose) logger__state = display_banner_if_1st_output(logger__state)

	return new Promise((resolve, reject) => {
		let stdout = ''
		let stderr = ''
		let already_failed = false
		function on_failure(reason, err) {
			if (already_failed && !options.verbose)
				return

			stdout = stdout.trim()
			stderr = stderr.trim()

			const reason_from_output = (() => {
				const src = stderr || stdout
				const first_line = src.split(EOL)[0]
				if (first_line && first_line.toLowerCase().includes('error'))
					return first_line

				return null
			})()

			err = err || new Error(`${reason_from_output || reason}`)
			err.stdout = stdout
			err.stderr = stderr
			err.reason = reason

			if (options.verbose) {
				logger__state = display_banner_if_1st_output(logger__state)
				console.error(`[${LIB}] ✖ Failure during tsc invocation: ${reason}`)
				console.error(err)
			}

			logger__state = display_banner_if_1st_output(logger__state)
			err.message = `[${LIB}@dir:${path.parse(process.cwd()).base}] ${err.message}`
			reject(err)
			already_failed = true
		}

		try {
			const tsc_options_as_array = Object.entries(tscOptions).reduce((acc, [key, value]) => {
				if (value === false)
					return acc

				if (value === true)
					return [ ...acc, `--${key}` ]

				if (Array.isArray(value))
					value = value.join(',')

				return [ ...acc, `--${key}`, value ]
			}, [])
			const spawn__params = tsc_options_as_array.concat(files)


			// not returning due to complex "callback style" async code
			find_tsc(function _display_banner_if_1st_output() {
					logger__state = display_banner_if_1st_output(logger__state)
				})
				.then(tsc_executable_absolute_path => {
					if (options.verbose) console.log(`[${LIB}] ✔ found a typescript compiler at this location: "${tsc_executable_absolute_path}" aka. "${tildify(tsc_executable_absolute_path)}"`)
					if (options.verbose) console.log(`[${LIB}] ► now spawning the compilation command: "${[tsc_executable_absolute_path, ...spawn__params].join(' ')}"...\n`)

					const spawn__options = {}
					const spawn__instance = spawn(tsc_executable_absolute_path, spawn__params, spawn__options)

					// listen to events
					spawn__instance.on('error', err => {
						on_failure('got event "err"', err)
					})
					spawn__instance.on('disconnect', () => {
						logger__state = display_banner_if_1st_output(logger__state)
						console.log(`[${LIB}] Spawn: got event "disconnect"`)
					})
					spawn__instance.on('exit', (code, signal) => {
						// when receiving "exit", io streams may still be open
						// we do nothing, another event "close" will follow.
						if (code !== 0) {
							logger__state = display_banner_if_1st_output(logger__state)
							console.log(`[${LIB}] Spawn: got event "exit" with error code "${code}" & signal "${signal}"!`)
						}
					})
					spawn__instance.on('close', (code, signal) => {
						if (code === 0)
							resolve(stdout)
						else
							on_failure(`got event "close" with error code "${code}" & signal "${signal}"`)
					})

					// for debug purpose only
					spawn__instance.stdin.on('data', data => {
						logger__state = display_banner_if_1st_output(logger__state)
						console.log(`[${LIB}] got stdin event "data": "${data}"`)
					})
					// mandatory for correct error detection
					spawn__instance.stdin.on('error', err => {
						on_failure('got stdin event "error"', err)
					})

					spawn__instance.stdout.on('data', data => {
						logger__state = display_banner_if_1st_output(logger__state)
						String(data).split(EOL).forEach(line => {
							if (!line.length) return // convenience for more compact output

							if (line[0] === '/')
								line = tildify(line) // convenience for readability if using --listFiles

							if (line.slice(-35) === 'Starting incremental compilation...')
								console.log('\n************************************')

							console.log(RADIX + '> ' + line)
						})
						stdout += data
					})
					// mandatory for correct error detection
					spawn__instance.stdout.on('error', err => {
						on_failure('got stdout event "error"', err)
					})

					spawn__instance.stderr.on('data', data => {
						logger__state = display_banner_if_1st_output(logger__state)
						String(data).split(EOL).forEach(line => console.log(RADIX + '! ' + line))
						stderr += data
					})
					// mandatory for correct error detection
					spawn__instance.stderr.on('error', err => {
						on_failure('got stderr event "error"', err)
					})
				})
				.catch(err => on_failure('final catch', err)) // ugly but due to complex "callback style" async code
		}
		catch (err) {
			on_failure(`unexpected global catch`, err)
		}
	})
	.then(stdout => {
		if (options.verbose) console.log(`[${LIB}] ✔ executed successfully.`)
		return stdout
	})
}

///////////////////////////////////////////////////////
