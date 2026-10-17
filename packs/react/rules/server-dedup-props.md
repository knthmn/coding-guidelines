---
id: server-dedup-props
title: Do not pass derived copies of a prop from a Server Component
summary: Pass the data once from a Server Component to a Client Component. Sort, filter or pick fields in the Client Component, so the same data is not serialized twice.
applies_when: React Server Components that pass props to Client Components and send both a value and a copy derived from it.
severity: low
source:
  - title: Vercel React Best Practices
    url: https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/server-dedup-props.md
---

# Do not pass derived copies of a prop from a Server Component

## Rule

Pass a value to a Client Component once. Do the derivation (sort, filter, pick a field) in the Client Component.

## Why

- Serialization at the server and client boundary deduplicates by object reference, not by value.
- `toSorted()`, `filter()`, `map()`, `slice()`, spread and `structuredClone()` create new references. The copy is serialized again.
- Arrays of strings, numbers or booleans are duplicated in full. For arrays of objects, only the array is duplicated, because the nested objects keep their reference.

## Exceptions

- The derivation is expensive and the client should not repeat it.
- The client does not need the original. Pass only the derived value.

## Examples

<!-- example:incorrect case="derived-copy" -->

```tsx file="Page.tsx"
async function Page() {
  const usernames = await fetchUsernames();
  return <ClientList usernames={usernames} usernamesOrdered={usernames.toSorted()} />;
}
```

<!-- example:correct case="derive-in-client" -->

```tsx file="Page.tsx"
async function Page() {
  const usernames = await fetchUsernames();
  return <ClientList usernames={usernames} />;
}
```

```tsx file="ClientList.tsx"
"use client";

export function ClientList({ usernames }: { usernames: string[] }) {
  const sorted = useMemo(() => [...usernames].sort(), [usernames]);
  return <List items={sorted} />;
}
```

<!-- example:near-miss case="only-derived-needed" -->

```tsx file="Page.tsx"
async function Page() {
  const usernames = await fetchUsernames();
  return <ClientList usernames={usernames.toSorted()} />;
}
```

## Verify

- The component is a Server Component and the receiver is a Client Component.
- One JSX element receives a value and a copy derived from it, or two values that share data.
- The client needs the original. If it needs only the derived value, the code is correct.
