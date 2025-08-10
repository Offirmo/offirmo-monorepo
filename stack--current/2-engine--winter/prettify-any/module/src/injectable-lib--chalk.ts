// to make this lib isomorphic, we allow dependency injections
import assert from 'tiny-invariant'
import type { ChalkInstance } from 'chalk'


/////////////////////////////////////////////////
/*let _chalk: ChalkInstance | undefined = undefined

function injectꓽlibꓽchalk(chalk_lib: ChalkInstance) {
	assert(!!chalk_lib, `prettify-any: chalk injection should be used with the real lib!`)
	_chalk = chalk_lib
}*/

/////////////////////////////////////////////////
import chalk from 'chalk'

let _chalk: ChalkInstance | undefined = chalk

function injectꓽlibꓽchalk(chalk_lib: ChalkInstance) {
	throw new Error('Why did I ever need that?')
}

/////////////////////////////////////////////////

function getꓽlibꓽchalk(): ChalkInstance | undefined {
	return _chalk
}

/////////////////////////////////////////////////

export {
	injectꓽlibꓽchalk,
	getꓽlibꓽchalk,
}
