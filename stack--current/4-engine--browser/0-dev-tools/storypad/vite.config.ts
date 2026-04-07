import { extend_default_config } from '@monorepo-private/vite--config--default'

export default extend_default_config({
	resolve: {
		alias: {
			"@storybook/test": "module/src/l3-compat/@storybook/test.ts"
		}
	}
})
