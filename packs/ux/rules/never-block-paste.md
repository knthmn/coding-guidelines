---
id: never-block-paste
title: Never block paste
summary: Do not prevent paste in inputs or textareas, including password, confirm-email and one-time-code fields.
applies_when: An input or textarea handles `onPaste`, or sets attributes or listeners that stop paste.
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
      title: "GOV.UK Design System: Text input, do not disable copy and paste",
      url: "https://design-system.service.gov.uk/components/text-input/",
    }
  - {
      title: "ui-skills: baseline-ui",
      url: "https://github.com/ibelick/ui-skills/blob/main/skills/baseline-ui/SKILL.md",
    }
---

# Never block paste

## Rule

Do not cancel paste events or otherwise stop paste in form fields. If the field needs different content, such as a split one-time code, handle the pasted text and fill the fields.

## Why

- Password managers and users paste passwords, codes and long values.
- Blocked paste pushes users to weaker, typed-by-hand passwords and causes typing errors.
- Assistive technology and dictation tools often use paste.

## Exceptions

- None for text entry. A custom editor can intercept paste to transform it, such as stripping formatting, if the content still arrives.

## Examples

<!-- example:incorrect case="prevent-paste" -->

```tsx file="ConfirmEmail.tsx"
<input type="email" name="confirm-email" onPaste={(e) => e.preventDefault()} />
```

<!-- example:correct case="allow-paste" -->

```tsx file="ConfirmEmail.tsx"
<input type="email" name="confirm-email" autoComplete="email" />
```

<!-- example:near-miss case="otp-paste-handler" -->

```tsx file="OtpInput.tsx"
<input
  inputMode="numeric"
  onPaste={(e) => {
    e.preventDefault();
    fillBoxes(e.clipboardData.getData("text"));
  }}
/>
```

## Verify

- The `onPaste` handler cancels the event without inserting the content elsewhere.
- No `onpaste="return false"`, `user-select` hacks or script that clears the field after paste.
