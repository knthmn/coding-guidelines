---
id: placeholder-not-label
title: Do not use a placeholder in place of a label
summary: Give every field a visible label. Use a placeholder only for an extra example, never for the field name, the instructions or the format.
applies_when: An input or textarea has a placeholder, or has no visible label.
severity: medium
source:
  - {
      title: "GOV.UK Design System: Text input, avoid placeholder text",
      url: "https://design-system.service.gov.uk/components/text-input/",
    }
  - {
      title: "interfaces.dev cheat sheet: Accessibility",
      url: "https://interfaces.dev/cheat-sheet",
    }
  - { title: "Vercel Web Interface Guidelines: Forms", url: "https://vercel.com/design/guidelines" }
---

# Do not use a placeholder in place of a label

## Rule

Every field has a visible `<label>`. Put the format and instructions in hint text that stays visible. Do not rely on `placeholder` to name the field or to explain the format.

## Why

- A placeholder disappears on the first keystroke, so users forget what the field asks, especially when they review answers.
- Some screen readers do not read placeholders.
- Default placeholder color often fails contrast.

## Exceptions

- A search field whose icon and button name make the purpose clear, with an accessible name set. Prefer a visible label where space allows.
- A placeholder that adds a non-essential example next to a real label.

## Examples

<!-- example:incorrect case="placeholder-only" -->

```tsx file="PhoneField.tsx"
<input type="tel" placeholder="Phone number, including country code" />
```

<!-- example:correct case="label-and-hint" -->

```tsx file="PhoneField.tsx"
<div>
  <label htmlFor="phone">Phone number</label>
  <p id="phone-hint">Include the country code, like +44</p>
  <input id="phone" type="tel" autoComplete="tel" aria-describedby="phone-hint" />
</div>
```

<!-- example:near-miss case="search-field" -->

```tsx file="SearchBox.tsx"
<form role="search">
  <input type="search" aria-label="Search projects" placeholder="Search…" />
  <button type="submit">Search</button>
</form>
```

## Verify

- The field has `placeholder` and no `<label>`, `aria-label` or `aria-labelledby`, or the placeholder holds the format or instruction the user needs to answer.
