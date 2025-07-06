import * as fs from 'node:fs'

const some_file = process.env.EDGE_SOCIAL_FILE
console.log(some_file)

const contents = fs.readFileSync(some_file, 'utf8')
console.log(contents)

import { deserialize, serialize } from '../serialization--file/index.ts'
const state = deserialize(contents)
console.log(state)

console.log(serialize(state))

// TODO check if input is ~ same size as input



// objective
// - next anniversaries (birth, fête, work...)
// TO priority by "circle" me -> closest -> close family -> work/neighbor -> onlooker
// - time since last called mum
