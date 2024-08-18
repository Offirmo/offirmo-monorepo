
Base CSS improving the default browser stylesheet.

> sand down some of the rough edges in the CSS language.
> I do this with a functional set of custom baseline styles. ([Josh Comeau](https://www.joshwcomeau.com/css/custom-css-reset/))

This is **not** a CSS reset:
- This layer assumes a CSS reset

This is **not** a CSS framework:
- This thin layer of improvements should be usable on every website.
- No "optional" classes are declared

The goal is to be used as a base for more advanced CSS frameworks:
- by default, the minimal styles to make a page looks good,
  in the spirit of [perfectmotherfuckingwebsite](https://perfectmotherfuckingwebsite.com/) or [web-design-in-4-minutes](https://jgthms.com/web-design-in-4-minutes/)
- by default, activates clever settings gleaned across blog posts (see list at bottom)

Inspiration:
* inspired by [motherfuckingwebsite](https://motherfuckingwebsite.com/) → [better](https://bettermotherfuckingwebsite.com/) → [perfect](https://perfectmotherfuckingwebsite.com/) → [best](https://bestmotherfucking.website/)
* inspired by techniques borrowed in articles around the net (see refs. in the code and "credits" below)


## Usage

### automatic (reset)
By default, this stylesheet will activate a page like "mother fucking website".
```html
 <link rel="stylesheet" type="text/css" href="TODO"/>
```
alternatively:
```css
@import 'npm:@offirmo-private/css--foundation';
```

### customization
see "tokens"

```
--o⋄color⁚fg--main
--o⋄color⁚fg--strong          = <Hx> and <strong> (nice to have, usually defaulted to fg--main) 
--o⋄color⁚fg--ancillary       = ex. hr  (ancillary bc. we may have a "secondary/dim" and this one is even dim'er)

--o⋄color⁚accent                 = accent color, used by forms (default blue)
--o⋄color⁚activity-outline       = outline color, used by focus indicator (default another blue)

--o⋄color⁚bg--main
--o⋄color⁚bg--code            = usually some grey close to bg
--o⋄color⁚bg--highlight--1    bg color visible on normal bg, ex. for buttons */
--o⋄color⁚bg--highlight--2    alt, ex. for hovered/clicked buttons */

--o⋄color⁚fg--link
--o⋄color⁚fg--link--visited

--o⋄font-family--fast_and_good_enough
--o⋄font-family--main
--o⋄font-family--code

--o⋄border--thickness
--o⋄content-recommended-width
```

## Contribution

### tokens

* allow overrides!
* solved with layers

### TODO

TODO +++ https://atlassian.design/foundations/typography

TODO     width: fit-content; on all? https://courses.joshwcomeau.com/css-for-js/01-rendering-logic-1/09-flow-layout
