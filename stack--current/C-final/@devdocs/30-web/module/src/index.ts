console.log('Hello from index.ts')

const workerⵧshared = new SharedWorker(new URL('./worker--shared.ts', import.meta.url));
console.log({workerⵧshared})
workerⵧshared.port.onmessage = (e) => {
	console.log("Message received from worker--shared", e);
};

workerⵧshared.port.postMessage('ping');
