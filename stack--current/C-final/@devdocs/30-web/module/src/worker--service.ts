console.log(`[workerⵧservice] Hello!`)

self.addEventListener("install", (event) => {
	console.log(`[workerⵧservice] ϟinstall`, event)
})

self.addEventListener("activate", (event) => {
	console.log(`[workerⵧservice] ϟactivate`, event)
})

self.addEventListener("fetch", (event) => {
	console.log(`[workerⵧservice] ϟfetch`, event)
	throw new Error('Not implemented!')
})
