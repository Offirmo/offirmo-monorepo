import tsc from 'node-typescript-compiler'

console.log('TEST: tsc exported =', tsc)

;(async () => {

	try {
		console.log('************ TEST 01 ************')
		await tsc.compile(
			{
				'help': true
			},
			undefined,
			{
				//verbose: true,
			},
		)
		console.log('************ TEST 01: Promise resolved: OK')
	}
	catch (err) {
		console.log('************ TEST 01: PROMISE REJECTED:', err)
	}

	/*try {
		console.log('************ TEST 02 ************')
		await tsc.compile(
			undefined,
			undefined,
			{
				verbose: true,
			},
		)
		console.log('************ TEST 02: Promise resolved: OK')
	}
	catch (err) {
		console.log('************ TEST 02: PROMISE REJECTED:', err)
	}*/

	try {
		console.log('************ TEST 03 ************')
		await tsc.compile(
				{},
				[ 'WRONG FILE PATH FOR TEST' ],
				{
					//verbose: true,
				},
			)
		console.log('************ TEST 03: Promise resolved: OK')
	}
	catch (err) {
		console.log('************ TEST 03: PROMISE REJECTED:', err)
	}
})()
