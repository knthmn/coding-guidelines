---
id: definition-naming
title: Name definitions entity first, with one name for schema and type
summary: Give each Zod schema and its inferred type the same name. Put the entity first in DTO and input names, such as `XxxDto`, `XxxCreateInput`, `XxxUpdateInput` and `XxxQuery`.
applies_when: Code adds or renames a Zod schema, DTO or input type in `definitions` in a project set up with web-app-template.
severity: low
source: null
---

# Name definitions entity first, with one name for schema and type

## Rule

Export a Zod schema and its inferred type under the same name. Start every name with the entity:

| Use            | Name             |
| -------------- | ---------------- |
| Output         | `XxxDto`         |
| List row       | `XxxListItemDto` |
| Create         | `XxxCreateInput` |
| Update         | `XxxUpdateInput` |
| Other mutation | `Xxx<Verb>Input` |
| List filter    | `XxxQuery`       |

## Why

- One name for value and type means one import and no `xxxSchema` against `Xxx` pair to keep in sync.
- Entity first groups all names of one entity together in sorted lists and autocomplete.
- A fixed suffix tells a reader whether a type is input or output.

## Exceptions

- Schemas that are not tied to an entity, such as shared fragments or helpers (`personDtoFields`).
- Names that come from a library or external API.
- Existing names in a project that has not migrated. Do not rename them in unrelated changes.

## Examples

<!-- example:incorrect case="verb-first" -->

```ts file="definitions/invoice.defn.ts"
export const CreateInvoiceInput = z.object({ title: z.string() });
export type CreateInvoiceInput = z.infer<typeof CreateInvoiceInput>;

export const UpdateInvoiceInput = z.object({ title: z.string() });
export type UpdateInvoiceInput = z.infer<typeof UpdateInvoiceInput>;
```

<!-- example:incorrect case="split-names" -->

```ts file="definitions/invoice.defn.ts"
export const invoiceSchema = z.object({ id: z.string() });
export type Invoice = z.infer<typeof invoiceSchema>;
```

<!-- example:correct case="entity-first" -->

```ts file="definitions/invoice.defn.ts"
export const InvoiceDto = z.object({ id: z.string(), title: z.string() });
export type InvoiceDto = z.infer<typeof InvoiceDto>;

export const InvoiceListItemDto = InvoiceDto.pick({ id: true, title: true });
export type InvoiceListItemDto = z.infer<typeof InvoiceListItemDto>;

export const InvoiceCreateInput = z.object({ title: z.string() });
export type InvoiceCreateInput = z.infer<typeof InvoiceCreateInput>;

export const InvoiceUpdateInput = InvoiceCreateInput.partial();
export type InvoiceUpdateInput = z.infer<typeof InvoiceUpdateInput>;

export const InvoiceQuery = z.object({ search: z.string().optional() });
export type InvoiceQuery = z.infer<typeof InvoiceQuery>;
```

<!-- example:near-miss case="shared-fragment" -->

```ts file="definitions/person.defn.ts"
const personDtoFields = {
  name: z.string(),
  email: z.string().nullable(),
};
```

## Verify

- The name is exported from a definitions file and describes an entity's DTO or input.
- The name has the verb first, or the schema and type have different names.
- No exception applies.
