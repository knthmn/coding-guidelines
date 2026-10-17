---
id: rendering-conditional-render
title: Do not render numbers with the and operator
summary: Use a ternary or a boolean comparison for conditional JSX when the condition can be `0` or `NaN`. The `&&` operator renders those values as text.
applies_when: JSX uses `condition && element` where the condition is a number, such as a count or length, or any value that can be `0` or `NaN`.
severity: medium
source:
  - title: "Vercel React Best Practices"
    url: "https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rendering-conditional-render.md"
---

# Do not render numbers with the and operator

## Rule

When the condition in JSX can be a number, compare it to a boolean (`count > 0`) or use a ternary that returns `null`. Do not use the number itself on the left of `&&`.

## Why

- React renders `0` and `NaN` as text. `{count && <Badge />}` shows "0" when `count` is zero.
- The bug is visible to users and easy to miss, because the code works for every other value.
- Empty strings, `null`, `undefined`, `false` and `true` render nothing, so the bug appears only for numbers.

## Exceptions

- The left side is already a boolean, `null` or `undefined`.
- The left side is a string. An empty string renders nothing.
- The code intends to show the number when it is zero.
- A type check or lint rule already makes the left side boolean.

## Examples

<!-- example:incorrect case="count-and" -->

```tsx file="Badge.tsx"
function Badge({ count }: { count: number }) {
  return <div>{count && <span className="badge">{count}</span>}</div>;
}
```

<!-- example:incorrect case="length-and" -->

```tsx file="MessageList.tsx"
function MessageList({ messages }: { messages: Message[] }) {
  return <div>{messages.length && <List items={messages} />}</div>;
}
```

<!-- example:correct case="explicit-comparison" -->

```tsx file="Badge.tsx"
function Badge({ count }: { count: number }) {
  return <div>{count > 0 ? <span className="badge">{count}</span> : null}</div>;
}
```

<!-- example:near-miss case="boolean-left-side" -->

```tsx file="Badge.tsx"
function Badge({ count }: { count: number }) {
  const hasItems = count > 0;
  return <div>{hasItems && <span className="badge">{count}</span>}</div>;
}
```

## Verify

- The type of the left side includes `number`, or the value can be `NaN`.
- The left side is not already a boolean expression.
