---
id: keep-input-on-error
title: Keep the user's input when validation fails
summary: After a failed submit, show the form again with every value the user entered, valid and invalid. Do not clear or reset fields.
applies_when: A form submit can fail validation on the client or the server.
severity: medium
source:
  - {
      title: "GOV.UK Design System: Validation pattern",
      url: "https://design-system.service.gov.uk/patterns/validation/",
    }
  - {
      title: "GOV.UK Design System: Error message",
      url: "https://design-system.service.gov.uk/components/error-message/",
    }
---

# Keep the user's input when validation fails

## Rule

When validation fails, keep all submitted values in the form, both the ones that passed and the ones that failed. Never reset the form or clear a field in an error path.

## Why

- Users need to see what they typed to fix it.
- Re-entering long answers costs effort and causes abandonment.
- Server-rendered forms lose values when the error response does not echo them back.

## Exceptions

- Secrets such as passwords and card security codes, which may be cleared on failure.
- Errors that the user cannot fix by editing the input, such as an expired session. Keep the draft where possible.

## Examples

<!-- example:incorrect case="reset-on-error" -->

```tsx file="ContactForm.tsx"
function ContactForm() {
  const form = useForm<ContactInput>();

  const onSubmit = async (values: ContactInput) => {
    const result = await sendMessage(values);
    if (!result.ok) {
      form.reset();
      setError(result.message);
    }
  };

  return <form onSubmit={form.handleSubmit(onSubmit)}>{/* fields */}</form>;
}
```

<!-- example:correct case="keep-values" -->

```tsx file="ContactForm.tsx"
function ContactForm() {
  const form = useForm<ContactInput>();

  const onSubmit = async (values: ContactInput) => {
    const result = await sendMessage(values);
    if (!result.ok) form.setError("root", { message: result.message });
    else form.reset();
  };

  return <form onSubmit={form.handleSubmit(onSubmit)}>{/* fields */}</form>;
}
```

<!-- example:near-miss case="clear-password" -->

```tsx file="LoginForm.tsx"
const onError = () => {
  form.setError("root", { message: "Your email or password is incorrect" });
  form.resetField("password");
};
```

## Verify

- An error path calls `reset`, clears state, or a server response re-renders the form without submitted values.
- The cleared field is not a secret.
