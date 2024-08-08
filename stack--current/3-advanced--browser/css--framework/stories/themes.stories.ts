const LIB = '@offirmo-private/css--framework'

////////////////////////////////////////////////////////////////////////////////////

function _ANeverVisited() {
	const location = document.location
	console.log('hello')

	return `<a href="${location.origin + location.pathname + location.search + '&random=' + String(Math.random())}">link -- never visited</a>`
}

function _AAlreadyVisited() {
	const location = document.location

	return `<a href="${location.origin + location.pathname + location.search}">link -- already visited</a>`
}

function _demo_content(theme: string = '[no theme = default]', is_alternate: boolean = false) {
	return `
		<section data-o-theme="${theme}" ${is_alternate?'class="o⋄paddingꘌmedium o⋄border⁚default "':''}>
			<small><pre><code>data-o-theme="${theme}"</code></pre></small>
			<h1>${LIB}</h1>
			<h2>Theme preview</h2>

			<p>
				Content is key!
				<strong>strong</strong>
				normal
				<span class="o⋄colorꘌsecondary">secondary</span>
				<span class="o⋄colorꘌancillary">ancillary</span>
				<small>small</small>
			</p>

			<p>
				${_ANeverVisited()},
				${_AAlreadyVisited()}
			</p>

			<p>
				<span class="o⋄colorꘌerror">error</span>
				<span class="o⋄colorꘌwarning">warning</span>
				<span class="o⋄colorꘌinfo">info</span>
				<span class="o⋄colorꘌsuccess">success</span>
				<code>code</code>
				<span class="o⋄error-report">error report</span>
			</p>

			<form>
				<input type="checkbox" checked>test accent</input>
				<button class="o⋄button--inline">Button inline</button>
				<button>Button</button>
			</form>
		</section>
	`
}

function _theme_demo(theme: string) {
	const alternate_themes: string[] = []
	if (theme && theme !== 'light') alternate_themes.push('light')
	if (theme !== 'dark') alternate_themes.push('dark')
	if (theme !== 'dark--colorhunt212') alternate_themes.push('dark--colorhunt212')

	return `
		${_demo_content(theme)}
		${alternate_themes
			.map(alternate_theme => _demo_content(alternate_theme, is_alternate = true))
			.join('')
		}
	`
}

function _decorator_add_all_themes(story) {
	import('../src/themes/theme--dark--colorhunt212.css')
	return story
}
function _decorator_select_theme(theme) {
	return (story) => {
		const root_elt = document.getElementsByTagName('html')[0]
		root_elt!.dataset['oTheme'] = theme
		return story
	}
}

export function NoThemesLoadedNoThemeSet() {
	return _theme_demo()
}
NoThemesLoadedNoThemeSet.decorators = [
]

export function AllThemesLoadedNoThemeSet() {
	return _theme_demo()
}
AllThemesLoadedNoThemeSet.decorators = [
	_decorator_add_all_themes,
]

export function AllThemesLoadedNoThemeSetCustomized() {
	return _theme_demo()
}
AllThemesLoadedNoThemeSetCustomized.decorators = [
	_decorator_add_all_themes,
	(story) => {

		setTimeout(() => {
			const style = document.createElement('style')
			style.textContent = `
:root {
/* orange brand color */
--o⋄color⁚brand__h: 19;
--o⋄color⁚brand__s: 100%;
--o⋄color⁚brand__l: 54%;

/* tweak computed colors to hint at the tint */
--o⋄color⁚fg--main__l: 7%;  /* slightly not full black to allow a hint of a tint */
--o⋄color⁚bg--main__l: 90%; /* slightly not full white to allow a hint of a tint */
--o⋄color⁚bg--code: hsl(var(--o⋄color⁚bg--main__h), 7%, clamp(80%, calc(var(--o⋄color⁚bg--main__l) - 10%), 100%));

/* tweak links */
--o⋄color⁚fg--link:          hsl(var(--o⋄color⁚brand__h), var(--o⋄color⁚brand__s), 66%);
--o⋄color⁚fg--link--visited: hsl(var(--o⋄color⁚brand__h), var(--o⋄color⁚brand__s), 33%);
}
		`
			document.body.append(style)}, 1000)

		return story
	}
]


export function AllThemesLoadedThemeSetLight() {
	return _theme_demo('light')
}
AllThemesLoadedThemeSetLight.decorators = [
	_decorator_add_all_themes,
	_decorator_select_theme('light'),
]

export function AllThemesLoadedThemeSetLightCustomized() {
	return 'TODO'
	//return _theme_demo('light')
}
AllThemesLoadedThemeSetLightCustomized.decorators = [
	_decorator_add_all_themes,
	_decorator_select_theme('light--default'),
]

export function AllThemesLoadedThemeSetDark() {
	return _theme_demo('dark')
}
AllThemesLoadedThemeSetDark.decorators = [
	_decorator_add_all_themes,
	_decorator_select_theme('dark'),
]

export function AllThemesLoadedThemeSetDarkCustom() {
	return 'TODO'
	//return _theme_demo('dark--default')
}
AllThemesLoadedThemeSetDarkCustom.decorators = [
	_decorator_add_all_themes,
	_decorator_select_theme('dark--default'),
	(story) => {
		const style = document.createElement('style')
		style.textContent = `
		`
		document.head.append(style);
		return story
	}
]

export function AllThemesLoadedThemeSetDarkColorhunt212() {
	return _theme_demo('dark--colorhunt212')
}
AllThemesLoadedThemeSetDarkColorhunt212.decorators = [
	_decorator_add_all_themes,
	_decorator_select_theme('dark--colorhunt212'),
]
