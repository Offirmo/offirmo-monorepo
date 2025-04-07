
## Usage (dev commands)

### normal module dev

Now that all modules are built (required), you can move into an **individual** module:
```bash
## this will trigger watch build of the compatible cjs version, which works in all envs
yarn dev

yarn test
```

Note than modifying a module's source most likely requires a build for it to take effect.
Be aware of the dependencies.

### build/test only a subset

For ex. to make everything work again step by step!

			"1-isomorphic/7-libs--rpg/*",
			"1-isomorphic/A-libs--the-boring-rpg/*",
			"1-isomorphic/X-incubator/active/*",
			"2-engine--node/1-libs--simple/*",
			"2-engine--node/2-libs--cross-cutting/*",
			"3-engine--browser/0-dev-tools/*",
			"3-engine--browser/1-libs--simple/*",
			"3-engine--browser/2-libs--cross-cutting/*",
			"3-engine--browser/X-incubator/active/*"


```bash
bolt --only-fs "[0-9]-*/*" ws run build
bolt --only-fs "[0-9]-*/*" ws run test
bolt --only-fs "[0-5]-*/*" ws run build
bolt --only-fs "[0-5]-*/*" ws run test
   bolt --only-fs "0-meta/build-tools/*" ws run test
   bolt --only-fs "1-isomorphi*/*" ws run test
      bolt --only-fs "1-isomorphic/1-libs--simple/*" ws run test
      bolt --only-fs "1-isomorphic/2-libs--cross-cutting/*" ws run test
      bolt --only-fs "1-isomorphic/3-libs--advanced/*" ws run test
   
   

## Alt:
bolt --only @oh-my-rpg/* ws run test
bolt --only-fs "A-apps--core/**/*" ws run build
bolt --only-fs "A-apps--core/**/*" ws run test
bolt --only-fs "B-apps--support/**/*" ws run build
bolt --only-fs "B-apps--support/**/*" ws run test
bolt --only-fs "C-apps--clients/**/*" ws run build
bolt --only-fs "C-apps--clients/**/*" ws run test
bolt w @tbrpg/definitions run build
bolt ws run build --only @offirmo-private/*
bolt ws run test  --only @offirmo-private/*

## misc:
bolt ws run cheatsheet
bolt ws run cheatsheet --only @offirmo-private/*
bolt ws run cheatsheet --only @oh-my-rpg/*
bolt --only-fs "1-stdlib/*" ws run ensure-size
```

## clean
```bash
bolt clean-deps

bolt clean
# equivalent to:
#  bolt ws run clean
#  bolt ws exec -- rm -rf .cache .parcel dist node_modules yarn.lock package-lock.json yarn-error.log
```

## updates dependencies (minor + patch)
```bash
nvm i
onn
bolt clean && rm -rf node_modules yarn.lock package-lock.json && bolt && yarn outdated     && bolt build
bolt clean && rm -rf node_modules yarn.lock package-lock.json && bolt && bolt build
##yarn eslint:packages --fix
npx update-browserslist-db@latest # cf. https://github.com/browserslist/browserslist#browsers-data-updating
npx yarn-deduplicate --list
```

## serve for dev
```bash
ngrok http -subdomain=offirmo 1981
yarn serve
```

## publish a package
```bash
npm adduser
user: offirmo
email: offirmo.net@gmail.com
npm publish
npm publish --access public
```


## tosort

### tabset

yellow FDEE00
