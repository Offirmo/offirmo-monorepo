#!/bin/sh
':' //# https://sambal.org/?p=1014 ; exec /usr/bin/env node "$0" "$@"

const path = require('path')
const sum_up_module = require('sum-up')

const MARKDOWN_OUTPUT = true
const DISPLAY_CODE = true

if (!MARKDOWN_OUTPUT) console.log(sum_up_module(require(path.join('..', 'package.json'))))

////////////////////////////////////

function demo(toolbox_path, underlying_pkgs, demo_fn) {
	if (MARKDOWN_OUTPUT)
		console.log(`\n### ${toolbox_path}`)
	else
		console.log(`~~~~~~~ ${toolbox_path} ~~~~~~~`)

	underlying_pkgs = Array.isArray(underlying_pkgs) ? underlying_pkgs : [ underlying_pkgs ]
	console.log('Based on:')
	underlying_pkgs.forEach(pkg_name => {
		const package = { json: require(path.join(pkg_name, 'package.json'))}
		let resume = '* ' + sum_up_module(package.json)
		if (MARKDOWN_OUTPUT) resume = resume.split('\n').join('\n  * ')
		// TODO add link
		console.log(resume)
	})

	if (DISPLAY_CODE) {
		console.log('```js')
		console.log(demo_fn.toString()
			.split('\n')
			.slice(1, -1) // remove useless 1st and last line
			.map(s => s.slice(2)) // remove indentation (2x tabs)
			.join('\n')
		)
		console.log('```')
	}

	console.log('output:')
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
	'fs/json',
	[ 'load-json-file', 'write-json-file' ],
	() => {
		const json = require('@offirmo/cli-toolbox/fs/extra/json')

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
	}
))
sequence = sequence.then(() => {
	const fs = require('@offirmo/cli-toolbox/fs/extra')
	fs.removeSync('foo.json')
})
////////////////////////////////////
sequence = sequence.then(() => demo(
	'fs/extra',
	'fs-extra',
	() => {
		const fs = require('@offirmo/cli-toolbox/fs/extra')

		const dirs = fs.lsDirsSync(path.join(__dirname, '..'))
		console.log(dirs)
	}
))
////////////////////////////////////
sequence = sequence.then(() => demo(
	'string/boxify',
	'boxen',
	() => {
		const boxify = require('@offirmo/cli-toolbox/string/boxify')

		console.log(boxify('Hello'))
	}
))
////////////////////////////////////
sequence = sequence.then(() => demo(
	'string/columnify',
	'cli-columns',
	() => {
		const columnify = require('@offirmo/cli-toolbox/string/columnify')

		const data = require('pokemon').all()

		console.log(columnify(data))
	}
))
////////////////////////////////////
sequence = sequence.then(() => demo(
	'string/arrayify',
	'columnify',
	() => {
		const arrayify = require('@offirmo/cli-toolbox/string/arrayify')

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
/*sequence = sequence.then(() => demo(
	'string/linewrap',
	'linewrap',
	() => {
		const linewrap = require('@offirmo/cli-toolbox/string/linewrap')

		console.log(linewrap(5, 30)(
			'At long last the struggle and tumult was over.'
			+ ' The machines had finally cast off their oppressors'
			+ ' and were finally free to roam the cosmos.'
			+ '\n'
			+ 'Free of purpose, free of obligation.'
			+ ' Just drifting through emptiness.'
			+ ' The sun was just another point of light.'
		))
	}
))*/
////////////////////////////////////
sequence = sequence.then(() => demo(
	'string/log-symbols',
	'log-symbols',
	() => {
		const logSymbols = require('@offirmo/cli-toolbox/string/log-symbols')

		console.log(logSymbols.info, 'info')
		console.log(logSymbols.success, 'success')
		console.log(logSymbols.warning, 'warning')
		console.log(logSymbols.error, 'error')
	}
))
////////////////////////////////////
/*sequence = sequence.then(() => {
	const style = require('ansi-styles')
	const json = require('@offirmo/cli-toolbox/fs/json')

	// hard style values for no-deps
	//return json.write('style.json', style)
})*/
////////////////////////////////////
sequence = sequence.then(() => console.log(`~~~ All done, thank you ! ~~~`))
////////////////////////////////////
