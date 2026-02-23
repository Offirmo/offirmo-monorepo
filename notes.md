
```json
"heroku-run-build-script": false,
"scripts": {
  "heroku-prebuild": "echo This runs before Heroku nodjs buildback installs dependencies. Ensuring monorepo setup... && pwd && test -f Procfile && yarn global add bolt",
  "heroku-postbuild": "echo This runs after Heroku installs dependencies, but before Heroku prunes and caches dependencies. && pwd && ls -l && bolt"
},
```


View, create, and edit color palettes in the Simple Color Palette format (.color-palette).


OLD
```
Public npm modules:
* listed [here](https://offirmo-monorepo.netlify.app/public/modules-directory/index.html)

Public webapps:
* [The Boring RPG, reborn](https://www.online-adventur.es/apps/the-boring-rpg/)

Public webextensions:
* [Universal Debug API companion](4-tools/universal-debug-api-companion-webextension/README.md)
  * Firefox TODO
  * [Chrome](https://chrome.google.com/webstore/detail/offirmo%E2%80%99s-universal-web-d/cnbgbjmliafldggmfijmnbpdiikcalnl)


The general principle is that I want to give back,
and I welcome people reusing my code and creating jobs/value from it even without crediting me.

[`Unlicense`](https://unlicense.org/) is the license marked in package.json and the one most closely reflecting my intent. However, this license is rejected by some companies; hence I'm multi-licensing all the code marked as "unlicensed" into:
* Creative Commons Zero (CC0) License (Public Domain) as well
* MIT License as well

For your convenience.

* NOTE: If present, a specific file's or package's license overrides the default/root one! For example, some assets have their own license and some packages are forks retaining a specific license.
* NOTE: for my games/apps/tools, the code is free but not the *marketing efforts*, i.e., you are free to copy but must reasonably change the name if competing
* Also, I don't want my name to be used as an endorsement.

I'm not an expert in licenses, so I reserve the right to "fork" into any other kind of license, without removing what was already shared, of course.

```
