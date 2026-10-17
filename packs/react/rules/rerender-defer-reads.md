---
id: rerender-defer-reads
title: Read dynamic state at the point of use
summary: Do not subscribe to changing state, such as URL search params, when the value is only read inside a callback. Read it on demand in the callback.
applies_when: Components that call a hook subscribing to changing external state but only use the value in event handlers or callbacks.
severity: low
source:
  - {
      title: "Vercel React Best Practices",
      url: "https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rerender-defer-reads.md",
    }
---

# Read dynamic state at the point of use

## Rule

When a component uses a value only inside an event handler or callback, read the value there. Do not subscribe to it with a hook that re-renders the component on each change.

## Why

- A subscribing hook re-renders the component on every change, even when the rendered output does not use the value.
- A read inside the callback always returns the current value, so it cannot be stale.

## Exceptions

- The value also affects the rendered output. The subscription is then needed.
- The source cannot be read outside the hook, for example state held in a React context or a store with no direct read API.
- Server rendering or tests where the browser global is not available. Use the framework's own accessor there.
- The component is cheap and rarely re-renders. Report only when the extra renders are plausible.

## Examples

<!-- example:incorrect case="search-params-hook" -->

```tsx file="ShareButton.tsx"
function ShareButton({ chatId }: { chatId: string }) {
  const [searchParams] = useSearchParams();

  const handleShare = () => {
    shareChat(chatId, { ref: searchParams.get("ref") });
  };

  return <button onClick={handleShare}>Share</button>;
}
```

<!-- example:correct case="read-in-handler" -->

```tsx file="ShareButton.tsx"
function ShareButton({ chatId }: { chatId: string }) {
  const handleShare = () => {
    const params = new URLSearchParams(window.location.search);
    shareChat(chatId, { ref: params.get("ref") });
  };

  return <button onClick={handleShare}>Share</button>;
}
```

<!-- example:correct case="storage-in-handler" -->

```tsx file="SaveButton.tsx"
function SaveButton({ draft }: { draft: Draft }) {
  const handleSave = () => {
    const token = localStorage.getItem("session-token");
    saveDraft(draft, token);
  };

  return <button onClick={handleSave}>Save</button>;
}
```

<!-- example:near-miss case="value-also-rendered" -->

```tsx file="ShareButton.tsx"
function ShareButton({ chatId }: { chatId: string }) {
  const [searchParams] = useSearchParams();
  const ref = searchParams.get("ref");

  return (
    <button onClick={() => shareChat(chatId, { ref })}>Share{ref ? ` (from ${ref})` : ""}</button>
  );
}
```

## Library notes

### Next.js and React Router

`useSearchParams` in both subscribes the component to the query string. Components that use it re-render on every search param change.

## Verify

- The hook result is used only inside callbacks or effects, never in the returned JSX or in render-time computation.
- The value can be read directly at the point of use in this environment.
