import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//import xPlugin from '@monorepo-private/vite-plugin-parcel-features'
//import Inspect from 'vite-plugin-inspect'


// https://vite.dev/config/
export default defineConfig({
	devtools: true,
	plugins: [
		react(),
		//Inspect(),
		//xPlugin(),
	],
	resolve: {
		alias: {
			// can't you just use package.json??
			"@storybook/test": "module/src/l3-compat/@storybook/test.ts"
		}
	}
})
