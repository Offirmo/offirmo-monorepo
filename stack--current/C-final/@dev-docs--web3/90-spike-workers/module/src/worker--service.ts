// https://web.dev/articles/offline-cookbook

import {manifest, version} from '@parcel/service-worker';


console.log(`[workerⵧservice] Hello!`)

self.addEventListener("install", (event) => {
	console.log(`[workerⵧservice] ϟinstall`, event)

	console.log('parcel stuff:', { manifest, version })
	/*event.waitUntil(async () => {
		const cache = await caches.open(version);
		await cache.addAll(manifest);
	})*/
})

self.addEventListener("activate", (event) => {
	console.log(`[workerⵧservice] ϟactivate`, event)

	event.waitUntil(clients.claim());
	/*event.waitUntil(async () => {
		const keys = await caches.keys();
		await Promise.all(
			keys.map(key => key !== version && caches.delete(key))
		);
	})*/
})

self.addEventListener("fetch", (event) => {
	console.log(`[workerⵧservice] ϟfetch ${event?.request?.url}`, event)

	event.respondWith((async () => {
		if (event.request.destination === 'iframe') {
			console.warn(`[workerⵧservice] hijacking!`)
			return new Response('TODO generate from SW')
		}

		return fetch(event.request.clone())
	})())
})
