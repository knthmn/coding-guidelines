---
id: use-woff2-web-fonts
title: Serve web fonts as woff2
summary: Load web fonts from `.woff2` files. Do not ship `.ttf` or `.otf` files to browsers.
applies_when: The project declares `@font-face` rules or loads self-hosted font files.
severity: low
source:
  - { title: "Interface Cheat Sheet", url: "https://interfaces.dev/cheat-sheet" }
---

# Serve web fonts as woff2

## Rule

Point `@font-face` `src` at `.woff2` files. Do not serve `.ttf` or `.otf` to the web.

## Why

- WOFF2 is compressed and its files are much smaller than TTF or OTF, so fonts load faster.
- Every current browser supports it.

## Exceptions

- Desktop apps, emails or PDF tools that need TTF or OTF.
- A `.woff` fallback for legacy browsers, if the project still supports them.

## Examples

<!-- example:incorrect case="ttf-source" -->

```css file="fonts.css"
@font-face {
  font-family: "Inter";
  src: url("/fonts/Inter-Regular.ttf") format("truetype");
  font-display: swap;
}
```

<!-- example:correct case="woff2-source" -->

```css file="fonts.css"
@font-face {
  font-family: "Inter";
  src: url("/fonts/Inter-Regular.woff2") format("woff2");
  font-display: swap;
}
```

<!-- example:near-miss case="woff-fallback" -->

```css file="fonts.css"
@font-face {
  font-family: "Inter";
  src:
    url("/fonts/Inter-Regular.woff2") format("woff2"),
    url("/fonts/Inter-Regular.woff") format("woff");
}
```

## Verify

- The font file is served to browsers, not kept for design tools or print.
- `src` has no `.woff2` entry and lists `.ttf` or `.otf`.
