---
id: rerender-memo-with-default-value
title: Hoist non-primitive default props of memoized components
summary: Give optional object, array or function props of a memoized component a module-level constant as default, not an inline literal, so memo comparison keeps working.
applies_when: Components wrapped in `memo` whose destructured props have a default value that is an object, array or function.
severity: low
source:
  - {
      title: "Vercel React Best Practices",
      url: "https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rerender-memo-with-default-value.md",
    }
---

# Hoist non-primitive default props of memoized components

## Rule

When a memoized component has an optional non-primitive prop with a default, define the default once at module level and use that constant.

## Why

- An inline default such as `() => {}` or `[]` creates a new value on each render of the component.
- `memo` compares props with strict equality. A new default value is a different value, so the memoization has no effect on later renders of that component.

## Exceptions

- The project uses the React Compiler. It handles this, so the hoist is not needed.
- Primitive defaults, such as `0`, `""` or `false`. They compare equal.
- The component is not wrapped in `memo`.

## Examples

<!-- example:incorrect case="inline-default" -->

```tsx file="UserAvatar.tsx"
const UserAvatar = memo(function UserAvatar({ onClick = () => {} }: { onClick?: () => void }) {
  return <Avatar onClick={onClick} />;
});
```

<!-- example:correct case="hoisted-default" -->

```tsx file="UserAvatar.tsx"
const NOOP = () => {};

const UserAvatar = memo(function UserAvatar({ onClick = NOOP }: { onClick?: () => void }) {
  return <Avatar onClick={onClick} />;
});
```

<!-- example:near-miss case="primitive-default" -->

```tsx file="UserAvatar.tsx"
const UserAvatar = memo(function UserAvatar({ size = 32 }: { size?: number }) {
  return <Avatar size={size} />;
});
```

## Library notes

### React Compiler

With the compiler enabled, do not report inline defaults.

## Verify

- The component is wrapped in `memo`.
- The default is an object, array or function literal written inline.
- The project does not use the React Compiler.
