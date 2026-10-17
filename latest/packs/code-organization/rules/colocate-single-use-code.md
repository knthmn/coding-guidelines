---
id: colocate-single-use-code
title: Colocate code that one route uses
summary: Put a component, hook or helper used by one route next to that route. Move it to a shared folder when a second route uses it.
applies_when: Code adds or moves a component, hook or helper that only one route or page uses.
severity: low
source: null
---

# Colocate code that one route uses

## Rule

Put a component, hook or helper that one route uses next to that route. Move it to a shared folder, such as `src/components`, when a second route uses it.

## Why

- A reader finds all code of a route in one place.
- Deleting or changing the route shows which code goes with it.
- Shared folders hold only code that is shared, so they stay small and each entry has a reason to be there.

## Exceptions

- Primitives of a design system, such as buttons and inputs, which are meant to be shared from the start.
- Code that a second route will certainly use in the same change.
- Frameworks or tools that cannot keep non-route files in the route folder. Use the framework's mechanism (see Library notes) or the shared folder.
- Code that is large and has its own tests and its own owner, where a package or feature folder is a better home.

## Examples

<!-- example:incorrect case="shared-folder-single-use" -->

```tsx file="src/components/InvoiceFilters.tsx"
export function InvoiceFilters() {
  return <form />;
}
```

```tsx file="src/routes/invoices.tsx"
import { InvoiceFilters } from "@/components/InvoiceFilters";
```

<!-- example:correct case="next-to-route" -->

```tsx file="src/routes/invoices/-InvoiceFilters.tsx"
export function InvoiceFilters() {
  return <form />;
}
```

```tsx file="src/routes/invoices/index.tsx"
import { InvoiceFilters } from "./-InvoiceFilters";
```

<!-- example:near-miss case="used-by-two-routes" -->

```tsx file="src/components/Pagination.tsx"
export function Pagination() {
  return <nav />;
}
```

```tsx file="src/routes/invoices/index.tsx"
import { Pagination } from "@/components/Pagination";
```

## Library notes

### TanStack Router and TanStack Start

The route generator treats every file in the routes directory as a route. Files and folders whose names start with `-` are ignored. The prefix is set by the `routeFileIgnorePrefix` option, which defaults to `-`. Example: `routes/posts/-components/Post.tsx`.

### Next.js App Router

A route is public only when its folder has a `page` or `route` file, so other files in `app` are not routable. A folder whose name starts with `_` is a private folder and is opted out of routing. Example: `app/blog/_components/Post.tsx`.

## Verify

- The file is in a shared folder and exactly one route imports it. Check all importers, including tests and other routes.
- The code is not a design system primitive and no exception applies.
- On TanStack Router, the colocated file name starts with `-`, or else the generator treats it as a route.
