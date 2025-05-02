// to make this lib isomorphic, we allow dependency injections
import assert from 'tiny-invariant'
import type { ChalkInstance } from 'chalk'
import chalk from 'chalk'

/////////////////////////////////////////////////

//let chalk: ChalkInstance | undefined = chalk

function injectꓽlibꓽchalk(chalk_lib: ChalkInstance) {
	throw new Error('Why did I ever need that?')
	//assert(!!chalk_lib, `prettify-any: chalk injection should be used with the real lib!`)
	//chalk = chalk_lib
}

function getꓽlibꓽchalk(): ChalkInstance | undefined {
	return chalk
}

/////////////////////////////////////////////////

export {
	injectꓽlibꓽchalk,
	getꓽlibꓽchalk,
}
