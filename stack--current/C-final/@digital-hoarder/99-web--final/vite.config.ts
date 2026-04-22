/*import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		rolldownOptions: {
			input: {
				main: resolve(import.meta.dirname, './module/src/index.html')
			},
		},
	},
})*/


import { resolve } from 'node:path'
import { defineConfig } from 'vite'

const root = resolve(import.meta.dirname, 'module/src')

export default defineConfig({
	root,
	build: {
		// outDir is resolved relative to `root` by default, so override it
		outDir: resolve(import.meta.dirname, 'dist'),
		emptyOutDir: true,
		rolldownOptions: {
			/*input: {
				main: resolve(root, 'index.html'),
				about: resolve(root, 'about/index.html'),
				contact: resolve(root, 'contact.html'),
			},*/
		},
	},
})
