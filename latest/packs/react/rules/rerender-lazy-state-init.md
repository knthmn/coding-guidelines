---
id: rerender-lazy-state-init
title: Use lazy state initialization
summary: Pass a function to `useState` when the initial value is costly to compute, so the work runs once instead of on every render.
applies_when: "`useState` or `useReducer` calls whose initial value comes from a function call that parses, builds or reads data, such as `localStorage`, indexes or maps."
severity: low
source:
  - {
      title: "Vercel React Best Practices",
      url: "https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rerender-lazy-state-init.md",
    }
---

# Use lazy state initialization

## Rule

When the initial state needs real work, pass an initializer function to `useState`: `useState(() => compute())`. Do not call `compute()` directly in the argument.

## Why

- React ignores the initial value after the first render, but a direct call still runs on every render.
- Storage reads, JSON parsing and index building make that waste visible.

## Exceptions

- Cheap initial values: primitives, literals such as `{}` or `[]`, and plain prop references such as `useState(props.value)`.
- A call that returns an existing value without work, for example a cached lookup.

## Examples

<!-- example:incorrect case="direct-call" -->

```tsx file="FilteredList.tsx"
function FilteredList({ items }: { items: Item[] }) {
  const [searchIndex] = useState(buildSearchIndex(items));
  const [settings] = useState(JSON.parse(localStorage.getItem("settings") ?? "{}"));
  return <SearchResults index={searchIndex} settings={settings} />;
}
```

<!-- example:correct case="initializer-function" -->

```tsx file="FilteredList.tsx"
function FilteredList({ items }: { items: Item[] }) {
  const [searchIndex] = useState(() => buildSearchIndex(items));
  const [settings] = useState(() => {
    const stored = localStorage.getItem("settings");
    return stored ? JSON.parse(stored) : {};
  });
  return <SearchResults index={searchIndex} settings={settings} />;
}
```

<!-- example:near-miss case="cheap-initial-value" -->

```tsx file="Counter.tsx"
function Counter({ start }: { start: number }) {
  const [count, setCount] = useState(start);
  const [filters, setFilters] = useState({});
  return <CounterView count={count} filters={filters} onChange={setCount} />;
}
```

## Verify

- The argument of `useState` is a call, not a function.
- The call does real work, such as parsing, storage access, DOM reads or building a collection.
