---
id: connect-errors-to-fields
title: Connect each error message to its field
summary: Place the error next to its field, set `aria-invalid` on the field and link the message with `aria-describedby`, so assistive technology reads it with the field.
applies_when: A form field shows an error message or helper text.
severity: medium
source:
  - {
      title: "interfaces.dev cheat sheet: Accessibility",
      url: "https://interfaces.dev/cheat-sheet",
    }
  - { title: "Vercel Web Interface Guidelines: Forms", url: "https://vercel.com/design/guidelines" }
  - {
      title: "ui-skills: fixing-accessibility",
      url: "https://github.com/ibelick/ui-skills/blob/main/skills/fixing-accessibility/SKILL.md",
    }
  - {
      title: "GOV.UK Design System: Error message",
      url: "https://design-system.service.gov.uk/components/error-message/",
    }
---

# Connect each error message to its field

## Rule

Render the error message beside the field it belongs to. On the field, set `aria-invalid="true"` while it is invalid and list the message id in `aria-describedby`. Keep helper text in the same `aria-describedby` list.

## Why

- A message in a separate container is not read when the field gets focus.
- Errors shown far from the field, such as only in a toast, are easy to miss.
- Replacing the helper text id with the error id hides the helper from screen reader users.

## Exceptions

- Errors that apply to several fields or to the whole form, which belong in a summary.
- Fields wrapped by a component that already sets these attributes. Check the rendered markup.

## Examples

<!-- example:incorrect case="unlinked-message" -->

```tsx file="EmailField.tsx"
function EmailField({ error }: { error?: string }) {
  return (
    <div>
      <label htmlFor="email">Email address</label>
      <input id="email" name="email" />
      {error && <span className="text-red-600">{error}</span>}
    </div>
  );
}
```

<!-- example:correct case="described-by" -->

```tsx file="EmailField.tsx"
function EmailField({ error }: { error?: string }) {
  return (
    <div>
      <label htmlFor="email">Email address</label>
      <p id="email-hint">We send receipts here</p>
      <input
        id="email"
        name="email"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "email-error email-hint" : "email-hint"}
      />
      {error && <p id="email-error">{error}</p>}
    </div>
  );
}
```

## Verify

- The field can show an error, and the markup lacks `aria-invalid` or `aria-describedby`, or the id does not match the message element.
- A component library does not add the attributes. Check its source or rendered output when unsure.
