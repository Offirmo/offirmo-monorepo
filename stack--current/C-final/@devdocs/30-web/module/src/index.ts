console.log('Hello from index.ts')

import assert from 'tiny-invariant'

/////////////////////////////////////////////////

assert(!!globalThis.SharedWorker, 'SharedWorker should be available')
const workerⵧshared = new SharedWorker(new URL('./worker--shared.ts', import.meta.url))
workerⵧshared.port.onmessage = (e) => {
	console.log("Message received from worker--shared", e);
};

workerⵧshared.port.postMessage('ping');

/////////////////////////////////////////////////

assert(!!navigator.serviceWorker, 'SharedWorker should be available')

navigator.serviceWorker.register(new URL('./worker--service.ts', import.meta.url))
	.then(registration => {
		console.log("Service worker registration succeeded:", registration)
	})
	.catch(err => {
		console.error(`Service worker registration failed: ${err}`)
	})
