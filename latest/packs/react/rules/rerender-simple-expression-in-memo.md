---
id: rerender-simple-expression-in-memo
title: Do not memoize simple primitive expressions
summary: Do not wrap a cheap expression that returns a boolean, number or string in `useMemo`. The hook and its dependency check can cost more than the expression.
applies_when: "`useMemo` calls whose body is a short logical or arithmetic expression with a primitive result."
severity: low
source:
  - {
      title: "Vercel React Best Practices",
      url: "https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rerender-simple-expression-in-memo.md",
    }
---

# Do not memoize simple primitive expressions

## Rule

Compute a simple expression with a primitive result directly in render. Do not wrap it in `useMemo`.

## Why

- `useMemo` stores the value and compares dependencies on every render. For a few operators this costs more than the expression.
- A primitive result compares equal by value, so downstream code does not need a stable reference.
- The dependency array adds code and a chance for mistakes.

## Exceptions

- The expression is costly, for example it loops over a large collection or calls an expensive function.
- The result is an object, array or function that must keep its identity.
- The project uses the React Compiler. It decides memoization, so manual hooks are not needed either way.

## Examples

<!-- example:incorrect case="memoized-boolean" -->

```tsx file="Header.tsx"
function Header({ user, notifications }: Props) {
  const isLoading = useMemo(() => {
    return user.isLoading || notifications.isLoading;
  }, [user.isLoading, notifications.isLoading]);

  if (isLoading) return <Skeleton />;
  return <HeaderBar user={user} />;
}
```

<!-- example:correct case="plain-expression" -->

```tsx file="Header.tsx"
function Header({ user, notifications }: Props) {
  const isLoading = user.isLoading || notifications.isLoading;

  if (isLoading) return <Skeleton />;
  return <HeaderBar user={user} />;
}
```

<!-- example:near-miss case="costly-primitive" -->

```tsx file="Cart.tsx"
function Cart({ items }: { items: CartItem[] }) {
  const total = useMemo(() => items.reduce((sum, item) => sum + priceWithTax(item), 0), [items]);

  return <Total value={total} />;
}
```

## Verify

- The `useMemo` body is a short expression with a primitive result.
- It has no loop and no costly call.
