---
id: use-semantic-color-tokens
title: Use semantic color tokens in components
summary: Components reference tokens named by purpose, such as `--color-text-secondary`, never primitives such as `--blue-500`.
applies_when: The project has CSS variables, a Tailwind theme or design tokens for color.
severity: low
source:
  - { title: "Interface Cheat Sheet", url: "https://interfaces.dev/cheat-sheet" }
---

# Use semantic color tokens in components

## Rule

Components use semantic tokens, such as `--color-text-secondary` or `--color-accent-solid`. Components do not use primitive colors, such as `--blue-500`. Only the token layer maps primitives to tokens.

## Why

- A token says how a color is used. A primitive says only what the raw value is.
- Re-theming, such as dark mode or a new brand color, changes the token map and leaves components untouched.

## Exceptions

- The token layer itself, where tokens are defined from primitives.
- One-off color uses with no semantic meaning, such as a chart series.
- Third-party content with its own colors, such as syntax highlighting.

## Examples

<!-- example:incorrect case="primitive-in-component" -->

```css file="button.css"
.button {
  background: var(--blue-500);
  color: var(--gray-50);
}
```

<!-- example:correct case="token-in-component" -->

```css file="button.css"
.button {
  background: var(--color-accent-solid);
  color: var(--color-accent-contrast);
}
```

<!-- example:correct case="primitive-in-token-layer" -->

```css file="tokens.css"
:root {
  --color-accent-solid: var(--blue-500);
  --color-accent-contrast: var(--gray-50);
}
```

<!-- example:near-miss case="chart-series" -->

```tsx file="Chart.tsx"
const series = [
  { id: "a", color: "var(--blue-500)" },
  { id: "b", color: "var(--orange-500)" },
];
```

## Library notes

### Tailwind CSS

Define semantic tokens in the theme (`@theme` in v4), then use classes such as `bg-accent-solid` and `text-secondary`. Palette classes, such as `bg-blue-500`, are primitives.

## Verify

- The project has a semantic token layer. If it has none, this rule does not apply.
- A component file uses a primitive color directly.
- The file is not the token layer and does not fall under an exception.
