---
id: rerender-transitions
title: Use transitions for non-urgent updates
summary: Wrap state updates that trigger a costly or blocking render, and are not urgent, in `startTransition` or `useTransition` so urgent input stays responsive.
applies_when: State updates that cause a heavy re-render, such as switching a tab, filtering a large list or navigating a view, next to urgent updates like typing or clicking.
severity: low
source:
  - {
      title: "Vercel React Best Practices",
      url: "https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rerender-transitions.md",
    }
---

# Use transitions for non-urgent updates

## Rule

Mark a state update as a transition when it starts a heavy render and the user does not need to see its result at once. Use `startTransition`, or `useTransition` when the component needs the pending flag.

## Why

- React can interrupt a transition render to handle urgent input, so typing and clicks stay responsive.
- `useTransition` gives an `isPending` flag, so the UI can show progress while the old content stays visible.

## Exceptions

- Updates that control a text input value. They must stay urgent. Transition updates cannot drive a controlled input.
- Cheap updates. A transition adds scheduling cost with no gain.
- Updates that must show at once, such as a toggle that gives immediate feedback.
- Updates that depend on a measurement that must stay in sync with the DOM, such as scroll or drag position. Throttle, or write to a ref or the DOM directly, instead.

## Examples

<!-- example:incorrect case="heavy-tab-switch" -->

```tsx file="Tabs.tsx"
function Tabs() {
  const [tab, setTab] = useState<"home" | "reports">("home");

  return (
    <>
      <button onClick={() => setTab("home")}>Home</button>
      <button onClick={() => setTab("reports")}>Reports</button>
      {tab === "home" ? <Home /> : <HeavyReports />}
    </>
  );
}
```

<!-- example:correct case="transition-tab-switch" -->

```tsx file="Tabs.tsx"
function Tabs() {
  const [tab, setTab] = useState<"home" | "reports">("home");
  const [isPending, startTransition] = useTransition();

  const select = (next: "home" | "reports") => {
    startTransition(() => setTab(next));
  };

  return (
    <>
      <button onClick={() => select("home")}>Home</button>
      <button onClick={() => select("reports")}>Reports</button>
      <div aria-busy={isPending}>{tab === "home" ? <Home /> : <HeavyReports />}</div>
    </>
  );
}
```

<!-- example:near-miss case="controlled-input" -->

```tsx file="NameField.tsx"
function NameField() {
  const [name, setName] = useState("");
  return <input value={name} onChange={(e) => setName(e.target.value)} />;
}
```

## Verify

- The update causes a render that is costly enough to block input.
- The update is not the value of a controlled input and is not needed at once.
