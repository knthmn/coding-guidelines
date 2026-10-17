---
id: rerender-derived-state
title: Subscribe to derived state
summary: Subscribe to a derived boolean or small value instead of a continuously changing value, so the component re-renders only when the result changes.
applies_when: Components that read a fast-changing value, such as window width or scroll position, and only use a coarse result of it.
severity: low
source:
  - {
      title: "Vercel React Best Practices",
      url: "https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rerender-derived-state.md",
    }
---

# Subscribe to derived state

## Rule

When a component needs only a coarse result of a fast-changing value, such as "is the viewport narrow", subscribe to that result. Do not subscribe to the raw value and derive the result in render.

## Why

- A hook that returns the raw value re-renders the component on every change, even when the derived result stays the same.
- A subscription to the derived result re-renders only when the result changes.

## Exceptions

- The component renders the raw value, for example a width readout.
- The raw value feeds several derived results. One subscription to the raw value can be cheaper than many.
- The component is cheap to render. Report only when the re-render rate is high.

## Examples

<!-- example:incorrect case="raw-width" -->

```tsx file="Sidebar.tsx"
function Sidebar() {
  const width = useWindowWidth();
  const isMobile = width < 768;
  return <nav className={isMobile ? "mobile" : "desktop"} />;
}
```

<!-- example:correct case="media-query" -->

```tsx file="Sidebar.tsx"
function Sidebar() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  return <nav className={isMobile ? "mobile" : "desktop"} />;
}
```

<!-- example:near-miss case="width-rendered" -->

```tsx file="SizeReadout.tsx"
function SizeReadout() {
  const width = useWindowWidth();
  return <span>{width}px</span>;
}
```

## Verify

- The hook returns a value that updates continuously.
- The component uses only a boolean or other coarse result of it.
- A hook that subscribes to the derived result exists, or is simple to add.
