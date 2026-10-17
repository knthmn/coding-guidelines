---
id: rerender-memo
title: Extract costly work into memoized components
summary: Move costly computation into a memoized child component, so the parent can return early, for example while loading, without doing the work.
applies_when: Components that compute a costly value with `useMemo` before an early return, or re-render often with props that rarely change.
severity: low
source:
  - {
      title: "Vercel React Best Practices",
      url: "https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rerender-memo.md",
    }
---

# Extract costly work into memoized components

## Rule

Put costly computation in its own component wrapped in `memo`. Render that component after the early returns of the parent.

## Why

- Hooks run before an early return. A `useMemo` in the parent computes its value even when the parent returns a skeleton.
- A child component renders only when it is reached, and `memo` skips it when its props are equal.

## Exceptions

- The project uses the React Compiler. It memoizes automatically, so manual `memo` and `useMemo` are not needed.
- The computation is cheap. Memoization then costs more than it saves.
- The early-return path is rare, so the saving is small.
- The props change on every render, so `memo` never skips.

## Examples

<!-- example:incorrect case="memo-before-early-return" -->

```tsx file="Profile.tsx"
function Profile({ user, loading }: Props) {
  const avatar = useMemo(() => {
    const id = computeAvatarId(user);
    return <Avatar id={id} />;
  }, [user]);

  if (loading) return <Skeleton />;
  return <div>{avatar}</div>;
}
```

<!-- example:correct case="memoized-child" -->

```tsx file="Profile.tsx"
const UserAvatar = memo(function UserAvatar({ user }: { user: User }) {
  const id = useMemo(() => computeAvatarId(user), [user]);
  return <Avatar id={id} />;
});

function Profile({ user, loading }: Props) {
  if (loading) return <Skeleton />;
  return (
    <div>
      <UserAvatar user={user} />
    </div>
  );
}
```

<!-- example:near-miss case="cheap-work" -->

```tsx file="Profile.tsx"
function Profile({ user, loading }: Props) {
  const initials = user.name.slice(0, 2);

  if (loading) return <Skeleton />;
  return <Avatar initials={initials} />;
}
```

## Library notes

### React Compiler

With the compiler enabled, do not report missing `memo` or `useMemo`.

## Verify

- The project does not use the React Compiler.
- The computation is costly, and a hook runs it before an early return.
