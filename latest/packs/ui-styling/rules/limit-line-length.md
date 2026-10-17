---
id: limit-line-length
title: Limit long-form lines to 60-75 characters
summary: "Cap the width of articles and other long text at about 60-75 characters per line, for example `max-width: 65ch`."
applies_when: Articles, documentation, descriptions or other multi-line prose that can span a wide container.
severity: low
source:
  - { title: "Interface Cheat Sheet", url: "https://interfaces.dev/cheat-sheet" }
---

# Limit long-form lines to 60-75 characters

## Rule

Cap the width of long text so each line holds about 60 to 75 characters. Use the `ch` unit, for example `max-width: 65ch`.

## Why

- On long lines, the eye loses its place when it moves to the next line.
- `ch` follows the font size, so the limit holds when the font changes.

## Exceptions

- Short text, such as labels, captions and table cells.
- Code blocks and data tables.
- Narrow containers that already limit width.

## Examples

<!-- example:incorrect case="full-width-prose" -->

```tsx file="Article.tsx"
<article className="w-full">
  <Markdown>{post.body}</Markdown>
</article>
```

<!-- example:correct case="measure-cap" -->

```tsx file="Article.tsx"
<article className="max-w-[65ch]">
  <Markdown>{post.body}</Markdown>
</article>
```

<!-- example:near-miss case="table-cell" -->

```tsx file="Table.tsx"
<td className="w-full">{row.name}</td>
```

## Library notes

### Tailwind CSS

`max-w-prose` is 65ch.

## Verify

- The text is multi-line prose, not a label or a table cell.
- No width limit applies to it or its container at wide viewports.
- A reviewer may not know the final container width from code. Report only when nothing limits the width.
