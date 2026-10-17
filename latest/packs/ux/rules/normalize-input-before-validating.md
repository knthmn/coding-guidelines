---
id: normalize-input-before-validating
title: Normalize input instead of rejecting harmless differences
summary: Trim whitespace, strip spaces and separators, and accept common formats before validating, so users do not see errors for input that is clear.
applies_when: Code validates free-text input such as codes, phone numbers, postcodes, card numbers, emails, names or dates.
severity: medium
source:
  - {
      title: "GOV.UK Design System: Validation pattern",
      url: "https://design-system.service.gov.uk/patterns/validation/",
    }
  - {
      title: "GOV.UK Design System: Text input, prefixes and suffixes",
      url: "https://design-system.service.gov.uk/components/text-input/",
    }
  - { title: "Vercel Web Interface Guidelines: Forms", url: "https://vercel.com/design/guidelines" }
---

# Normalize input instead of rejecting harmless differences

## Rule

Before validating, remove what the user cannot see or did not mean: leading and trailing whitespace, spaces, hyphens and brackets in numbers and codes, and a currency or unit symbol the field already shows. Validate the normalized value. Prevent errors where the intent is clear.

## Why

- Pasted, dictated and autocorrected text adds spaces the user cannot see. An error for an invisible character cannot be fixed.
- Users type the same value in many formats, for example `AB12 3CD` and `ab123cd`.
- A rejected value costs the user more than a normalizing step costs the code.

## Exceptions

- Passwords. Do not trim or alter them.
- Values where the separator carries meaning, such as a decimal point in a locale where a comma is a separator. Parse by locale instead.
- Input that stays ambiguous after normalization. Reject it.

## Examples

<!-- example:incorrect case="strict-regex" -->

```ts file="postcode.ts"
const postcode = z.string().regex(/^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/);
```

<!-- example:correct case="normalize-first" -->

```ts file="postcode.ts"
const postcode = z
  .string()
  .transform((v) => v.replace(/\s+/g, "").toUpperCase())
  .pipe(
    z.string().regex(/^[A-Z]{1,2}\d[A-Z\d]?\d[A-Z]{2}$/, "Enter a real postcode, like SW1A 1AA"),
  );
```

<!-- example:correct case="trim-email" -->

```ts file="email.ts"
const email = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email("Enter an email address in the correct format"));
```

<!-- example:near-miss case="password" -->

```ts file="password.ts"
const password = z.string().min(12, "Password must be 12 characters or more");
```

## Verify

- Validation runs on the raw string, and a trailing space, separator or case difference makes it fail.
- The field is not a password.
