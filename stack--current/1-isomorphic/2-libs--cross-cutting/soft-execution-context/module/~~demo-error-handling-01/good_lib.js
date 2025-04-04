'use strict'

import {
	getRootSXC,
	//_flattenSXC,
} from '../../src/index.ts'

const LIB = 'GOOD_LIB'

function getꓽSXC(parent) {
	return (parent || getRootSXC())
		.createChild()
		.setLogicalStack({module: LIB})
}

let instance_count = 0

function create({SXC} = {}) {
	instance_count++
	SXC = getꓽSXC(SXC)

	return SXC.xTryCatch(`instantiating#${instance_count}`, ({logger, ENV}) => {
		logger.trace(`instantiating#${instance_count}`, {ENV})

		// test
		/*;[
			'fatal',
			'emerg',
			'alert',
			'crit',
			'error',
			'warning',
			'warn',
			'notice',
			'info',
			'verbose',
			'log',
			'debug',
			'trace',
			'silly',
		].forEach(level => logger[level]({level}))*/

		function foo_sync({x} = {}) {
			SXC.xTry(foo_sync.name, () => {
				if (!x) {
					throw new Error('Missing arg x!') // msg will/should be auto-prefixed :-)
				}
			})

			return 42
		}

		async function foo_async() {
			return SXC.xPromiseTry(foo_async.name, ({logger}) => {
				logger.log('attempting to do X...')
				return new Promise((resolve, reject) => {
					setTimeout(() => reject(new Error('failed to do X in time!')), 100) // msg will/should be auto-prefixed :-)
				})
			})
		}

		return {
			foo_sync,
			foo_async,
		}
	})
}


export {
	create,
}
