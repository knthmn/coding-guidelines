---
id: server-auth-actions
title: Authenticate and authorize inside every server function
summary: Check the caller's identity and permissions inside each server function or in middleware attached to it. Do not rely on page, layout or route guards.
applies_when: Server functions that the client can call, such as React Server Actions or TanStack Start server functions, especially ones that read or change data.
severity: critical
source:
  - title: Vercel React Best Practices
    url: https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/server-auth-actions.md
---

# Authenticate and authorize inside every server function

## Rule

Treat each server function as a public endpoint. Check who the caller is and whether they may perform this action inside the function, or in middleware that is attached to the function itself. Validate the input before you use it.

## Why

- A server function is reachable by a direct request. A caller does not need to load the page that renders its UI.
- A guard on a page, layout or route controls what UI renders. It does not run when someone calls the function directly.
- Input comes from the client. An id in the input is a claim, not proof that the caller owns the record.

## Exceptions

- Functions that are public by design, such as a public search or a newsletter sign-up. They still validate input.
- Auth that runs in middleware attached to the function (for example a function middleware in TanStack Start). The function does not repeat the check.
- Functions that only run on the server and are never exposed to the client, such as helpers called from other server code.

## Examples

<!-- example:incorrect case="no-auth-check" -->

```ts file="actions.ts"
"use server";

export async function deleteUser(userId: string) {
  await db.user.delete({ where: { id: userId } });
  return { success: true };
}
```

<!-- example:incorrect case="page-guard-only" -->

```tsx file="AdminPage.tsx"
import { deleteUser } from "./actions";

export default async function AdminPage() {
  const session = await verifySession();
  if (session?.user.role !== "admin") redirect("/login");

  return <DeleteUserForm action={deleteUser} />;
}
```

<!-- example:correct case="check-inside-function" -->

```ts file="actions.ts"
"use server";

const deleteUserInput = z.object({ userId: z.string().uuid() });

export async function deleteUser(input: unknown) {
  const { userId } = deleteUserInput.parse(input);

  const session = await verifySession();
  if (!session) throw unauthorized("Must be logged in");
  if (session.user.role !== "admin" && session.user.id !== userId) {
    throw unauthorized("Cannot delete other users");
  }

  await db.user.delete({ where: { id: userId } });
  return { success: true };
}
```

<!-- example:near-miss case="auth-in-middleware" -->

```ts file="users.functions.ts"
const authMiddleware = createMiddleware({ type: "function" }).server(async ({ next }) => {
  const session = await verifySession();
  if (!session) throw unauthorized("Must be logged in");
  return next({ context: { session } });
});

export const deleteUser = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    await deleteOwnedUser(context.session, data);
  });
```

## Library notes

### React Server Actions (Next.js)

- A function marked `"use server"` that is exported can be reached by a direct POST request, even when no code imports it.
- A check in a page or layout does not cover an action defined or used there. The Next.js data security guide says to verify authentication and authorization inside each action.

### TanStack Start

- `createServerFn()` defines a server function. Server function middleware (`createMiddleware({ type: "function" })`, attached with `.middleware([...])`) can run the auth check and pass the session on through `next({ context })`.
- Derive the session on the server, for example from a cookie. Do not read it from client-sent context.
- Start applies CSRF protection to server functions. That does not replace authentication or authorization.

## Verify

- The function is reachable from the client.
- Neither the function body nor middleware attached to it checks the caller. A check elsewhere (page, layout, route) does not count.
- The function is not public by design. Check what it reads or changes.
