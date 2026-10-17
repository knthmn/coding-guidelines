---
id: layered-shadow-for-depth
title: Use a layered box-shadow for depth instead of a border
summary: Give cards, menus and popovers a layered `box-shadow` with a faint 1px ring, instead of a solid border.
applies_when: A card, menu, popover or other raised surface gets its edge from a solid border.
severity: low
source:
  - { title: "Interface Cheat Sheet", url: "https://interfaces.dev/cheat-sheet" }
---

# Use a layered box-shadow for depth instead of a border

## Rule

Give a raised surface a layered `box-shadow`: a faint 1px ring plus one or two soft shadows. Do not rely on a solid border for its edge.

## Why

- A semi-transparent shadow blends with any background. A solid border color does not.
- Several soft layers look closer to real light than a single hard line.
- A 1px ring in a shadow takes no layout space, so the box size does not change.

## Exceptions

- Structural borders: table cells, dividers, inputs and flat layouts that have no raised surfaces.
- Forced colors mode (Windows High Contrast) removes `box-shadow`. Where the edge must stay visible there, keep a border or a transparent outline.
- Design systems that define flat, bordered surfaces.

## Examples

<!-- example:incorrect case="solid-border" -->

```css file="card.css"
.card {
  border: 1px solid #e5e5e5;
  border-radius: 12px;
}
```

<!-- example:correct case="layered-shadow" -->

```css file="card.css"
.card {
  border-radius: 12px;
  box-shadow:
    0 0 0 1px rgb(0 0 0 / 0.06),
    0 1px 2px -1px rgb(0 0 0 / 0.06),
    0 2px 4px rgb(0 0 0 / 0.04);
}
```

<!-- example:near-miss case="table-divider" -->

```tsx file="Table.tsx"
<tr className="border-b border-neutral-200">
  <td>{row.name}</td>
</tr>
```

## Verify

- The element is a raised surface, not a divider or a form control.
- The border is the only source of its edge.
- A reviewer cannot confirm the look from code. Treat this rule as author guidance.
