---
id: contain-long-text-and-labels
title: Contain long strings and keep labels on one line
summary: "Use `overflow-wrap: break-word` on text that can hold long words, links or IDs. Use `white-space: nowrap` on labels and badges."
applies_when: User or system text with long unbroken strings, such as URLs, IDs and keys, or short labels and badges that must not wrap.
severity: medium
source:
  - { title: "Interface Cheat Sheet", url: "https://interfaces.dev/cheat-sheet" }
---

# Contain long strings and keep labels on one line

## Rule

Set `overflow-wrap: break-word` on containers that show text with long unbroken strings, such as URLs, tokens and IDs. Set `white-space: nowrap` on short labels and badges that must stay on one line.

## Why

- A long unbroken string pushes out its container and causes horizontal scroll or overlap.
- A label that wraps breaks its box. A badge with two lines looks broken.

## Exceptions

- Code blocks, which scroll horizontally on purpose.
- Text that can truncate with an ellipsis. Use `truncate` and give people a way to read the full text.
- Containers with unbounded width.

## Examples

<!-- example:incorrect case="long-id-overflows" -->

```tsx file="ApiKeyNotice.tsx"
<p className="w-64">Your API key {apiKey} is ready.</p>
```

<!-- example:correct case="break-word" -->

```tsx file="ApiKeyNotice.tsx"
<p className="w-64 break-words">Your API key {apiKey} is ready.</p>
```

<!-- example:correct case="nowrap-label" -->

```tsx file="SyncStatus.tsx"
<span className="whitespace-nowrap rounded-full bg-neutral-100 px-2 text-xs">
  Last synced 2 min ago
</span>
```

<!-- example:near-miss case="code-scrolls" -->

```tsx file="Snippet.tsx"
<pre className="overflow-x-auto">{code}</pre>
```

## Library notes

### Tailwind CSS

`break-words` sets `overflow-wrap: break-word`. `whitespace-nowrap` sets `white-space: nowrap`.

## Verify

- The text can hold a long unbroken string, or the element is a short label.
- The container has a fixed or limited width.
- No wrapping rule is present.
