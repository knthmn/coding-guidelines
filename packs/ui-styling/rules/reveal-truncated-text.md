---
id: reveal-truncated-text
title: Let people read text that you truncate
summary: When you cut text short with an ellipsis, give people a way to read the full text, such as a tooltip, an expand control or a detail view.
applies_when: "Text is cut with `text-overflow: ellipsis`, `truncate` or `line-clamp`."
severity: medium
source:
  - { title: "Interface Cheat Sheet", url: "https://interfaces.dev/cheat-sheet" }
---

# Let people read text that you truncate

## Rule

When text is cut with an ellipsis, give people access to the full text. Use a tooltip, an expand control, or a detail view.

## Why

- Cut text can hide the part that matters, such as the end of a file name.
- People cannot act on information that they cannot read.

## Exceptions

- Text that appears in full next to it or one click away, such as a list row that opens a detail page with the title.
- Decorative or repeated text, such as breadcrumbs that the page title repeats.

## Examples

<!-- example:incorrect case="truncated-no-access" -->

```tsx file="FileName.tsx"
<span className="block w-40 truncate">{file.name}</span>
```

<!-- example:correct case="tooltip" -->

```tsx file="FileName.tsx"
<Tooltip content={file.name}>
  <span className="block w-40 truncate">{file.name}</span>
</Tooltip>
```

<!-- example:correct case="expand" -->

```tsx file="Description.tsx"
<p className={expanded ? "" : "line-clamp-2"}>{description}</p>
<button onClick={() => setExpanded(!expanded)}>{expanded ? "Less" : "More"}</button>
```

<!-- example:near-miss case="detail-page-has-full-text" -->

```tsx file="PostRow.tsx"
<Link to="/posts/" params={{ id: post.id }} className="block truncate">
  {post.title}
</Link>
```

## Verify

- The text is cut by CSS or by code with an ellipsis.
- The full text is not available elsewhere on the same screen or one click away.
- Touch screens have no hover, so a tooltip alone is not enough for important text.
