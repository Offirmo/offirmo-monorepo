
Storybook is great but very hard to set up, cf. https://storybook.js.org/docs/react/get-started/setup#configure-storybook-for-your-stack

Fer ex. at this date (2023) I can't use Storybook with parcel :(

This is an alternative which is:
- API compatible
- framework-agnostic
- bundler agnostic

The core change is an inversion of control:
- Storybook: storybook loads, discover stories, build them and display them
- Storypad: a bootstrap code loads the stories (thanks to recent bundler's feature of "import glob"), build everything then invoke Storypad and pass them


https://storybook.js.org/docs/react/api/csf
https://github.com/ComponentDriven/csf
https://storybook.js.org/docs/react/writing-stories/naming-components-and-hierarchy#sorting-stories
