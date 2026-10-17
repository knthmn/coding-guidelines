---
id: bundle-analyzable-paths
title: Use statically analyzable import paths
summary: Import modules through literal paths or an explicit map of loaders, so the bundler can see the full set of reachable files.
applies_when: Code builds a module path or file path from a variable, for dynamic import or build-time file access.
severity: low
source:
  - title: Vercel React Best Practices
    url: https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/bundle-analyzable-paths.md
---

# Use statically analyzable import paths

## Rule

Write module paths as literals. When the module depends on a runtime value, map each allowed value to its own `import()` call instead of building the path from the value.

## Why

- A bundler cannot resolve a path held in a variable. It must include every file that might match, warn, or leave the import unresolved.
- Broad matches grow the bundle and slow the build.
- An explicit map documents which modules can load and fails at compile time when one is removed.

## Exceptions

- Template paths with a fixed directory and extension, such as ``import(`./locales/${lang}.js`)``, when the bundler supports them and every match is meant to ship.
- Tooling that has no bundler, such as a Node script that reads files at runtime.
- `import.meta.glob` or an equivalent bundler API that states the set of files explicitly.

## Examples

<!-- example:incorrect case="variable-path" -->

```ts file="loadPage.ts"
const PAGE_PATHS = {
  home: "./pages/home",
  settings: "./pages/settings",
} as const;

export async function loadPage(name: keyof typeof PAGE_PATHS) {
  return import(PAGE_PATHS[name]);
}
```

<!-- example:correct case="loader-map" -->

```ts file="loadPage.ts"
const PAGE_LOADERS = {
  home: () => import("./pages/home"),
  settings: () => import("./pages/settings"),
} as const;

export function loadPage(name: keyof typeof PAGE_LOADERS) {
  return PAGE_LOADERS[name]();
}
```

<!-- example:near-miss case="fixed-directory-template" -->

```ts file="loadLocale.ts"
export async function loadLocale(lang: "en" | "de" | "fr") {
  return import(`./locales/${lang}.json`);
}
```

## Library notes

### Vite

- `import.meta.glob("./pages/*.tsx")` returns a map of loaders for all matching files. Use it when the set of files is large.
- Dynamic import variables must start with `./`, `../` or `#`, end with a file extension, and name a file pattern when they import from the own directory. Variables match one directory level only.

### Next.js

- Server code that builds file paths from variables, such as `path.join(process.cwd(), dir)`, can widen output file tracing. Spell out each final path.

## Verify

- The argument of `import()` or the path passed to a file API is built from a variable.
- The set of possible values is known and small enough to list.
- The bundler cannot narrow the pattern to a fixed directory and extension.
