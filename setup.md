# Setup

Steps for an agent that sets up a project to use these guidelines. Ask the user before each change.

1. **Install the skill.** Copy `SKILL.md` into the project's or the user's skill folder for the agent in use (for example `.claude/skills/coding-guidelines/`, `.agents/skills/coding-guidelines/` or `~/.pi/agent/skills/coding-guidelines/`). Skip this when the skill is already installed for the user.
2. **Pin a version.** Add a line to the project's `AGENTS.md`:

   ```
   Coding guidelines: https://knthmn.github.io/coding-guidelines/<version>/
   ```

   Use the newest tagged version unless the user names one.

3. **Template identity.** If the project was created from web-app-template, add:

   ```
   This project is set up with web-app-template.
   ```

4. **Overrides.** Add exemptions or opt-outs only when the user asks for them:

   ```
   Guideline exemption: <rule-id>, scope <path or area>, reason <reason>
   Guideline opt-out: pack <pack-id>, reason <reason>
   ```

5. **Review integration (optional).** If the user runs an agent code review, add a step that selects packs from the change and checks each rule in the selected packs. See `.dev/plan/design.md` in this repository, section "Review integration".
