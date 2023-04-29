
## Installation

I use [macOS 13](update marker) but should work on any unix-like system.

This set of command will build everything: (required as there are dependencies between modules)
```bash
## First: update OS, brew, nvm, etc.
## Then:
nvm install
npm i -g yarn # bolt only works when installed by yarn
yarn global add bolt
npx browserslist@latest --update-db # cf. https://github.com/browserslist/browserslist#browsers-data-updating
bolt
bolt build
bolt test
```
