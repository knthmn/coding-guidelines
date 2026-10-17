---
id: database-defaults
title: Use database defaults only when the database owns the value
summary: Add a column default only for timestamps, generated ids, per-row constants or a documented initial state. Otherwise the application sets the value on every insert.
applies_when: Code adds or changes a column with `.default(...)` or `.$default(...)` in a Drizzle schema.
severity: medium
source: null
---

# Use database defaults only when the database owns the value

## Rule

Give a column a database default only when the database is the right owner of the value:

- Timestamps such as `createdAt` and `updatedAt`.
- Generated values such as ids and sequences.
- Constants that do not vary per row, such as a discriminator column used in a composite foreign key.
- Optionally, an initial state such as a `status` of `"pending"`. Setting it in the service that creates the row is equally fine. Document the default if you keep it.

For every other column, the application sets the value on each insert.

## Why

- In Drizzle, a column with a default is optional in the insert type. A forgotten field compiles and silently stores the default.
- Without a default, TypeScript requires every insert to state the value. The compiler then finds each place that forgot it.
- A value that is "empty" by convention, such as `""` or `{}`, is still a business decision. The insert should show it.

## Exceptions

- The four kinds of value in the rule.
- Columns of tables that the application does not insert into, such as tables filled by an external tool.

## Examples

<!-- example:incorrect case="empty-default" -->

```ts file="server/database/note.schema.ts"
export const noteTable = snakeCase.table("note", {
  id: text().primaryKey(),
  body: text().notNull().default(""),
  tags: jsonb().notNull().default([]),
});
```

<!-- example:correct case="app-sets-value" -->

```ts file="server/database/note.schema.ts"
export const noteTable = snakeCase.table("note", {
  id: text().primaryKey(),
  body: text().notNull(),
  tags: jsonb().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});
```

<!-- example:near-miss case="constant-discriminator" -->

```ts file="server/database/user.schema.ts"
export const adminProfileTable = snakeCase.table("admin_profile", {
  userId: text().primaryKey(),
  userType: text().notNull().default("admin"),
});
```

## Verify

- The column has `.default(...)`, `.$default(...)` or `.defaultNow()` in a Drizzle schema.
- The default is not a timestamp, a generated id, a per-row-constant, or a documented initial state.
- The inserts of that table do not need the field to be optional.
