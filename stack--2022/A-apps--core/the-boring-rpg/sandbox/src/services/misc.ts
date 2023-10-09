import { getLogger } from '@offirmo/universal-debug-api-placeholder'
const root_logger = getLogger()
root_logger.setLevel('silly')


import chalk from 'chalk'
import { injectꓽlibꓽchalk } from '@offirmo-private/prettify-any'
injectꓽlibꓽchalk(chalk)
