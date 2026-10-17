---
id: bundle-conditional
title: Load large modules and data only when a feature activates
summary: Load heavy modules or data with dynamic import when the user turns the feature on, instead of in the initial bundle.
applies_when: A large module or data file is used only behind a toggle, a route, a tab or another user action.
severity: low
source:
  - title: Vercel React Best Practices
    url: https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/bundle-conditional.md
---

# Load large modules and data only when a feature activates

## Rule

When a large module or data set serves one optional feature, load it with `import()` when the feature activates. Show a placeholder while it loads and handle the failure.

## Why

- Code in the initial bundle costs download, parse and execution time for every user, including those who never use the feature.
- A dynamic import moves that cost to the users who need it.

## Exceptions

- Small modules. The request round trip costs more than the bytes saved.
- Features that nearly every session uses at once, where the lazy load only delays the first use.
- Modules that must be ready without delay. Preload them instead (see `bundle-preload`).

## Examples

<!-- example:incorrect case="static-import" -->

```ts file="player.ts"
import { frames } from "./animation-frames";

export function startPlayer(canvas: HTMLCanvasElement) {
  drawFrames(canvas, frames);
}
```

<!-- example:correct case="import-on-activate" -->

```ts file="player.ts"
export async function startPlayer(canvas: HTMLCanvasElement) {
  try {
    const { frames } = await import("./animation-frames");
    drawFrames(canvas, frames);
  } catch {
    showPlayerError(canvas);
  }
}
```

<!-- example:near-miss case="small-module" -->

```ts file="format.ts"
import { formatDuration } from "./formatDuration";

export function label(ms: number) {
  return formatDuration(ms);
}
```

## Library notes

### React

- `React.lazy` with `Suspense` loads a component on first render. Server rendering frameworks may offer their own wrapper.

## Verify

- The module or data is large, from a size report or by inspection.
- Only one optional path uses it.
- No dynamic import or lazy wrapper exists yet.
