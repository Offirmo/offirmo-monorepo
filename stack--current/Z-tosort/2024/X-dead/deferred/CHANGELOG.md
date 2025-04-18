# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
* [chore] added unit tests!
* [chore][breaking] removed the package.json "esnext" property, can't reference of tools using it
* [chore][breaking] pre-builds now targeting node22/ES2024 [details](../../0-CONTRIBUTING/06-conventions--js--modules_and_transpilation.md)
* [chore][breaking] converted to full ESM, exposed as `"type": "module"`, requires node 12+, node 18+ recommended
* [doc] marked as maintained in 2024! Happy new year!
* ...

## 4.0.1
2022/04/02
* [doc] marked as maintained in 2022! Happy new year!

## 4.0.0
2021/01/03
* [fix][breaking] fixed the interface to follow the fix in TypeScript 4.1 https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#resolves-parameters-are-no-longer-optional-in-promises
* [doc] marked as maintained in 2021! Happy new year!
* [chore] tweaked the tsconfig to not use nor import tslib. NOT NEEDED for now but will avoid accidents bloating the bundle size.
* [chore] re-organized the source (monorepo) and tweaked the shared build script. No logic change.

## 3.0.0
2020/06/30
* [chore][breaking] will now by default prevent the "uncaught rejection" message
* [chore][breaking] cjs pre-build now targeting node12/ES2019 [details](../../0-CONTRIBUTING/06-conventions--js--modules_and_transpilation.md)
* [feat] slightly improved typings, following the latest Promise definition (Typescript 3.8.3)
* [doc] credits

## 2.0.1
2019/12/12
* [chore] reorganized source paths = links updated in the doc

## 2.0.0
2019/11/18
* [chore][breaking] no longer exporting ES5, reverted to [this more rationale export setup](../../0-CONTRIBUTING/06-conventions--js--modules_and_transpilation.md)
* [chore] fixed dist folder name to match the target (ES2019)
* [feat] also provide an ES5 pre-built version
  * Idiot me... so it wasn't a breaking since ES5 was never released :facepalm:
* [chore] linted automatically (no logic change)

## 1.0.1
2019/06/30
* [feat] clearer Symbol.toStringTag
* [doc] README++
* [chore] upgraded pre-built code target to latest stable JS (ES2019)

## 1.0.0
2019/05/30
* [doc] fix README.md
* [chore] stricter size limit

## v0.0.1
2019/05/30
* initial release to npm

## template
* [doc] README++
* [chore] bumped deps
