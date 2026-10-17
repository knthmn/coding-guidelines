---
id: rendering-content-visibility
title: Use content-visibility for long off-screen content
summary: "Apply `content-visibility: auto` with `contain-intrinsic-size` to repeated blocks in long scrolling pages, so the browser skips layout and paint for the ones off screen."
applies_when: A page renders hundreds of similar blocks, such as list items, feed cards or article sections, and most are off screen at load.
severity: low
source:
  - title: Vercel React Best Practices
    url: https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rendering-content-visibility.md
---

# Use content-visibility for long off-screen content

## Rule

Set `content-visibility: auto` on each block of a long page, with `contain-intrinsic-size` set to an estimate of the block size. The browser then skips layout and paint for blocks that are off screen.

## Why

- Initial render cost grows with the number of blocks. This property cuts the cost without list virtualization or script.
- `contain-intrinsic-size` keeps the scroll bar stable while blocks are skipped.

## Exceptions

- Short lists. The gain is small.
- Blocks that need measuring from script before they are visible, such as for anchor links, find-in-page targets or scroll restoration. Test those cases.
- Lists with thousands of rows or with variable heights that need exact scroll positions. Use virtualization.
- Browsers without support. The property is ignored there and the page still works. Support: Chrome 85, Firefox 125, Safari 18.

## Examples

<!-- example:incorrect case="no-skipping" -->

```css file="messages.css"
.message-item {
  padding: 12px;
}
```

<!-- example:correct case="content-visibility-auto" -->

```css file="messages.css"
.message-item {
  padding: 12px;
  content-visibility: auto;
  contain-intrinsic-size: auto 80px;
}
```

<!-- example:near-miss case="short-list" -->

```css file="tabs.css"
.tab-panel {
  padding: 12px;
}
```

## Verify

- The page has a large number of repeated blocks.
- The blocks are mostly off screen on load.
- No script needs the real size of an off-screen block.
