import { expect } from 'chai'

import Deferred from './index.js'


describe('@offirmo/deferred', function() {

	it('should work - resolution', (signalAsyncTestFinished) => {
		const promise = new Deferred<void>()

		// it's an unresolved promise, you can attach stuff
		promise
			.then(signalAsyncTestFinished)

		promise.resolve()
	})

	it('should work - resolution value', (signalAsyncTestFinished) => {
		const promise = new Deferred<number>()

		// it's an unresolved promise, you can attach stuff
		promise
			.then(v => {
				expect(v).to.equal(42)
				signalAsyncTestFinished()
			})

		promise.resolve(42)
	})

	it('should work - rejection', (signalAsyncTestFinished) => {
		const promise = new Deferred<void>()

		// it's an unresolved promise, you can attach stuff
		promise
			.catch(err => {
				signalAsyncTestFinished()
			})

		promise.reject(new Error('Foo!'))
	})

	it('should work - rejection value', (signalAsyncTestFinished) => {
		const promise = new Deferred<void>()
		const err = new Error('Foo!')

		// it's an unresolved promise, you can attach stuff
		promise
			.catch(_err => {
				expect(_err).to.equal(err)
				signalAsyncTestFinished()
			})

		promise.reject(err)
	})
})
