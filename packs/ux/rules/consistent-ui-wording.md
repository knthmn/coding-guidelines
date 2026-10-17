---
id: consistent-ui-wording
title: Keep interface wording consistent
summary: Use sentence case, address the reader as "you", name each thing the same way everywhere, describe where links go, and word toggles by what they do when on.
applies_when: Code adds or changes visible interface text, such as labels, headings, buttons, links, toggles or messages.
severity: low
source:
  - { title: "interfaces.dev cheat sheet: Writing", url: "https://interfaces.dev/cheat-sheet" }
  - {
      title: "Vercel Web Interface Guidelines: Copywriting",
      url: "https://vercel.com/design/guidelines",
    }
  - {
      title: "ui-skills: fixing-accessibility",
      url: "https://github.com/ibelick/ui-skills/blob/main/skills/fixing-accessibility/SKILL.md",
    }
  - {
      title: "GOV.UK Design System: Text input, labels",
      url: "https://design-system.service.gov.uk/components/text-input/",
    }
---

# Keep interface wording consistent

## Rule

Follow the project's text conventions. If it has none, use sentence case, speak to "you" rather than "the user", and keep one name for each concept. Link text says where the link goes, not "click here". Label a toggle by what happens when on ("Send read receipts"), not by the negative.

## Why

- Mixed case and mixed names make a product feel inconsistent and cause doubt about whether two terms mean one thing.
- "Click here" is useless in a list of links.
- A toggle named "Disable x" makes "on" mean off.

## Exceptions

- A style guide or brand voice in the project that sets another case or tone. Follow it.
- Proper nouns, acronyms and product names.
- Legal text that requires specific wording.

## Examples

<!-- example:incorrect case="mixed-wording" -->

```tsx file="Settings.tsx"
<h1>SETTINGS</h1>
<p>The user will receive an email. <a href="/docs">Click here</a> to learn more.</p>
<Switch label="Disable read receipts" />
<button>Save Draft</button>
```

<!-- example:correct case="consistent-wording" -->

```tsx file="Settings.tsx"
<h1>Settings</h1>
<p>You will receive an email. <a href="/docs">Read the docs</a> to learn more.</p>
<Switch label="Send read receipts" />
<button>Save draft</button>
```

<!-- example:near-miss case="title-case-style-guide" -->

```tsx file="Settings.tsx"
<h1>Account Settings</h1>
<button>Save Changes</button>
```

## Verify

- The project's conventions, if any, are checked first. The near-miss applies where Title Case is the convention.
- Mixed cases or names exist in the same view.
