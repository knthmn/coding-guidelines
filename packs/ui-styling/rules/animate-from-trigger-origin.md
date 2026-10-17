---
id: animate-from-trigger-origin
title: Scale popovers and menus from the trigger
summary: Set `transform-origin` on scaling popovers, menus and tooltips to the side facing the trigger, not the center.
applies_when: A popover, menu, tooltip or dropdown scales or zooms as it opens or closes.
severity: low
source:
  - { title: "Interface Cheat Sheet", url: "https://interfaces.dev/cheat-sheet" }
---

# Scale popovers and menus from the trigger

## Rule

When an element scales as it opens, set its `transform-origin` to the point nearest the trigger. Use the origin value that the positioning library provides.

## Why

- Scaling from the center makes the element look like it appears from nowhere.
- Scaling from the trigger links the element to the action that opened it.

## Exceptions

- Elements with no trigger, such as centered modal dialogs. Center origin is correct there.
- Animations that only fade or slide and do not scale.

## Examples

<!-- example:incorrect case="center-origin" -->

```css file="popover.css"
.popover {
  transform: scale(0.95);
  opacity: 0;
  transition:
    scale 150ms ease-out,
    opacity 150ms ease-out;
}
.popover[data-open] {
  transform: none;
  opacity: 1;
}
```

<!-- example:correct case="origin-from-library" -->

```css file="popover.css"
.popover {
  transform-origin: var(--transform-origin);
  transform: scale(0.95);
  opacity: 0;
  transition:
    scale 150ms ease-out,
    opacity 150ms ease-out;
}
.popover[data-open] {
  transform: none;
  opacity: 1;
}
```

<!-- example:near-miss case="centered-dialog" -->

```tsx file="Dialog.tsx"
<Dialog.Popup className="origin-center scale-95 opacity-0 transition data-[open]:scale-100 data-[open]:opacity-100" />
```

## Library notes

### Base UI

`Popover.Popup`, `Menu.Popup` and similar parts expose `--transform-origin`. Use `origin-[var(--transform-origin)]` in Tailwind.

### Radix UI

Content parts expose `--radix-popover-content-transform-origin`, `--radix-dropdown-menu-content-transform-origin` and the same pattern for other primitives.

## Verify

- The element has a trigger and a scale transform.
- `transform-origin` is unset or set to the center.
- The library provides an origin variable, or the origin can be set from the placement.
