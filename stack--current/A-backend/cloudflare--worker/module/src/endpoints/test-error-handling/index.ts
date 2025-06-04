//import { STATUS_CODES } from 'node:http'
import { Enum } from 'typescript-string-enums'
import assert from 'tiny-invariant'
import { createError, type XXError} from '@offirmo/error-utils'
import { HTTP_STATUS_CODE } from '@offirmo-private/offirmo-api--interface'

import { FailureMode } from './types.ts'
import type { XSoftExecutionContext } from '../../services/sxc.ts'

/////////////////////////////////////////////////

// TODO extern
export function create_error(message: string | number | undefined, details: XXError['details'] = {}, SXC?: XSoftExecutionContext): XXError {
	console.log(`FYI create_error("${message}"`, details,') from', SXC?.getLogicalStack())

	/*if (message && STATUS_CODES[message]) {
		details['statusCode'] = Number(message)
		message = STATUS_CODES['statusCode']
	}*/

	//console.log('CE', SEC.getLogicalStack(), '\n', SEC.getShortLogicalStack())
	const err = SXC
		? SXC.createError(String(message), details)
		: createError(String(message), details)
	err.framesToPop!++

	return err
}

async function fail(
	mode: FailureMode | undefined | string,
	SXC?: XSoftExecutionContext,
): Promise<Response> {
	assert(!mode || Enum.isType(FailureMode, mode), `Invalid mode, should be one and only one of: ` + Enum.values(FailureMode).join(', '))

	const { logger } = SXC?.getInjectedDependencies() || {}
	logger?.info('failing…', mode)

	// starts with a response manually set to a success,
	// to check that an error will overwrite it properly
	//response.statusCode = 200
	//response.body = JSON.stringify('XXX You should NOT see that, there should be an error!')

	const get_test_err = () => create_error(`TEST ${mode}!`, { statusCode: 555 }, SXC)

	switch (mode) {
		case undefined:
			return new Response(
				'Error: Failure test: Please provide a failure mode: ' + Enum.values(FailureMode).join(', '),
				{
					status: HTTP_STATUS_CODE.error.client.bad_request
				}
			)

		case FailureMode['none']:
			return new Response(
				'All good, test of no error'
			)

		case FailureMode['manual']:
			// bad idea (should throw instead) but possible
			return new Response(
				get_test_err().message,
				{
					status: get_test_err().statusCode!
				}
			)

		case FailureMode['assertion-sync']:
			assert(false, get_test_err().message)

		case FailureMode['throw-sync']:
			throw get_test_err()

		case FailureMode['throw-sync-non-error']:
			throw get_test_err().message // baad! throwing a string!

		case FailureMode['throw-async']:
			return new Promise(() => {
				setTimeout(() => { throw get_test_err() }, 100)
			})

		case FailureMode['timeout']:
			return new Promise(() => {
				// no resolution
			})

		case FailureMode['rejection']:
			return Promise.reject(get_test_err())

		case FailureMode['unhandled-rejection']:
			Promise.reject(get_test_err()) // unhandled
			// pretend otherwise OK
			return new Response(
				'You should have seen an error!!!'
			)

		case FailureMode['bad-status-code']:
			return new Response(
				undefined,
				{
					status: 'foo' as any
				}
			)

		case FailureMode['non-stringified-body']:
			// ??
			// eventually, decided to support this, too convenient
			// = won't result in an error
			// see also next case
			return new Response(
				{ foo: 42 } as any
			)

		case FailureMode['non-stringifiable-body']:
			// auto-stringification ust be possible
			const foo: any = { val: 42 }
			foo.foo = foo
			return new Response(
				{
					recurse: foo,
					//'this can’t be stringified!': 2n,
				} as any
			)

		case FailureMode['non-json-stringified-body']:
			return new Response(
				// body should always be JSON.parse()-able
				"this is bad!"
			)

		case FailureMode['no-response-set']:
			// pretend we didn't set the body
			return new Response()

		default:
			// should have been caught earlier
			throw new Error('Should never happen!')
	}
}

////////////////////////////////////

export {
	fail
}
