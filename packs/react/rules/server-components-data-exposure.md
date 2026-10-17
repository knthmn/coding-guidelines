---
id: server-components-data-exposure
title: Treat data in Server Components as data that can reach the client
summary: In a Server Component, load data already shaped for display and without sensitive fields. Do not pass raw records as props, because a Client Component child serializes them to the browser.
applies_when: React Server Components that load records and pass them as props to other components.
severity: high
source:
  - title: Next.js data security guide
    url: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/data-security.mdx
  - title: React experimental_taintObjectReference
    url: https://react.dev/reference/react/experimental_taintObjectReference
---

# Treat data in Server Components as data that can reach the client

## Rule

Handle data in a Server Component as if it can reach the client. Load data already shaped for display, without sensitive fields, instead of raw records. Treat every prop as something that may be serialized later.

## Why

- A Server Component can pass a full record to a child as a prop. This is safe only while the child is also a Server Component.
- When the child becomes a Client Component, React serializes every prop it receives to the client. The whole record goes with it, sensitive fields included.
- Nothing in the parent changes when the child changes. The leak is easy to miss in review.
- Shaping data where it is loaded makes the safe path the default. A check at each component boundary depends on every later edit.

## Exceptions

- Data that is already safe to show to the user, such as a record that holds only public fields.
- Raw records that stay inside server-only code and never become a prop, for example inside a data access function.
- Props that only Server Components receive and that the project guards against change, for example with a server-only boundary and a review rule. Prefer shaped data even then.

## Examples

<!-- example:incorrect case="raw-record-prop" -->

```tsx file="Page.tsx"
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const user = await db.user.findFirst({ where: { slug } });
  return <Profile user={user} />;
}
```

```tsx file="Profile.tsx"
"use client";

export function Profile({ user }: { user: User }) {
  return <h1>{user.name}</h1>;
}
```

<!-- example:correct case="shaped-data" -->

```ts file="data/user.ts"
import "server-only";

export async function getPublicProfile(slug: string) {
  const user = await db.user.findFirst({ where: { slug } });
  if (!user) return null;
  return { name: user.name, avatarUrl: user.avatarUrl };
}
```

```tsx file="Page.tsx"
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profile = await getPublicProfile(slug);
  return <Profile profile={profile} />;
}
```

<!-- example:near-miss case="public-fields-only" -->

```tsx file="Page.tsx"
export default async function Page() {
  const posts = await db.post.findMany({
    select: { id: true, title: true, publishedAt: true },
  });
  return <PostList posts={posts} />;
}
```

## Library notes

### Next.js

- The data security guide recommends a data access layer that runs only on the server, checks authorization, and returns small DTOs.
- The guide also shows the raw record case: a Server Component that passes a database row to a Client Component exposes every field.

### React taint APIs

- `experimental_taintObjectReference` and `experimental_taintUniqueValue` make React throw when a tainted object or value is passed to a Client Component.
- The APIs are experimental. In Next.js they need the `experimental.taint` option.
- The Next.js guide calls tainting an extra layer. Shape the data before it reaches the render tree as well.

## Verify

- The component is a Server Component and it passes a loaded record as a prop.
- The record has fields the user must not see, such as password hashes, tokens, internal flags or other users' data. Check the schema or the query.
- The data is not shaped for display. A `select` of public fields or a mapping to a DTO counts as shaped.
- Do not report a violation only because the child is a Server Component today. Report it when the record is raw and holds sensitive fields, since the child can change.
