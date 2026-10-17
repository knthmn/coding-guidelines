---
id: dont-rely-on-color-alone
title: Do not show status with color alone
summary: Pair every color-coded state, such as error, success or selected, with text, an icon or another visible cue.
applies_when: Code styles status, validation, selection or severity by color.
severity: medium
source:
  - {
      title: "interfaces.dev cheat sheet: Accessibility",
      url: "https://interfaces.dev/cheat-sheet",
    }
  - {
      title: "Vercel Web Interface Guidelines: Content",
      url: "https://vercel.com/design/guidelines",
    }
  - {
      title: "ui-skills: fixing-accessibility",
      url: "https://github.com/ibelick/ui-skills/blob/main/skills/fixing-accessibility/SKILL.md",
    }
---

# Do not show status with color alone

## Rule

When color marks a state, add text, an icon or a shape that carries the same meaning. An invalid field needs an error message, not only a red border.

## Why

- Color-blind users and users in bright light can miss the difference.
- Screen readers do not report color.
- Charts and status dots with color only exclude many users.

## Exceptions

- Color that repeats an adjacent text label, such as a red "Failed" badge.
- Decorative color that adds no state.

## Examples

<!-- example:incorrect case="red-border-only" -->

```tsx file="EmailField.tsx"
<input className={invalid ? "border-red-500" : "border-gray-300"} />
```

<!-- example:correct case="border-and-message" -->

```tsx file="EmailField.tsx"
<input
  className={invalid ? "border-red-500" : "border-gray-300"}
  aria-invalid={invalid}
  aria-describedby="email-error"
/>;
{
  invalid && <p id="email-error">Enter an email address in the correct format</p>;
}
```

<!-- example:near-miss case="badge-with-label" -->

```tsx file="StatusBadge.tsx"
<span className="rounded bg-red-100 text-red-800">Failed</span>
```

## Verify

- A state changes only a color class, and no text, icon or attribute differs.
