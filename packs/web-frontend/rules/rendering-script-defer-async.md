---
id: rendering-script-defer-async
title: Add defer or async to external script tags
summary: Mark external `<script>` tags in HTML with `defer` or `async`, so the download does not block HTML parsing.
applies_when: HTML, a template or a layout component outputs a `<script>` tag with a `src` attribute.
severity: medium
source:
  - title: Vercel React Best Practices
    url: https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rendering-script-defer-async.md
---

# Add defer or async to external script tags

## Rule

Give every external classic script tag `defer` or `async`. Use `defer` for scripts that need the DOM or must run in order. Use `async` for independent scripts, such as analytics.

## Why

- A script without either attribute stops HTML parsing while it downloads and runs. This delays first paint.
- `defer` downloads in parallel and runs in order after parsing ends.
- `async` downloads in parallel and runs as soon as it is ready, in any order.

## Exceptions

- Scripts that must run before the first paint, such as a theme or flash prevention snippet. Keep them small and inline.
- Module scripts (`type="module"`). They defer by default.
- Scripts that call `document.write`. Remove that call first, since it fails with these attributes.

## Examples

<!-- example:incorrect case="blocking-scripts" -->

```html file="index.html"
<head>
  <script src="https://example.com/analytics.js"></script>
  <script src="/scripts/utils.js"></script>
</head>
```

<!-- example:correct case="defer-and-async" -->

```html file="index.html"
<head>
  <script src="https://example.com/analytics.js" async></script>
  <script src="/scripts/utils.js" defer></script>
</head>
```

<!-- example:near-miss case="module-script" -->

```html file="index.html"
<head>
  <script type="module" src="/src/main.ts"></script>
</head>
```

## Library notes

### Next.js

- Use the `next/script` component with a `strategy` prop instead of raw script tags.

## Verify

- The script tag has `src`, is not `type="module"` and has neither `defer` nor `async`.
- The script does not need to run before first paint.
