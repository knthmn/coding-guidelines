---
id: bundle-preload
title: Preload heavy modules on user intent
summary: Start loading a heavy lazy module when the user shows intent, such as hover or focus on its trigger, or when a feature flag turns it on.
applies_when: A heavy module loads lazily on a user action, and a visible wait follows the action.
severity: low
source:
  - title: Vercel React Best Practices
    url: https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/bundle-preload.md
---

# Preload heavy modules on user intent

## Rule

When a lazy module is heavy and the user waits for it after an action, start the import earlier. Trigger it on a signal of intent, such as pointer hover or keyboard focus on the trigger, or when a flag enables the feature.

## Why

- Hover and focus come some hundreds of milliseconds before the click. The download can finish in that time.
- Repeated calls to `import()` for the same module reuse the first request, so a preload costs little.

## Exceptions

- Light modules. A preload adds a request for no visible gain.
- Users on metered or slow connections, when the app respects a data-saver signal.
- Triggers that most users touch by accident, such as items in a long list. Preload on a stronger signal there.

## Examples

<!-- example:incorrect case="load-on-click" -->

```ts file="editorButton.ts"
button.addEventListener("click", async () => {
  const { openEditor } = await import("./editor");
  openEditor();
});
```

<!-- example:correct case="preload-on-hover-focus" -->

```ts file="editorButton.ts"
const loadEditor = () => import("./editor");

button.addEventListener("pointerenter", () => void loadEditor(), { once: true });
button.addEventListener("focus", () => void loadEditor(), { once: true });
button.addEventListener("click", async () => {
  const { openEditor } = await loadEditor();
  openEditor();
});
```

<!-- example:near-miss case="light-module" -->

```ts file="shareButton.ts"
button.addEventListener("click", async () => {
  const { copyLink } = await import("./copyLink");
  copyLink();
});
```

## Verify

- The module is heavy and loaded lazily.
- A user action waits for it, so the delay is visible.
- No hover, focus or flag based preload exists.
