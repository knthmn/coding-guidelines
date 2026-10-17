---
id: rendering-hydration-suppress-warning
title: Suppress hydration warnings only for expected mismatches
summary: Add `suppressHydrationWarning` to one small element when its content differs between server and client by design, such as a timestamp. Do not use it to hide real mismatches.
applies_when: Server-rendered React code renders values that differ between server and client by design, such as the current time, locale or time zone formatting, or random values.
severity: low
source:
  - title: "Vercel React Best Practices"
    url: "https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rendering-hydration-suppress-warning.md"
---

# Suppress hydration warnings only for expected mismatches

## Rule

When a value differs between server and client by design, put `suppressHydrationWarning` on the smallest element that holds the value. Use it only for that case.

## Why

- Times, locale formats, time zones and random values can never match between server and client. The warnings add noise and hide real problems.
- The prop works one level deep. It covers the element's own attributes and text, not its children.
- A broad use hides real bugs that cause mismatches.

## Exceptions

- Do not use it when the mismatch is a bug, for example browser-only data read during render. Fix the cause, see `rendering-hydration-no-flicker`.
- Do not use it on a parent that wraps large trees.
- If the value can be the same on both sides, make it the same. For example, format with a fixed locale and time zone, or pass the server time as a prop.

## Examples

<!-- example:incorrect case="no-suppression" -->

```tsx file="Timestamp.tsx"
function Timestamp() {
  return <span>{new Date().toLocaleString()}</span>;
}
```

<!-- example:correct case="suppress-leaf" -->

```tsx file="Timestamp.tsx"
function Timestamp() {
  return <span suppressHydrationWarning>{new Date().toLocaleString()}</span>;
}
```

<!-- example:incorrect case="suppress-wrapper" -->

```tsx file="Dashboard.tsx"
function Dashboard({ user }: { user: User }) {
  return (
    <main suppressHydrationWarning>
      <Header user={user} />
      <Timestamp />
      <Feed />
    </main>
  );
}
```

<!-- example:near-miss case="same-output-on-both-sides" -->

```tsx file="Timestamp.tsx"
function Timestamp({ iso }: { iso: string }) {
  return <time dateTime={iso}>{formatDate(iso, "en-GB", "UTC")}</time>;
}
```

## Library notes

### React

- `suppressHydrationWarning` is a prop on DOM elements. React calls it an escape hatch.

### SSR frameworks

- The rule applies to any framework that server-renders React, such as Next.js or TanStack Start.

## Verify

- The value differs by design and cannot be made equal on both sides.
- The prop sits on the element that holds the value, not on a parent of many elements.
- The mismatch is not a bug that has another fix.
