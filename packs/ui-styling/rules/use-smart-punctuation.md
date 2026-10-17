---
id: use-smart-punctuation
title: Use typographic punctuation in UI text
summary: Use curly quotes, an en dash for ranges, an em dash for asides and the ellipsis character in text that people read.
applies_when: A project writes user-facing strings, headings, labels or marketing copy.
severity: low
source:
  - { title: "Interface Cheat Sheet", url: "https://interfaces.dev/cheat-sheet" }
---

# Use typographic punctuation in UI text

## Rule

In text that people read, use curly quotes (“ ” ‘ ’), an en dash (–) for ranges, an em dash (—) for asides and the ellipsis character (…) in place of three dots.

## Why

- Straight quotes and double hyphens look like typewriter text.
- Typographic characters read as more careful and more professional.

## Exceptions

- Code, identifiers, file names, URLs and anything that people copy and run.
- Strings that a program parses.
- Dashes that the project style guide forbids in prose. Follow the style guide.
- Text from users or other systems. Do not rewrite it.

## Examples

<!-- example:incorrect case="ascii-punctuation" -->

```tsx file="Loading.tsx"
<p>Loading...</p>
<p>Open 2010-2020 "archive"</p>
```

<!-- example:correct case="typographic" -->

```tsx file="Loading.tsx"
<p>Loading…</p>
<p>Open 2010–2020 “archive”</p>
```

<!-- example:near-miss case="code-and-attributes" -->

```tsx file="Command.tsx"
<code>git commit -m "fix"</code>
```

## Verify

- The string is shown to people as prose or a label.
- The string has straight quotes, three dots or a hyphen where a range or an aside belongs.
- Quotes in JSX or JS syntax are not text. Check only the visible content.
