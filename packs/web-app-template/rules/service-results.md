---
id: service-results
title: Return typed Results from services and unwrap them in handlers
summary: Services return a neverthrow `Result` with typed errors. Procedures declare those errors with `.errors()`, and handlers call `unwrapOrThrowORPC`.
applies_when: Code adds or changes a service method that can fail for a business reason, or the oRPC procedure that calls it, in a project set up with web-app-template.
severity: medium
source: null
---

# Return typed Results from services and unwrap them in handlers

## Rule

A service method that can fail for a business reason returns a neverthrow `Result`. Its error type is a union of `{ type: "UPPER_SNAKE", data? }` objects. The procedure that calls it declares each error with `.errors()`, and the handler passes the result and `errors` to `unwrapOrThrowORPC`.

## Why

- The error cases show in the method signature, so callers must handle them.
- Services stay free of oRPC. Only the handler maps an error to a response.
- `unwrapOrThrowORPC` accepts only error types that the procedure declares, so a new service error that the procedure does not declare fails to compile.

## Exceptions

- Methods that cannot fail for a business reason. They return the value directly.
- Unexpected failures such as a lost database connection. These throw.
- Procedures that call no service.

## Examples

<!-- example:incorrect case="throw-in-service" -->

```ts file="server/services/InvoiceService.ts"
export class InvoiceService {
  constructor(private deps: Cradle) {}

  public async get(id: string): Promise<InvoiceDto> {
    const row = await this.deps.database.query.invoiceTable.findFirst({
      where: eq(invoiceTable.id, id),
    });
    if (!row) {
      throw new ORPCError("NOT_FOUND");
    }
    return row;
  }
}
```

<!-- example:correct case="result-and-unwrap" -->

```ts file="server/services/InvoiceService.ts"
export class InvoiceService {
  constructor(private deps: Cradle) {}

  public async get(id: string): Promise<Result<InvoiceDto, { type: "NOT_FOUND" }>> {
    const row = await this.deps.database.query.invoiceTable.findFirst({
      where: eq(invoiceTable.id, id),
    });
    if (!row) {
      return err({ type: "NOT_FOUND" });
    }
    return ok(row);
  }
}
```

```ts file="server/endpoints/admin.router.ts"
get: adminProcedure
  .errors({ NOT_FOUND: {} })
  .input(z.object({ id: z.string() }))
  .output(InvoiceDto)
  .handler(async ({ context, input, errors }) =>
    unwrapOrThrowORPC(await context.cradle.invoice.get(input.id), errors),
  ),
```

<!-- example:near-miss case="no-business-failure" -->

```ts file="server/services/InvoiceService.ts"
public async list(query: InvoiceQuery): Promise<InvoiceListItemDto[]> {
  return this.deps.database.select().from(invoiceTable);
}
```

## Verify

- The method can fail for a business reason such as not found, not allowed or invalid state.
- The method throws an oRPC error or a plain error for that case, or returns a bare value or `null`, instead of a `Result`.
- Or: the procedure calls a `Result`-returning method without `.errors()` for each error type, or without `unwrapOrThrowORPC`.
