
# JS modules export and transpilation policy

## Policy

The public modules in this monorepo ase exposed as:
- Latest stable ES, with latest stable module exports
  - with sometimes a few stage 4 features when they are already widely supported https://github.com/tc39/ecma262
  - instructions [here](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) and [here](https://www.typescriptlang.org/docs/handbook/esm-node.html)
- as a convenience, pre-built CJS for latest ES (https://node.green/)
  supported by the oldest active LTS node (https://nodejs.org/en/about/previous-releases or https://github.com/nodejs/Release)
- for modules in Typescript, trying to use the latest Typescript, best effort.
- while webpack is not used in this repo(*), we acknowledge that it's widely used and thus aim to support its latest version

See below more exact numbers.

Note: I do NOT agree with the opinion "don't transpile node_modules", see [issue]()


## Technical details

### PENDING updates
- [ ] TODO TS has working support of [self referencing](https://www.typescriptlang.org/docs/handbook/esm-node.html) when [bug fix](https://github.com/microsoft/TypeScript/issues/46762) = update unit tests!
- [ ] 🆙 2025-10-28 oldest active LTS node 22 → 24  https://github.com/nodejs/release#release-schedule
- [ ] 🆙 mid 2025 [ES2025](https://en.wikipedia.org/wiki/ECMAScript_version_history)
- [ ] 🆙 webpack release 5 → 6  https://github.com/webpack/webpack/milestones  https://webpack.js.org/blog/
- [ ] TS supports importing .ts AND transpiles to .js
- [ ] TS supports exporting with explicit module info .cjs .mjs

ES reasonably supported https://philipwalton.com/articles/the-state-of-es5-on-the-web/
new target env: workerd https://blog.cloudflare.com/more-npm-packages-on-cloudflare-workers-combining-polyfills-and-native-code/


### update 2024-11-23
Updated state:

1. Node runtime version
* 🆕 oldest active LTS node = [22](https://nodejs.org/en/about/previous-releases)
* 🆕 most recent node supported by AWS lambda = [22](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html)

⭆ 🆕 latest supported node = 22 (if updated, search for "engines")

2. ECMASCript version
* latest ES = [ES2024](https://en.wikipedia.org/wiki/ECMAScript_version_history) + [latest spec](https://262.ecma-international.org/15.0/)
* latest ES reasonably supported by this node LTS (latest minor) = [ES2024](https://node.green/#ES2024) (incomplete but close enough though)
* 🆕 latest ES supported by TypeScript as a target = [2024](https://www.typescriptlang.org/tsconfig#target) [code](https://github.com/microsoft/TypeScript/blob/main/src/server/protocol.ts#L3231)
* 🆕 latest ES supported by TypeScript as a lib = [2024](https://github.com/microsoft/TypeScript/tree/main/src/lib)
  * 5.7 https://devblogs.microsoft.com/typescript/announcing-typescript-5-7/?ocid=typescript_eml_tnp_autoid21_title#support-for---target-es2024-and---lib-es2024
* latest ES reasonably supported by browsers or polyfills = [ES2024](https://compat-table.github.io/compat-table/es2016plus/)
* we no longer consider webpack (outdated tool, we no longer use it)

⭆ latest convenient ES = 2023 (if changed, need search&replace in package.json, search for "es2023" and "update marker")

3. ES module
- we consider webpack outdated and are no longer taking into account its limitations
- we consider the ecosystem advanced enough to move to full ESM https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#how-can-i-move-my-commonjs-project-to-esm

⭆ latest convenient module = ES (module = 2022 in TypeScript)

- [x] TODO remove all cjs since we can no longer generate it since Typescript 5.2


### update 2024-07-25
Updated state:

1. Node runtime version
* oldest active LTS node = [20](https://nodejs.org/en/about/previous-releases)
* most recent node supported by AWS lambda = [20](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html)

⭆ latest supported node = 20 (if updated, search for "engines")

2. ECMASCript version
* 🆕 latest ES = [ES2024](https://en.wikipedia.org/wiki/ECMAScript_version_history) + [latest spec](https://262.ecma-international.org/15.0/)
* 🆕 latest ES reasonably supported by this node LTS (latest minor) = [ES2024](https://node.green/#ES2023) (incomplete but close enough though)
* 🆕 latest ES supported by TypeScript as a target = [2023](https://www.typescriptlang.org/tsconfig#target) [code](https://github.com/microsoft/TypeScript/blob/main/src/server/protocol.ts#L3231)
* latest ES supported by TypeScript as a lib = [2023](https://github.com/microsoft/TypeScript/tree/main/src/lib)
* 🆕 latest ES reasonably supported by browsers or polyfills = [ES2024](https://compat-table.github.io/compat-table/es2016plus/)
* we no longer consider webpack (outdated tool, we no longer use it)

⭆ latest convenient ES = 2023 (if changed, need search&replace in package.json, search for "es2022" and "update marker")

3. ES module
- we consider webpack outdated and are no longer taking into account its limitations
- we consider the ecosystem advanced enough to move to full ESM https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#how-can-i-move-my-commonjs-project-to-esm

⭆ latest convenient module = ES (module = 2022 in TypeScript)


### update 2024-01-01
Updated state:

1. 🆕 Node runtime version
* oldest active LTS node = [20](https://nodejs.org/en/about/previous-releases)
* 🆕 most recent node supported by AWS lambda = [20](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html)

⭆ 🆕 latest supported node = 20 (if updated, search for "engines")

2. ECMASCript version
* latest ES = [ES2023](https://en.wikipedia.org/wiki/ECMAScript_version_history)
* latest ES reasonably supported by this node LTS (latest minor) = [ES2023](https://node.green/#ES2023) (close to ES2024 though)
* latest ES supported by TypeScript as a target = [2022](https://www.typescriptlang.org/tsconfig#target) [code](https://github.com/microsoft/TypeScript/blob/d027e9619fb8ca964df3885a536a67b5f813738b/src/server/protocol.ts#L3759)
* latest ES supported by TypeScript as a lib = [2023](https://github.com/microsoft/TypeScript/tree/main/src/lib)
* latest ES reasonably supported by browsers or polyfills = [ES2023](https://compat-table.github.io/compat-table/es2016plus/)
* we no longer consider webpack (outdated tool, we no longer use it)

⭆ latest convenient ES = 2023

3. ES module
- we consider webpack outdated and are no longer taking into account its limitations
- we consider the ecosystem advanced enough to move to full ESM https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#how-can-i-move-my-commonjs-project-to-esm

⭆ latest convenient module = ES (module = 2022 in TypeScript)


### update 2023-10-24
Updated state:

1. Node runtime version
  * 🆕 oldest active LTS node = [20](https://nodejs.org/en/about/previous-releases)
  * most recent node supported by AWS lambda = [18](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html)

⭆ latest supported node = 18 (if updated, search for "engines")

2. ECMASCript version
* latest ES = [ES2023](https://en.wikipedia.org/wiki/ECMAScript_version_history)
* latest ES reasonably supported by this node LTS (latest minor) = [ES2023](https://node.green/#ES2023)
* 🆕latest ES supported by TypeScript as a target = [2022](https://www.typescriptlang.org/tsconfig#target)
* 🆕latest ES supported by TypeScript as a lib = [2023](https://www.typescriptlang.org/tsconfig#lib)
* latest ES reasonably supported by browsers or polyfills = [ES2023](https://kangax.github.io/compat-table/es2016plus/)
* we no longer consider webpack (outdated tool, we no longer use it)

⭆ 🆕latest convenient ES = 2023

3. ES module
- we consider webpack outdated and are no longer taking into account its limitations
- we consider the ecosystem advanced enough to move to full ESM https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#how-can-i-move-my-commonjs-project-to-esm

⭆ latest convenient module = ES (module = 2022 in TypeScript)


### update 2023-08-16
Updated state:

1. Node runtime version
   * oldest active LTS node = [18](https://nodejs.org/en/about/previous-releases)
   * 🆕most recent node supported by AWS lambda = [18](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html)

⭆ latest supported node = 18

2. ECMASCript version
* 🆕latest ES = [ES2023](https://en.wikipedia.org/wiki/ECMAScript_version_history)
* latest ES reasonably supported by this node LTS (latest minor) = [ES2023](https://node.green/#ES2023)
* 🆕latest ES supported by TypeScript as a target = [2022](https://www.typescriptlang.org/tsconfig#target)
* 🆕latest ES supported by TypeScript as a lib = [2022](https://www.typescriptlang.org/tsconfig#lib)
* 🆕latest ES reasonably supported by browsers or polyfills = [ES2023](https://kangax.github.io/compat-table/es2016plus/)
* 🆕we no longer consider webpack (outdated tool, we no longer use it)

⭆ latest convenient ES = 2022

3. ES module
- 🆕we consider webpack outdated and are no longer taking into account its limitations
- 🆕we consider the ecosystem advanced enough to move to full ESM https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#how-can-i-move-my-commonjs-project-to-esm

⭆ 🆕latest convenient module = ES (module = 2022 in TypeScript)


### update 2022-11-20
Updated state:
* latest ES = [ES2022](https://en.wikipedia.org/wiki/ECMAScript_version_history)
* oldest active LTS node = [18](https://nodejs.org/en/about/previous-releases)
* latest ES reasonably supported by this node LTS (latest minor) = [ES2023](https://node.green/#ES2022)
* latest ES syntax supported by Webpack (= Acorn supports it + webpack bumped Acorn) = ES2021
  * latest webpack version = [5](https://webpack.js.org/)
  * version of Acorn in this webpack version = [^8.7.1](https://github.com/webpack/webpack/blob/master/package.json)
  * latest ES syntax reasonably supported by this Acorn = [2023](https://github.com/acornjs/acorn/blob/master/acorn/CHANGELOG.md)
* FYI compilers/polyfills https://kangax.github.io/compat-table/es2016plus/

= 🆕latest supported node = 18
= 🆕latest convenient ES = 2022 (if changed, need search&replace in package.json)


### update 2022-05-02
* Policy update: NO LONGER held back by the old webpack from netlify-lambda!! 🥳
* Policy update: replaced ES support criteria by "reasonable support"
* Note: considering switch to [pure ESM](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) however this will happen gradually, need code rewrite

Updated state:
* latest ES = [ES2021](https://en.wikipedia.org/wiki/ECMAScript#Versions)
* oldest active LTS node = [16](https://nodejs.org/en/about/previous-releases)
* latest ES reasonably supported by this node LTS (latest minor) = [ES2021](https://node.green/#ES2022)
* latest ES syntax supported by Webpack (= Acorn supports it + webpack bumped Acorn) = ES2021
  * latest webpack version = [5](https://webpack.js.org/)
  * version of Acorn in this webpack version = [^8](https://github.com/webpack/webpack/blob/master/package.json)
  * latest ES syntax reasonably supported by this Acorn = [2021](https://github.com/acornjs/acorn/tree/master/acorn)
* FYI compilers/polyfills https://kangax.github.io/compat-table/es2016plus/

= latest supported node = 16
= 🆕latest convenient ES = 2021


### update 2022-03-21
Check = no change

Updated state:
* latest ES = [ES2021](https://en.wikipedia.org/wiki/ECMAScript#Versions)
* oldest active LTS node = [16](https://nodejs.org/en/about/previous-releases)
* latest ES supported by this node LTS = [ES2021](https://node.green/#ES2022)
* latest ES syntax supported by Webpack (= Acorn supports it + webpack bumped Acorn) = ES2021
  * latest webpack version = [5](https://webpack.js.org/)
  * version of Acorn in this webpack version = [^8](https://github.com/webpack/webpack/blob/master/package.json)
  * latest ES syntax supported by this Acorn = [2021](https://github.com/acornjs/acorn/tree/master/acorn)
* (special use) latest ES syntax supported by netlify-lambda = ES2019
  * latest netlify-lambda version = [2.0.15](https://github.com/netlify/netlify-lambda)
  * version of webpack in this version = [4](https://github.com/netlify/netlify-lambda/blob/master/package.json)
  * version of Acorn in this webpack version = [^6](https://github.com/webpack/webpack/blob/webpack-4/package.json)
  * latest ES syntax supported by this Acorn = ~[2019](https://github.com/acornjs/acorn/tree/6.x/acorn)
* FYI compilers/polyfills https://kangax.github.io/compat-table/es2016plus/

= latest supported node = 16
= latest convenient ES = 2019


### update 2021-10-12 (slightly early switch to node 16)
- ~2021/06 new ES 2020 → 2021
- 2021/10/26 oldest active LTS node 14 → 16

Updated state:
* latest ES = [ES2021](https://en.wikipedia.org/wiki/ECMAScript#Versions)    ___⬅CHANGE___
* oldest active LTS node = [16](https://nodejs.org/en/about/previous-releases)    ___⬅CHANGE___
* latest ES supported by this node LTS = [ES2021](https://node.green/#ES2021)   ___⬅CHANGE___
* latest ES syntax supported by Webpack (= Acorn supports it + webpack bumped Acorn) = ES2021   ___⬅CHANGE___
  * latest webpack version = [5](https://webpack.js.org/)
  * version of Acorn in this webpack version = [^8](https://github.com/webpack/webpack/blob/master/package.json)   ___⬅CHANGE___
  * latest ES syntax supported by this Acorn = [2021](https://github.com/acornjs/acorn/tree/master/acorn)   ___⬅CHANGE___
* (special use) latest ES syntax supported by netlify-lambda = ES2019
  * latest netlify-lambda version = [2.0.14](https://github.com/netlify/netlify-lambda)
  * version of webpack in this version = [4](https://github.com/netlify/netlify-lambda/blob/master/package.json)
  * version of Acorn in this webpack version = [^6](https://github.com/webpack/webpack/blob/webpack-4/package.json)
  * latest ES syntax supported by this Acorn = ~[2019](https://github.com/acornjs/acorn/tree/6.x/acorn)
* FYI compilers/polyfills https://kangax.github.io/compat-table/es2016plus/

= latest supported node = 16    ___⬅CHANGE___
= latest convenient ES = 2019 (:sad: due to netlify-lambda)


### update 2020-10-20
- 2020/10/27 oldest active LTS node 12 → 14
- 2020/10/10 webpack release 4 → 5

Updated state:
* latest ES = [ES2020](https://en.wikipedia.org/wiki/ECMAScript#Versions)
* oldest active LTS node = [14](https://nodejs.org/en/about/previous-releases)    ___⬅CHANGE___
* latest ES supported by this node LTS = [ES2020](https://node.green/#ES2019)   ___⬅CHANGE___
* latest ES syntax supported by Webpack (= Acorn supports it + webpack bumped Acorn) = ES2020   ___⬅CHANGE___
  * latest webpack version = [5](https://webpack.js.org/)   ___⬅CHANGE___
  * version of Acorn in this webpack version = [^8](https://github.com/webpack/webpack/blob/master/package.json)   ___⬅CHANGE___
  * latest ES syntax supported by this Acorn = [2020](https://github.com/acornjs/acorn/tree/master/acorn)   ___⬅CHANGE___
* (special use) latest ES syntax supported by netlify-lambda = ES2019
  * latest netlify-lambda version = [2.01](https://github.com/netlify/netlify-lambda)
  * version of webpack in this version = [4](https://github.com/netlify/netlify-lambda/blob/master/package.json)
  * version of Acorn in this webpack version = [^6](https://github.com/webpack/webpack/blob/webpack-4/package.json)
  * latest ES syntax supported by this Acorn = ~[2019](https://github.com/acornjs/acorn/tree/6.x/acorn)
* FYI compilers/polyfills https://kangax.github.io/compat-table/es2016plus/

= latest supported node = 14    ___⬅CHANGE___
= latest convenient ES = 2019 (:sad: due to netlify-lambda)

### update 2020-06-28
- 2020/06 ES2020 approved https://github.com/tc39/ecma262/releases/tag/es2020

* latest ES = [ES2020](https://en.wikipedia.org/wiki/ECMAScript#Versions)
* oldest active LTS node = [12](https://nodejs.org/en/about/previous-releases)
* latest ES supported by this node LTS = [ES2019](https://node.green/#ES2019)
* latest ES syntax supported by Webpack (= Acorn supports it + webpack bumped Acorn) = 2019
* FYI compilers/polyfills https://kangax.github.io/compat-table/es2016plus/

Babel plugins
* https://devblogs.microsoft.com/typescript/typescript-and-babel-7/

### update 2020-05-29
Switching to supporting oldest node = 12
since node 10 in maintenance mode since 2020-05-19 https://nodejs.org/en/about/previous-releases
* latest ES = [ES2019](https://en.wikipedia.org/wiki/ECMAScript#Versions)
* oldest active LTS node = [12](https://nodejs.org/en/about/previous-releases)
* latest ES supported by this node LTS = [ES2019](https://node.green/#ES2019)

### update 2019-07-27
* latest ES = [ES2019](https://en.wikipedia.org/wiki/ECMAScript#Versions)
* oldest active LTS node = [10](https://nodejs.org/en/about/previous-releases)
* latest ES supported by this node LTS = [ES2018](https://node.green/#ES2018)



## Maintainer playbook
* when updating this file, also update `0-scripts/build-typescript.js`
* when updating node/lib, also update
  * `.nvmrc`
  * `engines` from root `package.json` = `"node":`
  * `"@types/node"`
  * `tsconfig.json`: `"lib":`
  * replace in `package.json`: `src.es202x`
  * `B-apps--support/online-adventur.es/heroku/.babelrc`
  * `B-apps--support/online-adventur.es/functions/.babelrc`
  * Netlify:
    * ensure AWS_LAMBDA_JS_RUNTIME = "nodejsXX.x" is valid in `netlify.toml`
    * in admin change AWS_LAMBDA_JS_RUNTIME = nodeXX.x or sth
  * sibling repos
    * adjust `.nvmrc` and `netlify.toml` in online-adventures.github.io




## TODO
- TODO are refreshes major or minor?? Most likely major (see @sindre)
- clarify not restricting node engine

```json
	"name": "@offirmo/deferred",
	"description": "Implementation of the deferred pattern on top of a Promise",
	"version": "4.0.1",
	"author": "Offirmo <offirmo.net@gmail.com>",
	"license": "Unlicense",

	"sideEffects": false,
	"exports": { XXX are there any tools able to read that? Even typescript doesnt (as of 4.5)
		".": {
         XXX those fields must start with ./
           XXX other fields must NOT (ex. https://github.com/vuejs/vue/blob/v2.2.2/package.json#L6)
			"import": "./dist/src.es2022.esm/index.js",
			"require": "./dist/src.es2022.cjs/index.js"
		}
	},
	"module": "dist/src.es2022.esm/index.js", XXX eventually, this is the most supported field https://stackoverflow.com/questions/42708484/what-is-the-module-package-json-field-for
	"main": "dist/src.es2022.cjs/index.js",  oldest, used for cjs XXX needed for typescript as of 4.5
	"typings": "dist/src.es2022.cjs/index.d.ts", XXX idem, needed for typescript 4.5
	"source": "src/index.ts",

	"size-limit": [
		{
			"limit": "250b",
			"path": "dist/src.es2022.esm/index.js"
		},
		{
			"limit": "250b",
			"path": "dist/src.es2022.cjs/index.js"
		}
	],
```
