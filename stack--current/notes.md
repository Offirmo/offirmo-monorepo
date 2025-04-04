```
"bolt": "^0.24",
  "cpx"

		"@manypkg/cli": "^0.22",
		"test": "manypkg exec yarn test",
		"build": "manypkg exec yarn build"
```

[![Netlify Status](https://api.netlify.com/api/v1/badges/25734112-d205-4789-ad2f-bfcdf8d65252/deploy-status)](https://app.netlify.com/sites/offirmo-monorepo/deploys)



## Credits and Hat tips

Credits:
- Adriano Emerick "Mobile Security" icon https://thenounproject.com/search/?q=security mobile&i=153136
- José Hernandez "Weight" icon https://thenounproject.com/search/?q=weight&i=9409

Tools
- Color converter https://www.cssportal.com/css-color-converter/
- favicon https://realfavicongenerator.net/
- https://github.com/scottsidwell/bundle-inspector



TODO 	"packageManager": "yarn@1",

"A-apps--core/space-rpg/*",


old workspaces:

 			"0-meta/build-tools/*",
-			"1-stdlib/*",
-			"2-foundation/*",
-			"3-advanced/*",
-			"3-advanced--browser/*",
-			"3-advanced--multi/*",
-			"3-advanced--node/*",
-			"4-tools/*",
-			"5-incubator/active/*",
-			"9-rpg/*",
-			"A-apps--core/the-boring-rpg/*",
-			"#D-minisites/*"

### build/test only a subset

For ex. to make everything work again step by step!

```bash
bolt --only-fs "[0-9]-*/*" ws run build
bolt --only-fs "[0-9]-*/*" ws run test
bolt --only-fs "[0-5]-*/*" ws run build
bolt --only-fs "[0-5]-*/*" ws run test
   bolt --only-fs "0-meta/build-tools/*" ws run build
   bolt --only-fs "0-meta/build-tools/*" ws run test
   bolt --only-fs "1-stdlib/*" ws run build
   bolt --only-fs "1-stdlib/*" ws run test
   bolt --only-fs "2-foundation/*" ws run build
   bolt --only-fs "2-foundation/*" ws run test
   bolt --only-fs "3-advance*/*" ws run build
   bolt --only-fs "3-advance*/*" ws run test
      bolt --only-fs "3-advanced/*" ws run build
      bolt --only-fs "3-advanced/*" ws run test
      bolt --only-fs "3-advanced--multi/*" ws run build
      bolt --only-fs "3-advanced--multi/*" ws run test
      bolt --only-fs "3-advanced--browser/*" ws run build
      bolt --only-fs "3-advanced--browser/*" ws run test
      bolt --only-fs "3-advanced--node/*" ws run build
      bolt --only-fs "3-advanced--node/*" ws run test
   bolt --only-fs "4-tools/*" ws run build
   bolt --only-fs "4-tools/*" ws run test
   bolt --only-fs "5-incubator/**/*" ws run build
   bolt --only-fs "5-incubator/**/*" ws run test
   bolt --only-fs "9-rpg/**/*" ws run build
   bolt --only-fs "9-rpg/**/*" ws run test
bolt --only-fs "A-apps--core/the-boring-rpg/**/*" ws run build
   bolt --only-fs "A-apps--core/the-boring-rpg/l1-*" ws run build
   bolt --only-fs "A-apps--core/the-boring-rpg/l2-*" ws run build
   bolt --only-fs "A-apps--core/the-boring-rpg/l3-*" ws run build
bolt --only-fs "A-apps--core/the-boring-rpg/**/*" ws run test
bolt --only-fs "B-apps--support/online-adventur.es/**/*" ws run build
bolt --only-fs "B-apps--support/online-adventur.es/**/*" ws run test
bolt --only-fs "C-apps--clients/the-boring-rpg/**/*" ws run build
bolt --only-fs "C-apps--clients/the-boring-rpg/**/*" ws run test
bolt --only-fs "D-minisites/*" ws run build

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
