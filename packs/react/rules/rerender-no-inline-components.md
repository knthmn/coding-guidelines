---
id: rerender-no-inline-components
title: Do not define components inside components
summary: Declare components at module level and pass data as props. A component defined inside another component is a new type on each render, so React remounts it.
applies_when: Component functions or arrow functions declared inside the body of another component and used as JSX elements.
severity: high
source:
  - {
      title: "Vercel React Best Practices",
      url: "https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rerender-no-inline-components.md",
    }
---

# Do not define components inside components

## Rule

Declare each component at module level. Pass the values it needs as props.

## Why

- A component declared in a render body is a new function on every render. React treats it as a new type, unmounts the old instance and mounts a new one.
- Remounting destroys state and DOM. Symptoms: inputs lose focus on each keystroke, animations restart, effects re-run, scroll position resets.

## Exceptions

- A function that returns JSX but is called as a function, such as `renderRow(item)`, and not used as `<Row />`. It is not a component type.
- A component created once per instance with a stable identity, for example inside `useMemo` with a stable dependency list. This is rare. Prefer module level.
- Test or story files that define throwaway components.

## Examples

<!-- example:incorrect case="nested-component" -->

```tsx file="UserProfile.tsx"
function UserProfile({ user, theme }: Props) {
  const Avatar = () => (
    <img src={user.avatarUrl} className={theme === "dark" ? "avatar-dark" : "avatar-light"} />
  );

  return (
    <div>
      <Avatar />
    </div>
  );
}
```

<!-- example:correct case="module-level-component" -->

```tsx file="UserProfile.tsx"
function Avatar({ src, theme }: { src: string; theme: string }) {
  return <img src={src} className={theme === "dark" ? "avatar-dark" : "avatar-light"} />;
}

function UserProfile({ user, theme }: Props) {
  return (
    <div>
      <Avatar src={user.avatarUrl} theme={theme} />
    </div>
  );
}
```

<!-- example:near-miss case="render-helper-called-as-function" -->

```tsx file="UserList.tsx"
function UserList({ users }: { users: User[] }) {
  const renderRow = (user: User) => <li key={user.id}>{user.name}</li>;

  return <ul>{users.map(renderRow)}</ul>;
}
```

## Verify

- The inner function is used as a JSX element type (`<Name />`) or passed as a component prop.
- It is declared inside the render body of another component.
