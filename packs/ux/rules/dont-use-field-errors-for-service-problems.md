---
id: dont-use-field-errors-for-service-problems
title: Do not report service problems or eligibility as field errors
summary: Use field validation errors only for input the user can fix. For ineligible users, missing permission or service failures, show a page or banner that explains the cause and the next step.
applies_when: Code shows an error next to a field or in a summary for an outcome that is not about the entered value.
severity: low
source:
  - {
      title: "GOV.UK Design System: Validation pattern, when not to use",
      url: "https://design-system.service.gov.uk/patterns/validation/",
    }
  - {
      title: "GOV.UK Design System: Error message, when not to use",
      url: "https://design-system.service.gov.uk/components/error-message/",
    }
---

# Do not report service problems or eligibility as field errors

## Rule

Use field errors only for values the user can change. When the user is not eligible, lacks permission or hits a service failure, show a message or page that gives the reason and the next step.

## Why

- A field error implies that editing the field fixes the problem. For these cases it cannot.
- The user needs a path forward, such as another service, a contact, or a retry time.

## Exceptions

- A failure caused by a specific value, such as "This email address is already registered", which the user can fix by changing the value.
- Rate limits shown inline on a form that the user can retry soon, with the retry time.

## Examples

<!-- example:incorrect case="eligibility-as-field-error" -->

```tsx file="AgeStep.tsx"
if (age < 18) {
  form.setError("age", { message: "You are not eligible" });
}
```

<!-- example:correct case="eligibility-page" -->

```tsx file="AgeStep.tsx"
if (age < 18) {
  navigate("/not-eligible");
}
```

<!-- example:near-miss case="duplicate-email" -->

```tsx file="SignupForm.tsx"
if (result.error === "EMAIL_TAKEN") {
  form.setError("email", {
    message: "An account with this email address already exists. Sign in instead",
  });
}
```

## Verify

- The error is attached to a field, and no change to that field's value can fix it.
- The user has no next step in the message.
