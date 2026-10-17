---
id: error-message-names-the-field
title: Make error messages specific, and the same in every place
summary: Use a different message for each failure state, name the field in the message, and use the same text in the summary and next to the field.
applies_when: Code defines validation messages, or shows the same error in more than one place.
severity: low
source:
  - {
      title: "GOV.UK Design System: Error message, be specific, be consistent, match up labels",
      url: "https://design-system.service.gov.uk/components/error-message/",
    }
  - {
      title: "GOV.UK Design System: Error summary",
      url: "https://design-system.service.gov.uk/components/error-summary/",
    }
---

# Make error messages specific, and the same in every place

## Rule

Write one message per failure state: empty, too long, too short, wrong format, not allowed. Include the words from the field's label. Use the exact same text in the error summary and next to the field.

## Why

- "This field is required" and "Select an option" make no sense in a summary list, away from the field.
- Naming the label lets the user match message and field.
- Different text for one error in two places looks like two errors.

## Exceptions

- Fields so small in context that the label is obvious in a stacked layout, and where no summary exists.
- Generic form-level errors, such as a network failure.

## Examples

<!-- example:incorrect case="generic" -->

```ts file="schema.ts"
const schema = z.object({
  firstName: z.string().min(1, "This field is required"),
  bio: z.string().max(400, "Too long"),
});
```

<!-- example:correct case="specific" -->

```ts file="schema.ts"
const schema = z.object({
  firstName: z.string().min(1, "Enter your first name"),
  bio: z.string().max(400, "Bio must be 400 characters or less"),
});
```

## Verify

- A message does not mention the field's subject, or one error has different text in summary and inline.
- The summary and the inline message come from the same source string.
