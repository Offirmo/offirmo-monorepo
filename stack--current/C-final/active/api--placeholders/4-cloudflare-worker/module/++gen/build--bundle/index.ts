// https://parceljs.org/features/parcel-api/

import { fileURLToPath } from 'node:url'
import * as path from 'node:path'

import meow from 'meow'

import { Parcel } from '@parcel/core'
import type { InitialParcelOptions, TargetDescriptor } from '@parcel/types';

import { NODE_MAJOR_VERSION } from '@offirmo-private/monorepo--decisions'

/////////////////////////////////////////////////

const cli = meow(`
	Usage
	  $ yarn <some script>

	Options
	  --watch
`, {
	importMeta: import.meta,
	flags: {
		watch: {
			type: 'boolean',
			default: false,
		},
	},
})

/////////////////////////////////////////////////

const INPUT_DIR = path.resolve(path.join(fileURLToPath(import.meta.url), '../../../src/'))
const OUTPUT_DIR = path.resolve(path.join(fileURLToPath(import.meta.url), '../../../../dist/'))

/////////////////////////////////////////////////

const OPTIONS: InitialParcelOptions = {
	// https://parceljs.org/plugin-system/api/#InitialParcelOptions

	entries: INPUT_DIR + '/index.ts',
	defaultConfig: '@offirmo-private/parcel-config',

	targets: {
		'worker': {
			context: 'node',
			engines: {
				"node": `>= ${NODE_MAJOR_VERSION}`
			},
			outputFormat: "esmodule",
			includeNodeModules: true,
			distDir: OUTPUT_DIR,
		} satisfies TargetDescriptor,
	},
}

/////////////////////////////////////////////////

console.log({
	INPUT_DIR,
	OUTPUT_DIR,
	OPTIONS,
})


if (cli.flags.watch) {
	let bundler = new Parcel(OPTIONS)
	let subscription = await bundler.watch((err, event) => {
		if (err) {
			// fatal error
			throw err;
		}
		if (!event) {
			throw new Error('should never happen!')
		}

		if (event.type === 'buildSuccess') {
			let bundles = event.bundleGraph.getBundles();
			console.log(`✅✅✅✅✅✅✅`)
			console.log(`✨ Built ${bundles.length} bundles in ${event.buildTime}ms!`);
		} else {
			console.error('❌❌❌❌❌❌❌❌❌❌❌❌❌❌')
			console.error(event.diagnostics);
		}
	});
//await subscription.unsubscribe();
}
else {
	let bundler = new Parcel({
		...OPTIONS,
		mode: 'production',
	})
	try {
		let { bundleGraph, buildTime } = await bundler.run();
		let bundles = bundleGraph.getBundles();
		if (bundles.length === 0) throw new Error('Nothing built!!')
		console.log(`✅✅✅✅✅✅✅`)
		console.log(`✨ Built ${bundles.length} bundles in ${buildTime}ms!`);
	} catch (err: any) {
		console.error(`❌❌❌❌❌❌❌❌❌❌❌❌❌❌ ERROR`, err)
		console.log(err?.diagnostics);
	}
}
