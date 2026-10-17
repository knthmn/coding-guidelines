---
id: concentric-border-radius
title: Make nested border radii concentric
summary: For a rounded element inside a rounded parent with padding, set the outer radius to the inner radius plus the padding.
applies_when: A rounded element sits inside another rounded element, with padding between them.
severity: low
source:
  - { title: "Interface Cheat Sheet", url: "https://interfaces.dev/cheat-sheet" }
---

# Make nested border radii concentric

## Rule

When a rounded element sits inside a rounded parent, set the parent radius to the child radius plus the padding between them. The curves then share a center.

## Why

- Two equal radii leave a gap that is thicker at the corners than along the edges.
- A concentric pair looks like one shape and reads as intentional.

## Exceptions

- No padding between the elements. Use the same radius.
- The child does not touch the corner area, for example a small badge placed in the middle of an edge.
- Parent or child with a square corner.

## Examples

<!-- example:incorrect case="equal-radius" -->

```tsx file="Card.tsx"
<div className="rounded-xl bg-neutral-100 p-1">
  <img className="rounded-xl" src={src} alt="" />
</div>
```

<!-- example:correct case="outer-is-inner-plus-padding" -->

```tsx file="Card.tsx"
<div className="rounded-xl bg-neutral-100 p-1">
  <img className="rounded-lg" src={src} alt="" />
</div>
```

<!-- example:correct case="css-calc" -->

```css file="card.css"
.card {
  --pad: 4px;
  --inner-radius: 8px;
  padding: var(--pad);
  border-radius: calc(var(--inner-radius) + var(--pad));
}
.card > img {
  border-radius: var(--inner-radius);
}
```

<!-- example:near-miss case="no-padding" -->

```tsx file="Card.tsx"
<div className="overflow-hidden rounded-xl">
  <img src={src} alt="" />
</div>
```

## Verify

- The child is rounded, the parent is rounded, and padding separates them.
- Compute radius and padding from the classes or tokens. Tailwind `rounded-xl` is 12px, `rounded-lg` is 8px and `p-1` is 4px by default.
- A reviewer cannot judge from code whether the result looks right. Report only a clear mismatch in numbers.
