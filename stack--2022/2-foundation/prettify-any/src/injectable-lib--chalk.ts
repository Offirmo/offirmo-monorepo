// to make this lib isomorphic, we allow dependency injections
import assert from 'tiny-invariant'
import { type Chalk } from 'chalk'

////////////////////////////////////////////////////////////////////////////////////

let chalk: Chalk | undefined = undefined

export function inject_lib__chalk(chalk_lib: Chalk) {
	assert(!!chalk_lib, `prettify-any: chalk injection should be used with the real lib!`)
	chalk = chalk_lib
}

export function get_lib__chalk(): Chalk | undefined {
	return chalk
}
