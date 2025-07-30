

## dependencies

dependencies: Netlify 'build' only installs PROD dependencies, so make sure modules critical for scripts are included!


## resolutions

??
		"**/react-refresh": "^0" I believe needed due to a parcel bug


"resolutions": {
"**/react": "^18",
"**/react-dom": "^18",
"**/react-refresh": "^0"
}


		"// TODO": "remove this, I'll likely not use heroku anymore",
		"heroku-prebuild": "echo This runs before Heroku nodjs buildback installs dependencies. Ensuring monorepo setup... && pwd && test -f Procfile",
		"heroku-postbuild": "echo This runs after Heroku installs dependencies, but before Heroku prunes and caches dependencies. && pwd && ls -l",
