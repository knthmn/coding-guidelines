---
id: server-cache-react
title: Deduplicate per-request work with React.cache
summary: Wrap repeated server-side work such as auth and database reads in `React.cache`, and call it with primitive arguments so calls hit the cache.
applies_when: React Server Components that call the same non-`fetch` async function, such as a database query or auth check, from several components in one render.
severity: medium
source:
  - title: Vercel React Best Practices
    url: https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/server-cache-react.md
---

# Deduplicate per-request work with React.cache

## Rule

When several Server Components call the same async function in one request, wrap it in `React.cache`. Call it with primitive arguments, or with the same object reference each time.

## Why

- `cache` runs the function once per request for the same arguments. Other calls get the stored result.
- Components can load what they need without passing data down the tree.
- `cache` compares arguments with `Object.is`. A new object literal on each call never hits the cache.

## Exceptions

- Work that runs once per request anyway.
- `fetch` calls on frameworks that already deduplicate them within a request.
- Work whose result must differ between calls in one request.

## Examples

<!-- example:incorrect case="no-cache" -->

```ts file="auth.ts"
export async function getCurrentUser() {
  const session = await auth();
  if (!session?.user?.id) return null;
  return db.user.findUnique({ where: { id: session.user.id } });
}
```

<!-- example:incorrect case="object-argument" -->

```ts file="users.ts"
const getUser = cache(async (params: { uid: number }) => {
  return db.user.findUnique({ where: { id: params.uid } });
});

getUser({ uid: 1 });
getUser({ uid: 1 });
```

<!-- example:correct case="primitive-argument" -->

```ts file="users.ts"
import { cache } from "react";

export const getCurrentUser = cache(async () => {
  const session = await auth();
  if (!session?.user?.id) return null;
  return db.user.findUnique({ where: { id: session.user.id } });
});

export const getUser = cache(async (uid: number) => {
  return db.user.findUnique({ where: { id: uid } });
});
```

<!-- example:near-miss case="fetch-is-deduplicated" -->

```tsx file="Header.tsx"
async function Header() {
  const res = await fetch("https://api.example.com/site");
  const site = await res.json();
  return <h1>{site.name}</h1>;
}
```

## Library notes

### Next.js

- Next.js memoizes `fetch` calls with the same URL and options within one request, so `fetch` needs no `cache`.
- Database queries, heavy computation, auth checks and file system reads are not covered. Wrap them.

## Verify

- The file is used in React Server Components. `cache` is for server rendering.
- The same function with the same arguments runs more than once in one request. Look at the component tree.
- The call is not a `fetch` that the framework already deduplicates.
