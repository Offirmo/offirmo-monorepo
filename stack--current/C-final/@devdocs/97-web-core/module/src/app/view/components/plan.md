
Create a state-of-the-art functional React component that:
- take the full size of its container
- take 2x child components: Sidebar and Content
- sidebar goes on the left, full height, own scrollbar if too big
- content goes on the right, full height, own scrollbar if too big
- the sidebar can be resized horizontally by dragging its right edge
- the sidebar size should be stored in local storage and restored on page reload
- the sidebar should be stored indexed by the screen size (screen, not viewport). If the screen size change, the sidebar size should be restored to the last size for that screen size, or to a good default size if there is no stored size for that screen size
- in the C-final/@devdocs/97-web-core/module/src/app/view/components/main2 folder
- in a file called index.tsx
- write a Storybook with test cases in index.stories.tsx
- write the full specs at the top of the file as a comment
