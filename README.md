# Coding guidelines

Coding rules for humans and agents, grouped into packs. Each pack has an "applies when" condition, and an agent loads only the packs and rules that apply.

## Use

- Agents: install [`SKILL.md`](SKILL.md) as a skill. It explains how to find the index and select packs.
- Projects: follow [`setup.md`](setup.md).

## Repository layout

```
SKILL.md                 entry point for agents
setup.md                 project setup steps for an agent
packs/<pack-id>/
  pack.md                pack metadata
  rules/<rule-id>.md     one rule per file
guides/rule-template.md  rule template
guides/writing-rules.md  how to write a rule
site/                    rule browser (Astro Starlight) and agent index endpoints
site/schema.ts           frontmatter schema
```

## Scripts

Requires Node.js 24 or newer (see `.node-version`) and pnpm.

| Command          | Result                                                                                   |
| ---------------- | ---------------------------------------------------------------------------------------- |
| `pnpm build`     | Checks rule frontmatter, then builds the rule browser and the agent indexes into `dist/` |
| `pnpm dev`       | Serves the rule browser and the agent indexes locally                                    |
| `pnpm preview`   | Serves the built `dist/` locally                                                         |
| `pnpm typecheck` | Type checks the scripts and the site                                                     |
| `pnpm fmt`       | Formats all files with oxfmt                                                             |

Set `SITE_BASE` (for example `/coding-guidelines/`) when the site is served from a subpath.

Generated files are not committed.

## Sources

Rules adapted from external sources name and link them in their `source` field. Rules are rewritten, not copied.
