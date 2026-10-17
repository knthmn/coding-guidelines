---
id: no-animation-on-page-load
title: Do not animate elements on page load unless intended
summary: Make sure initial content and persistent UI render in place on page load. Enter animations should run only for elements that appear after load.
applies_when: Elements use enter animations, transition from an initial state, or hydrate with a state change.
severity: low
source:
  - { title: "Interface Cheat Sheet", url: "https://interfaces.dev/cheat-sheet" }
---

# Do not animate elements on page load unless intended

## Rule

On first render, show persistent UI in its final state. Run enter animations only for elements that appear after load, or where the animation is a deliberate part of the page design.

## Why

- Animating content that was already there delays what people came to see.
- A state change right after mount, such as a toggle moving to its saved position, shows as unwanted motion.

## Exceptions

- Intentional intro animations, such as a landing page hero.
- Loading skeletons and progress indicators.

## Examples

<!-- example:incorrect case="persistent-ui-animates" -->

```tsx file="Layout.tsx"
<header className="animate-enter">
  <Nav />
</header>
```

<!-- example:correct case="persistent-ui-in-place" -->

```tsx file="Layout.tsx"
<header>
  <Nav />
</header>
```

<!-- example:correct case="animate-after-load" -->

```tsx file="Saved.tsx"
{
  saved && <p className="animate-enter">Changes saved</p>;
}
```

<!-- example:near-miss case="intentional-hero" -->

```tsx file="Hero.tsx"
<h1 className="animate-enter">Build software that never breaks</h1>
```

## Library notes

### Motion (Framer Motion)

Set `initial={false}` on `AnimatePresence` to skip the enter animation for children that exist on first render.

## Verify

- The element exists on first render, and a state change or an enter animation runs right after mount.
- The animation is not a stated part of the page design.
- A reviewer cannot see the page load from code. Report only when the code clearly changes state or runs an enter animation on mount.
