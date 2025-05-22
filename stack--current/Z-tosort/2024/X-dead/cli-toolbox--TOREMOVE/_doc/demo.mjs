#!/bin/sh
':' //# https://sambal.org/?p=1014 ; exec /usr/bin/env node "$0" "$@"

await import('loud-rejection/register.ts')

import * as fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import * as path from 'node:path'
import sum_up_module from 'sum-up'

const MARKDOWN_OUTPUT = true
const DISPLAY_CODE = true
const __dirname = path.dirname(fileURLToPath(import.meta.url))

if (!MARKDOWN_OUTPUT) console.log(
	sum_up_module(
		JSON.parse(
			await fs.readFile(
				path.join(__dirname, '..', 'package.json')
			)
		)
	)
)


import clear from '@offirmo/cli-toolbox/stdout/clear-cli'
clear()

import stylize_string from '@offirmo/cli-toolbox/string/stylize'

////////////////////////////////////

async function demo(toolbox_path, underlying_pkgs, demo_fn) {
	if (MARKDOWN_OUTPUT)
		console.log(`\n### ${toolbox_path}`)
	else
		console.log(`~~~~~~~ ${toolbox_path} ~~~~~~~`)

	underlying_pkgs = Array.isArray(underlying_pkgs) ? underlying_pkgs : [ underlying_pkgs ]
	console.log('Based on:')
	await Promise.all(
		underlying_pkgs.map(async pkg_name => {
			const package_json = JSON.parse(
				await fs.readFile(
					path.join(__dirname, '..', 'node_modules', pkg_name, 'package.json')
				)
			)
			let resume = '* ' + sum_up_module(package_json)
			if (MARKDOWN_OUTPUT) resume = resume.split('\n').join('\n  * ')
			// TODO add link
			console.log(resume)
		})
	)


	if (DISPLAY_CODE) {
		console.log('```js')
		console.log(demo_fn.toString()
			.split('\n')
			.slice(1, -1) // remove useless 1st and last line
			.map(s => s.slice(2)) // remove indentation (2x tabs)
			.map((line, index) => {
				if (index === 0) {
					line = line.replace('const ', 'import ')

					line = line.replace(' = (await import(', ' from ')
					line = line.replace("')).default", "'")

					line = line.replace(' = await import(', ' from ')
					line = line.replace("')", "'")
				}
				return line
			})
			.join('\n')
		)
		console.log('```')
	}

	console.log(stylize_string.dim.italic('output:'))
	if (MARKDOWN_OUTPUT) console.log('```')
	return Promise.resolve(demo_fn())
		.then(() => {
				if (MARKDOWN_OUTPUT) console.log('```')
			})
}

////////////////////////////////////

let sequence = Promise.resolve()

////////////////////////////////////
sequence = sequence.then(() => demo(
	'framework/cli-interface',
	'meow',
	async () => {
		const createCliInterface = (await import('@offirmo/cli-toolbox/framework/cli-interface')).default

		const cli = createCliInterface('build', {
			importMeta: import.meta,
			flags: {
				watch: {
					type: 'boolean',
					default: false,
				},
			},
		})

		console.log('building…', { flags: cli.flags })
	}
))
////////////////////////////////////
sequence = sequence.then(() => demo(
	'fs/json',
	[ 'load-json-file', 'write-json-file' ],
	async () => {
		const json = await import('@offirmo/cli-toolbox/fs/extra/json')

		const filepath = path.join(__dirname, '..', 'package.json')

		function process_data({name, version, description, author, license}) {
			console.log({name, version, description, author, license})
		}

		process_data(json.readSync(filepath))

		return json.read(filepath)
			.then(data => {
				process_data(data)
				return json.write('foo.json', data)
			})
		// 2x output 1) sync 2) async
	}
))
sequence = sequence.then(async () => {
	const fs = await import('@offirmo/cli-toolbox/fs/extra')
	fs.removeSync('foo.json')
})
////////////////////////////////////
sequence = sequence.then(() => demo(
	'fs/extra',
	'fs-extra',
	async () => {
		const fs = await import('@offirmo/cli-toolbox/fs/extra')

		let dirs = fs.lsDirsSync(path.join(__dirname, '..'))
		console.log('full path', dirs)

		dirs = fs.lsDirsSync(path.join(__dirname, '..'), { full_path: false })
		console.log('short path', dirs)

		let files = fs.lsFilesSync(path.join(__dirname, '..'))
		console.log('full path', files)

		files = fs.lsFilesSync(path.join(__dirname, '..'), { full_path: false })
		console.log('short path', files)

		files = fs.lsFilesRecursiveSync(path.join(__dirname, '..', 'fs'))
		console.log('recursive', files)
	}
))
////////////////////////////////////
sequence = sequence.then(() => demo(
	'stdout/clear-cli',
	'ansi-escapes',
	async () => {
		const clearCli = await import('@offirmo/cli-toolbox/stdout/clear-cli')

		//clearCli()
	}
))
////////////////////////////////////
sequence = sequence.then(() => demo(
	'string/stylize-string',
	'chalk',
	//'',
	async () => {
		const stylize_string = (await import('@offirmo/cli-toolbox/string/stylize')).default

		console.log(stylize_string.red.bold.underline('Hello', 'world'))
		console.log(stylize_string.red('red'),         stylize_string.bold.red('bold'))
		console.log(stylize_string.green('green'),     stylize_string.bold.green('green'))
		console.log(stylize_string.yellow('yellow'),   stylize_string.bold.yellow('yellow'))
		console.log(stylize_string.blue('blue'),       stylize_string.bold.blue('blue'))
		console.log(stylize_string.magenta('magenta'), stylize_string.bold.magenta('magenta'))
		console.log(stylize_string.cyan('cyan'),       stylize_string.bold.cyan('cyan'))
		console.log(stylize_string.white('white'),     stylize_string.bold.white('white'))
		console.log(stylize_string.gray('gray'),       stylize_string.bold.gray('gray'))
	}
))
////////////////////////////////////
sequence = sequence.then(() => demo(
	'string/boxify',
	'boxen',
	async () => {
		const boxify = (await import('@offirmo/cli-toolbox/string/boxify')).default

		console.log(boxify('Hello'))
	}
))
////////////////////////////////////
sequence = sequence.then(() => demo(
	'string/columnify',
	'cli-columns',
	async () => {
		const columnify = (await import('@offirmo/cli-toolbox/string/columnify')).default

		const data = (await import('pokemon')).all()

		console.log(columnify(data))
	}
))
////////////////////////////////////
sequence = sequence.then(() => demo(
	'string/arrayify',
	'columnify',
	async () => {
		const arrayify = (await import('@offirmo/cli-toolbox/string/arrayify')).default

		const data = {
			"commander@0.6.1": 1,
			"minimatch@0.2.14": 3,
			"mkdirp@0.3.5": 2,
			"sigmund@1.0.0": 3
		}

		console.log(arrayify(data))
	}
))
////////////////////////////////////
sequence = sequence.then(() => demo(
	'string/log-symbols',
	'log-symbols',
	async () => {
		const logSymbols = (await import('@offirmo/cli-toolbox/string/log-symbols')).default

		console.log(logSymbols.info, 'info')
		console.log(logSymbols.success, 'success')
		console.log(logSymbols.warning, 'warning')
		console.log(logSymbols.error, 'error')
	}
))
////////////////////////////////////
sequence = sequence.then(() => console.log(`~~~ All done, thank you ! ~~~`))
////////////////////////////////////
