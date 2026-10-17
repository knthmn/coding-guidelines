---
id: server-no-shared-module-state
title: Do not keep request data in module-level state on the server
summary: Pass request-scoped data through props, arguments or request context. Do not write it to mutable module variables in code that renders on the server.
applies_when: Code that renders on the server, such as Server Components and components rendered during SSR, that writes to module-level variables.
severity: high
source:
  - title: Vercel React Best Practices
    url: https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/server-no-shared-module-state.md
---

# Do not keep request data in module-level state on the server

## Rule

Treat module scope on the server as memory shared by all requests. Do not store request-scoped or user-specific data in mutable module variables. Pass it down as props or arguments, or use a per-request mechanism.

## Why

- Server renders can overlap in one process. A second request can overwrite the variable before the first render reads it.
- The result is one user's data in another user's response.
- The bug depends on timing. It rarely shows up in local testing.

## Exceptions

- Immutable data loaded once, such as static assets or config.
- Caches that are meant to be shared across requests and are keyed correctly.
- Singletons that hold no request-specific or user-specific mutable data.

## Examples

<!-- example:incorrect case="module-variable" -->

```tsx file="Page.tsx"
let currentUser: User | null = null;

export default async function Page() {
  currentUser = await auth();
  return <Dashboard />;
}

async function Dashboard() {
  return <div>{currentUser?.name}</div>;
}
```

<!-- example:correct case="pass-as-prop" -->

```tsx file="Page.tsx"
export default async function Page() {
  const user = await auth();
  return <Dashboard user={user} />;
}

function Dashboard({ user }: { user: User | null }) {
  return <div>{user?.name}</div>;
}
```

<!-- example:near-miss case="immutable-module-data" -->

```tsx file="Footer.tsx"
const links = Object.freeze([
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
]);

export function Footer() {
  return links.map((link) => (
    <a key={link.href} href={link.href}>
      {link.label}
    </a>
  ));
}
```

## Verify

- The variable is declared at module scope and is mutable.
- Code that renders on the server writes to it, and code that renders later reads it.
- The value depends on the request or the user. Config and static data do not count.
