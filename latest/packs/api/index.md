# API Endpoints

Applies when: Any project that exposes HTTP or RPC endpoints.

Read a rule file only when the rule may apply. The file of rule `<rule-id>` is `rules/<rule-id>.md`.

- `endpoint-output-schema` [high] Give every endpoint an output schema that strips unknown keys at runtime, so a database row cannot leak its extra columns through a narrower DTO type. When: Endpoints or server functions that return data to clients.
