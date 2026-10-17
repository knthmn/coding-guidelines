---
id: keep-submit-enabled
title: Keep the submit button enabled until submission starts
summary: Do not disable a submit button because the form is empty or invalid. Let the user submit, then show what is wrong. Disable only while the request runs.
applies_when: A form has a submit button whose disabled state depends on field values or validity.
severity: medium
source:
  - {
      title: "GOV.UK Design System: Button, disabled buttons",
      url: "https://design-system.service.gov.uk/components/button/",
    }
  - {
      title: "interfaces.dev cheat sheet: Accessibility",
      url: "https://interfaces.dev/cheat-sheet",
    }
  - { title: "Vercel Web Interface Guidelines: Forms", url: "https://vercel.com/design/guidelines" }
  - {
      title: "ui-skills: fixing-accessibility",
      url: "https://github.com/ibelick/ui-skills/blob/main/skills/fixing-accessibility/SKILL.md",
    }
---

# Keep the submit button enabled until submission starts

## Rule

Do not set `disabled` on a submit button from field values, validity or `isValid`. Let the user press it, then show validation feedback. Disable it only while the request is in flight.

## Why

- A disabled button gives no reason. The user cannot tell which field is missing or wrong.
- Disabled controls have low contrast and are skipped by keyboard focus, so some users never find them.
- Validation on submit is the point where errors can be shown, focused and announced.

## Exceptions

- The request is in flight (see `prevent-double-submit`).
- The action cannot do anything yet, for example "Next" on a wizard step with no data to submit, and the page says why next to the button.
- Controls that are not form submit buttons, such as "Undo" with an empty history.

## Examples

<!-- example:incorrect case="disabled-until-valid" -->

```tsx file="SignupForm.tsx"
function SignupForm() {
  const form = useForm({ mode: "onChange" });

  return (
    <form onSubmit={form.handleSubmit(save)}>
      <input {...form.register("email", { required: true })} />
      <button type="submit" disabled={!form.formState.isValid}>
        Create account
      </button>
    </form>
  );
}
```

<!-- example:correct case="enabled-until-in-flight" -->

```tsx file="SignupForm.tsx"
function SignupForm() {
  const form = useForm();

  return (
    <form onSubmit={form.handleSubmit(save)}>
      <input {...form.register("email", { required: "Enter your email address" })} />
      <button type="submit" disabled={form.formState.isSubmitting}>
        Create account
      </button>
    </form>
  );
}
```

<!-- example:near-miss case="disabled-while-submitting" -->

```tsx file="SaveButton.tsx"
function SaveButton({ pending }: { pending: boolean }) {
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Saving…" : "Save changes"}
    </button>
  );
}
```

## Verify

- The `disabled` condition reads field values, `isValid`, `isDirty` or similar, not only a pending flag.
- The button submits a form, and the user has no visible explanation for the disabled state.
