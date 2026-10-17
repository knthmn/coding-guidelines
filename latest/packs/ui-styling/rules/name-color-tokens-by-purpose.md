---
id: name-color-tokens-by-purpose
title: Name color tokens by purpose
summary: Name color tokens by use, such as `--color-accent-solid`, not by hue or location. Keep accent for the brand color and avoid a bare `primary` that means two things.
applies_when: A project defines or adds color tokens, CSS variables or Tailwind theme colors.
severity: low
source:
  - { title: "Interface Cheat Sheet", url: "https://interfaces.dev/cheat-sheet" }
---

# Name color tokens by purpose

## Rule

Name a color token by what it does, such as `--color-accent-solid` or `--color-text-secondary`. Do not put a hue (`blue`) or a place (`sidebar`) in the name. Use `accent` for the brand color, and use `text-primary` for main body text, so `primary` never has two meanings.

## Why

- A hue in a name is wrong when the color changes.
- A location in a name makes a shared change look local. Editing `--color-sidebar-gray` changes everything that uses it.
- When `primary` means both brand color and main text, readers guess.

## Exceptions

- Primitive scales, where the hue is the name, for example `--blue-500`.
- Tokens for a single component that has its own theme, such as `--chart-series-1`.

## Examples

<!-- example:incorrect case="hue-and-location-names" -->

```css file="tokens.css"
:root {
  --color-blue-button: var(--blue-500);
  --color-sidebar-gray: var(--gray-100);
  --color-primary: var(--gray-1200);
}
```

<!-- example:correct case="purpose-names" -->

```css file="tokens.css"
:root {
  --color-accent-solid: var(--blue-500);
  --color-surface-subtle: var(--gray-100);
  --color-text-primary: var(--gray-1200);
}
```

<!-- example:near-miss case="primitive-scale" -->

```css file="primitives.css"
:root {
  --blue-500: oklch(0.62 0.19 260);
}
```

## Verify

- The name is a semantic token, not a primitive.
- It contains a hue or a location, or uses `primary` for both brand and text in one system.
- Renaming a token needs changes at every use. Report a name only for new or changed tokens.
