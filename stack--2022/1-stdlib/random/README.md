
# @Offirmo/random

**This used to be an improved fork of [Random.js](https://github.com/ckknight/random-js) adding ES6 and typescript compatibility. Hat tip to original author!👒**

**This has now (2023) been totally reworked with a single interface (but still using the original core)**

**XXX THIS RNG LIB MAKES NO CLAIM OF CORRECTNESS/ BEING CRYPTOGRAPHICALLY SECURE, IT'S MAINTAINED BY A NON-SCIENTIST FOR WRITING GAMES!**

Pitch: a mathematically correct pseudo random number generator library for JavaScript:
* no dependencies
* generating various distributions of random values (over the default Math.random())
* correct random generation (easy to make wrong when using Math.Random)
* Optional PSEUDO-random generation (useful for repeatability, esp. in unit tests but also for speed runs)
  * the state is savable/restorable
  * includes the fast and (claimed) cryptographically secure ISAAC PRNG
* avoid causing a huge bundle by requiring node crypto


Interface change from Random.js
* only 1 interface
  * We keep the "inconvenient" interface with the potential of the highest speed (as much pre-computation as possible)
* parameters type enforcement (no affordances)
* better naming
* better structure/readability
* native TypeScript
* native ESM





import { get_engine, RNGEngine } from '@offirmo/random'
const rng = get_engine.for_unit_tests()
const rng = get_engine.for_unit_tests()

import { get_random, RNGEngine } from '@offirmo/random'
const gen = get_random.generator_of.integer.between(1, 1000)
const gen = get_random.picker.of(ARMOR_BASES)
const gen get_random.generator_of.integer.in_interval(BASE_STRENGTH_INTERVAL_BY_QUALITY[quality]!)
v = gen(rng)



TODO review https://stackoverflow.com/questions/4720822/what-is-the-best-pseudo-random-number-generator-as-of-today
TODO review https://github.com/davidbau/seedrandom
TODO review https://github.com/sindresorhus/randoma
