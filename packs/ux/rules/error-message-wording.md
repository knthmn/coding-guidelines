---
id: error-message-wording
title: Write error messages that say what to do
summary: Error messages describe the problem and the fix in plain, neutral words. No blame, no codes, no please, sorry, oops, valid or invalid.
applies_when: Code adds or changes the text of validation errors, failure toasts or error states.
severity: low
source:
  - {
      title: "GOV.UK Design System: Error message, be clear and concise",
      url: "https://design-system.service.gov.uk/components/error-message/",
    }
  - {
      title: "Vercel Web Interface Guidelines: Copywriting",
      url: "https://vercel.com/design/guidelines",
    }
  - {
      title: "GOV.UK Design System: Text input, error messages",
      url: "https://design-system.service.gov.uk/components/text-input/",
    }
---

# Write error messages that say what to do

## Rule

State what went wrong and how to fix it, in plain words. Use an instruction for a missing value ("Enter your email address") and a description for a bad value ("Password must be 12 characters or more"). Do not show codes or internal terms. Do not blame ("you forgot"), plead ("please") or joke ("oops").

## Why

- "Invalid email" says nothing about the fix.
- Technical terms and codes mean nothing to the user.
- Words like "valid", "sorry" and "oops" add length and no help.

## Exceptions

- Messages for developers or admins, such as logs and API errors for integrators.
- Brand voice that the product owner sets. Keep the fix in the message.
- When the user cannot fix the problem, say what happens next (see `dont-use-field-errors-for-service-problems`).

## Examples

<!-- example:incorrect case="vague" -->

```ts file="messages.ts"
export const messages = {
  email: "Invalid email",
  name: "Oops! You forgot your name",
  save: "Error 0x80004005",
};
```

<!-- example:correct case="actionable" -->

```ts file="messages.ts"
export const messages = {
  email: "Enter an email address in the correct format, like name@example.com",
  name: "Enter your full name",
  save: "We could not save your changes. Try again in a few minutes",
};
```

## Verify

- The text uses a code, "invalid", "please", "sorry", "oops" or blames the user, or gives no next step.
- The message targets end users and not logs.
