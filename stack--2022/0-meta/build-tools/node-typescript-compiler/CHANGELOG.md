# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [Unreleased]
* [chore] removed the dependency to lodash 🎉
* TODO change the interface to use named params?
* TODO add types through comments?
* ...


## [4.0.0] - 2023-10-30
* [chore][BREAKING] converted to full ESM, exposed as `"type": "module"`, requires node 12+, node 18+ recommended
  * as such, the typescript module resolution through `require` is now resolved through `import.meta.resolve`
* [chore][BREAKING] main functions are now correctly marked async
* [feat] improved the nvm global module resolution, should now work on unix (not tested)
* [fix] improved a rare potential case where we could detect the spawn termination too early and miss out output
  * according to the doc, not actually seen
* [fix] logger state is no longer leaked between invocations (it was using a global state)
* [doc]++
* [chore] removed a dev dependency
* [chore] bumped dependencies
* [chore] refactored the code a bit


## [3.0.0] - 2022/04/25
* [feat][breaking] now using [cross-spawn](https://github.com/moxystudio/node-cross-spawn) to hopefully add Windows compatibility
  * marked as "breaking change" out of safety but should not change anything
  * credits to [photonstorm](https://github.com/photonstorm) for the [suggestion](https://github.com/Offirmo/offirmo-monorepo/issues/5#issuecomment-879942830)
  * credits to [MisterLuffy](https://github.com/MisterLuffy) for [reminding me about it](https://github.com/Offirmo/offirmo-monorepo/pull/10)
* [chore] bumped dependencies (minor)


## v2.4.0
2022/04/03
* [chore] micro-improvement of verbose logs
* [doc] marked as maintained in 2022! Happy new year!

## v2.3.0
2021/04/16
* [feat] added the CWD base in error messages as a hint to the failed compilation. Useful when building several modules in parallel
* [feat] no longer using '/' in path but `path.join()`, should improve Windows compatibility
* [feat] normalized logs
* [feat] added verbose messages
* [chore] bumped dependencies (minor)

## v2.2.1
2021/01/03
* [doc]++
* [doc] marked as maintained in 2021! Happy new year!

## v2.2.0
2020/12/13
* [feat] improved error messages
* [fix] improved error handling
* [doc] README++
* [chore] re-organized the source (monorepo) and tweaked the shared build script. No logic change.
* [chore] bumped dependencies (minor)

## v2.1.2
* [chore] mark as supported

## v2.1.1
2019/12/16
* [doc] README++ minor fix in badges

## v2.1.0
2019/12/16
* [feat] suppressed typescript as a peerDep to truly allow any version
* [feat] improved error messages, clearer, now extracting from output if possible
* [doc] README++ greatly improved, verbose option documented
* [chore] bumped dependencies

## v2.0.1
2019/12/12
* [chore] reorganized source paths = links update in the doc
* [doc] README++
* [chore] bumped deps

## 2.0.0
2019/04/04
* **breaking** [chore] typescript is now a `peerDependency`, thus requiring npm 3+
* [doc] README++
* [chore] bumped deps

## 1.2.0
2018/01/08
- verbose option
- spawn + params now only displayed if verbose = true
- errors are no longer displayed, unless verbose = true.
  They were unreadable and displaying stderr is sufficient
- optionally display a custom msg before starting stderr,
  useful in case of concurrent builds in the same terminal

## 1.1.1
2016/08/15
- handle new tsc 2.0 array params
- filter empty stdout lines for a more compact output
- print a *** line between watch refresh stdout for finding errors more easily

## 1.1.0
2016/08/09
- fixed node 4 compatibility
- added this changelog

## 1.0.1
- works fine ;)

## TEMPLATE
* [doc] README++
* [chore] bumped dependencies
* ...
