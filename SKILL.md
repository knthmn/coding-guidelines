---
name: coding-guidelines
description: Coding guidelines for writing and reviewing code. Use when writing, changing or reviewing code in a project, to find the rules that apply (React, web frontend, UX, UI styling, API endpoints, code organization, web-app-template conventions).
---

# Coding guidelines

The guidelines are grouped into packs. Each pack has an "applies when" condition. Load only the packs and rules that apply.

## Find the index

1. Read the project's `AGENTS.md`. Look for a line such as `Coding guidelines: <url>`. The URL points to one published version.
2. If there is no such line, use `https://knthmn.github.io/coding-guidelines/latest/`.
3. Fetch `<url>/index.md`. It lists the packs, their conditions and their signals.
4. Without network access, run `pnpm build` in a local checkout of this repository and read `dist/index.md`.

## Select packs and rules

- Judge each pack's "applies when" condition against the project and the change. Use the signals and `AGENTS.md`.
- For a pack that applies, fetch `packs/<pack-id>/index.md`. It lists one rule per line.
- Read a rule file only when the rule may apply to the code at hand.

## Project overrides

`AGENTS.md` can change what applies:

- `Guideline exemption: <rule-id>, scope <path or area>, reason <reason>` exempts a rule. If an exemption names no rule id, ask the user instead of skipping rules.
- `Guideline opt-out: pack <pack-id>, reason <reason>` turns off a pack that applies by default.
