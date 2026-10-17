---
id: null-vs-empty-string
title: Use null for structured values and an empty string for free text
summary: Make columns with a format (email, phone, URL, date) nullable. Make free-text columns `NOT NULL` with no default, and pass `""` explicitly for "nothing written".
applies_when: Code adds or changes an optional text column, or the schema and form that write to it, in a project set up with web-app-template.
severity: medium
source: null
---

# Use null for structured values and an empty string for free text

## Rule

- **Structured values with a format** (email, phone, URL, age, date): the column is nullable. "No value" is `null`.
- **Free text** (notes, description, bio): the column is `NOT NULL` with no database default. "Nothing written" is `""`, and every insert passes it explicitly. Clearing the value in an update sends `""`, never `null`.

## Why

- For a structured value, `""` is not valid, so allowing it forces every reader to handle a value that breaks the field's own rule. With `string | null`, a `string` is always valid.
- A nullable type shows whether the value exists, and the type checker reminds callers to handle the missing case.
- The database can enforce the format. A `CHECK (phone <> '')` is possible, and unique indexes ignore `NULL`, which suits optional contacts.
- For free text, a nullable column gives "nothing" two forms, `NULL` and `""`. Every reader, query and comparison must handle both.
- For free text, "not recorded" and "recorded as empty" mean the same, so no one needs to tell them apart.
- A textarea value maps straight to the stored value. The schema only trims: `z.string().trim()`.

## Exceptions

- Free text where "never answered" differs from "answered with nothing", for example a survey answer. Use `null` and document the difference.
- Columns whose values are not text, such as numbers and booleans.
- Columns that an external system defines.

## Examples

<!-- example:incorrect case="nullable-free-text" -->

```ts file="server/database/contact.schema.ts"
export const contactTable = snakeCase.table("contact", {
  notes: text(),
  phone: text().notNull().default(""),
});
```

<!-- example:correct case="by-kind" -->

```ts file="server/database/contact.schema.ts"
export const contactTable = snakeCase.table("contact", {
  notes: text().notNull(),
  phone: text(),
});
```

```ts file="definitions/contact.defn.ts"
export const ContactUpdateInput = z.object({
  notes: z.string().trim(),
  phone: z.string().trim().min(1).nullable(),
});
```

<!-- example:near-miss case="answer-vs-no-answer" -->

```ts file="server/database/survey.schema.ts"
export const surveyAnswerTable = snakeCase.table("survey_answer", {
  comment: text(),
});
```

## Verify

- The column holds optional text.
- A format-bound value is `NOT NULL` with `""` as "empty", a free-text value is nullable, or a free-text column has a `""` default.
- A form or update path sends `null` for free text, or `""` for a structured value.
- No exception applies. Check for a documented difference between "never answered" and "empty".
