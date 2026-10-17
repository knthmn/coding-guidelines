---
id: tabular-numbers-for-changing-values
title: Use tabular numbers for values that change or align
summary: "Set `font-variant-numeric: tabular-nums` on timers, counters, prices and table columns, so digits keep the same width."
applies_when: Numbers update in place or line up in columns, such as timers, counters, prices and tables.
severity: low
source:
  - { title: "Interface Cheat Sheet", url: "https://interfaces.dev/cheat-sheet" }
---

# Use tabular numbers for values that change or align

## Rule

Set `font-variant-numeric: tabular-nums` on numbers that update in place or stack in a column.

## Why

- Proportional digits have different widths. When a value changes, the text around it moves.
- Tabular digits line up in columns, so people can compare values.

## Exceptions

- Monospace fonts. Their digits already have equal width.
- Static numbers in running text.
- Fonts with no tabular figures. The property has no effect there.

## Examples

<!-- example:incorrect case="proportional-timer" -->

```tsx file="Timer.tsx"
<span className="text-2xl">{formatTime(seconds)}</span>
```

<!-- example:correct case="tabular-timer" -->

```tsx file="Timer.tsx"
<span className="text-2xl tabular-nums">{formatTime(seconds)}</span>
```

<!-- example:near-miss case="monospace" -->

```tsx file="Timer.tsx"
<span className="font-mono text-2xl">{formatTime(seconds)}</span>
```

## Library notes

### Tailwind CSS

`tabular-nums` sets `font-variant-numeric: tabular-nums`.

## Verify

- The value changes over time or sits in a column of numbers.
- The font is not monospace.
- No `tabular-nums` is set on the element or an ancestor.
- Check the font. Some fonts lack tabular figures. A reviewer cannot confirm this from code.
