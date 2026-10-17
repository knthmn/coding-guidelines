---
id: client-localstorage-schema
title: Version and minimize data in browser storage
summary: Put a version in each `localStorage` key, store only the fields the UI needs, and wrap every storage call in `try`/`catch`.
applies_when: Code reads or writes `localStorage` or `sessionStorage`.
severity: medium
source:
  - title: Vercel React Best Practices
    url: https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/client-localstorage-schema.md
---

# Version and minimize data in browser storage

## Rule

Add a version to each storage key, store only the fields the UI needs, and wrap reads and writes in `try`/`catch`. Validate what you read before you use it.

## Why

- Stored data outlives the code that wrote it. A key with no version makes a schema change break returning users.
- Storage is readable by any script on the origin. Tokens, personal data and internal flags put there are exposed to cross-site scripting.
- Storage calls throw when the quota is full, when storage is disabled, or in some private browsing modes. An uncaught throw breaks the feature.
- Stored JSON can be old, edited or corrupt, so `JSON.parse` output is not trusted.

## Exceptions

- Throwaway values with no schema, such as a single boolean flag that the code reads with a safe default.
- Data that the code already wraps in a storage helper that versions, validates and catches errors.
- Auth tokens. Do not store them in web storage at all. Use `HttpOnly` cookies where the design allows it.

## Examples

<!-- example:incorrect case="whole-object-no-guard" -->

```ts file="config.ts"
export function saveConfig(user: FullUser) {
  localStorage.setItem("userConfig", JSON.stringify(user));
}

export function loadConfig() {
  return JSON.parse(localStorage.getItem("userConfig")!);
}
```

<!-- example:correct case="versioned-minimal-guarded" -->

```ts file="config.ts"
const KEY = "userConfig:v2";

type Config = { theme: "light" | "dark"; language: string };

export function saveConfig(config: Config) {
  try {
    localStorage.setItem(KEY, JSON.stringify(config));
  } catch {}
}

export function loadConfig(): Config | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const value = JSON.parse(raw);
    return value?.theme && value?.language ? value : null;
  } catch {
    return null;
  }
}
```

<!-- example:near-miss case="simple-flag" -->

```ts file="banner.ts"
export function bannerDismissed() {
  try {
    return localStorage.getItem("banner-dismissed") === "1";
  } catch {
    return false;
  }
}
```

## Verify

- The value is structured data or has a shape that can change.
- The key has no version, the value holds more than the UI needs, or the call has no error handling.
- A shared helper does not already cover these points.
