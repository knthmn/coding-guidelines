---
id: separate-dark-mode-palette
title: Build a separate dark palette instead of inverting light
summary: Define dark mode token values by hand for dark surfaces. Do not invert the light scale or apply a filter.
applies_when: The project supports a dark theme.
severity: low
source:
  - { title: "Interface Cheat Sheet", url: "https://interfaces.dev/cheat-sheet" }
---

# Build a separate dark palette instead of inverting light

## Rule

Define dark theme values for each semantic token on their own. Do not invert the light scale, and do not use `filter: invert()` on the page.

## Why

- Inverted colors change contrast and saturation, so accents look wrong.
- Shadows, borders and elevation work differently on dark surfaces.
- Images and media get inverted by a filter.

## Exceptions

- Single icons that are black line art, which can flip with `dark:invert`.

## Examples

<!-- example:incorrect case="invert-filter" -->

```css file="theme.css"
.dark {
  filter: invert(1) hue-rotate(180deg);
}
```

<!-- example:correct case="dark-token-values" -->

```css file="theme.css"
:root {
  --color-surface: #ffffff;
  --color-text-primary: #171717;
  --color-accent-solid: #2563eb;
}
.dark {
  --color-surface: #0a0a0a;
  --color-text-primary: #ededed;
  --color-accent-solid: #3b82f6;
}
```

<!-- example:near-miss case="invert-icon" -->

```tsx file="Logo.tsx"
<img className="h-6 dark:invert" src="/line-art.svg" alt="Acme" />
```

## Verify

- The dark theme uses a filter, or maps the light scale in reverse order (for example 100 to 1200, 1200 to 100).
- A reviewer cannot judge the visual result from code. Treat this rule as author guidance.
