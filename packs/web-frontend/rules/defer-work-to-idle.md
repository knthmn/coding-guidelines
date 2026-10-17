---
id: defer-work-to-idle
title: Run non-urgent work at idle time
summary: Schedule analytics, cache writes and prefetching with `requestIdleCallback`, and fall back to `setTimeout` where it is missing, such as in Safari.
applies_when: An event handler or startup path runs work that the user does not wait for, such as analytics, storage writes, prefetching or background processing.
severity: low
source:
  - title: Vercel React Best Practices
    url: https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/js-request-idle-callback.md
---

# Run non-urgent work at idle time

## Rule

Schedule work that the user does not wait for with `requestIdleCallback`. Use a fallback such as `setTimeout` in browsers that lack it. Pass a `timeout` when the work must run within a bounded time.

## Why

- Work that runs in the event handler delays the next frame and the response to the next input.
- Idle callbacks run when the main thread has no other work, so interaction and animation stay smooth.

## Exceptions

- Work the user waits for, such as the result of an action.
- Time-sensitive work, such as sending data on page exit. Use `visibilitychange` with `navigator.sendBeacon` or `fetch` with `keepalive`.
- Work that is already cheap, such as one small write.
- Pages that stay in a background tab. Idle callbacks can be delayed there, so give them a `timeout` if the result matters.

## Examples

<!-- example:incorrect case="all-in-handler" -->

```ts file="search.ts"
export function handleSearch(query: string) {
  renderResults(searchItems(query));
  analytics.track("search", { query });
  saveRecentSearch(query);
}
```

<!-- example:correct case="idle-with-fallback" -->

```ts file="idle.ts"
export function runWhenIdle(task: () => void, timeout = 2000) {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(task, { timeout });
  } else {
    setTimeout(task, 1);
  }
}
```

```ts file="search.ts"
import { runWhenIdle } from "./idle";

export function handleSearch(query: string) {
  renderResults(searchItems(query));
  runWhenIdle(() => analytics.track("search", { query }));
  runWhenIdle(() => saveRecentSearch(query));
}
```

<!-- example:near-miss case="user-waits" -->

```ts file="filter.ts"
export function handleFilter(query: string) {
  renderResults(searchItems(query));
}
```

## Library notes

### Safari

- Safari does not ship `requestIdleCallback` by default. It is behind a preference in Safari preview builds. Chrome and Firefox support it.
- The `setTimeout` fallback does not know about idle time. For long tasks, split the work into small chunks and yield between them.

## Verify

- The work is not needed for the user's next visible result.
- The call is not wrapped in a fallback and the code targets Safari.
- No page exit or timing guarantee depends on the work.
