---
id: interpolate-gradients-in-color-space
title: Choose the color space of a gradient
summary: Set the interpolation color space in a gradient, such as `in oklab`, `in oklch` or `in srgb`, when the default midpoint looks muddy.
applies_when: A gradient mixes two saturated colors or a color with white, black or transparent.
severity: low
source:
  - { title: "Interface Cheat Sheet", url: "https://interfaces.dev/cheat-sheet" }
---

# Choose the color space of a gradient

## Rule

Set the color space of a gradient with `in <space>`. Use `in oklab` for an even brightness, `in oklch` for more vivid midtones, and `in srgb` for more muted midtones.

## Why

- The default space can give gray or dull midpoints between two bright colors.
- The space changes the midpoint, so pick it by the look you want.

## Exceptions

- Gradients between close colors, where the spaces look the same.
- Projects that must support browsers without the syntax. Provide a fallback.

## Examples

<!-- example:incorrect case="default-space" -->

```css file="hero.css"
.hero {
  background: linear-gradient(90deg, #3b82f6, #f97316);
}
```

<!-- example:correct case="oklch" -->

```css file="hero.css"
.hero {
  background: linear-gradient(in oklch 90deg, #3b82f6, #f97316);
}
```

<!-- example:near-miss case="close-colors" -->

```css file="hero.css"
.hero {
  background: linear-gradient(90deg, #3b82f6, #2563eb);
}
```

## Library notes

### Tailwind CSS

In v4, add a modifier such as `bg-linear-to-r/oklch`. In v3, write the `background-image` as arbitrary CSS.

### Browser support

Interpolation color spaces in gradients work in Chrome 111, Safari 16.2 and Firefox 127. Older browsers drop the whole declaration, so declare a plain gradient first as a fallback.

## Verify

- The gradient mixes strongly different hues.
- No color space is set.
- A reviewer cannot see the midpoint from code. Treat this rule as author guidance.
