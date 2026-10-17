---
id: file-structure
title: Put each kind of file in its folder and name it by convention
summary: Place server, definition, UI and test files in the folders web-app-template defines, and name them by the folder's pattern. Register each service and adapter in `Cradle`.
applies_when: Code adds or moves a file in a project set up with web-app-template.
severity: low
source: null
---

# Put each kind of file in its folder and name it by convention

## Rule

Place each file in the folder for its kind and use the name pattern of that folder. Paths below are relative to `packages/web/src`.

| Folder             | Holds                                    | Naming                                                                                                                          |
| ------------------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `server/database`  | Drizzle schemas                          | `<domain>.schema.ts`. Tables are `xxxTable`.                                                                                    |
| `server/services`  | Business logic and adapters              | Class `XxxService` in `XxxService.ts`. A wrapper around an external system is `XxxAdapter`. Each one is registered in `Cradle`. |
| `server/endpoints` | oRPC routers                             | `<name>.router.ts`                                                                                                              |
| `definitions`      | Zod schemas and inferred types           | `<entity>.defn.ts`, one per entity                                                                                              |
| `components/ui`    | Shared UI primitives                     | Files per component                                                                                                             |
| `lib`              | Helpers that are not hooks or components | Files per helper                                                                                                                |
| `hooks`            | React hooks                              | `useXxx.ts`                                                                                                                     |
| `routes`           | TanStack Router route files              | Router file naming                                                                                                              |
| `email`            | Email templates                          | `XxxEmail.tsx`                                                                                                                  |

- Put a test next to the code it tests, as `*.test.ts` or `*.test.tsx`.
- How to divide routers (by portal, by domain, one router) is a choice of the app. This rule does not prescribe it.

## Why

- A fixed place and name lets readers and agents find a file without searching.
- Registration in `Cradle` keeps dependencies typed and injectable in tests.
- A test next to its code is found, moved and deleted with that code.

## Exceptions

- Files that the framework fixes in place, such as `router.tsx`, `start.ts`, `server.ts` and `routeTree.gen.ts`.
- Feature components in `components/<feature>`. `components/ui` is only for shared primitives.
- End-to-end tests, which live in `e2e`.
- A folder the template does not have yet (`definitions`, `hooks`) may be created when first needed.
- Code that is used by one route only may sit next to that route (see the `code-organization` pack).

## Examples

<!-- example:incorrect case="misplaced-service" -->

```ts file="server/utils/billing.ts"
export class Billing {
  constructor(private deps: Cradle) {}
}
```

```ts file="server/cradle.ts"
export type Cradle = {
  logger: Logger;
  database: Drizzle;
};
```

<!-- example:correct case="registered-service" -->

```ts file="server/services/InvoiceService.ts"
export class InvoiceService {
  constructor(private deps: Cradle) {}
}
```

```ts file="server/services/registrations.ts"
export const serviceRegistrations: NameAndRegistrationPair<Cradle> = {
  invoice: asClass(InvoiceService).singleton(),
};
```

```ts file="server/cradle.ts"
export type Cradle = {
  logger: Logger;
  database: Drizzle;
  invoice: InvoiceService;
};
```

<!-- example:correct case="schema-and-definition" -->

```ts file="server/database/invoice.schema.ts"
export const invoiceTable = snakeCase.table("invoice", {
  id: text().primaryKey(),
});
```

```ts file="definitions/invoice.defn.ts"
export const InvoiceDto = z.object({ id: z.string() });
export type InvoiceDto = z.infer<typeof InvoiceDto>;
```

<!-- example:near-miss case="router-division" -->

```ts file="server/endpoints/admin.router.ts"
export const adminRouter = {
  invoices: { list: adminProcedure.handler(() => []) },
};
```

## Verify

- The file is new or moved, and its folder or name differs from the table.
- No exception applies (framework-fixed file, feature component, e2e test).
- A new service or adapter is missing from `Cradle`, or a service is missing from `serviceRegistrations`.
- Do not report how routers are divided.
