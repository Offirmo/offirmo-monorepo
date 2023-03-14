

## files
* COPY the pkg from stack 2021 to stack 2022
* MOVE the 2021 files into "xxx-migrated"

## dependencies
`bolt` and fix outdated/missing dependencies

## package.json

Fix the top part

Search and replace
/src.es2019/      ->  /src.es2022.esm/
/src.es2019.cjs/  ->  /src.es2022.cjs/


`bolt` again and fix outdated/missing dependencies
`yarn outdated` and fix
