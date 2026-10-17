---
id: button-press-scale
title: Scale buttons down slightly when pressed
summary: Give pressable buttons an `:active` scale between 0.95 and 0.98, with a short ease-out transition on the `scale` property.
applies_when: A project styles buttons or other pressable controls with custom interaction states.
severity: low
source:
  - { title: "Interface Cheat Sheet", url: "https://interfaces.dev/cheat-sheet" }
---

# Scale buttons down slightly when pressed

## Rule

On `:active`, scale pressable buttons to a value between 0.95 and 0.98. Add a short transition, for example `transition: scale 200ms ease-out`.

## Why

- The small change confirms the press and makes the control feel physical.
- A value below 0.95 looks exaggerated.

## Exceptions

- Large surfaces, such as a clickable card that fills a row. Scaling them is distracting.
- Disabled controls.
- Projects whose design system sets a different press state.

## Examples

<!-- example:incorrect case="no-press-state" -->

```tsx file="Button.tsx"
<button className="rounded-lg bg-blue-600 px-4 py-2 text-white">Continue</button>
```

<!-- example:correct case="press-scale" -->

```tsx file="Button.tsx"
<button className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-[scale] duration-200 ease-out active:scale-[0.97]">
  Continue
</button>
```

<!-- example:near-miss case="large-card" -->

```tsx file="RowLink.tsx"
<a className="block w-full p-4 hover:bg-neutral-50" href={href}>
  {title}
</a>
```

## Library notes

### Browser support

The standalone `scale` property is in Chrome 104, Firefox 72 and Safari 14.1. Use `transform: scale()` where older browsers matter.

## Verify

- The control is a small button, not a large row or card.
- No `:active` scale exists, or the value is outside 0.95 to 0.98.
- A reviewer cannot judge feel from code. Treat this rule as author guidance.
