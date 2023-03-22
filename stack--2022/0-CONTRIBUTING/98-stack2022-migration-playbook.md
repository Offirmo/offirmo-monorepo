

## files
* COPY the pkg from stack 2021 to stack 2022
* MOVE the 2021 files into "xxx-migrated"

## dependencies
`bolt` and fix outdated/missing dependencies

## package.json

1. Fix the top part
2. Search and replace
/src.es2019/      ->  /src.es2022.esm/
/src.es2019.cjs/  ->  /src.es2022.cjs/
3. add "devDependencies": {
   "@offirmo-private/monorepo-scripts": "*",
4. `bolt` again and fix outdated/missing dependencies
5. `yarn outdated` and fix
6. fix the "scripts" section:
"clean": "node ../../../0-scripts/clean.js …dist"
"clean": "monorepo-script--clean-package …dist"
"_build:dev:watch": "node ../../../0-scripts/build-typescript.js --watch"
"_build:dev:watch": "monorepo-script--build-typescript-package --watch"
"_build:prod": "node ../../../0-scripts/build-typescript.js"
"_build:prod": "monorepo-script--build-typescript-package"
 'dist/src.es2022.cjs/**/*spec.js'"
 'dist/src.es2022.esm/**/*spec.js'"
