---
id: bundle-barrel-imports
title: Avoid large barrel files in dev, SSR and untree-shakable packages
summary: Import from the specific module when a barrel file re-exports many modules and the toolchain cannot drop the unused ones, such as dev servers, tests, CommonJS packages or packages with side effects.
applies_when: Code imports from a barrel file (an index that re-exports many modules), from a package or from the project's own source.
severity: low
source:
  - title: Vercel React Best Practices
    url: https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/bundle-barrel-imports.md
---

# Avoid large barrel files in dev, SSR and untree-shakable packages

## Rule

Import from the specific module when the barrel file re-exports hundreds of modules and the toolchain still has to load them all. Production builds with Rollup, Rolldown, esbuild or webpack usually tree-shake barrels, so do not report barrel imports that only affect the production bundle of an ES module package marked side-effect free.

## Why

- Modern bundlers remove unused re-exports in production when the package ships ES modules and declares `"sideEffects": false`. The old claim that barrels always bloat the bundle no longer holds.
- Cost remains where nothing is tree-shaken: dev servers that serve source modules one by one, test runners, and server code that loads dependencies unbundled. Each import evaluates the whole barrel.
- A package that is CommonJS or has side effects keeps every module it re-exports.
- Large icon and component libraries can re-export thousands of modules, so the import cost is high before any tree-shaking.

## Exceptions

- Small barrels, such as a feature folder that exports a few modules.
- ES module packages that declare `"sideEffects": false`, when the only concern is the production bundle size.
- Packages that pre-bundle or optimize their dependencies automatically, such as Vite for packages in `node_modules` during dev. The project's own barrels are not covered.
- Libraries with no per-module entry points, or whose subpath imports have no type declarations. Prefer the configuration option of the bundler or framework in that case.

## Examples

<!-- example:incorrect case="icon-library-barrel" -->

```tsx file="Toolbar.tsx"
import { Check, Menu, X } from "big-icon-library";
```

<!-- example:correct case="per-module-import" -->

```tsx file="Toolbar.tsx"
import Check from "big-icon-library/icons/check";
import Menu from "big-icon-library/icons/menu";
import X from "big-icon-library/icons/x";
```

<!-- example:near-miss case="small-feature-barrel" -->

```ts file="features/billing/index.ts"
export { InvoiceList } from "./InvoiceList";
export { PaymentForm } from "./PaymentForm";
export type { Invoice } from "./types";
```

## Library notes

### Vite

- Vite pre-bundles dependencies in dev, so package barrels cost little there. A large barrel in the project's own source still loads every file as a separate request.

### Next.js

- `experimental.optimizePackageImports` rewrites barrel imports to direct imports at build time and keeps the standard import syntax.

### TypeScript

- Some packages ship no type declarations for deep paths. A deep import then resolves to `any` under `strict`. Check that the subpath exports types before you switch.

## Verify

- The barrel is large, in the order of hundreds of modules or more.
- The import is loaded unbundled (dev server, tests, server runtime) or the package is CommonJS or has side effects.
- A per-module entry point exists, or the toolchain has an option that rewrites the import.
- The cost is measured or clearly large. Do not report small barrels.
