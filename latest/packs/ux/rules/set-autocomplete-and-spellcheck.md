---
id: set-autocomplete-and-spellcheck
title: Set autocomplete tokens and turn off spellcheck for non-prose fields
summary: Add `autocomplete` tokens and meaningful names to personal data fields. Set `spellcheck="false"` for emails, codes and usernames. Avoid names that trigger password managers on other fields.
applies_when: A form asks for personal data, credentials, one-time codes, usernames or identifiers.
severity: medium
source:
  - {
      title: "GOV.UK Design System: Text input, autocomplete and spellcheck",
      url: "https://design-system.service.gov.uk/components/text-input/",
    }
  - {
      title: "GOV.UK Design System: Date input, autocomplete for date of birth",
      url: "https://design-system.service.gov.uk/components/date-input/",
    }
  - { title: "Vercel Web Interface Guidelines: Forms", url: "https://vercel.com/design/guidelines" }
---

# Set autocomplete tokens and turn off spellcheck for non-prose fields

## Rule

Give fields that ask for personal data the matching `autocomplete` token and a meaningful `name`. Set `spellcheck="false"` on emails, codes, usernames and other identifiers. Give one-time code fields `autocomplete="one-time-code"`. Do not give non-login fields names such as `password`.

## Why

- Autofill saves effort and reduces typing errors. It also helps users with motor or memory difficulty.
- Spellcheck underlines valid names and codes, which looks like an error.
- A search field that a password manager treats as a credential field triggers unwanted prompts.

## Exceptions

- Prototypes and internal tools where autofill is not wanted.
- A field where autofill would give wrong data, for example a recipient address in a checkout. Use a section token such as `shipping` or set `off`.

## Examples

<!-- example:incorrect case="no-tokens" -->

```tsx file="AccountForm.tsx"
<input name="field1" type="text" />
<input name="username" type="text" />
```

<!-- example:correct case="tokens" -->

```tsx file="AccountForm.tsx"
<input name="email" type="email" autoComplete="email" spellCheck={false} />
<input name="username" type="text" autoComplete="username" spellCheck={false} />
<input name="current-password" type="password" autoComplete="current-password" />
```

<!-- example:near-miss case="recipient-address" -->

```tsx file="Recipient.tsx"
<input name="recipient-name" type="text" autoComplete="off" />
```

## Verify

- The field asks for personal data and has no `autocomplete`, or an identifier field leaves spellcheck on.
- Autofill is not undesirable for that field.
