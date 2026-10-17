---
id: advanced-event-handler-refs
title: Read the latest callback in an effect without re-subscribing
summary: When an effect must not re-run on every callback change, read the callback through `useEffectEvent` (React 19.2+). On older React, store it in a ref.
applies_when: An effect subscribes to an external source or starts a timer and calls a callback prop or handler that changes on each render.
severity: low
source:
  - title: "Vercel React Best Practices: advanced-event-handler-refs"
    url: "https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/advanced-event-handler-refs.md"
  - title: "Vercel React Best Practices: advanced-use-latest"
    url: "https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/advanced-use-latest.md"
---

# Read the latest callback in an effect without re-subscribing

## Rule

When an effect calls a callback that changes on each render, and the effect must not re-run when the callback changes, wrap the callback with `useEffectEvent`. On React older than 19.2, store the callback in a ref and update the ref in an effect.

## Why

- A callback in the dependency array re-runs the effect on every render. The effect removes and adds the listener, resets the timer or reconnects each time.
- Removing the callback from the array hides the problem and leaves a stale closure that calls old props or state.
- An Effect Event always calls the latest committed callback, and the effect keeps its own dependencies.

## Exceptions

- The effect must restart when the callback changes. Then the callback is a real dependency.
- The caller memoizes the callback and the effect re-runs rarely. Do not add machinery for this.
- Do not use `useEffectEvent` to silence the dependency lint rule for values that should restart the effect.
- Effect Events must not be called during render or passed to other components or hooks. Call them only inside effects or other Effect Events.

## Examples

<!-- example:incorrect case="handler-in-deps" -->

```tsx file="useWindowEvent.ts"
import { useEffect } from "react";

export function useWindowEvent(event: string, handler: (e: Event) => void) {
  useEffect(() => {
    window.addEventListener(event, handler);
    return () => window.removeEventListener(event, handler);
  }, [event, handler]);
}
```

<!-- example:correct case="use-effect-event" -->

```tsx file="useWindowEvent.ts"
import { useEffect, useEffectEvent } from "react";

export function useWindowEvent(event: string, handler: (e: Event) => void) {
  const onEvent = useEffectEvent(handler);

  useEffect(() => {
    window.addEventListener(event, onEvent);
    return () => window.removeEventListener(event, onEvent);
  }, [event]);
}
```

<!-- example:correct case="debounced-callback" -->

```tsx file="SearchInput.tsx"
import { useEffect, useEffectEvent, useState } from "react";

function SearchInput({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState("");
  const onSearchEvent = useEffectEvent(onSearch);

  useEffect(() => {
    const timeout = setTimeout(() => onSearchEvent(query), 300);
    return () => clearTimeout(timeout);
  }, [query]);

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}
```

<!-- example:correct case="ref-before-19-2" -->

```tsx file="useWindowEvent.ts"
import { useEffect, useRef } from "react";

export function useWindowEvent(event: string, handler: (e: Event) => void) {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const listener = (e: Event) => handlerRef.current(e);
    window.addEventListener(event, listener);
    return () => window.removeEventListener(event, listener);
  }, [event]);
}
```

<!-- example:near-miss case="callback-restarts-effect" -->

```tsx file="useRetry.ts"
import { useEffect } from "react";

export function useRetry(request: () => Promise<void>, attempt: number) {
  useEffect(() => {
    void request();
  }, [request, attempt]);
}
```

## Library notes

### React

`useEffectEvent` is stable from React 19.2 (released 2025-10-01). It needs `eslint-plugin-react-hooks` v6 or later, so the linter does not ask for Effect Events as dependencies.

## Verify

- The effect re-subscribes or restarts because a callback is in its dependency array, and the restart has a cost or a visible effect.
- The effect does not need to restart when the callback changes.
- The project uses React 19.2 or later. If not, the ref pattern is the fix.
