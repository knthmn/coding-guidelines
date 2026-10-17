---
id: dont-truncate-or-block-input
title: Do not block or truncate what the user types
summary: Do not drop keystrokes with key filters or `maxlength`. Accept the input and show validation feedback, and ask for a limit in the hint.
applies_when: A text field restricts which characters or how many characters it accepts, using `keydown` filters, `onChange` rewrites or `maxlength`.
severity: medium
source:
  - { title: "Vercel Web Interface Guidelines: Forms", url: "https://vercel.com/design/guidelines" }
  - {
      title: "GOV.UK Design System: Text input, avoid restricting the length of input",
      url: "https://design-system.service.gov.uk/components/text-input/",
    }
---

# Do not block or truncate what the user types

## Rule

Do not stop keystrokes or cut pasted text. Accept the value, then validate it and explain the problem. State any limit in a hint. For long text with a limit, use a character count (see `limit-text-with-character-count`).

## Why

- A key that does nothing gives no explanation.
- `maxlength` truncates pasted text without a message, so the user submits incomplete data.
- A tight limit blocks normal formatting, such as spaces in a postcode.
- Some assistive technology does not report that a limit was hit.

## Exceptions

- Hard limits the user cannot exceed in the backing system, for example one-digit inputs in a split code field. Move focus to the next box on entry.
- `maxlength` set well above any realistic value as a safety net, with the server validating the exact limit.
- Masked inputs that format the value while the user keeps full control, such as inserting spaces into a card number.

## Examples

<!-- example:incorrect case="drop-non-digits" -->

```tsx file="AgeField.tsx"
<input
  value={age}
  onKeyDown={(e) => {
    if (!/\d|Backspace|Tab/.test(e.key)) e.preventDefault();
  }}
  onChange={(e) => setAge(e.target.value)}
/>
```

<!-- example:incorrect case="maxlength-short" -->

```html file="name.html"
<input name="full-name" maxlength="20" />
```

<!-- example:correct case="accept-then-validate" -->

```tsx file="AgeField.tsx"
<input
  inputMode="numeric"
  value={age}
  aria-describedby="age-hint age-error"
  onChange={(e) => setAge(e.target.value)}
/>
```

<!-- example:near-miss case="otp-box" -->

```tsx file="OtpDigit.tsx"
<input
  inputMode="numeric"
  maxLength={1}
  autoComplete="one-time-code"
  onChange={(e) => e.target.value && focusNext()}
/>
```

## Verify

- The handler or attribute removes input without telling the user.
- The limit is not a hard system limit or a generous safety net with exact server validation.
