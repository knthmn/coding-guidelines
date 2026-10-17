---
id: server-parallel-fetching
title: Split Server Components so independent fetches run in parallel
summary: Do not await data in a parent that renders children which fetch their own data. Move each fetch into its own component and compose them.
applies_when: React Server Components where a parent awaits data before rendering child Server Components that fetch independent data.
severity: medium
source:
  - title: Vercel React Best Practices
    url: https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/server-parallel-fetching.md
---

# Split Server Components so independent fetches run in parallel

## Rule

Server Components in one tree render in order. When a parent awaits before it renders a child, the child's fetch starts only after the parent's fetch ends. Put each independent fetch in its own component and render the components as siblings.

## Why

- A fetch in a child waits for every await above it. Independent requests then run one after another.
- Siblings render at the same time, so their fetches overlap.

## Exceptions

- The child needs the parent's data to make its request.
- The parent must await first on purpose, for example an auth check or a `notFound()` check that stops the render.
- The parent already starts all requests before it awaits (for example with `Promise.all`).

## Examples

<!-- example:incorrect case="parent-awaits-first" -->

```tsx file="Page.tsx"
export default async function Page() {
  const header = await fetchHeader();
  return (
    <div>
      <div>{header}</div>
      <Sidebar />
    </div>
  );
}

async function Sidebar() {
  const items = await fetchSidebarItems();
  return <nav>{items.map(renderItem)}</nav>;
}
```

<!-- example:correct case="sibling-components" -->

```tsx file="Page.tsx"
async function Header() {
  const data = await fetchHeader();
  return <div>{data}</div>;
}

async function Sidebar() {
  const items = await fetchSidebarItems();
  return <nav>{items.map(renderItem)}</nav>;
}

export default function Page() {
  return (
    <div>
      <Header />
      <Sidebar />
    </div>
  );
}
```

<!-- example:correct case="children-prop" -->

```tsx file="Page.tsx"
function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default function Page() {
  return (
    <Layout>
      <Sidebar />
    </Layout>
  );
}
```

<!-- example:near-miss case="dependent-data" -->

```tsx file="Page.tsx"
export default async function Page() {
  const user = await fetchUser();
  return <Orders userId={user.id} />;
}
```

## Verify

- The files are Server Components.
- A parent awaits, then renders a child that awaits.
- The child's request does not use the parent's result, and the parent's await is not a gate (auth, `notFound()`).
