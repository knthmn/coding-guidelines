---
id: optical-alignment
title: Align by optical weight, not geometry
summary: Nudge icons and shapes that look off-center when the math is centered, such as play triangles and arrows.
applies_when: An asymmetric icon or glyph sits in a button, badge or label, and geometric centering makes it look shifted.
severity: low
source:
  - { title: "Interface Cheat Sheet", url: "https://interfaces.dev/cheat-sheet" }
---

# Align by optical weight, not geometry

## Rule

When geometric centering makes an asymmetric shape look off-center, move the shape by a small offset until it looks centered. Do this for play triangles, arrows, chevrons and text next to icons.

## Why

- Asymmetric shapes carry their visual weight to one side. Equal margins make them look shifted.
- A small offset fixes it without extra markup.

## Exceptions

- Symmetric shapes, such as a plus, a cross or a circle.
- Icon sets that already include the offset in the artwork.
- Layout alignment between components. Keep it on the grid.

## Examples

<!-- example:incorrect case="centered-triangle" -->

```tsx file="PlayButton.tsx"
<button className="grid size-10 place-items-center rounded-full bg-black text-white">
  <PlayIcon className="size-4" />
</button>
```

<!-- example:correct case="nudged-triangle" -->

```tsx file="PlayButton.tsx"
<button className="grid size-10 place-items-center rounded-full bg-black text-white">
  <PlayIcon className="size-4 translate-x-px" />
</button>
```

<!-- example:near-miss case="symmetric-icon" -->

```tsx file="AddButton.tsx"
<button className="grid size-10 place-items-center rounded-full bg-black text-white">
  <PlusIcon className="size-4" />
</button>
```

## Verify

- The shape is asymmetric and has no offset in its own artwork.
- A reviewer cannot confirm the result from code. Treat this rule as author guidance, and report only a shape that is plainly uncorrected, such as a play triangle with no offset.
