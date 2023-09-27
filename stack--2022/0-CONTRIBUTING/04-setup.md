
## Installation

I use [macOS 13.6](update marker) but should work on any unix-like system.

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

## Common issues

### gyp errors

1. Do we need the module? Better to use pure JS ones.
2. updates
3. possible: `sudo rm -r -f /Library/Developer/CommandLineTools; xcode-select --install;`
