---
id: advanced-effect-event-deps
title: Do not list Effect Events in dependency arrays
summary: Leave functions from `useEffectEvent` out of effect dependency arrays. List only the reactive values the effect reads, and call the Effect Event inside the effect.
applies_when: Code that calls `useEffectEvent` (React 19.2 or later) and passes the result to `useEffect`, `useLayoutEffect` or `useInsertionEffect`.
severity: low
source:
  - title: "Vercel React Best Practices"
    url: "https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/advanced-effect-event-deps.md"
---

# Do not list Effect Events in dependency arrays

## Rule

Do not put a function returned by `useEffectEvent` in a dependency array. List only the reactive values the effect itself reads, and call the Effect Event from inside the effect or from a subscription the effect creates.

## Why

- An Effect Event changes identity on every render. In the dependency array it re-runs the effect on every render.
- The effect then tears down and sets up again, for example a reconnect on each render.
- Effect Events exist so that the effect does not depend on them. React's lint rule knows this and does not ask for them in the array.

## Exceptions

- None for `useEffectEvent`. Projects on React older than 19.2 have no `useEffectEvent`. Handler functions in those projects are ordinary dependencies, see `advanced-event-handler-refs`.

## Examples

<!-- example:incorrect case="event-in-deps" -->

```tsx file="ChatRoom.tsx"
import { useEffect, useEffectEvent } from "react";

function ChatRoom({ roomId, onConnected }: { roomId: string; onConnected: () => void }) {
  const handleConnected = useEffectEvent(onConnected);

  useEffect(() => {
    const connection = createConnection(roomId);
    connection.on("connected", handleConnected);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, handleConnected]);
}
```

<!-- example:correct case="reactive-values-only" -->

```tsx file="ChatRoom.tsx"
import { useEffect, useEffectEvent } from "react";

function ChatRoom({ roomId, onConnected }: { roomId: string; onConnected: () => void }) {
  const handleConnected = useEffectEvent(onConnected);

  useEffect(() => {
    const connection = createConnection(roomId);
    connection.on("connected", handleConnected);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);
}
```

<!-- example:near-miss case="plain-callback-in-deps" -->

```tsx file="ChatRoom.tsx"
import { useEffect } from "react";

function ChatRoom({ roomId, onConnected }: { roomId: string; onConnected: () => void }) {
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.on("connected", onConnected);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, onConnected]);
}
```

## Verify

- The function in the dependency array comes from `useEffectEvent`. A prop or a `useCallback` result is an ordinary dependency.
- The project uses React 19.2 or later.
