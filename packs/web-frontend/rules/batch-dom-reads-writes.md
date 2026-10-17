---
id: batch-dom-reads-writes
title: Do not interleave style writes with layout reads
summary: Group DOM layout reads together and style writes together, or toggle a CSS class, so the browser does not run a forced reflow after every write.
applies_when: Code sets styles or classes on elements and reads layout values, such as `offsetWidth`, `getBoundingClientRect` or `getComputedStyle`, in the same function or loop.
severity: medium
source:
  - title: Vercel React Best Practices
    url: https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/js-batch-dom-css.md
---

# Do not interleave style writes with layout reads

## Rule

Do all layout reads first, then all style writes, or the reverse. Prefer toggling a CSS class over setting many inline styles.

## Why

- A write to a style invalidates layout. A later read of a layout value, such as `offsetWidth`, forces the browser to recompute layout at once.
- Alternating reads and writes in a loop repeats the forced reflow for each item. This is called layout thrashing, and it grows with the number of elements.
- Several writes in a row are cheap, because the browser recomputes layout once.
- Classes keep style values in CSS files, which the browser caches.

## Exceptions

- A single write followed by a single read. One forced reflow is acceptable when no other order is possible.
- Reads that do not depend on layout, such as `element.dataset` or `getAttribute`.
- Code where the read must see the result of the write, such as measuring after a class change. Do it once, after all writes.

## Examples

<!-- example:incorrect case="interleaved-in-loop" -->

```ts file="equalizeHeights.ts"
export function equalizeHeights(cards: HTMLElement[]) {
  for (const card of cards) {
    card.style.height = "auto";
    const height = card.offsetHeight;
    card.style.minHeight = `${height}px`;
  }
}
```

<!-- example:correct case="reads-then-writes" -->

```ts file="equalizeHeights.ts"
export function equalizeHeights(cards: HTMLElement[]) {
  const heights = cards.map((card) => card.offsetHeight);
  cards.forEach((card, i) => {
    card.style.minHeight = `${heights[i]}px`;
  });
}
```

<!-- example:correct case="toggle-class" -->

```ts file="highlight.ts"
export function highlight(box: HTMLElement) {
  box.classList.add("highlighted-box");
  return box.getBoundingClientRect();
}
```

<!-- example:near-miss case="many-writes-one-read" -->

```ts file="resize.ts"
export function resize(box: HTMLElement) {
  box.style.width = "100px";
  box.style.height = "200px";
  box.style.border = "1px solid black";
  return box.getBoundingClientRect();
}
```

## Library notes

### React

- Do the same inside effects or layout effects that touch DOM nodes through refs. Prefer a class name or style prop in render over writing styles in an effect.

## Verify

- A style or class write comes before a layout read, and another write follows the read, in the same function or loop.
- The read is a layout property or method, not a plain attribute.
- Moving all reads before all writes does not change the behavior.
