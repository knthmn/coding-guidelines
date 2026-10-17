---
id: icon-stroke-matches-text
title: Match icon stroke weight to the adjacent text
summary: Choose an icon stroke width that looks as thick as the text beside it, and keep it the same across one row.
applies_when: A stroked icon sits next to text in a button, menu item, tab or label.
severity: low
source:
  - { title: "Interface Cheat Sheet", url: "https://interfaces.dev/cheat-sheet" }
---

# Match icon stroke weight to the adjacent text

## Rule

Choose a stroke width for an icon that looks as heavy as the stems of the text next to it. Use one stroke width for all icons in the same context.

## Why

- A heavy icon beside light text looks pasted on, and a thin icon beside bold text looks weak.
- Scaling an icon with CSS also scales its stroke, so the weight drifts from the text at each size.

## Exceptions

- Filled icons. They have no stroke.
- Icons that stand alone, with no adjacent text.
- Icon sets that fix the stroke by design.

## Examples

<!-- example:incorrect case="heavy-stroke" -->

```tsx file="NewProject.tsx"
<button className="flex items-center gap-2 text-sm font-normal">
  <PlusIcon className="size-4" strokeWidth={3} />
  New project
</button>
```

<!-- example:correct case="matched-stroke" -->

```tsx file="NewProject.tsx"
<button className="flex items-center gap-2 text-sm font-normal">
  <PlusIcon className="size-4" strokeWidth={1.5} />
  New project
</button>
```

<!-- example:near-miss case="icon-only" -->

```tsx file="CloseButton.tsx"
<button aria-label="Close">
  <XIcon className="size-5" strokeWidth={2} />
</button>
```

## Library notes

### Lucide

Icons take a `strokeWidth` prop. The default is 2.

## Verify

- The icon is stroked, not filled, and sits beside text.
- The stroke width, or the icon size, differs a lot from the text weight, or differs between icons in one row.
- A reviewer cannot judge the exact value from code. Treat this rule as author guidance.
