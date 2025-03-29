const {
	promiseTry,
} = require('../../dist/src.es2024.esm/index.ts')

promiseTry(() => { throw new Error('Oups!') })
	.then(
		() => console.log('OK (UNEXPECTED!)'),
		() => console.error('error! (expected)'),
	)
	.catch(console.error)
