## @offirmo-private/ui--browser--css

A micro CSS framework (like Bootstrap but with minimal features), mostly for my personal use.
**[live demo on CodePen](https://codepen.io/Offirmo/pen/qYYWVy)** TODO BROKEN

Can also be used as a base for more advanced CSS frameworks like @tbrpg/ui--browser--css


Features:
- by default, the minimal styles to make a page looks good (cf. "motherfucking website")
- by default, activates clever non-reset settings gleaned across blog posts (see list at bottom)
- several "atomic" classes (see [tachyons](https://tachyons.io/) / [atomic CSS](https://acss.io/))

Inspiration:
* inspired by [tachyons](https://tachyons.io/)
* inspired by [motherfuckingwebsite](https://motherfuckingwebsite.com/) / [better](https://bettermotherfuckingwebsite.com/) / [perfect](https://perfectmotherfuckingwebsite.com/)
* inspired by techniques borrowed in articles around the net (see refs. in the code and "credits" below)


## Usage

### automatic (reset)
By default, this stylesheet will activate a page like "mother fucking website".
```html

	<link rel="stylesheet" type="text/css"
			href="TODO"/>
```
alternatively:
```css
@import 'TODO';
```

### Full-page app
There is a special class to unset the defaults:
```html
<html class="o⋄top-container">
	<body class="o⋄top-container o⋄body⁚full-viewport" data-o-theme="dark--default">
		…
```

### Manual
Activated through classes:

* Semantic classes (like`o⋄something`):
  * `o⋄top-container`
  * `o⋄centered-article`
  * `o⋄error-report`
  * `o⋄box`
  * `o⋄text-noselect`
  * `o⋄nav-list`
  * `o⋄button--inline`
  * `o⋄plain-list`

* Technical classes (like`o⋄key⁚value`):
  * `o⋄fontꘌfast-and-good-enough`
  * `o⋄fontꘌsystem`
  * `o⋄fontꘌroboto`
  * `o⋄fontꘌroboto-condensed`
  * `o⋄fontꘌroboto-mono`

  * `o⋄colorꘌmain`
  * `o⋄colorꘌsecondary`
  * `o⋄colorꘌancillary`

  * `o⋄paddingꘌnone`
  * `o⋄paddingꘌsmall`
  * `o⋄paddingꘌmedium`
  * `o⋄marginꘌnone`

  * `o⋄flex--directionꘌrow`
  * `o⋄flex--directionꘌcolumn`
  * `o⋄flex--centered-content`
  * `o⋄flex-element--nogrow`
  * `o⋄flex-element--grow`

  * `o⋄text-alignꘌcenter`
  * `o⋄overflow-yꘌauto`
  * `o⋄heightꘌ100pc`

  * `.o⋄border⁚default`

  * `o⋄character-as-icon`
  * `o⋄rotated⁚45deg`
  * `o⋄rotated⁚90deg`
  * `o⋄rotated⁚180deg`
  * `o⋄rotated⁚270deg`

* data selectors
  * `data-o-theme="dark--default"` (light--default being the default)
  * `data-o-theme="dark--colorhunt212"`

There are also variables:
* theme colors
  * `--o⋄color⁚bg--main`
  * `--o⋄color⁚bg--main--backdrop`
  * `--o⋄color⁚bg--highlight--1`
  * `--o⋄color⁚bg--highlight--2`
  * `--o⋄color⁚fg--main`
  * `--o⋄color⁚fg--secondary`
  * `--o⋄color⁚fg--ancillary`
  * `--o⋄color⁚fg--activity-outline`
* modifier colors (but better use the theme colors!)
  * `--o⋄color⁚darker--10`
  * `--o⋄color⁚darker--20`
  * `--o⋄color⁚darker--90`
  * `--o⋄color⁚lighter--10`
  * `--o⋄color⁚lighter--20`
  * `--o⋄color⁚lighter--90`



### Special techniques

**[More advanced demo](https://codepen.io/Offirmo/pen/zjavzJ)** TODO BROKEN

#### full height page working on mobile browser
You can't use height: 100vh on Chrome mobile or the url bar will get in the way.
Solution: use a cascade of `class="o⋄top-container"` (optionally starting at `html` and `body`)

#### containers debug
```html
<style type="text/css">
	.o⋄top-container { border-width: 1px; }
</style>

<html class="o⋄top-container">
	<body class="o⋄top-container">
		<div class="o⋄top-container o⋄centered-article">
			<p>Hello world</p>
```


## Credits
https://docs.google.com/spreadsheets/d/1wc7Arr5YyOjFmSvJfmQnPfxgPQXXaRSPu21tfAhIuAQ/edit#gid=0


* using data="xyz" https://simurai.com/blog/2018/04/01/contextual-styling
  * (more about data) https://www.sitepoint.com/use-html5-data-attributes/

using the fancy
U+205A TWO DOT PUNCTUATION '⁚'
U+22C4 DIAMOND OPERATOR '⋄'
VAI LENGTHENER 'ꘌ'

TODO review units +
TODO review scalability
TODO review font size
