---
id: minimum-hit-target-size
title: Make hit targets at least 24px, and 44px on touch
summary: Give controls a clickable area of at least 24 by 24 px, and 44 px on touch screens. Expand the hit area with padding or a pseudo-element when the visible icon is smaller.
applies_when: Code styles icon buttons, checkboxes, radios, close buttons, tags or inline controls.
severity: low
source:
  - {
      title: "Vercel Web Interface Guidelines: Interactions",
      url: "https://vercel.com/design/guidelines",
    }
  - {
      title: "interfaces.dev cheat sheet: Accessibility",
      url: "https://interfaces.dev/cheat-sheet",
    }
---

# Make hit targets at least 24px, and 44px on touch

## Rule

Controls need a hit area of at least 24 by 24 CSS pixels. On touch screens, aim for 44 by 44. If the visible element is smaller, enlarge the hit area without changing its look. Targets must not overlap.

## Why

- Small targets cause missed taps and wrong actions, especially for users with tremor.
- A label and its checkbox should share one target, with no dead gap between them.

## Exceptions

- Inline links in a sentence.
- Controls with at least 24 px of spacing around them, as WCAG 2.2 permits.
- Native controls whose user agent sets the size.

## Examples

<!-- example:incorrect case="small-icon-button" -->

```tsx file="CloseButton.tsx"
<button aria-label="Close" className="size-4">
  <XIcon className="size-4" />
</button>
```

<!-- example:correct case="expanded-hit-area" -->

```tsx file="CloseButton.tsx"
<button
  aria-label="Close"
  className="relative size-4 after:absolute after:-inset-3 after:content-['']"
>
  <XIcon className="size-4" />
</button>
```

## Verify

- The control's computed box is smaller than 24 px in either direction and has no larger padding or pseudo-element.
- The target is not an inline link or a control with adequate spacing.
