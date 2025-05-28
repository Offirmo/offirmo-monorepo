
```json
"heroku-run-build-script": false,
"scripts": {
  "heroku-prebuild": "echo This runs before Heroku nodjs buildback installs dependencies. Ensuring monorepo setup... && pwd && test -f Procfile && yarn global add bolt",
  "heroku-postbuild": "echo This runs after Heroku installs dependencies, but before Heroku prunes and caches dependencies. && pwd && ls -l && bolt"
},
```
