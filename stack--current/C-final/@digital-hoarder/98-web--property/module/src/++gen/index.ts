#!/usr/bin/env ts-node
import { fileURLToPath } from 'node:url'
import * as path from 'node:path'

import generateꓽwebsiteᝍentryᝍpoints from '@monorepo-private/generator--website-entry-points'

import { SPEC } from '../index.ts'

/////////////////////////////////////////////////

await generateꓽwebsiteᝍentryᝍpoints(
	SPEC,
	path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../../99-web-app-final/module/src/'),
	{ rm: true },
)
