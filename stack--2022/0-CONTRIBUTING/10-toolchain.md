

## package manager
**yarn**

Why not npm?
* last try 2022/03 npm ^8
* (blocker) npm output spurious "timing" lines blotting the output
* npm requires "run" `npm run dev`


## monorepo

**bolt**
* complemented by https://github.com/Thinkmill/manypkg
* downside: bundle duplication
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

TODO evaluate turborepo
TODO evaluate https://nx.dev/
TODO evaluate lerna recent versions


## isomorphic
typescript

TODO evaluate https://blog.logrocket.com/boost-your-productivity-with-typescript-project-references/
TODO evaluate [self referencing in Typescript]()




## bundler / compiler
https://parceljs.org/

TODO evaluate vite
TODO evaluate Rome https://rome.tools/#about-rome


## web
https://parceljs.org/

TODO evaluate vite


## environment manager

nvm

* TODO evaluate https://github.com/Schniz/fnm
* TODO evaluate https://www.honeybadger.io/blog/node-environment-managers/
* https://docs.volta.sh/guide/understanding
* https://asdf-vm.com/guide/introduction.html#nvm-n-rbenv-etc


## database

### PostGresQL
### libSQL
https://libsql.org/about

### Query builder and ORM
knex

TODO evaluate https://docs.turso.tech/3p-dev-tools
TODO evaluate https://github.com/drizzle-team/drizzle-orm#readme

### migration

TODO evaluate https://atlasgo.io/
TODO evaluate https://flywaydb.org/
TODO evaluate https://github.com/golang-migrate/migrate

### misc


## Misc / new

TODO evaluate edge DB https://atlasgo.io/guides/sqlite/turso

https://github.com/folke/ultra-runner

### workflow
- https://www.npmjs.com/package/@atlaskit/build-releases
- https://yarnpkg.com/features/release-workflow
- changesets
