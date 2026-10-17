---
id: crossfade-swapped-icons
title: Crossfade icons that swap
summary: "When one icon replaces another in the same spot, animate both: the new one scales from 0.25 and fades in with a blur, and the old one reverses."
applies_when: An icon changes in place on a state change, such as copy to check, play to pause or menu to close.
severity: low
source:
  - { title: "Interface Cheat Sheet", url: "https://interfaces.dev/cheat-sheet" }
---

# Crossfade icons that swap

## Rule

When an icon replaces another in the same place, keep both mounted during the change. Animate the new icon from scale 0.25, opacity 0 and blur 4px to scale 1, opacity 1 and blur 0. Reverse these values for the old icon.

## Why

- A hard swap looks like a flicker.
- Scale and blur hide the difference in shape between the two icons.

## Exceptions

- Icon changes that people trigger many times in a row. Keep them instant.
- Reduced motion preference. Use opacity only.

## Examples

<!-- example:incorrect case="hard-swap" -->

```tsx file="CopyButton.tsx"
<button onClick={copy}>{copied ? <CheckIcon /> : <CopyIcon />}</button>
```

<!-- example:correct case="crossfade" -->

```tsx file="CopyButton.tsx"
const base = "absolute inset-0 transition-[scale,opacity,filter] duration-200 ease-out";
const hidden = "scale-[0.25] opacity-0 blur-[4px]";

<button className="relative size-4" onClick={copy}>
  <CopyIcon className={cn(base, copied && hidden)} />
  <CheckIcon className={cn(base, !copied && hidden)} />
</button>;
```

## Verify

- An icon changes in the same slot on a state change, and the swap has no transition.
- A reviewer cannot judge feel from code. Treat this rule as author guidance.
