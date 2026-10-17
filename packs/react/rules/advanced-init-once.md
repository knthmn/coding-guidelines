---
id: advanced-init-once
title: Run app-wide initialization once, not in a mount effect
summary: Run app-wide setup that must happen once per page load at module level in the entry module, not in a component effect with an empty dependency array.
applies_when: A component effect with an empty dependency array runs app-wide setup such as loading stored state, checking a token or configuring an SDK.
severity: low
source:
  - title: "Vercel React Best Practices"
    url: "https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/advanced-init-once.md"
---

# Run app-wide initialization once, not in a mount effect

## Rule

Run setup that must happen once per page load in the entry module, guarded for the browser when the module also runs on the server. Do not put it in a component effect with an empty dependency array.

## Why

- A component can unmount and mount again, and its effect runs again each time.
- In development, Strict Mode mounts each component twice, so the effect runs twice.
- Setup that is not safe to repeat then runs twice, for example SDK configuration or token exchange.

## Exceptions

- Setup tied to the component lifetime, such as a subscription. Give it a cleanup function.
- Setup that is safe to repeat. Strict Mode double runs then cause no harm.
- Setup that needs props or state from the component.

## Examples

<!-- example:incorrect case="effect-init" -->

```tsx file="App.tsx"
import { useEffect } from "react";

export function App() {
  useEffect(() => {
    loadFromStorage();
    checkAuthToken();
  }, []);

  return <Routes />;
}
```

<!-- example:correct case="module-init" -->

```tsx file="App.tsx"
if (typeof window !== "undefined") {
  loadFromStorage();
  checkAuthToken();
}

export function App() {
  return <Routes />;
}
```

<!-- example:correct case="module-guard" -->

```tsx file="App.tsx"
import { useEffect } from "react";

let didInit = false;

export function App() {
  useEffect(() => {
    if (didInit) return;
    didInit = true;
    loadFromStorage();
    checkAuthToken();
  }, []);

  return <Routes />;
}
```

<!-- example:near-miss case="subscription-with-cleanup" -->

```tsx file="OnlineStatus.tsx"
import { useEffect, useState } from "react";

export function OnlineStatus() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  return <span>{online ? "Online" : "Offline"}</span>;
}
```

## Verify

- The effect does app-wide setup, not setup for this component.
- Running the setup twice has a harmful effect.
- The effect has no cleanup that would make a second run safe.
