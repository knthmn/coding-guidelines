---
id: purposeful-palette-steps
title: Give every palette step a purpose
summary: Define each step of a color scale for one use, such as background, hover, border, solid fill or text. Do not add steps that nothing uses.
applies_when: The project defines a color scale or palette, for example `gray-100` to `gray-1200` or a Tailwind theme.
severity: low
source:
  - { title: "Interface Cheat Sheet", url: "https://interfaces.dev/cheat-sheet" }
---

# Give every palette step a purpose

## Rule

Define each step of a color scale for a named use, such as page background, component hover, border, solid fill or body text. Remove steps that nothing uses.

## Why

- Unused steps invite arbitrary picks, and colors drift apart.
- A scale with a known use per step makes the right choice clear.

## Exceptions

- Third-party or generated scales that the project does not control. Use only the steps that map to a purpose.
- Data visualization palettes. They follow other rules.

## Examples

<!-- example:incorrect case="steps-without-purpose" -->

```css file="tokens.css"
:root {
  --gray-100: #fafafa;
  --gray-200: #f5f5f5;
  --gray-300: #efefef;
  --gray-400: #e8e8e8;
  --gray-500: #e0e0e0;
  --gray-600: #d6d6d6;
}
```

<!-- example:correct case="steps-with-purpose" -->

```css file="tokens.css"
:root {
  --gray-100: #fafafa; /* page background */
  --gray-300: #efefef; /* component hover */
  --gray-500: #e0e0e0; /* border */
  --gray-900: #737373; /* solid fill */
  --gray-1200: #171717; /* body text */
}
```

## Verify

- Search the project for each step. Report a step only when nothing references it, directly or through a token.
- A reviewer cannot judge from code whether a step should exist. Treat this rule as author guidance.
