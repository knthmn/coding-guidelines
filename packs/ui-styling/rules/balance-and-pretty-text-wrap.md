---
id: balance-and-pretty-text-wrap
title: Use text-wrap balance on headings and pretty on short descriptions
summary: "Set `text-wrap: balance` on headings and `text-wrap: pretty` on short descriptions. Do not use either on long-form text."
applies_when: Headings, short descriptions or captions that can wrap to several lines.
severity: low
source:
  - { title: "Interface Cheat Sheet", url: "https://interfaces.dev/cheat-sheet" }
---

# Use text-wrap balance on headings and pretty on short descriptions

## Rule

Set `text-wrap: balance` on headings, so lines have similar length. Set `text-wrap: pretty` on short descriptions, so the last line does not hold a single word. Do not set either on long-form text.

## Why

- Unbalanced headings leave one short line.
- `pretty` avoids orphaned words at the end of a block.
- Both make the browser do extra work, and `balance` also changes the line breaks of long text. Long text does not need it.

## Exceptions

- Long articles and documents.
- Headings that always fit on one line.

## Examples

<!-- example:incorrect case="unbalanced" -->

```css file="typography.css"
h1,
h2 {
  font-size: 2rem;
}
.description {
  color: var(--color-text-secondary);
}
```

<!-- example:correct case="balance-and-pretty" -->

```css file="typography.css"
h1,
h2 {
  text-wrap: balance;
}
.description {
  text-wrap: pretty;
}
```

<!-- example:near-miss case="long-form" -->

```css file="article.css"
.article p {
  max-width: 65ch;
}
```

## Library notes

### Tailwind CSS

`text-balance` and `text-pretty` set the two values.

### Browser support

- `text-wrap: balance`: Chrome 114, Firefox 121, Safari 17.5. Browsers that lack it ignore it.
- `text-wrap: pretty`: Chrome 130, Safari 26. Firefox does not support it. Treat it as an enhancement, and make sure the layout works without it.

## Verify

- The element is a heading or a short description.
- The value is not set, or is set on long prose.
- A reviewer cannot see line breaks from code. Treat this rule as author guidance.
