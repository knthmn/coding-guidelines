---
id: validate-on-submit-not-blur
title: Validate on submit, not while the user types or leaves a field
summary: Show validation errors after the user submits or moves to the next step. Do not show an error on blur or on each keystroke, unless the feedback prevents wasted effort.
applies_when: Code validates form fields on change or blur and shows errors.
severity: medium
source:
  - {
      title: "GOV.UK Design System: Validation pattern",
      url: "https://design-system.service.gov.uk/patterns/validation/",
    }
  - {
      title: "GOV.UK Design System: Character count",
      url: "https://design-system.service.gov.uk/components/character-count/",
    }
---

# Validate on submit, not while the user types or leaves a field

## Rule

Show a field error when the user submits the form or goes to the next step. Do not show errors on blur or on each keystroke. Always validate on the server as well.

## Why

- An error on a half-typed value, such as an email missing its domain, is wrong and distracting. Slow typists and screen reader users see it most.
- Errors on blur move the layout when the user clicks a button, so the click can miss.
- Client validation can fail to run or be bypassed. Server validation is the source of truth.

## Exceptions

- Feedback that saves effort: a character counter near its limit, a password rule checklist, or an availability check for a username.
- After a failed submit, re-validating a field on change so its error clears as the user fixes it.
- Fields where the value is complete on entry, such as a file upload that rejects a wrong type.

## Examples

<!-- example:incorrect case="validate-on-blur" -->

```tsx file="SignupForm.tsx"
function SignupForm() {
  const form = useForm({ mode: "onBlur" });
  return (
    <form onSubmit={form.handleSubmit(save)}>
      <input {...form.register("email", { pattern: /.+@.+/ })} />
    </form>
  );
}
```

<!-- example:correct case="validate-on-submit" -->

```tsx file="SignupForm.tsx"
function SignupForm() {
  const form = useForm({ mode: "onSubmit", reValidateMode: "onChange" });
  return (
    <form onSubmit={form.handleSubmit(save)}>
      <input {...form.register("email", { pattern: /.+@.+/ })} />
    </form>
  );
}
```

<!-- example:near-miss case="live-counter" -->

```tsx file="Bio.tsx"
function Bio({ value }: { value: string }) {
  const left = 280 - value.length;
  return <p role="status">{left} characters remaining</p>;
}
```

## Library notes

### React Hook Form

`mode` controls when validation first runs. `reValidateMode` controls re-validation after a submit. The defaults are `onSubmit` and `onChange`. Values such as `onBlur`, `onChange` and `all` for `mode` start validation before the first submit.

## Verify

- Validation starts before the first submit, and the field is not a counter, strength meter or availability check.
- The server also validates the same input.
