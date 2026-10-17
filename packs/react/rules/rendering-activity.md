---
id: rendering-activity
title: Use Activity to keep hidden UI mounted
summary: For expensive UI that users toggle often, wrap it in `<Activity>` with `mode` `"visible"` or `"hidden"` to keep its state and DOM, instead of unmounting and re-creating it.
applies_when: A component with costly render or local state is mounted and unmounted by a condition that users toggle often, such as tabs, panels or menus. Needs React 19.2 or later.
severity: low
source:
  - title: "Vercel React Best Practices"
    url: "https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rendering-activity.md"
---

# Use Activity to keep hidden UI mounted

## Rule

When users switch often between views and each view has costly render work or state that they expect to keep, render the views in `<Activity>` and set `mode` to `"visible"` or `"hidden"`. Do not unmount them with `&&`.

## Why

- Unmounting loses local state, such as form input, scroll position and expanded sections.
- Mounting again repeats the render work and the data loading.
- A hidden Activity keeps state and DOM. React removes its effects while it is hidden, so hidden content does not keep subscriptions or timers active.

## Exceptions

- Cheap components with no state worth keeping. Unmounting is simpler.
- State that must reset when the view closes. Unmounting resets it.
- Large hidden trees. Hidden children still render when their props change, at lower priority, and their DOM stays in memory.
- React older than 19.2.

## Examples

<!-- example:incorrect case="unmount-on-toggle" -->

```tsx file="Tabs.tsx"
function Tabs({ tab }: { tab: "report" | "settings" }) {
  return (
    <>
      {tab === "report" && <ReportEditor />}
      {tab === "settings" && <Settings />}
    </>
  );
}
```

<!-- example:correct case="activity" -->

```tsx file="Tabs.tsx"
import { Activity } from "react";

function Tabs({ tab }: { tab: "report" | "settings" }) {
  return (
    <>
      <Activity mode={tab === "report" ? "visible" : "hidden"}>
        <ReportEditor />
      </Activity>
      <Activity mode={tab === "settings" ? "visible" : "hidden"}>
        <Settings />
      </Activity>
    </>
  );
}
```

<!-- example:near-miss case="reset-on-close" -->

```tsx file="CreateUserPanel.tsx"
function CreateUserPanel({ open }: { open: boolean }) {
  return <>{open && <CreateUserForm />}</>;
}
```

## Library notes

### React

- `<Activity>` is stable in React 19.2 (released 2025-10-01). It supports the modes `visible` and `hidden`. The React team plans more modes.
- When hidden, React hides the children with `display: none` and destroys their effects.

## Verify

- The project uses React 19.2 or later.
- The condition toggles often, and the component has costly render work or state users want to keep.
- The state must not reset when the view hides.
