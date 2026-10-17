---
id: bundle-defer-third-party
title: Load non-critical third-party code after the page is interactive
summary: Load analytics, logging and error tracking scripts after first render or at idle time, so they do not compete with the code that makes the page usable.
applies_when: The frontend loads analytics, tracking, chat widgets, error reporting or similar third-party code that the first interaction does not need.
severity: low
source:
  - title: Vercel React Best Practices
    url: https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/bundle-defer-third-party.md
---

# Load non-critical third-party code after the page is interactive

## Rule

Do not put analytics, tracking, chat widgets or similar scripts in the entry bundle or in a blocking script tag. Load them after the page is interactive, with a dynamic import or a script that uses `async` or `defer`.

## Why

- These scripts do not help the user's first interaction, but they take download time and main thread time from it.
- Third-party code is outside the project's control, so its size and speed can change without a release.

## Exceptions

- Error reporting that must catch errors during startup. Load a small bootstrap early and the rest later.
- Consent or A/B testing scripts that must run before the first paint to avoid a visible change.
- Scripts that the page needs to work, such as a payment widget on a checkout page.

## Examples

<!-- example:incorrect case="entry-import" -->

```ts file="main.ts"
import { initAnalytics } from "./analytics";

initAnalytics();
renderApp();
```

<!-- example:correct case="load-after-start" -->

```ts file="main.ts"
renderApp();

window.addEventListener("load", () => {
  void import("./analytics").then(({ initAnalytics }) => initAnalytics());
});
```

<!-- example:near-miss case="early-error-reporter" -->

```ts file="main.ts"
import { initErrorReporter } from "./errorReporter";

initErrorReporter();
renderApp();
```

## Library notes

### Next.js

- `next/script` with `strategy="afterInteractive"` or `"lazyOnload"` controls when a script loads.
- `next/dynamic` with `ssr: false` defers a client-only component.

## Verify

- The code is third-party or serves only measurement or support.
- Nothing in the first interaction depends on it.
- It loads in the entry bundle or in a blocking script tag.
