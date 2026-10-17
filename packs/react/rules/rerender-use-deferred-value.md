---
id: rerender-use-deferred-value
title: Use useDeferredValue for costly renders driven by input
summary: When typing or another input drives a costly render, pass a deferred copy of the value to the costly part so the input stays responsive.
applies_when: A controlled input value filters a large list or feeds a costly chart or view in the same render as the input.
severity: low
source:
  - {
      title: "Vercel React Best Practices",
      url: "https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rerender-use-deferred-value.md",
    }
---

# Use useDeferredValue for costly renders driven by input

## Rule

When an input value drives a costly computation or render, give the costly part `useDeferredValue(value)`. Keep the input bound to the real value.

## Why

- The input updates first. React renders the costly part later with the new value, and can drop outdated renders.
- Without it, each keystroke waits for the costly render, and the input lags.

## Exceptions

- The work is cheap. The deferral adds a second render.
- The costly part is not memoized and still runs on each render. Wrap it in `useMemo` or `memo` with the deferred value, or the deferral has no effect.
- The costly work happens in a request. Debounce the input or use a query library, since `useDeferredValue` does not reduce network calls.
- The result must match the input at once, for example validation feedback.

## Examples

<!-- example:incorrect case="filter-on-each-keystroke" -->

```tsx file="Search.tsx"
function Search({ items }: { items: Item[] }) {
  const [query, setQuery] = useState("");
  const filtered = items.filter((item) => fuzzyMatch(item, query));

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ResultsList results={filtered} />
    </>
  );
}
```

<!-- example:correct case="deferred-query" -->

```tsx file="Search.tsx"
function Search({ items }: { items: Item[] }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const filtered = useMemo(
    () => items.filter((item) => fuzzyMatch(item, deferredQuery)),
    [items, deferredQuery],
  );
  const isStale = query !== deferredQuery;

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <div style={{ opacity: isStale ? 0.7 : 1 }}>
        <ResultsList results={filtered} />
      </div>
    </>
  );
}
```

<!-- example:near-miss case="small-list" -->

```tsx file="CountrySelect.tsx"
function CountrySelect({ countries }: { countries: Country[] }) {
  const [query, setQuery] = useState("");
  const matches = countries.filter((c) => c.name.startsWith(query));

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {matches.map((c) => (
          <li key={c.code}>{c.name}</li>
        ))}
      </ul>
    </>
  );
}
```

## Library notes

### React

See [useDeferredValue](https://react.dev/reference/react/useDeferredValue) in the React docs.

## Verify

- The list or view is large or slow enough to delay typing. Look for evidence, such as list size or a known slow component.
- The costly part uses the deferred value and is memoized.
