---
id: server-serialization
title: Pass only the fields a Client Component uses
summary: Do not pass a whole record from a Server Component to a Client Component. Pass the fields the client reads, because all passed data is serialized into the response.
applies_when: React Server Components that pass objects with many fields as props to Client Components that use only a few of them.
severity: medium
source:
  - title: Vercel React Best Practices
    url: https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/server-serialization.md
---

# Pass only the fields a Client Component uses

## Rule

At the Server to Client Component boundary, pass the fields the client reads. Do not pass the whole object.

## Why

- Props of a Client Component are serialized into the HTML and into later RSC responses.
- Unused fields add to the page weight and the load time.

## Exceptions

- The client reads most of the fields.
- The client needs the whole object, for example to send it back unchanged.

## Examples

<!-- example:incorrect case="whole-record" -->

```tsx file="Page.tsx"
async function Page() {
  const user = await fetchUser();
  return <Profile user={user} />;
}
```

```tsx file="Profile.tsx"
"use client";

export function Profile({ user }: { user: User }) {
  return <div>{user.name}</div>;
}
```

<!-- example:correct case="needed-field" -->

```tsx file="Page.tsx"
async function Page() {
  const user = await fetchUser();
  return <Profile name={user.name} />;
}
```

```tsx file="Profile.tsx"
"use client";

export function Profile({ name }: { name: string }) {
  return <div>{name}</div>;
}
```

<!-- example:near-miss case="most-fields-used" -->

```tsx file="Profile.tsx"
"use client";

export function Profile({ user }: { user: { name: string; email: string; bio: string } }) {
  return (
    <section>
      <h1>{user.name}</h1>
      <a href={`mailto:${user.email}`}>{user.email}</a>
      <p>{user.bio}</p>
    </section>
  );
}
```

## Verify

- The receiving component is a Client Component, and the sender is a Server Component.
- The object has many fields and the client reads few. Count the fields the client reads, including those passed on to its children.
