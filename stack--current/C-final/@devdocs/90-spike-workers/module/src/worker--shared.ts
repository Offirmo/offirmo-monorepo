console.log(`[workerⵧshared] Hello!`)

addEventListener("connect", (e) => {
	const port = e.ports[0];

	port.addEventListener("message", (e) => {
		console.log(`[workerⵧshared] Received message from main script: `, e)
	});

	port.start(); // Required when using addEventListener. Otherwise, called implicitly by onmessage setter.
})

addEventListener("error", (e) => {
	console.error(`[workerⵧshared] Received error: `, e)
})
