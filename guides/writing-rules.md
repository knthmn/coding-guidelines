# Writing rules

## Does it belong here?

- **Lint** handles patterns that syntax alone can show. If a lint rule can express it, configure lint instead.
- **Tests** handle behavior: given this input, expect this output.
- **Guidelines** handle judgment that needs context: intent, data flow across files, conventions a linter cannot see.
- Leave out mistakes that current coding models do not make. A rule that never fires costs context and review time.

## Pack or rule?

- A pack groups rules that share one `applies_when` condition, such as "the project uses React".
- State a rule generally when the principle holds beyond one library. Put library behavior under `## Library notes`, one `### <library>` section each.
- Do not create one pack per library.

## Frontmatter

| Field          | Meaning                                                                                      |
| -------------- | -------------------------------------------------------------------------------------------- |
| `id`           | Lowercase slug, equal to the file name. Never rename it: projects exempt rules by id.        |
| `title`        | Sentence case. The first heading repeats it.                                                 |
| `summary`      | One line, at most 200 characters. What to do, written for the pack index.                    |
| `applies_when` | One line. When the rule is relevant.                                                         |
| `severity`     | `critical`, `high`, `medium` or `low`, the same scale as code review. A preference is `low`. |
| `source`       | `null` for own rules. Otherwise a list of `{ title, url }` entries.                          |

## Body

Sections, in this order: `Rule`, `Why`, `Exceptions`, `Examples`, `Library notes` (optional), `Verify`.

- **Rule.** One or two sentences.
- **Why.** One reason per bullet.
- **Exceptions.** Required. Most false positives come from rules without stated exceptions. Write "None." only when that is true.
- **Examples.** At least one `incorrect` and one `correct` example. Add `near-miss` examples for code that looks like a violation but falls under an exception.
- **Verify.** What a reviewer confirms before reporting a violation.

## Examples

Each example starts with a marker, followed by one or more fenced code blocks:

````md
<!-- example:incorrect case="reset-on-close" -->

```tsx file="UserList.tsx"
...
```
````

- `case` is a slug, unique within the rule.
- `file` names the file. Several blocks under one marker form a multi-file case.
- Keep examples realistic and short.

## Wording

- Short, plain sentences. No filler, no intensifiers.
- Put code in backticks everywhere, including `summary` and `applies_when`. Quote a frontmatter value that starts with a backtick.
- Do not copy text from external sources. Rewrite it and link the source.

## Check

Run `pnpm build` before committing. It fails on frontmatter problems.
