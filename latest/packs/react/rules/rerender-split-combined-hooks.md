---
id: rerender-split-combined-hooks
title: Split combined hook computations
summary: Split a `useMemo` or `useEffect` that does several independent tasks into one hook per task, so each task re-runs only when its own dependencies change.
applies_when: "`useMemo`, `useCallback` or `useEffect` hooks with a long dependency array whose steps use different subsets of the dependencies."
severity: low
source:
  - {
      title: "Vercel React Best Practices",
      url: "https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rerender-split-combined-hooks.md",
    }
---

# Split combined hook computations

## Rule

When one hook holds independent tasks that depend on different values, give each task its own hook with its own dependency array.

## Why

- A combined hook re-runs every task when any dependency changes, even for tasks that do not use that value.
- For effects, unrelated side effects run again for unrelated reasons, such as a page view tracked again when only the title changes.

## Exceptions

- The steps depend on the same values. Splitting adds code with no gain.
- A step needs the result of an earlier step and the split would add a costly intermediate value.
- Effects that must run together, in order, as one operation.
- The project uses the React Compiler for memos. It tracks dependencies itself. Effects still need to be split by hand.

## Examples

<!-- example:incorrect case="combined-memo" -->

```tsx file="ProductList.tsx"
const sortedProducts = useMemo(() => {
  const filtered = products.filter((p) => p.category === category);
  return filtered.toSorted((a, b) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price));
}, [products, category, sortOrder]);
```

<!-- example:correct case="split-memo" -->

```tsx file="ProductList.tsx"
const filteredProducts = useMemo(
  () => products.filter((p) => p.category === category),
  [products, category],
);

const sortedProducts = useMemo(
  () =>
    filteredProducts.toSorted((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price,
    ),
  [filteredProducts, sortOrder],
);
```

<!-- example:incorrect case="combined-effect" -->

```tsx file="Page.tsx"
useEffect(() => {
  analytics.trackPageView(pathname);
  document.title = `${pageTitle} | My App`;
}, [pathname, pageTitle]);
```

<!-- example:correct case="split-effects" -->

```tsx file="Page.tsx"
useEffect(() => {
  analytics.trackPageView(pathname);
}, [pathname]);

useEffect(() => {
  document.title = `${pageTitle} | My App`;
}, [pageTitle]);
```

<!-- example:near-miss case="same-dependencies" -->

```tsx file="Chart.tsx"
useEffect(() => {
  chart.setWidth(width);
  chart.setHeight(height);
}, [chart, width, height]);
```

## Library notes

### React Compiler

The compiler tracks memo dependencies per value. Do not report combined `useMemo` hooks. Report combined effects when the tasks are unrelated.

## Verify

- The hook holds steps that use different subsets of its dependencies.
- The steps are independent, or the first step can be a separate hook.
