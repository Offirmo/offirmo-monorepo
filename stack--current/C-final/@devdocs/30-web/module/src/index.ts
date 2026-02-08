console.log('Hello from index.ts')

import './index.css'

import assert from 'tiny-invariant'

/////////////////////////////////////////////////

assert(!!globalThis.SharedWorker, 'SharedWorker should be available')
const workerⵧshared = new SharedWorker(
	new URL('./worker--shared.ts', import.meta.url),
	{type: 'module'}
)
workerⵧshared.port.onmessage = (e) => {
	console.log("Message received from worker--shared", e);
};

workerⵧshared.port.postMessage('ping');

/////////////////////////////////////////////////

assert(!!navigator.serviceWorker, 'SharedWorker should be available')

navigator.serviceWorker.register(
	new URL('./worker--service.ts', import.meta.url),
	{type: 'module', scope: "/",}
)
	.then(registration => {
		console.log("Service worker registration succeeded:", registration)
		if (registration.installing) {
			console.log("Service worker -> installing");
		} else if (registration.waiting) {
			console.log("Service worker -> installed");
		} else if (registration.active) {
			console.log("Service worker -> active");
		}
	})
	.catch(err => {
		console.error(`Service worker registration failed: ${err}`)
	})
