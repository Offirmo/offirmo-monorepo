
Storybook is great but very hard to setup, cf. https://storybook.js.org/docs/react/get-started/setup#configure-storybook-for-your-stack

Fer ex. at this date (2023) I can't use Storybook with parcel

This is an alternative which is:
- API compatible
- framework agnostic
- bundler agnostic

CAVEAT this tool can't discover the stories on its own.
However this is trivial to do thanks to recent bundler's feature of "import glob" = ``
