---
id: text-transform-for-letter-case
title: Store text in normal case and use text-transform for display case
summary: Write strings in normal capitalization and use CSS `text-transform` to show uppercase, lowercase or capitalized text.
applies_when: A label, heading or badge is shown in all caps, lowercase or title case.
severity: low
source:
  - { title: "Interface Cheat Sheet", url: "https://interfaces.dev/cheat-sheet" }
---

# Store text in normal case and use text-transform for display case

## Rule

Write strings in normal capitalization in the source. When the design needs uppercase, lowercase or capitalized text, apply `text-transform`.

## Why

- Copying, searching and screen reader output keep the original text.
- A design change needs one CSS edit and no string changes.
- Translations keep correct capitalization rules for each language.

## Exceptions

- Acronyms and brand names that are written in caps, such as "API".
- Text that must be uppercase in the data, such as a code or a license key.

## Examples

<!-- example:incorrect case="hardcoded-caps" -->

```tsx file="SectionLabel.tsx"
<h3 className="text-xs tracking-wide">ACCOUNT SETTINGS</h3>
```

<!-- example:correct case="text-transform" -->

```tsx file="SectionLabel.tsx"
<h3 className="text-xs uppercase tracking-wide">Account settings</h3>
```

<!-- example:near-miss case="acronym" -->

```tsx file="ApiLabel.tsx"
<h3>API keys</h3>
```

## Verify

- A string is written in all caps, all lowercase or title case in the source.
- The string is not an acronym, a brand name or a code that is uppercase in the data.
