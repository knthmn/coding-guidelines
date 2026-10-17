---
id: single-theme-switch-mechanism
title: Use one mechanism to switch themes
summary: Choose either the `prefers-color-scheme` media query or a `.dark` class (or data attribute) for theming. Do not mix both in the same styles.
applies_when: The project supports dark mode.
severity: medium
source:
  - { title: "Interface Cheat Sheet", url: "https://interfaces.dev/cheat-sheet" }
---

# Use one mechanism to switch themes

## Rule

Switch themes in one way: the `prefers-color-scheme` media query, or a class or data attribute on the root. If you need both a user choice and system preference, resolve the system preference once in JavaScript or in one CSS block, and set the class.

## Why

- Mixed mechanisms make some surfaces follow the system and others follow the user. The page shows two themes at once.
- One source of truth is easier to debug.

## Exceptions

- One CSS block that applies the same tokens under both selectors, to support "system" and "dark" choices.
- Print styles and `forced-colors` rules. They are separate.

## Examples

<!-- example:incorrect case="mixed-mechanisms" -->

```css file="theme.css"
.dark .card {
  background: #0a0a0a;
}
@media (prefers-color-scheme: dark) {
  .banner {
    background: #0a0a0a;
  }
}
```

<!-- example:correct case="class-only" -->

```css file="theme.css"
.dark {
  --color-surface: #0a0a0a;
}
.card,
.banner {
  background: var(--color-surface);
}
```

<!-- example:near-miss case="system-and-class-in-one-block" -->

```css file="theme.css"
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-surface: #0a0a0a;
  }
}
:root[data-theme="dark"] {
  --color-surface: #0a0a0a;
}
```

## Library notes

### Tailwind CSS

In v4, `dark:` follows the media query by default. To use a class, add `@custom-variant dark (&:where(.dark, .dark *));`. Without it, `dark:` classes ignore the class.

## Verify

- Both `@media (prefers-color-scheme: dark)` and a class or attribute selector set colors in the project.
- They are not tied to one block that defines the same tokens.
