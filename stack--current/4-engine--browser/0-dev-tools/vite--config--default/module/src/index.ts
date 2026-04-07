// https://vite.dev/config/

import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'

import { mergeⵧdeep } from '@monorepo-private/merge'

import react from '@vitejs/plugin-react'
//import xPlugin from '@monorepo-private/vite-plugin-parcel-features'
//import Inspect from 'vite-plugin-inspect'

/////////////////////////////////////////////////

const CONFIGⵧDEFAULT: UserConfig = {
	devtools: true,
	plugins: [
		react(),
		//Inspect(),
		//xPlugin(),
	],
}


function extend_default_config(configⵧoverrides: UserConfig): ReturnType<typeof defineConfig> {
	const configⵧfinal = mergeⵧdeep<UserConfig>(CONFIGⵧDEFAULT, configⵧoverrides)
	return defineConfig(configⵧfinal)
}

/////////////////////////////////////////////////

export {
	CONFIGⵧDEFAULT,
	extend_default_config,
}
