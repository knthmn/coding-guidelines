---
id: font-smoothing-antialiased
title: Set antialiased font smoothing on the root
summary: "Set `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale` once on the root layout."
applies_when: The project sets global base styles, and its users include macOS.
severity: low
source:
  - { title: "Interface Cheat Sheet", url: "https://interfaces.dev/cheat-sheet" }
---

# Set antialiased font smoothing on the root

## Rule

Set `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale` once on the root layout.

## Why

- On macOS, the default subpixel smoothing makes light text on dark backgrounds look bolder.
- Grayscale smoothing looks thinner and sharper.
- One setting on the root covers all text.

## Exceptions

- Projects with a design that wants the platform default.

## Examples

<!-- example:incorrect case="per-component" -->

```css file="button.css"
.button {
  -webkit-font-smoothing: antialiased;
}
```

<!-- example:correct case="root" -->

```css file="global.css"
html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

<!-- example:correct case="tailwind-root" -->

```tsx file="layout.tsx"
<body className="antialiased">{children}</body>
```

## Library notes

### Tailwind CSS

The `antialiased` class sets both properties.

### Browser support

Both properties are non-standard and only change rendering on macOS. Other platforms ignore them.

## Verify

- No root-level smoothing is set, or it is set on single components.
- A reviewer cannot see the rendering from code. Treat this rule as author guidance.
