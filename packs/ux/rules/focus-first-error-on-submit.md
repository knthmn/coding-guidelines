---
id: focus-first-error-on-submit
title: Move focus to the errors after a failed submit
summary: After a failed submit, move focus to an error summary or to the first invalid field. If you show a summary, title it, and link each entry to its field.
applies_when: A form validates on submit and can show errors.
severity: medium
source:
  - {
      title: "GOV.UK Design System: Error summary",
      url: "https://design-system.service.gov.uk/components/error-summary/",
    }
  - {
      title: "GOV.UK Design System: Validation pattern",
      url: "https://design-system.service.gov.uk/patterns/validation/",
    }
  - {
      title: "interfaces.dev cheat sheet: Accessibility",
      url: "https://interfaces.dev/cheat-sheet",
    }
  - { title: "Vercel Web Interface Guidelines: Forms", url: "https://vercel.com/design/guidelines" }
---

# Move focus to the errors after a failed submit

## Rule

When submit fails validation, move keyboard focus to either an error summary at the top of the form or to the first invalid field. If you use a summary, give each entry a link to its field. For a group of fields, link to the first field with an error.

## Why

- Without a focus move, keyboard and screen reader users stay on the submit button and do not know that anything failed.
- Errors below the fold are invisible to sighted users who do not scroll.
- A summary link that goes nowhere forces the user to search for the field.

## Exceptions

- Server-rendered pages that reload with the summary and set focus on it by markup or script.
- Single-field forms where the field already holds focus and shows an announced error.
- Inline validation of one field outside a submit, which uses live announcements instead (see `announce-async-updates`).

## Examples

<!-- example:incorrect case="no-focus-move" -->

```tsx file="ProfileForm.tsx"
function ProfileForm() {
  const form = useForm();

  return (
    <form onSubmit={form.handleSubmit(save)}>
      <input {...form.register("email", { required: "Enter your email address" })} />
      <p>{form.formState.errors.email?.message}</p>
      <button type="submit">Save</button>
    </form>
  );
}
```

<!-- example:correct case="focus-first-invalid" -->

```tsx file="ProfileForm.tsx"
function ProfileForm() {
  const form = useForm({ shouldFocusError: true });

  return (
    <form onSubmit={form.handleSubmit(save)}>
      <input {...form.register("email", { required: "Enter your email address" })} />
      <p id="email-error">{form.formState.errors.email?.message}</p>
      <button type="submit">Save</button>
    </form>
  );
}
```

<!-- example:correct case="summary-with-links" -->

```tsx file="ErrorSummary.tsx"
function ErrorSummary({ errors }: { errors: { field: string; message: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (errors.length > 0) ref.current?.focus();
  }, [errors]);

  if (errors.length === 0) return null;
  return (
    <div ref={ref} tabIndex={-1} role="alert">
      <h2>There is a problem</h2>
      <ul>
        {errors.map((e) => (
          <li key={e.field}>
            <a href={`#${e.field}`}>{e.message}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Library notes

### React Hook Form

`shouldFocusError` defaults to `true`. It focuses the first field with an error that registered a ref. Custom controlled components must forward the ref to the input, or focus does not move.

## Verify

- The form shows errors after submit but no code focuses a summary or a field.
- Library focus defaults are not turned off, and custom inputs forward refs.
- If a summary exists, each entry links to a field `id` that exists.
