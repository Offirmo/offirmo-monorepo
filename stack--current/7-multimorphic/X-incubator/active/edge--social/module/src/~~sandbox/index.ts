import * as fs from 'node:fs'

const some_file = process.env.INPUT
console.log(some_file)

const contents = fs.readFileSync(some_file, 'utf8')
console.log(contents)

import { deserialize, serialize } from '../index.ts'
const state = deserialize(contents)
console.log(state)

console.log(serialize(state))
