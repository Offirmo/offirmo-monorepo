# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
* TODO use globalThis to ensure there is no accidental duplication due to incorrect bundling or bundle split? (to review)
* [chore][breaking] converted to full ESM, exposed as `"type": "module"`, requires node 12+, node 18+ recommended
* [chore][breaking] pre-builds now targeting node22/ES2024 [details](../../0-CONTRIBUTING/06-conventions--js--modules_and_transpilation.md)
* [chore][breaking] removed the package.json "esnext" property, can't find reference of tools using it
* [chore] slightly improved unit tests
* [doc] marked as maintained in 2025! Happy new year!
* ...


## v1.0.0
2022/04/03
* [doc] reviewed the semantic and usage ✔ It seems valid -> 1.0 + improved doc
* [doc] marked as maintained in 2022! Happy new year!

## v0.0.4
2021/01/03
* [feat] improve typings (inspired from tiny-invariant)
* [test] unit tests
* [doc] ++
* [doc] marked as maintained in 2021! Happy new year!
* [chore] tweaked the tsconfig to not use nor import tslib. NOT NEEDED for now but will avoid accidents bloating the bundle size.
* [chore] re-organized the source (monorepo) and tweaked the shared build script. No logic change.

## v0.0.3
2020/07/01
* [chore][breaking] cjs pre-build now targeting node12/ES2019 [details](../../CONTRIBUTING/module-exports.md)
* [doc] README++
* [feat] minor tweak to shave a few bytes

## v0.0.2
2019/12/12
* [chore] reorganized source paths = links update in the doc
* [chore] linted automatically (no logic change)

## v0.0.1
2019/10/28
* initial release to npm

## template
* [doc] README++
* [chore] upgraded pre-built code target to latest stable JS (ES2019)
