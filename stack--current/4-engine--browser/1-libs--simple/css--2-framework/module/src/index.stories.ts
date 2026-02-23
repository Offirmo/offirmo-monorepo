const LIB = '@monorepo-private/css--framework'

////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////
/*
import MixedBG from './assets/mixed-colors-background-footage-031575133_iconl.webp'

export function BackdropsBackgrounds() {
	return `
		<>
			<h2>backdrop color</h2>
			<p>Normal fg text should always be readable on the backdrop color</p>

			<div class='o⋄box' style={{backgroundColor: 'var(--o⋄color⁚bg--main)'}}>
				<div class='o⋄bg-colorꘌbackdrop'>
					Normal situation: <code>backgroundColor: var(--o⋄color⁚bg--main)</code>
				</div>
			</div>

			<div class='o⋄box' style={{backgroundColor: '#808080'}}>
				<div class='o⋄bg-colorꘌbackdrop'>
					Middle: <code>backgroundColor: <a href="https://en.wikipedia.org/wiki/Middle_gray">middle gray</a></code>
				</div>
			</div>

			<div class='o⋄box' style={{backgroundColor: 'var(--o⋄color⁚fg--main)'}}>
				<div class='o⋄bg-colorꘌbackdrop'>
					Opposite: <code>backgroundColor: var(--o⋄color⁚fg--main)</code>
				</div>
			</div>

			<div class='o⋄box o⋄bg⁚cover' style={{backgroundImage: `url(` + MixedBG + ')' }}>
				<div class='o⋄bg-colorꘌbackdrop'>
					<code>mixed background bg picture</code>
				</div>
			</div>

			<div class='o⋄box' style={{position: 'relative'}}>
				<div>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</div>
				<div class='o⋄bg-colorꘌbackdrop' style={{position: 'absolute', top: 0, padding: '25px 0'}}>
					Normal + underlying text
				</div>
			</div>

			<div class='o⋄box'>
				<div class='o⋄bg-colorꘌbackdrop' style={{position: 'relative'}}>
					Dual layers Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

					<div class='o⋄box o⋄bg-colorꘌbackdrop' style={{position: 'absolute', top: 0}}>
						Normal + Second layer Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
					</div>
				</div>
			</div>

			<h2>Alt background colors</h2>
			<p>TODO</p>
		</>
		`
}*/

////////////////////////////////////////////////////////////////////////////////////
/*
export function Fonts() {
	// https://en.wikipedia.org/wiki/Pangram
	const pangram = 'The five boxing wizards jump quickly -> Sphinx of black quartz, judge my vow! Pack my box with five dozen liquor jugs…'

	const FontModifiers = <>

		<strong>strong</strong>&nbsp;
		<em>emphasized</em>&nbsp;
		Font style:
		<ul>
			{['100', 'lighter', 'normal', 'bold', 'bolder', '900'].map(fw => <li style={{fontWeight: fw}}>{fw}</li>)}
		</ul>
	</>

	return `
		<>
			<p class="o⋄fontꘌfast-and-good-enough">
				Featuring the "fast and good enough" font-family (.o⋄fontꘌfast-and-good-enough)
				<br/>{ pangram }
				<br/>{FontModifiers}
			</p>
			<hr/>

			<p class="o⋄fontꘌsystem">
				Featuring the "system" font-family (.o⋄fontꘌsystem)
				<br/>{ pangram }
				<br/>{FontModifiers}
			</p>
			<hr/>

			<p class="o⋄fontꘌroboto">
				Featuring the nice and precise "roboto" font-family (.o⋄fontꘌroboto)
				<br/>{ pangram }
				<br/>{FontModifiers}
			</p>
			<hr/>

			<p class="o⋄fontꘌroboto-condensed">
				Featuring the nice and precise "roboto condensed" font-family (.o⋄fontꘌroboto-condensed)
				<br/>{ pangram }
				<br/>{FontModifiers}
			</p>
			<hr/>

			<p class="o⋄fontꘌroboto-mono">
				Featuring the code wise "roboto mono" font-family (.o⋄fontꘌroboto-mono)
				<br/>{ pangram }
				<br/>{FontModifiers}
			</p>
		</>
					`
}*/


////////////////////////////////////////////////////////////////////////////////////
/*
function ColorsAsCSSVariablesTable({radixes, caption}: { radixes: string[], caption: string }) {
	console.log({
		radixes,
		caption,
	})
	return (
		<table style={ {border: '1px solid var(--o⋄color⁚fg--main)'} } summary="Table of colors defined as CSS variables">
			<caption>⬇{ caption }⬇</caption>
			<thead>
			<tr>
				<th scope='col'>CSS variable</th>
				<th scope='col'>name</th>
				<th scope='col'>foreground</th>
				<th scope='col'>background</th>
			</tr>
			</thead>
			<tbody>
			{ radixes.map(radix => {
				const css_var = `--o⋄color⁚` + radix
				return (
					<tr key={ radix }>
						<td class="o⋄fontꘌroboto-mono">{ css_var }</td>
						<td>{ radix }</td>
						{
							radix.startsWith('bg--')
								? <td class="o⋄text-alignꘌcenter">-</td>
								: <td style={ {color: `var(${ css_var })`} }>as foreground</td>
						}
						{
							radix.startsWith('fg--')
								? <td class="o⋄text-alignꘌcenter">-</td>
								: <td style={ {backgroundColor: `var(${ css_var })`} }>as background</td>
						}
					</tr>
				)
			}) }
			</tbody>
		</table>
	)
}
/*
export function Colors() {

	const SEMANTIC_COLORS_VARS_RADIX = [
		'fg--main',
		'fg--secondary',
		'fg--ancillary',

		'fg--error',
		'fg--warning',
		'fg--info',
		'fg--success',

		'bg--main',
		'bg--main--backdrop',
		'bg--highlight--1',
		'bg--highlight--2',

		'fg--accent',
	]

	const BASE_COLORS_VARS_RADIX = [
		'transparent',
		'darker--10',
		'darker--20',
		'darker--90',
		'lighter--10',
		'lighter--20',
		'lighter--90',
		'boz__gray',
		'boz__yellow',
		'boz__pink',
		'boz__green',
		'boz__cyan',
		'boz__blue',
		'boz__purple',
		'co212__beige',
		'co212__blue',
		'co212__brown',
		'co212__dark',
	]

	return (
		<>

			<ColorsAsCSSVariablesTable
				radixes={ SEMANTIC_COLORS_VARS_RADIX }
				caption={ 'Semantic colors from CSS variables' }
			/>

			<ColorsAsCSSVariablesTable
				radixes={ BASE_COLORS_VARS_RADIX }
				caption={ 'Base colors from CSS variables = building blocks (do NOT use directly!)' }
			/>
		</>
				`
}*/

////////////////////////////////////////////////////////////////////////////////////

export function Controls() {
	return `
<p>
	…some text… <a href="https://bettermotherfuckingwebsite.com/">link</a> …some text… <button>Click me!</button> …some text… <progress value=".5">progress</progress> …some text…
</p>

<p>
	What I’m saying is that it’s so, <button class="o⋄button--inline">so simple to make
	sites</button> easier to read...
</p>

Nicer scrollbars by default
<div class="o⋄border⁚default o⋄paddingꘌsmall" style="height: 200px; overflowY: scroll">
	<p>Hi</p>
	<p>Hi</p>
	<p>Hi</p>
	<p>Hi</p>
	<p>Hi</p>
	<p>Hi</p>
	<p>Hi</p>
	<p>Hi</p>
	<p>Hi</p>
	<p>Hi</p>
	<p>Hi</p>
</div>
		`
}

////////////////////////////////////////////////////////////////////////////////////

export function Advanced() {
	return `
<ul>
	<li><span class="o⋄character-as-icon">🗡</span> character as icon <span class="o⋄character-as-icon">🛡 👕 🍽 🍴 🥄 🔪 🗡 ⚔ 🏹 🔧 🔨 ⛏ ⚒ 🛠</span></li>
	<li><span class="o⋄character-as-icon o⋄rotated⁚45deg">🗡</span> rotated 45°</li>
	<li><span class="o⋄character-as-icon o⋄rotated⁚90deg">🗡</span> rotated 90°</li>
	<li><span class="o⋄character-as-icon o⋄rotated⁚180deg">🗡</span> rotated 180°</li>
	<li><span class="o⋄character-as-icon o⋄rotated⁚270deg">🗡</span> rotated 270°</li>
</ul>
		`
}

////////////////////////////////////////////////////////////////////////////////////

export function Containers() {
	return 'TODO'
		/*`
			<p>
				<code>o⋄top-container</code> = very convenient container to propagate full height (flexbox column)
			</p>
			<p>
				<code>o⋄centered-article</code> = max width + auto-centered
			</p>
			<p>
				<code>o⋄body⁚full-viewport</code> = try to force the body to take the full viewport
			</p>

			<div class='o⋄box'>
				This is a box
			</div>

			<div class="o⋄paddingꘌsmall" style={{
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundImage: `url(https://placekitten.com/1024/512)`,
				margin: '5px 0',
			}}>
				<p class="o⋄bg-colorꘌbackdrop">
					Text on a backdrop <code>o⋄bg-colorꘌbackdrop</code>
				</p>
			</div>

			<hr />

			Default border <code>o⋄border⁚default</code> + y-scroll <code>o⋄overflow-yꘌauto</code>
			<div class="o⋄border⁚default o⋄overflow-yꘌauto" style={{height: '100px'}}>
				<p>Hi</p>
				<p>Hi</p>
				<p>Hi</p>
				<p>Hi</p>
				<p>Hi</p>
				<p>Hi</p>
				<p>Hi</p>
				<p>Hi</p>
				<p>Hi</p>
				<p>Hi</p>
				<p>Hi</p>
			</div>

			<p>
				img with 100% width: <code>o⋄widthꘌ100pc</code>
				<img alt="cute kitten" class="o⋄widthꘌ100pc" src="https://placekitten.com/1024/512" />
			</p>

			<hr />

			<div class="o⋄error-report">
				A sample error report
				<pre>[Intervention] Slow network is detected. See https://www.chromestatus.com/feature/5636954674692096 for more details. Fallback font will be used while loading: https://fonts.gstatic.com/stats/Merriweather/normal/900
				</pre>
			</div>
					`*/
}

////////////////////////////////////////////////////////////////////////////////////

export function DemoꓽApp() {
	return `
		<div>

			<header class="o⋄border⁚default">
				[header]
			</header>

			<main class="o⋄overflow-yꘌauto">

				<p>
					Ai! laurië lantar lassi súrinen,
					yéni únótimë ve rámar aldaron!
					Yéni ve lintë yuldar avánier
					mi oromardi lissë-miruvóreva
					Andúnë pella, Vardo tellumar
					nu luini yassen tintilar i eleni
					ómaryo airetári-lírinen.
				</p>

				<p>
					Sí man i yulma nin enquantuva?
				</p>

				<p class="o⋄bg-colorꘌbackdrop">
					An sí Tintallë Varda Oiolossëo
					ve fanyar máryat Elentári ortanë
					ar ilyë tier undulávë lumbulë
					ar sindanóriello caita mornië
					i falmalinnar imbë met,
					ar hísië untúpa Calaciryo míri oialë.
					Sí vanwa ná, Rómello vanwa, Valimar!
					Namárië! Nai hiruvalyë Valimar!
					Nai elyë hiruva! Namárië!
				</p>

				<p>
					Ai! laurië lantar lassi súrinen,
					yéni únótimë ve rámar aldaron!
					Yéni ve lintë yuldar avánier
					mi oromardi lissë-miruvóreva
					Andúnë pella, Vardo tellumar
					nu luini yassen tintilar i eleni
					ómaryo airetári-lírinen.
				</p>

				<p>
					Sí man i yulma nin enquantuva?
				</p>

				<p>
					An sí Tintallë Varda Oiolossëo
					ve fanyar máryat Elentári ortanë
					ar ilyë tier undulávë lumbulë
					ar sindanóriello caita mornië
					i falmalinnar imbë met,
					ar hísië untúpa Calaciryo míri oialë.
					Sí vanwa ná, Rómello vanwa, Valimar!
					Namárië! Nai hiruvalyë Valimar!
					Nai elyë hiruva! Namárië!
				</p>

				<p>
					Ai! laurië lantar lassi súrinen,
					yéni únótimë ve rámar aldaron!
					Yéni ve lintë yuldar avánier
					mi oromardi lissë-miruvóreva
					Andúnë pella, Vardo tellumar
					nu luini yassen tintilar i eleni
					ómaryo airetári-lírinen.
				</p>

				<p>
					Sí man i yulma nin enquantuva?
				</p>

				<p>
					An sí Tintallë Varda Oiolossëo
					ve fanyar máryat Elentári ortanë
					ar ilyë tier undulávë lumbulë
					ar sindanóriello caita mornië
					i falmalinnar imbë met,
					ar hísië untúpa Calaciryo míri oialë.
					Sí vanwa ná, Rómello vanwa, Valimar!
					Namárië! Nai hiruvalyë Valimar!
					Nai elyë hiruva! Namárië!
				</p>

				<p>
					Ai! laurië lantar lassi súrinen,
					yéni únótimë ve rámar aldaron!
					Yéni ve lintë yuldar avánier
					mi oromardi lissë-miruvóreva
					Andúnë pella, Vardo tellumar
					nu luini yassen tintilar i eleni
					ómaryo airetári-lírinen.
				</p>

				<p>
					Sí man i yulma nin enquantuva?
				</p>

				<p>
					An sí Tintallë Varda Oiolossëo
					ve fanyar máryat Elentári ortanë
					ar ilyë tier undulávë lumbulë
					ar sindanóriello caita mornië
					i falmalinnar imbë met,
					ar hísië untúpa Calaciryo míri oialë.
					Sí vanwa ná, Rómello vanwa, Valimar!
					Namárië! Nai hiruvalyë Valimar!
					Nai elyë hiruva! Namárië!
				</p>
			</main>

			<footer class="o⋄text-alignꘌcenter o⋄border⁚default">
				<nav class="o⋄bg-colorꘌbackdrop toolbar">
					<ul class="o⋄nav-list o⋄flex--centered-content">
						<li class="o⋄text-noselect"><a href="."><span class="emoji-as-icon">🗺</span></a></li>
						<li class="o⋄text-noselect"><a href="."><span class="emoji-as-icon">⚔️💰</span></a></li>
						<li class="o⋄text-noselect"><a href="."><span class="emoji-as-icon">👤</span></a></li>
						<li class="o⋄text-noselect"><a href="."><span class="emoji-as-icon">🏆</span></a></li>
						<li class="o⋄text-noselect"><a href="."><span class="emoji-as-icon">💬</span></a></li>
						<li class="o⋄text-noselect"><a href="."><span class="emoji-as-icon">⚙️</span></a></li>
					</ul>
				</nav>
			</footer>

		</div>
		`
}
////////////////////////////////////////////////////////////////////////////////////

export function Debug() {
	return `
<Wrapper>
	<h1>${LIB} - CSS micro framework</h1>

	<p>
		What I’m saying is that it’s so, so simple to make sites easier to read. Websites are broken by default,
		they are
		functional, high-performing, and accessible, but they’re also fucking ugly. You and all the other web
		designers out
		there need to make them not total shit.
	</p>

	<p>
		<strong>emphasized text</strong> &nbsp;
		Normal text &nbsp;
		<span class="o⋄colorꘌsecondary">secondary text</span> &nbsp;
		<span class="o⋄colorꘌancillary">ancillary text</span> &nbsp;
		<a href=".">link</a>
	</p>

	<p>Strongly inspired by:</p>
	<ol>
		<li><a href="https://motherfuckingwebsite.com/">motherfuckingwebsite.com</a>,</li>
		<li><a href="https://bettermotherfuckingwebsite.com/">bettermotherfuckingwebsite.com</a>,</li>
		<li><a href="https://perfectmotherfuckingwebsite.com/">perfectmotherfuckingwebsite.com</a></li>
		<li>and many blogs posts…</li>
	</ol>
</Wrapper>
		`
}

////////////////////////////////////////////////////////////////////////////////////

export function Experimental() {
	return 'TODO'
		/*`
		<>
			<p class="o⋄glass">
				<code>o⋄glass</code>
			</p>

			<p>
				<code>o⋄outline</code>

				<div class='o⋄box' style={{backgroundColor: 'var(--o⋄color⁚bg--main)'}}>
					<span class="o⋄outline">Test</span>
				</div>

				<div class='o⋄box' style={{backgroundColor: '#808080'}}>
					<span class="o⋄outline">Test</span>
				</div>

				<div class='o⋄box' style={{backgroundColor: 'var(--o⋄color⁚fg--main)'}}>
					<span class="o⋄outline">Test</span>
				</div>

				<div class='o⋄box o⋄bg⁚cover' style={{backgroundImage: `url(` + MixedBG + ')' }}>
					<span class="o⋄outline">Test</span>
				</div>
			</p>

			<p>
				<code>o⋄visually-hidden</code>
				<span class="o⋄visually-hidden">can't see me</span>
			</p>
		</>
		`*/
}
