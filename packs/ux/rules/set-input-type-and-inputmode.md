---
id: set-input-type-and-inputmode
title: Set the input type and inputmode for the data
summary: Use `type` and `inputmode` that match the value, for example `type="email"`, `type="tel"` and `inputmode="numeric"`. Do not use `type="number"` for IDs, codes, phone numbers or other digit strings.
applies_when: A form has text inputs for emails, numbers, phone numbers, codes, URLs or search.
severity: medium
source:
  - {
      title: "GOV.UK Design System: Text input, numbers",
      url: "https://design-system.service.gov.uk/components/text-input/",
    }
  - {
      title: "interfaces.dev cheat sheet: Accessibility",
      url: "https://interfaces.dev/cheat-sheet",
    }
  - { title: "Vercel Web Interface Guidelines: Forms", url: "https://vercel.com/design/guidelines" }
---

# Set the input type and inputmode for the data

## Rule

Match `type` and `inputmode` to the value so touch devices show the right keyboard. Use `type="email"`, `type="tel"` and `type="url"` where they fit. For whole numbers that are not quantities, use `type="text"` with `inputmode="numeric"`. For decimals, use `inputmode="decimal"`. Use `type="number"` only for a true quantity that benefits from a stepper.

## Why

- A wrong type shows the full keyboard where digits or `@` are needed.
- `type="number"` changes the value on mouse wheel scroll, drops leading zeros, accepts `e`, and gives no feedback about bad input.
- Digits in IDs, codes, card and phone numbers are strings, not numbers.

## Exceptions

- A quantity where the stepper helps, such as the number of guests, with `min` and `max`.
- Negative numbers on devices whose numeric keypad has no minus sign. Use plain text input without `inputmode`.

## Examples

<!-- example:incorrect case="number-for-code" -->

```tsx file="CodeField.tsx"
<input name="postal-code" type="number" />
<input name="email" type="text" />
```

<!-- example:correct case="inputmode" -->

```tsx file="CodeField.tsx"
<input name="verification-code" type="text" inputMode="numeric" autoComplete="one-time-code" />
<input name="email" type="email" autoComplete="email" />
```

<!-- example:near-miss case="quantity-stepper" -->

```tsx file="Guests.tsx"
<input name="guests" type="number" min={1} max={10} defaultValue={1} />
```

## Verify

- The value is an identifier, code or phone number typed as `number`, or an email or phone field has `type="text"` without a matching `inputmode`.
- The field is not a bounded quantity.
