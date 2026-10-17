# Code Organization

Applies when: Any project, unless its AGENTS.md opts out of this pack.

Read a rule file only when the rule may apply. The file of rule `<rule-id>` is `rules/<rule-id>.md`.

- `colocate-single-use-code` [low] Put a component, hook or helper used by one route next to that route. Move it to a shared folder when a second route uses it. When: Code adds or moves a component, hook or helper that only one route or page uses.
