---
id: announce-async-updates
title: Announce async updates and inline feedback to screen readers
summary: Use `role="status"` or `aria-live="polite"` for routine updates and inline validation. Use `role="alert"` only for urgent errors. Never show critical information only in a toast.
applies_when: Code shows toasts, saved or loading messages, counters, or inline validation that appear without a page change.
severity: medium
source:
  - {
      title: "interfaces.dev cheat sheet: Accessibility",
      url: "https://interfaces.dev/cheat-sheet",
    }
  - {
      title: "Vercel Web Interface Guidelines: Interactions",
      url: "https://vercel.com/design/guidelines",
    }
  - {
      title: "ui-skills: fixing-accessibility",
      url: "https://github.com/ibelick/ui-skills/blob/main/skills/fixing-accessibility/SKILL.md",
    }
---

# Announce async updates and inline feedback to screen readers

## Rule

Put content that appears after an action in a live region. Use `role="status"` or `aria-live="polite"` for routine updates and inline validation. Use `role="alert"` for urgent errors. Do not make a toast the only place for information the user must act on.

## Why

- Content added to the DOM without a live region is silent to screen reader users.
- `role="alert"` interrupts the user, so overuse is disruptive.
- Toasts disappear before many users can read or reach them.

## Exceptions

- Updates that move focus to the new content, such as an error summary that gets focus.
- Live regions that the component library already provides. Check the rendered markup.

## Examples

<!-- example:incorrect case="silent-status" -->

```tsx file="CopyButton.tsx"
<button onClick={copy}>Copy link</button>;
{
  copied && <span className="text-green-600">Copied</span>;
}
```

<!-- example:correct case="status-region" -->

```tsx file="CopyButton.tsx"
<button onClick={copy}>Copy link</button>
<span role="status">{copied ? "Copied" : ""}</span>
```

<!-- example:correct case="alert-for-failure" -->

```tsx file="SaveState.tsx"
{
  failed && <p role="alert">We could not save your changes. Check your connection and try again</p>;
}
```

## Verify

- Text appears after an interaction and sits outside any live region or focus move.
- A live region exists in the DOM before its content changes. A region that mounts with its content is often not announced.
