---
id: rerender-functional-setstate
title: Use functional state updates
summary: When the next state depends on the current state, pass an updater function to the setter instead of reading the state variable. This avoids stale closures and extra dependencies.
applies_when: State setters called with a value built from the same state variable, especially inside `useCallback`, effects, timers or async code.
severity: medium
source:
  - {
      title: "Vercel React Best Practices",
      url: "https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rerender-functional-setstate.md",
    }
---

# Use functional state updates

## Rule

When the new state depends on the previous state, call the setter with an updater function, such as `setItems((curr) => ...)`. Do not read the state variable from the closure.

## Why

- A closure holds the state from the render that created it. Async code, timers and memoized callbacks can use an old value.
- Callbacks that do not read the state variable need no dependency on it, so their identity stays stable.
- A missing dependency in a memoized callback causes a stale-state bug that is hard to see.

## Exceptions

- The new value does not depend on the previous state, for example `setCount(0)` or `setName(input)`.
- The value to set comes from a different state or from props, and the closure is current for the use.
- The updater would need side effects. Updaters must be pure.

## Examples

<!-- example:incorrect case="closure-state" -->

```tsx file="TodoList.tsx"
function TodoList() {
  const [items, setItems] = useState(initialItems);

  const addItems = useCallback((newItems: Item[]) => setItems([...items, ...newItems]), [items]);

  const removeItem = useCallback(
    (id: string) => setItems(items.filter((item) => item.id !== id)),
    [],
  );

  return <ItemsEditor items={items} onAdd={addItems} onRemove={removeItem} />;
}
```

<!-- example:correct case="updater-function" -->

```tsx file="TodoList.tsx"
function TodoList() {
  const [items, setItems] = useState(initialItems);

  const addItems = useCallback(
    (newItems: Item[]) => setItems((curr) => [...curr, ...newItems]),
    [],
  );

  const removeItem = useCallback(
    (id: string) => setItems((curr) => curr.filter((item) => item.id !== id)),
    [],
  );

  return <ItemsEditor items={items} onAdd={addItems} onRemove={removeItem} />;
}
```

<!-- example:near-miss case="static-value" -->

```tsx file="Counter.tsx"
const reset = () => setCount(0);
const rename = (next: string) => setName(next);
```

## Library notes

### React Compiler

The compiler can stabilize some callbacks. It does not fix a stale closure bug in an async callback, so keep functional updates for correctness.

## Verify

- The setter argument is built from the same state variable that the setter updates.
- The call runs in a callback, timer, effect or async code where the closure can be old, or the callback is memoized.
