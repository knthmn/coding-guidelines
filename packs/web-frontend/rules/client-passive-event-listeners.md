---
id: client-passive-event-listeners
title: Mark scroll-related listeners as passive when they do not call preventDefault
summary: "Pass `{ passive: true }` to `touchstart`, `touchmove` and `wheel` listeners on elements when they never call `preventDefault`, so scrolling does not wait for the handler."
applies_when: Code adds `touchstart`, `touchmove` or `wheel` listeners with `addEventListener`, on an element other than `window`, `document`, `document.documentElement` or `body`.
severity: low
source:
  - title: Vercel React Best Practices
    url: https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/client-passive-event-listeners.md
---

# Mark scroll-related listeners as passive when they do not call preventDefault

## Rule

Pass `{ passive: true }` to `touchstart`, `touchmove` and `wheel` listeners that never call `preventDefault()`. This matters for listeners on elements. Browsers already treat these listeners as passive on `window`, `document`, `document.documentElement` and `document.body`.

## Why

- A non-passive listener may cancel the scroll, so the browser waits for the handler to finish before it scrolls. Slow handlers cause visible delay.
- A passive flag tells the browser it can scroll at once.

## Exceptions

- Listeners that call `preventDefault()`, such as custom swipe, drag or zoom handling. They must stay non-passive, and in that case set `passive: false` on elements where the default differs.
- Listeners on `window`, `document`, `document.documentElement` or `document.body`. Current browsers default them to passive, so the flag adds only clarity. Do not report them.
- Other event types, such as `click` or `keydown`. They do not block scrolling.

## Examples

<!-- example:incorrect case="element-listener-without-flag" -->

```ts file="scrollTracker.ts"
export function trackScroll(panel: HTMLElement, onMove: (y: number) => void) {
  const handle = (e: WheelEvent) => onMove(e.deltaY);
  panel.addEventListener("wheel", handle);
  return () => panel.removeEventListener("wheel", handle);
}
```

<!-- example:correct case="element-listener-passive" -->

```ts file="scrollTracker.ts"
export function trackScroll(panel: HTMLElement, onMove: (y: number) => void) {
  const handle = (e: WheelEvent) => onMove(e.deltaY);
  panel.addEventListener("wheel", handle, { passive: true });
  return () => panel.removeEventListener("wheel", handle);
}
```

<!-- example:near-miss case="document-listener" -->

```ts file="touchLog.ts"
document.addEventListener("touchstart", (e) => {
  logTouch(e.touches[0].clientX);
});
```

<!-- example:near-miss case="prevents-default" -->

```ts file="swipe.ts"
surface.addEventListener(
  "touchmove",
  (e) => {
    e.preventDefault();
    moveCard(e.touches[0].clientX);
  },
  { passive: false },
);
```

## Verify

- The target is an element, not `window`, `document`, `document.documentElement` or `document.body`.
- The event is `touchstart`, `touchmove` or `wheel`.
- The handler never calls `preventDefault()`, directly or through a helper.
