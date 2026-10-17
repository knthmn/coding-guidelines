---
id: subtle-exit-animations
title: Make exit animations subtler than entrances
summary: Move an exiting element a shorter distance than it traveled in, and fade it out, optionally with a small blur.
applies_when: An element has both an enter and an exit animation, such as toasts, popovers, drawers or list items.
severity: low
source:
  - { title: "Interface Cheat Sheet", url: "https://interfaces.dev/cheat-sheet" }
---

# Make exit animations subtler than entrances

## Rule

Give an exit a smaller movement than the entrance. Fade the element out and, if you want, add a small blur, for example 4px. Do not repeat the full entrance path in reverse.

## Why

- An exit tells people the element is gone. They do not need to follow it.
- A long exit path draws attention to something that people no longer need.

## Exceptions

- Exits that carry meaning, such as a swipe-to-dismiss that follows the finger.
- Elements that leave toward a destination, such as an item moving to a cart.
- Entrance and exit that are both fade only.

## Examples

<!-- example:incorrect case="mirrored-exit" -->

```css file="toast.css"
.toast[data-starting-style] {
  transform: translateY(100%);
  opacity: 0;
}
.toast[data-ending-style] {
  transform: translateY(100%);
  opacity: 0;
}
```

<!-- example:correct case="shorter-exit" -->

```css file="toast.css"
.toast[data-starting-style] {
  transform: translateY(100%);
  opacity: 0;
}
.toast[data-ending-style] {
  transform: translateY(8px);
  opacity: 0;
  filter: blur(4px);
}
```

<!-- example:near-miss case="swipe-follows-finger" -->

```tsx file="Toast.tsx"
<Toast.Root className="translate-x-[var(--swipe-movement-x)] data-[ending-style]:translate-x-[var(--swipe-movement-x)] data-[ending-style]:opacity-0" />
```

## Verify

- The element has an enter and an exit state.
- The exit distance is equal to or larger than the entrance distance.
- A reviewer cannot judge feel from code. Treat this rule as author guidance.
