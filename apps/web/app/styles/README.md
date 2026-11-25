# Styles flow

The home page demonstrates the component-style workflow:

1. `app/page.tsx` applies the `c-home` component block and its BEM elements.
2. `app/globals.scss` is the global entry point, loaded by `app/layout.tsx`; it imports the theme and component Sass modules.
3. `app/styles/themes/_colors.scss` owns shared color tokens, while `app/styles/components/_home.scss` owns home-page component styles.

Use the `c-` prefix for SMACSS component classes, `__` for BEM elements, and `--` for BEM modifiers (for example, `c-home__filter--active`). Keep layout and responsive utilities in Tailwind where they are clearer than custom component styles.
