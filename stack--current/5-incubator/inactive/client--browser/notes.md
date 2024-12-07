
```bash
inc1
inc2
yarn clean
yarn refresh--entry-points
yarn refresh--build-variables
```





		"@offirmo-private/async-utils": "^0",
		"@offirmo-private/ensure-device-uuid-browser": "^0",
		"@offirmo-private/favicon-notifications": "^0",
		"@offirmo-private/features-detection-browser": "*",
		"@offirmo-private/iframe--chat": "^0",
		"@offirmo-private/iframe--loading": "^0",
		"@offirmo-private/marketing-rsrc": "^0",
		"@offirmo-private/poll-window-variable": "^0",
		"@offirmo-private/react-error-boundary": "^0",
		"@offirmo-private/rich-text-format": "^0",
		"@offirmo-private/rich-text-format--to-react": "^0",
		"@offirmo-private/soft-execution-context": "*",
		"@offirmo-private/soft-execution-context--browser": "*",
		"@offirmo-private/state-utils": "*",
		"@offirmo-private/timestamps": "*",
		"@offirmo-private/view-chat": "^0",
		"@offirmo/universal-debug-api-browser": "^1",
		"@oh-my-rpg/assets--cursors": "^0",
		"@oh-my-rpg/rsrc-backgrounds": "^0",
		"@online-adventur.es/api-client": "^0",
		"@tbrpg/audio-browser": "^0",
		"@tbrpg/definitions": "^0",
		"@tbrpg/flux": "^0",
		"@tbrpg/interfaces": "^0",
		"@tbrpg/state": "*",
		"@tbrpg/ui--browser--react": "^0",
		"@tbrpg/ui--rich-text": "^0",
		"bowser": "^2",
		"classnames": "^2",
		"fetch-inject": "^2",
		"floating.js": "^2",
		"fraction.js": "^4",
		"lodash": "^4",
		"memoize-one": "^6",
		"prop-types": "^15",
		"raven-js": "^3",
		"react": "^17",
		"react-animation-frame": "^1",
		"react-dom": "^17",
		"react-router-dom": "^6",
		"tiny-invariant": "^1",
		"tslib": "^2",
		"typescript-string-enums": "^1"



		"refresh-loading-template": "offirmo-simple-upgradable-template-apply --template=../../../3-advanced--browser/iframe--loading/src/index.html --destination=./src/index.html",
		"refresh-build-variables": "monoropo-script--update-build-variables --inputDir=../../../A-apps--core/the-boring-rpg/state",
		"build:parcel": "parcel build --no-minify src/*.html --public-url ./",
		"copy-extra": "cp -f src/*.json src/google*.html src/for-open-graph.jpg dist",
		"copy-favicons-for-webmanifest": "mkdir -p dist/favicons && cp -rf dist/android-chrome-512x512.*.png dist/favicons/android-chrome-512x512.png",
		"ensure-size": "size-limit",

		"start:parcel": "PARCEL_AUTOINSTALL=false parcel src/index.html --no-autoinstall --port 8080",
		"copy-extra--dev": "mkdir -p .parcel && cp -f src/index.html .parcel && cp -f src/build.json .parcel",
		"dev": "npm-run-all clean refresh-build-variables refresh-loading-template --parallel start:parcel copy-extra--dev",

		"xbuild": "npm-run-all clean refresh-build-variables refresh-loading-template build:parcel copy-extra copy-favicons-for-webmanifest ensure-size"





* Icons: https://game-icons.net/
* Image: img-parchment-xxl.jpg - MIT - https://github.com/stolksdorf/homebrewery
* Image: https://opengameart.org/content/rpg-gui-construction-kit-v10
* Misc: WoW - NOT FREE / TO REPLACE - https://github.com/Gethe/wow-ui-textures
* Font: https://www.behance.net/gallery/64168335/Keletifree-font-(download-link)
* colors: https://colorbrewer2.org/#type=qualitative&scheme=Set1&n=5

Inspiration:
* https://github.com/RonenNess/RPGUI
* https://tachyons.io/
* https://getflywheel.com/layout/css-svg-clipping-and-masking-techniques/


Tools:
* https://border-image.com/
* https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Background_and_Borders/Border-image_generator

Techniques
* https://medium.com/@peedutuisk/lesser-known-css-quirks-oddities-and-advanced-tips-css-is-awesome-8ee3d16295bb
* CSS variables
  * https://css-tricks.com/theming-with-variables-globals-and-locals/
  * https://simurai.com/blog/2018/04/01/contextual-styling
  * https://github.com/giuseppeg/suitcss-toolkit/tree/example-app/examples/app#themes
* https://youmightnotneedjs.com/

Similar
* https://bcrikko.github.io/NES.css/


## Roadmap

v1
- [x] build over an image background
- [ ] always display the game name
- [ ] responsive - desktop
  -- [ ] responsive - mobile: portrait only
  -- [ ] responsive - mobile: controls close to fingers
- [ ] nice
- [ ] display char name (if room)
- [ ] display some kind of status (if room)
- [ ] has quick access to usual sub-apps
- [ ] allow "annoucements"

vNext maybe
- [ ] level up interface
- [ ] modal capabilities
- [ ] has indirect access to any number of sub-apps, like a task switcher
- [ ] cue at shortcuts
- [ ] responsive - mobile: add landscape support
- [ ] settings interface
- [ ] low health / mana indicators
- [ ] swappable themes to cue of class/faction/ambiance
- [ ] display location


TODO glow effect ?
https://designshack.net/articles/css/12-fun-css-text-shadows-you-can-copy-and-paste/

https://nigelotoole.github.io/pixel-borders/



		"@oh-my-rpg/assets--cursors": "^0"
		"@oh-my-rpg/assets--background--artbreeder": "^0",


notched buttons ? https://css-tricks.com/notched-boxes/

scooped corners for discussion https://css-tricks.com/scooped-corners-in-2018/

use that for text? https://github.com/pshihn/lumin


			<svg class="svg-mask">
				<defs>
					<mask id="mask1" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
						<radialGradient id="grad" gradientUnits="objectBoundingBox" x2="0" y2="1">
							<stop stop-color="white" stop-opacity="100" offset="0.5"/>
							<stop stop-color="black" stop-opacity="0" offset="0.7"/>
						</radialGradient>
						<rect
							style="opacity:1;stroke:none;paint-order:normal;filter:url(#filter1553)"
							id="rect1443"
							width="1"
							height="1"
							fill="url(#grad)"
							x="0"
							y="0" />
					</mask>
				</defs>
			</svg>


https://kamranahmed.info/driver
https://v-play.net/game-resources/16-sites-featuring-free-game-graphics


Inspiration:
- https://www.dungeonsurvivor.com/
- https://www.dungeonsurvivor.com/preregistration

TODO inventory with https://github.com/drcmda/mauerwerk ?


nice icons: https://www.unrealengine.com/marketplace/technology-and-skill-icons

blob study https://codepen.io/shubniggurath/full/YBgGrw
* fake 3D https://tympanus.net/codrops/2019/02/20/how-to-create-a-fake-3d-image-effect-with-webgl/
  * https://www.producthunt.com/posts/dpth


TODO https://floating-ui.com/
