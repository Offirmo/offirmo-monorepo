import { apply } from '@infinite-monorepo/operation--apply'

/////////////////////////////////////////////////

console.log(`Hi!`)

const OFFIRMO_MONOREPO_ROOT__CURRENT = process.env.OFFIRMO_MONOREPO_ROOT__CURRENT || `~/work/src/x-external/off/offirmo/offirmo-monorepo/stack--current/`


await apply(OFFIRMO_MONOREPO_ROOT__CURRENT)
//await apply('~/work/src/off/offirmo-monorepo/stack--next/')
//await apply('~/work/src/off/offirmo-monorepo/stack--web3/')

//await apply("~/work/src/__doc/offirmo-monorepo/stack--current/")
//await apply("~/work/src/__doc/offirmo-monorepo/stack--web3/")
