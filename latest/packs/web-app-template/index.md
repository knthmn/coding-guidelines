# Web App Convention

Applies when: Only when the project is set up with web-app-template.

Read a rule file only when the rule may apply. The file of rule `<rule-id>` is `rules/<rule-id>.md`.

- `database-defaults` [medium] Add a column default only for timestamps, generated ids, per-row constants or a documented initial state. Otherwise the application sets the value on every insert. When: Code adds or changes a column with `.default(...)` or `.$default(...)` in a Drizzle schema.
- `definition-naming` [low] Give each Zod schema and its inferred type the same name. Put the entity first in DTO and input names, such as `XxxDto`, `XxxCreateInput`, `XxxUpdateInput` and `XxxQuery`. When: Code adds or renames a Zod schema, DTO or input type in `definitions` in a project set up with web-app-template.
- `file-structure` [low] Place server, definition, UI and test files in the folders web-app-template defines, and name them by the folder's pattern. Register each service and adapter in `Cradle`. When: Code adds or moves a file in a project set up with web-app-template.
- `null-vs-empty-string` [medium] Make columns with a format (email, phone, URL, date) nullable. Make free-text columns `NOT NULL` with no default, and pass `""` explicitly for "nothing written". When: Code adds or changes an optional text column, or the schema and form that write to it, in a project set up with web-app-template.
- `service-results` [medium] Services return a neverthrow `Result` with typed errors. Procedures declare those errors with `.errors()`, and handlers call `unwrapOrThrowORPC`. When: Code adds or changes a service method that can fail for a business reason, or the oRPC procedure that calls it, in a project set up with web-app-template.
