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
		<section data-o-theme="${theme}" ${is_alternate?'class="o⋄paddingꘌmedium"':''}>
			<h1>${LIB}</h1>
			<h2>Theme preview</h2>

			<p>
				<pre><code>data-o-theme="${theme}"</code></pre>
			</p>

			<p>
				What I’m saying is that it’s so, so simple to make sites easier to read!
			</p>

			<p>
				<strong>emphasized text</strong>
				normal text
				<span class="o⋄colorꘌsecondary">secondary text</span>
				<span class="o⋄colorꘌancillary">ancillary text</span>
				<small>small text</small>
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
			</p>

			<form>
			<input type="checkbox" checked>test accent
</form>
		</section>
	`
}

function _theme_demo(theme: string) {
	const alternate_theme = theme?.startsWith('dark')
		? 'light--default'
		: 'dark--default'

	return `
		${_demo_content(theme)}
		${_demo_content(alternate_theme, is_alternate = true)}
	`
}

function _decorator_add_all_themes(story) {
	import('../src/themes/theme--light--default.css')
	import('../src/themes/theme--dark--default.css')
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

export function NoThemeNoLoad() {
	return _theme_demo()
}
NoThemeNoLoad.decorators = [
]

export function NoTheme() {
	return _theme_demo()
}
NoTheme.decorators = [
	_decorator_add_all_themes,
]

export function NoThemeCustomized() {
	return _theme_demo()
}
NoThemeCustomized.decorators = [
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


export function LightDefault() {
	return _theme_demo('light--default')
}
LightDefault.decorators = [
	_decorator_add_all_themes,
	_decorator_select_theme('light--default'),
]

export function LightCustomized() {
	return _theme_demo('light--default')
}
LightCustomized.decorators = [
	_decorator_add_all_themes,
	_decorator_select_theme('light--default'),
]

export function DarkDefault() {
	return _theme_demo('dark--default')
}
DarkDefault.decorators = [
	_decorator_add_all_themes,
	_decorator_select_theme('dark--default'),
]

export function DarkCustom() {
	return _theme_demo('dark--default')
}
DarkCustom.decorators = [
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

export function DarkColorhunt212() {
	return _theme_demo('dark--colorhunt212')
}
DarkColorhunt212.decorators = [
	_decorator_add_all_themes,
	_decorator_select_theme('dark--colorhunt212'),
]
