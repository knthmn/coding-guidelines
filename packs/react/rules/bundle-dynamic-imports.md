---
id: bundle-dynamic-imports
title: Lazy-load heavy components that the first render does not need
summary: Load large components, such as editors, charts or maps, on demand with a dynamic import, so they stay out of the initial bundle.
applies_when: A component with a large dependency is imported statically but is hidden, below the fold, behind an interaction, or on a secondary route.
severity: medium
source:
  - title: "Vercel React Best Practices"
    url: "https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/bundle-dynamic-imports.md"
---

# Lazy-load heavy components that the first render does not need

## Rule

Load a heavy component with a dynamic import when the first render does not need it. Show a fallback while it loads.

## Why

- A static import puts the component and its dependencies in the initial bundle.
- A larger initial bundle delays time to interactive and largest contentful paint.
- Many heavy components, such as code editors, rich text editors, chart libraries and maps, are used only after a user action or on one screen.

## Exceptions

- The component is visible in the first render. Lazy-loading it delays the content users came for.
- The component is small. A separate chunk costs a request and adds a loading state.
- The component is the largest content on the page and affects first paint.
- The code is already in the initial bundle through another static import. A dynamic import then splits nothing.

## Examples

<!-- example:incorrect case="static-import" -->

```tsx file="CodePanel.tsx"
import { MonacoEditor } from "./MonacoEditor";

export function CodePanel({ code }: { code: string }) {
  return <MonacoEditor value={code} />;
}
```

<!-- example:correct case="react-lazy" -->

```tsx file="CodePanel.tsx"
import { lazy, Suspense } from "react";

const MonacoEditor = lazy(() =>
  import("./MonacoEditor").then((m) => ({ default: m.MonacoEditor })),
);

export function CodePanel({ code }: { code: string }) {
  return (
    <Suspense fallback={<EditorSkeleton />}>
      <MonacoEditor value={code} />
    </Suspense>
  );
}
```

<!-- example:near-miss case="above-the-fold" -->

```tsx file="HomePage.tsx"
import { HeroChart } from "./HeroChart";

export function HomePage({ data }: { data: ChartData }) {
  return <HeroChart data={data} />;
}
```

## Library notes

### React

- `React.lazy` takes a function that returns a dynamic `import()` of a module with a default export. Render the lazy component inside `<Suspense>`.

### Next.js

- Use `next/dynamic`. Pass `ssr: false` only for components that cannot render on the server, such as ones that read `window`. `ssr: false` is not allowed in Server Components, so call `dynamic` with it from a Client Component.

### TanStack Start and TanStack Router

- TanStack Start applies automatic route code splitting by default, and it has no `autoCodeSplitting` option. With TanStack Router alone, enable `autoCodeSplitting` in the router plugin. By default it splits the route component, error component and not-found component into lazy chunks. Without it, put the lazy part of a route in a `.lazy.tsx` file.
- For other components, use `React.lazy` with `Suspense`.

### Other frameworks

- Use the framework's own lazy-loading mechanism.

## Verify

- The component and its dependencies are large, for example a library of tens of kilobytes or more.
- The first render does not show the component.
- No other static import already pulls the same code into the initial bundle.
