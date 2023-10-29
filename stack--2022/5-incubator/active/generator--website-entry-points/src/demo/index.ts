import assert from 'tiny-invariant'
import { Immutable } from '@offirmo-private/ts-types'
import * as path from 'node:path'
import * as util from 'node:util'
import { fileURLToPath } from 'node:url'
import * as fs from 'node:fs'

import generateꓽwebsiteᝍentryᝍpoint from '../index.js'

/////////////////////////////////////////////////


const EXAMPLEⵧSIMPLE_PAGE: Parameters<typeof generateꓽwebsiteᝍentryᝍpoint>[0] = {
	title: 'The Boring RPG',
}

const EXAMPLEⵧWEBAPPⵧTBRPG2023: Parameters<typeof generateꓽwebsiteᝍentryᝍpoint>[0] = {
	preset: 'game',

	wantsꓽinstall: 'prompt',
	hasꓽown_navigation: true,
	supportsꓽscreensⵧwith_shape: true,
	canꓽuse_window_controls_overlay: true,
	usesꓽpull_to_refresh: false,

	title: 'The Boring RPG',
	description: '(Browser game) The simplest RPG ever! (indie game, free to play, no account needed)',
	keywords: [ 'game', 'incremental', 'fantasy', 'rpg', 'free', 'indie'],

	colorⵧbackground: 'hsl(337, 16%, 28%)',
	colorⵧforeground: 'hsl(42, 100%, 87%)',
	colorⵧtheme:      'hsl(248,  9%, 17%)',

	styles: [
		'snippet:natural-box-layout',
		``,
	]
}

const EXAMPLEⵧEXPERIMENTⵧVIEWPORT: Parameters<typeof generateꓽwebsiteᝍentryᝍpoint>[0] = {
	isꓽdebug: true,

	wantsꓽinstall: 'partial',
	hasꓽown_navigation: true,
	supportsꓽscreensⵧwith_shape: true,
	canꓽuse_window_controls_overlay: true,
	usesꓽpull_to_refresh: false,

	title: 'Viewport Test 03',
	description: 'Prototype of PWA-compatible page using the full viewport',

	// https://www.colorhunt.co/palette/1926553876bfe1aa74f3f0ca
	colorⵧbackground: '#3876BF',
	colorⵧforeground: '#F3F0CA',
	colorⵧtheme:      '#E1AA74',

	styles: [
		'snippet:natural-box-layout',
		`
:root {
	/* transfer the env() to variables
	 */
	--safe-area-inset-top:    env(safe-area-inset-top,    0px);
	--safe-area-inset-right:  env(safe-area-inset-right,  0px);
	--safe-area-inset-bottom: env(safe-area-inset-bottom, 0px);
	--safe-area-inset-left:   env(safe-area-inset-left,   0px);
}

/* don't mess with those special containers */
html, body {
	margin: 0;
	padding: 0;
	border: initial;
}

body {
	position: fixed;
	overflow: hidden;
	width: 100lvw;
	height: 100lvh;
}

.fullviewport {
	isolation: isolate;
	position: absolute;
	margin: 0;
	overflow: hidden;
	width: 100vw;
	height: 100vh;
}
.fullviewport.large {
	width: 100lvw;
	height: 100lvh;
}
.fullviewport.normal {
}
.fullviewport.small {
	width: 100svw;
	height: 100svh;
}
.fullviewport.dynamic {
	width: 100dvw;
	height: 100dvh;
}

.with-clear-borders {
	--color--border: rgba(255, 255, 255, 0.3);
	border: dashed 2lvmin var(--color--border);
	border-boundary: display; /* https://drafts.csswg.org/css-round-display/#border-boundary-property */
	shape-inside: display; /* https://drafts.csswg.org/css-round-display/#shape-inside-property */
}

.safe-inset {
	--color--border: rgba(255, 0, 0, 0.5);
	border-top:    solid var(--safe-area-inset-top)    var(--color--border);
	border-right:  solid var(--safe-area-inset-right)  var(--color--border);
	border-bottom: solid var(--safe-area-inset-bottom) var(--color--border);
	border-left:   solid var(--safe-area-inset-left)   var(--color--border);

	color: var(--color--border);
	text-align: right;
}

.controls {
}
		`,
	],

	html: `
<div class="fullviewport dynamic with-clear-borders">
	DYNAMIC viewport
</div>

<div class="fullviewport safe-inset">
	[SAFE INSET]
</div>

<div class="fullviewport debug">

</div>

<div class="fullviewport controls">
	<button onclick="location.reload()" style="position: absolute; bottom: 10lvmin; left: 10lvmin;">Reload</button>
</div>


<script type="module">

	function on_viewport_change() {
		console.group('on_viewport_change()')

		console.log({ screen })
		console.log({ visualViewport })
		console.log({
			'document.documentElement.clientWidth': document.documentElement.clientWidth,
			'document.documentElement.clientHeight': document.documentElement.clientHeight,
			//'viewportⵧsmall': [ fullviewport_elementⵧsmall.offsetWidth, fullviewport_elementⵧsmall.offsetHeight ],
			//'viewportⵧnormal': [ fullviewport_elementⵧnormal.offsetWidth, fullviewport_elementⵧnormal.offsetHeight ],
			//'viewportⵧlarge': [ fullviewport_elementⵧlarge.offsetWidth, fullviewport_elementⵧlarge.offsetHeight ],
			//'viewportⵧdynamic': [ fullviewport_elementⵧdynamic.offsetWidth, fullviewport_elementⵧdynamic.offsetHeight ],
		})

		console.groupEnd()
	}

	;(new ResizeObserver((entries, observer) => {
		for (const entry of entries) {
			console.log("ResizeObserver: element size changed:", entry);
			if (entry.target === document.documentElement) {
				on_viewport_change()
			}
		}
	})).observe(document.documentElement)
</script>
	`
}

/////////////////////////////////////////////////

const result = generateꓽwebsiteᝍentryᝍpoint(
	//EXAMPLEⵧSIMPLE_PAGE
	//EXAMPLEⵧWEBAPPⵧTBRPG2023
	EXAMPLEⵧEXPERIMENTⵧVIEWPORT
)

Object.keys(result).forEach(basename => {
	console.log(`\n📄 ${basename}`)
	console.log(result[basename])
})

/////////////////////////////////////////////////
const dirpath = path.join((process as any).env.PWD, 'dist', 'public')
// TODO rm?
fs.mkdirSync(dirpath, { recursive: true })
Object.keys(result).forEach(basename => {
	const filepath = path.join(dirpath, basename)
	fs.writeFileSync(
		filepath,
		result[basename]!,
		{
			encoding: 'utf8',
		}
	)
})

/////////////////////////////////////////////////
