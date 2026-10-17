---
id: rendering-usetransition-loading
title: Use useTransition for pending state of async updates
summary: Use `useTransition` and its `isPending` flag for loading state of an async update, instead of a manual `useState` boolean that you set before and after the work.
applies_when: An event handler sets a loading boolean to true, awaits async work, then sets it to false, and the result updates state.
severity: low
source:
  - title: "Vercel React Best Practices"
    url: "https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rendering-usetransition-loading.md"
---

# Use useTransition for pending state of async updates

## Rule

When a handler runs async work and then updates state, run it inside `startTransition` and read `isPending` from `useTransition`. Do not keep a separate `useState` loading flag.

## Why

- The manual flag needs two updates around the await, and it stays `true` if the code throws before the reset.
- `isPending` turns on when the transition starts and off when it ends, even if the work throws.
- Urgent updates, such as the text of an input, stay responsive while the transition runs.

## Exceptions

- The loading state is not tied to a state update, for example a flag used by non-React code.
- You need to tell apart several kinds of loading, with a different flag for each.
- You need the error state. A transition does not catch errors. Use an error boundary or handle the error in the action.
- React older than 19 has no async transitions.

## Examples

<!-- example:incorrect case="manual-flag" -->

```tsx file="SearchResults.tsx"
function SearchResults() {
  const [results, setResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (value: string) => {
    setIsLoading(true);
    const data = await fetchResults(value);
    setResults(data);
    setIsLoading(false);
  };

  return (
    <>
      <input onChange={(e) => handleSearch(e.target.value)} />
      {isLoading && <Spinner />}
      <ResultsList results={results} />
    </>
  );
}
```

<!-- example:correct case="use-transition" -->

```tsx file="SearchResults.tsx"
import { startTransition, useState, useTransition } from "react";

function SearchResults() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [isPending, startSearch] = useTransition();

  const handleSearch = (value: string) => {
    setQuery(value);
    startSearch(async () => {
      const data = await fetchResults(value);
      startTransition(() => setResults(data));
    });
  };

  return (
    <>
      <input value={query} onChange={(e) => handleSearch(e.target.value)} />
      {isPending && <Spinner />}
      <ResultsList results={results} />
    </>
  );
}
```

<!-- example:near-miss case="flag-for-external-code" -->

```tsx file="UploadButton.tsx"
function UploadButton({ file }: { file: File }) {
  const [uploading, setUploading] = useState(false);

  const handleClick = () => {
    setUploading(true);
    uploader.start(file, { onDone: () => setUploading(false) });
  };

  return (
    <button disabled={uploading} onClick={handleClick}>
      Upload
    </button>
  );
}
```

## Library notes

### React

- Async functions in `startTransition` need React 19.
- State updates after an `await` inside the transition are not marked as transitions. Wrap them in another `startTransition`, as in the example. React lists this as a known limitation.

## Verify

- The loading flag exists only to cover an awaited update to React state.
- No other code reads the flag.
- The project uses React 19 or later.
