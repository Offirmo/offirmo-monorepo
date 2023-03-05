

## package manager
**yarn**

Why yarn over npm?
* last try 2022/03 npm ^8
* (blocker) npm output spurious "timing" lines blotting the output
* npm requires "run" npm run dev


## monorepo

* **bolt**
* complemented by https://github.com/Thinkmill/manypkg
* downside: bundle duplication

Why not bolt? https://github.com/boltpkg/bolt
* maintained but sort of dead

Why not yarn workspaces?
* they can't run commands in the dependency order
* they can't run commands on a glob

Why not rush? https://rushjs.io/
* has benefits
  * https://hello.atlassian.net/wiki/spaces/~790620688/blog/2021/03/30/1071416904/A+ShipIt+review+of+Rush+a+scalable+monorepo+manager+for+the+web
* too complicated, needs every pkg declared in a huge config

Recent news
* 2023 https://www.robinwieruch.de/web-development-trends/ ("Monorepos")

## isomorphic
typescript


## web
https://parceljs.org/



## TODO

### to evaluate

https://www.honeybadger.io/blog/node-environment-managers/
* https://docs.volta.sh/guide/understanding
* https://asdf-vm.com/guide/introduction.html#nvm-n-rbenv-etc

https://github.com/folke/ultra-runner
https://blog.logrocket.com/boost-your-productivity-with-typescript-project-references/
[Pure ESM package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)
[self referencing in Typescript]()


TODO evaluate workflow
- https://www.npmjs.com/package/@atlaskit/build-releases
- https://yarnpkg.com/features/release-workflow
- changesets


### to reevaluate in a while

https://rome.tools/#about-rome

better monorepo tooling (replace bolt)
- https://nx.dev/
- lerna
- turborepo
