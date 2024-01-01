

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
