---
id: transition-named-properties
title: Name the properties in a transition
summary: "List the exact properties to animate in `transition-property`. Do not use `transition: all` or the Tailwind `transition-all` class."
applies_when: CSS or Tailwind code sets a transition.
severity: low
source:
  - { title: "Interface Cheat Sheet", url: "https://interfaces.dev/cheat-sheet" }
---

# Name the properties in a transition

## Rule

Name each property that should animate, for example `transition-property: color, background-color`. Do not use `transition: all` or `transition-all`.

## Why

- `all` animates properties that nobody planned to animate, such as width, height or padding. This can cause layout shifts and extra cost.
- A later style change can start to animate by accident.
- A named list shows what the author intended.

## Exceptions

- Prototypes and demos.
- Components that really change many unrelated properties and are small and isolated.

## Examples

<!-- example:incorrect case="transition-all" -->

```tsx file="Button.tsx"
<button className="bg-blue-600 transition-all hover:bg-blue-700">Save</button>
```

<!-- example:correct case="transition-colors" -->

```tsx file="Button.tsx"
<button className="bg-blue-600 transition-colors hover:bg-blue-700">Save</button>
```

<!-- example:correct case="css-list" -->

```css file="button.css"
.button {
  transition-property: background-color, scale;
  transition-duration: 150ms;
}
```

## Library notes

### Tailwind CSS

`transition-colors`, `transition-opacity`, `transition-shadow` and `transition-transform` name their properties. `transition-[scale,opacity]` sets a custom list.

## Verify

- `transition: all`, `transition-property: all` or `transition-all` is present.
- The code does not rely on animating several unrelated properties on purpose.
