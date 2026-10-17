---
id: rendering-resource-hints
title: Use React DOM resource hints for known early resources
summary: Call `prefetchDNS`, `preconnect`, `preload` or `preinit` during render for fonts, stylesheets and origins that the page will need, so the browser starts early. Needs React 19 or later.
applies_when: A server-rendered page, or code that knows ahead that it needs a font, stylesheet, script, module or third-party origin, in a project on React 19 or later.
severity: low
source:
  - title: "Vercel React Best Practices"
    url: "https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rendering-resource-hints.md"
---

# Use React DOM resource hints for known early resources

## Rule

When the code knows that the page will need a resource soon, call the matching `react-dom` function while rendering: `prefetchDNS`, `preconnect`, `preload`, `preloadModule`, `preinit` or `preinitModule`. On the server, call it during render, not in an effect.

## Why

- The browser finds late resources only after it parses CSS or runs scripts. Hints start the request earlier.
- React puts hints in the server HTML and removes duplicate calls.
- Hints for the next page, called from an event handler, start the load before the user finishes the action.

## Exceptions

- The framework or bundler already emits hints, for example for route chunks or fonts. Do not repeat them.
- Resources that the page may not use. A wasted hint costs bandwidth.
- Too many `preload` calls. Each one competes with other critical requests.
- React older than 19.

## Examples

<!-- example:incorrect case="hint-in-effect" -->

```tsx file="App.tsx"
import { useEffect } from "react";
import { preconnect, preload } from "react-dom";

export function App() {
  useEffect(() => {
    preconnect("https://api.example.com");
    preload("/fonts/inter.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  }, []);

  return <Main />;
}
```

<!-- example:correct case="hint-in-render" -->

```tsx file="App.tsx"
import { preconnect, preload } from "react-dom";

export function App() {
  preconnect("https://api.example.com");
  preload("/fonts/inter.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });

  return <Main />;
}
```

<!-- example:near-miss case="hint-in-event-handler" -->

```tsx file="Navigation.tsx"
import { preconnect } from "react-dom";

export function Navigation() {
  return (
    <a href="/checkout" onMouseEnter={() => preconnect("https://payments.example.com")}>
      Checkout
    </a>
  );
}
```

## Library notes

### React DOM

| Function                 | Use                                                            |
| ------------------------ | -------------------------------------------------------------- |
| `prefetchDNS(href)`      | Resolve DNS for a domain used later.                           |
| `preconnect(href)`       | Open the connection to a server used soon.                     |
| `preload(href, options)` | Fetch a stylesheet, font, script or image the page needs soon. |
| `preloadModule(href)`    | Fetch an ES module for a likely next navigation.               |
| `preinit(href, options)` | Fetch and run a stylesheet or script early.                    |
| `preinitModule(href)`    | Fetch and run an ES module early.                              |

- In the browser, these functions work anywhere: render, an effect or an event handler.
- During server rendering or in Server Components, they work only when called during render, or in an async context that starts from render. Other calls are ignored.

## Verify

- The project uses React 19 or later.
- The resource is needed soon, and no framework feature already hints it.
- On the server, the call is in render and not in an effect.
