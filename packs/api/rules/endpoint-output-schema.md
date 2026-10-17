---
id: endpoint-output-schema
title: Declare an output schema that removes undeclared fields
summary: Give every endpoint an output schema that strips unknown keys at runtime, so a database row cannot leak its extra columns through a narrower DTO type.
applies_when: Endpoints or server functions that return data to clients.
severity: high
source: null
---

# Declare an output schema that removes undeclared fields

## Rule

Every endpoint declares an output schema. The schema removes fields it does not declare, and the response is the parsed result. Use the library's output option (for example `.output()` in oRPC or tRPC), or parse the response with a schema before sending it.

## Why

- TypeScript does not reject extra properties on a value that is assigned to a narrower type. A database row typed as `UserDto` still holds every column at runtime.
- The endpoint then sends all columns, password hashes and internal flags included.
- A type annotation checks nothing at runtime. A schema that strips keys makes the response match the declared shape.
- A new column then does not reach clients until someone adds it to the schema.

## Exceptions

- Endpoints that return no data, or only a status.
- Endpoints that stream or return files, where the body is not a JSON object.
- Endpoints that build the response from explicit fields in the handler, for example a mapper that copies named fields. A schema is still preferred.

## Examples

<!-- example:incorrect case="row-as-dto" -->

```ts file="user.router.ts"
type UserDto = { id: string; name: string };

export const getUser = os
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }): Promise<UserDto> => {
    return db.query.users.findFirst({ where: eq(users.id, input.id) });
  });
```

<!-- example:incorrect case="loose-schema" -->

```ts file="user.router.ts"
const UserDto = z.looseObject({ id: z.string(), name: z.string() });

export const getUser = os
  .input(z.object({ id: z.string() }))
  .output(UserDto)
  .handler(async ({ input }) => {
    return db.query.users.findFirst({ where: eq(users.id, input.id) });
  });
```

<!-- example:correct case="output-schema" -->

```ts file="user.router.ts"
const UserDto = z.object({ id: z.string(), name: z.string() });

export const getUser = os
  .input(z.object({ id: z.string() }))
  .output(UserDto)
  .handler(async ({ input }) => {
    return db.query.users.findFirst({ where: eq(users.id, input.id) });
  });
```

<!-- example:correct case="parse-before-send" -->

```ts file="users.route.ts"
const UserDto = z.object({ id: z.string(), name: z.string() });

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const row = await db.query.users.findFirst({ where: eq(users.id, params.id) });
  if (!row) return new Response(null, { status: 404 });
  return Response.json(UserDto.parse(row));
}
```

<!-- example:near-miss case="status-only" -->

```ts file="user.router.ts"
export const deleteUser = os.input(z.object({ id: z.string() })).handler(async ({ input }) => {
  await db.delete(users).where(eq(users.id, input.id));
});
```

## Library notes

### Zod

- In Zod 4, `z.object` strips unknown keys when it parses. Checked with Zod 4.6: `z.object({ a: z.string() }).parse({ a: "x", b: 1 })` returns `{ a: "x" }`. Nested objects and array items are stripped as well.
- `z.looseObject`, and `.passthrough()` or `.loose()` on an object, keep unknown keys. Do not use them in output schemas.
- `z.strictObject` throws on unknown keys instead of removing them. The response fails with a server error, so it does not leak.

### oRPC

- `.output(schema)` validates the handler result at runtime. The server uses the value the schema returns, so a stripping schema removes unknown keys.
- Output that fails validation gives an `INTERNAL_SERVER_ERROR`.

### tRPC

- `.output(parser)` runs the parser on the result of the procedure and returns the parsed data. A stripping schema removes unknown keys.
- Failed output validation gives an `INTERNAL_SERVER_ERROR`.
- The tRPC docs name "not returning more data than necessary" as a reason to define an output validator.

## Verify

- The endpoint returns data to clients, and the data comes from a database row, a service or another source with more fields than the DTO.
- The output schema exists. A return type annotation alone does not count.
- The schema strips unknown keys. In Zod there is no `.passthrough()`, `.loose()` or `z.looseObject` anywhere in the schema, including nested objects.
- The library parses the output at runtime and sends the parsed value. A type-only check (a generic, an annotation, `satisfies`) does not count.
- For the manual form, the code sends the result of `parse`, not the original row.
