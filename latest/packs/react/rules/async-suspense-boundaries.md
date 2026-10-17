---
id: async-suspense-boundaries
title: Put data waits behind Suspense boundaries
summary: Do not await data at the top of a page component. Move the wait into the component that needs the data and wrap it in `Suspense`, so the rest of the page renders first.
applies_when: Async Server Components, or components that read promises with `use()` or a Suspense-enabled data library, where a wait blocks a whole page or layout.
severity: medium
source:
  - title: "Vercel React Best Practices"
    url: "https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/async-suspense-boundaries.md"
---

# Put data waits behind Suspense boundaries

## Rule

Wait for data in the component that renders it, and wrap that component in a `<Suspense>` boundary with a fallback. Do not await at the top of a page component when only one section needs the data.

## Why

- An await in a parent blocks everything the parent returns. Sidebar, header and footer wait for data they do not use.
- With a boundary, the server streams the static parts first and the section fills in when its data arrives.
- Users see the first paint sooner.

## Exceptions

- Data that decides the layout or what to render, such as a permission check or a redirect.
- Content that must be in the first HTML for search engines.
- Fast queries where a fallback would flash and add no value.
- Sections whose fallback differs in size from the content. The layout shifts when the content arrives. Size the fallback to match, or do not split.

## Examples

<!-- example:incorrect case="page-awaits-data" -->

```tsx file="Page.tsx"
async function Page() {
  const data = await fetchData();

  return (
    <div>
      <Sidebar />
      <Header />
      <DataDisplay data={data} />
      <Footer />
    </div>
  );
}
```

<!-- example:correct case="boundary-around-data" -->

```tsx file="Page.tsx"
import { Suspense } from "react";

function Page() {
  return (
    <div>
      <Sidebar />
      <Header />
      <Suspense fallback={<Skeleton />}>
        <DataDisplay />
      </Suspense>
      <Footer />
    </div>
  );
}

async function DataDisplay() {
  const data = await fetchData();
  return <div>{data.content}</div>;
}
```

<!-- example:correct case="shared-promise" -->

```tsx file="Page.tsx"
import { Suspense, use } from "react";

function Page() {
  const dataPromise = fetchData();

  return (
    <div>
      <Sidebar />
      <Suspense fallback={<Skeleton />}>
        <DataDisplay dataPromise={dataPromise} />
        <DataSummary dataPromise={dataPromise} />
      </Suspense>
    </div>
  );
}

function DataDisplay({ dataPromise }: { dataPromise: Promise<Data> }) {
  return <div>{use(dataPromise).content}</div>;
}

function DataSummary({ dataPromise }: { dataPromise: Promise<Data> }) {
  return <div>{use(dataPromise).summary}</div>;
}
```

<!-- example:near-miss case="data-decides-layout" -->

```tsx file="Page.tsx"
async function Page() {
  const user = await getUser();
  if (!user) redirect("/login");

  return (
    <div>
      <Header user={user} />
      <Feed />
    </div>
  );
}
```

## Library notes

### React

- Create the promise for `use()` in a Server Component, or in a cache that returns the same promise on each render. A promise created during a Client Component render is new on each render.

## Verify

- The awaited data is used by one section, not by the layout or by a redirect.
- The wrapped section has a fallback that fits its size.
- The project can stream or suspend: Server Components, or a data library with Suspense support.
