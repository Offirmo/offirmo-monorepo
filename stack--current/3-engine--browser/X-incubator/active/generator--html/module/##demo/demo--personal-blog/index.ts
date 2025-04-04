#!/usr/bin/env ts-node

import { getꓽhtml‿str } from '@offirmo-private/generator--html'

import { SPEC } from '../../src/__specs/__fixtures/specs--blog--personal.js'

/////////////////////////////////////////////////

console.log(SPEC)

const html = getꓽhtml‿str(SPEC)
console.log(html)
