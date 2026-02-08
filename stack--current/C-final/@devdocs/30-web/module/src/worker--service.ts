// https://web.dev/articles/offline-cookbook

import {manifest, version} from '@parcel/service-worker';


console.log(`[workerⵧservice] Hello!`)

self.addEventListener("install", (event) => {
	console.log(`[workerⵧservice] ϟinstall`, event)

	event.waitUntil(async () => {
		const cache = await caches.open(version);
		await cache.addAll(manifest);
	})
})

self.addEventListener("activate", (event) => {
	console.log(`[workerⵧservice] ϟactivate`, event)

	event.waitUntil(async () => {
		const keys = await caches.keys();
		await Promise.all(
			keys.map(key => key !== version && caches.delete(key))
		);
	})
})

self.addEventListener("fetch", (event) => {
	console.log(`[workerⵧservice] ϟfetch`, event)
	throw new Error('Not implemented!')
})
