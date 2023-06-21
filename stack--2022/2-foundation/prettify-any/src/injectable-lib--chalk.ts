// to make this lib isomorphic, we allow dependency injections
import assert from 'tiny-invariant'
import { type ChalkInstance } from 'chalk'

/////////////////////////////////////////////////

let chalk: ChalkInstance | undefined = undefined

function injectꓽlibꓽchalk(chalk_lib: ChalkInstance) {
	assert(!!chalk_lib, `prettify-any: chalk injection should be used with the real lib!`)
	chalk = chalk_lib
}

function getꓽlibꓽchalk(): ChalkInstance | undefined {
	return chalk
}

/////////////////////////////////////////////////

export {
	injectꓽlibꓽchalk,
	getꓽlibꓽchalk,
}
