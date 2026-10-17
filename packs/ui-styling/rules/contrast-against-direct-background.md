---
id: contrast-against-direct-background
title: Check contrast against the surface behind the text
summary: Measure text and icon contrast against the background directly behind them, such as a card or a panel, not against the page background.
applies_when: Text or icons sit on a surface that differs from the page background, such as a card, a tinted panel or a banner.
severity: medium
source:
  - { title: "Interface Cheat Sheet", url: "https://interfaces.dev/cheat-sheet" }
---

# Check contrast against the surface behind the text

## Rule

Measure the contrast of text and icons against the color directly behind them. When text sits on a card, a tinted panel or an image, use that surface for the check.

## Why

- A color that passes on the page background can fail on a tinted surface.
- Contrast must hold where people read.

## Exceptions

- Text directly on the page background.
- Text over a gradient or an image. Measure the worst region, or add a scrim.
- Disabled controls and decorative text.

## Examples

<!-- example:incorrect case="checked-against-page" -->

```css file="callout.css"
.callout {
  background: var(--color-surface-accent-subtle);
  color: var(--color-text-tertiary);
}
```

<!-- example:correct case="checked-against-surface" -->

```css file="callout.css"
.callout {
  background: var(--color-surface-accent-subtle);
  color: var(--color-text-accent);
}
```

<!-- example:near-miss case="on-page" -->

```css file="page.css"
body {
  background: var(--color-page);
  color: var(--color-text-secondary);
}
```

## Verify

- Resolve the real colors of the text and the direct background, in each theme.
- Compute the ratio. WCAG sets 4.5:1 for body text and 3:1 for large text and UI components.
- Report only a measured failure. A reviewer cannot judge contrast by name. Accessibility rules in the `ux` pack cover general contrast.
