

## package manager

**yarn**

Why not npm?
* last try 2022/03 npm ^8
* (blocker) npm output spurious "timing" lines blotting the output
* npm requires "run" `npm run dev`
* overall npm doesn't seem as reliable as yarn

TODO use yarn v4!
TODO use corepack (2023/10 impossible to set up with yarn v1, too bleeding edge)
TODO evaluate https://github.com/pnpm/pnpm

## monorepo

**bolt**
* complemented by https://github.com/Thinkmill/manypkg
* downside: maintained but sort of dead

Why not yarn workspaces?
* they can't run commands in the dependency order
* they can't run commands on a glob

Why not rush? https://rushjs.io/
* has benefits
  * https://hello.atlassian.net/wiki/spaces/~790620688/blog/2021/03/30/1071416904/A+ShipIt+review+of+Rush+a+scalable+monorepo+manager+for+the+web
* too complicated, needs every pkg declared in a huge config

Recent news
* 2023 https://www.robinwieruch.de/web-development-trends/ ("Monorepos")

TODO evaluate pnpm https://blog.logto.io/parcel-to-vite
TODO evaluate turborepo
TODO evaluate https://nx.dev/
TODO evaluate lerna recent versions


## isomorphic
typescript

TODO evaluate https://blog.logrocket.com/boost-your-productivity-with-typescript-project-references/
TODO evaluate [self referencing in Typescript](https://www.typescriptlang.org/docs/handbook/esm-node.html) when [bug fix](https://github.com/microsoft/TypeScript/issues/46762)




## web bundler / compiler
https://parceljs.org/

Why Parcel?
* simplest, does everything
* BUT 2024 "@parcel/package-manager: ES module dependencies are experimental.
* BUT 2024 many bugs: import from html, ts resolver (mitigated)


White not Vite?
* evaluated 2024/01 Vite 5 ~works but not as good as Parcel:
  * rollup (embedded) has trouble with default exports https://stackoverflow.com/questions/58246998/mixing-default-and-named-exports-with-rollup
  * CSS resolver can't resolve from packages npm:xyz
  * needs a "main" in package.json
  * has a "root" preventing from serving files upper in the monorepo

TODO re-evaluate vite https://blog.logto.io/parcel-to-vite
TODO evaluate Rpack https://rspack.dev/


## linting

TODO re-evaluate ESLint https://eslint.org/blog/2024/07/whats-coming-next-for-eslint/
     https://eslint.org/blog/2024/10/eslint-json-markdown-support/

TODO evaluate https://biomejs.dev/

## environment manager

nvm

* TODO review corepack
* TODO evaluate https://github.com/Schniz/fnm
* TODO evaluate https://www.honeybadger.io/blog/node-environment-managers/
* https://docs.volta.sh/guide/understanding
* https://asdf-vm.com/guide/introduction.html#nvm-n-rbenv-etc
```
12. Which version manager do you use? 
none
nvm
n
asdf
fnm
nodenv
nvs
volta
Other (please specify)
```


## database

### PostGresQL
### libSQL
https://libsql.org/about

### Query builder and ORM
knex

TODO evaluate prisma
TODO evaluate https://docs.turso.tech/3p-dev-tools
TODO evaluate https://github.com/drizzle-team/drizzle-orm#readme

### migration

TODO evaluate https://atlasgo.io/
TODO evaluate https://flywaydb.org/
TODO evaluate https://github.com/golang-migrate/migrate

### misc


## Misc / new

https://github.com/capricorn86/happy-dom

TODO evaluate edge DB https://atlasgo.io/guides/sqlite/turso
TODO evaluate neon db https://clerk.com/blog/automate-neon-schema-changes-with-drizzle-and-github-actions

https://github.com/folke/ultra-runner

### workflow
- TODO evaluate https://www.npmjs.com/package/@atlaskit/build-releases
- TODO evaluate https://yarnpkg.com/features/release-workflow
- TODO evaluate changesets
  https://www.totaltypescript.com/how-to-create-an-npm-package


TODO https://knip.dev/
