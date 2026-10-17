---
id: will-change-for-animation-jitter
title: "Use will-change: transform to fix 1-2px animation jitter"
summary: "When an animated element shifts by 1-2px during or after a transform animation, add `will-change: transform` to that element only."
applies_when: A transformed element visibly jitters or snaps by 1-2px at the start or end of an animation, reported mainly in Safari on iOS.
severity: low
source:
  - { title: "Interface Cheat Sheet", url: "https://interfaces.dev/cheat-sheet" }
---

# Use will-change: transform to fix 1-2px animation jitter

## Rule

Add `will-change: transform` to an element that shifts by 1-2px while its transform animates. Add it only after the problem shows, and only on the element that moves.

## Why

- Developers report that this property stops the shift, mostly in Safari on iOS. No browser vendor documents this fix.
- The likely cause is that the browser moves the element to its own layer only when the animation starts. This is not confirmed.

## Exceptions

- Elements that show no jitter. Do not add the property as a default.
- Many elements, or large ones. Each layer costs memory.
- Elements that do not animate `transform`.

## Examples

<!-- example:incorrect case="no-will-change" -->

```css file="card.css"
.card {
  transition: transform 200ms ease-out;
}
.card:hover {
  transform: translateY(-2px);
}
```

<!-- example:correct case="will-change" -->

```css file="card.css"
.card {
  will-change: transform;
  transition: transform 200ms ease-out;
}
.card:hover {
  transform: translateY(-2px);
}
```

<!-- example:near-miss case="global-will-change" -->

```css file="global.css"
* {
  will-change: transform;
}
```

## Verify

- This rule is a fix, not a style rule. A reviewer cannot see jitter in code. Report a missing `will-change` only when the author or an issue states that the jitter exists.
- Report `will-change` set on many elements, on a universal selector, or on elements that do not animate.
