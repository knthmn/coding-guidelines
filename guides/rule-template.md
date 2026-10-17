---
id: rule-id
title: Rule title in sentence case
summary: One line that tells an agent what to do. Shown in the pack index.
applies_when: One line that tells an agent when the rule is relevant.
severity: medium
source: null
---

# Rule title in sentence case

## Rule

One or two sentences. State what to do, not what to avoid, when possible.

## Why

- One reason per bullet. State each reason once.

## Exceptions

- When the rule does not apply. A checker reads this before it reports a violation.

## Examples

<!-- example:incorrect case="short-case-id" -->

```tsx file="Example.tsx"
// Code that breaks the rule.
```

<!-- example:correct case="another-case-id" -->

```tsx file="Example.tsx"
// The same code, following the rule.
```

<!-- example:near-miss case="third-case-id" -->

```tsx file="Example.tsx"
// Code that looks like a violation but falls under an exception.
```

## Library notes

### Library name

Library-specific behavior that the general rule depends on. Delete this section when there is none.

## Verify

- What a reviewer checks to confirm a violation before reporting it.
