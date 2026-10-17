---
id: rerender-use-ref-transient-values
title: Use refs for transient values
summary: Store values that change often and do not affect the rendered output, such as pointer position or timer ids, in a ref instead of state. Update the DOM directly when needed.
applies_when: State updated from high-frequency events, such as `mousemove`, `scroll` or intervals, where each update only moves an element or feeds a later callback.
severity: low
source:
  - {
      title: "Vercel React Best Practices",
      url: "https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rerender-use-ref-transient-values.md",
    }
---

# Use refs for transient values

## Rule

When a value changes often and React does not need to re-render for it, keep it in `useRef`. If the value only moves or styles an element, write to the element through a ref.

## Why

- Each state update re-renders the component. A high-frequency event can cause many renders per second.
- Writing to a ref does not re-render.

## Exceptions

- The value affects the rendered output in a way React must own, such as text, list content or conditional markup.
- The update is rare. State is simpler.
- Do not read or write `ref.current` during render. Write it in event handlers and effects.
- Direct DOM writes that React also controls. They can be overwritten on the next render.

## Examples

<!-- example:incorrect case="state-per-mousemove" -->

```tsx file="Tracker.tsx"
function Tracker() {
  const [lastX, setLastX] = useState(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setLastX(e.clientX);
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return <div className="dot" style={{ transform: `translateX(${lastX}px)` }} />;
}
```

<!-- example:correct case="ref-and-dom-write" -->

```tsx file="Tracker.tsx"
function Tracker() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const node = dotRef.current;
      if (node) node.style.transform = `translateX(${e.clientX}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return <div ref={dotRef} className="dot" />;
}
```

<!-- example:near-miss case="value-is-rendered" -->

```tsx file="Coordinates.tsx"
function Coordinates() {
  const [x, setX] = useState(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setX(e.clientX);
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return <output>x: {x}</output>;
}
```

## Verify

- The state updates from a high-frequency source.
- The value is not needed to render text or markup, only to position an element or to be read later in a callback.
