---
id: disable-transitions-on-theme-switch
title: Disable transitions while switching themes
summary: Turn off all transitions for one frame when the theme changes, so colors change together and not one by one.
applies_when: The app lets users switch between light and dark theme at runtime and styles use color transitions.
severity: low
source:
  - { title: "Interface Cheat Sheet", url: "https://interfaces.dev/cheat-sheet" }
---

# Disable transitions while switching themes

## Rule

When the theme changes at runtime, disable transitions, apply the new theme, force a style recalculation, and then restore transitions.

## Why

- Elements with color transitions fade, and elements without them jump. The page flashes in mixed states.
- Transition durations differ, so parts of the page finish at different times.

## Exceptions

- Apps with no color transitions.
- A deliberate theme animation, such as a view transition that covers the whole page.
- Initial theme set before first paint. No transition runs then.

## Examples

<!-- example:incorrect case="class-toggle-only" -->

```ts file="theme.ts"
export function setTheme(theme: "light" | "dark") {
  document.documentElement.classList.toggle("dark", theme === "dark");
}
```

<!-- example:correct case="suspend-transitions" -->

```ts file="theme.ts"
export function setTheme(theme: "light" | "dark") {
  const style = document.createElement("style");
  style.textContent = "*, *::before, *::after { transition: none !important; }";
  document.head.appendChild(style);

  document.documentElement.classList.toggle("dark", theme === "dark");

  getComputedStyle(document.documentElement).opacity;
  requestAnimationFrame(() => style.remove());
}
```

## Library notes

### next-themes

The `disableTransitionOnChange` prop on `ThemeProvider` does this.

## Verify

- The code changes the theme at runtime, by a class, a data attribute or a media query handler.
- The project has color transitions on themed elements, such as `transition-colors`.
- No step in the code disables transitions during the change.
