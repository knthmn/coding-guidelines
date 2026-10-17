---
id: underline-skip-ink
title: Keep underlines clear of letter descenders
summary: "For underlined text, set `text-underline-position: from-font` and `text-decoration-skip-ink: auto`, so lines do not cut through g, y and p."
applies_when: The project underlines links or text with `text-decoration`.
severity: low
source:
  - { title: "Interface Cheat Sheet", url: "https://interfaces.dev/cheat-sheet" }
---

# Keep underlines clear of letter descenders

## Rule

On underlined text, set `text-underline-position: from-font` and `text-decoration-skip-ink: auto`.

## Why

- A default underline can sit close to letter tails, such as g, j, p, q and y.
- `from-font` uses the position that the font defines. `skip-ink` breaks the line around descenders.

## Exceptions

- Text with no underline.
- Designs with a deliberate thick, offset or decorative underline.
- Fonts that carry no underline metrics. `from-font` falls back to the default position there.

## Examples

<!-- example:incorrect case="default-underline" -->

```css file="link.css"
a {
  text-decoration: underline;
}
```

<!-- example:correct case="from-font" -->

```css file="link.css"
a {
  text-decoration: underline;
  text-underline-position: from-font;
  text-decoration-skip-ink: auto;
}
```

<!-- example:near-miss case="no-underline" -->

```css file="link.css"
a {
  text-decoration: none;
}
```

## Library notes

### Browser support

`text-underline-position: from-font` works in Chrome 33, Firefox 74 and Safari 12.1. `text-decoration-skip-ink` works in Chrome 64, Firefox 70 and Safari 15.4. Browsers that lack them show the default underline.

## Verify

- The element is underlined in CSS, or by Tailwind `underline`.
- The two properties are missing, and no global style sets them.
- A reviewer cannot see the result from code. Treat this rule as author guidance.
