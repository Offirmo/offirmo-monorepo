
## theming


### Usage

Use a data attribute:
```html
<html data-o-theme="light">
<html data-o-theme="dark">
```

If no data attribute, light theme is active.

### default themes

Color selection
* True white and black? There is a raging debate:
* - https://github.com/KeenRivals/bestmotherfucking.website/issues/54 discussion
* - https://uxmovement.com/content/why-you-should-never-use-pure-black-for-text-or-backgrounds/
* - https://ianstormtaylor.com/design-tip-never-use-black/
* - https://bestmotherfucking.website/ is using true white/black
* - Github is using rgb(36, 41, 47)

### additional themes

* extra themes should start with `light--` or `dark--`
* extra themes should not need to redefine all colors, since several should be the same as the default


TODO https://draculatheme.com/pro
TODO https://vscodethemes.com/
TODO https://iterm2colorschemes.com/ (not RGB, hard to convert)

FYI colors: rainbow vs spectrum https://en.wikipedia.org/wiki/Rainbow#Number_of_colours_in_a_spectrum_or_a_rainbow


## TODO

TODO convert to LCH when supported ? https://caniuse.com/css-lch-lab
TODO automaticall derive some colors? https://developer.chrome.com/blog/css-relative-color-syntax/
