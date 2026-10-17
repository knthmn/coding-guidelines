---
id: stagger-entrances-in-groups
title: Stagger entrances by group
summary: Animate entering content in small groups, such as heading, text and actions, with a short delay between groups. Do not animate one large block or each word.
applies_when: A section of a page or a panel animates in with several parts.
severity: low
source:
  - { title: "Interface Cheat Sheet", url: "https://interfaces.dev/cheat-sheet" }
---

# Stagger entrances by group

## Rule

When several parts enter together, split them into a few semantic groups, such as heading, body and actions. Give each group the same animation with a short delay, about 50 to 100ms, after the one before.

## Why

- One large block moving as a unit looks heavy.
- Staggering every small element makes the sequence slow and busy.
- Groups lead the eye in reading order.

## Exceptions

- A single element.
- Content that must be readable at once, such as an error message.
- Reduced motion preference. Skip the stagger.

## Examples

<!-- example:incorrect case="one-block" -->

```tsx file="Hero.tsx"
<div className="animate-enter">
  <h1>Build software that never breaks</h1>
  <p>The experience layer for modern product teams.</p>
  <Button>Request a demo</Button>
</div>
```

<!-- example:correct case="grouped-delay" -->

```tsx file="Hero.tsx"
<div>
  <h1 className="animate-enter">Build software that never breaks</h1>
  <p className="animate-enter [animation-delay:80ms]">
    The experience layer for modern product teams.
  </p>
  <Button className="animate-enter [animation-delay:160ms]">Request a demo</Button>
</div>
```

<!-- example:near-miss case="single-element" -->

```tsx file="Banner.tsx"
<p className="animate-enter">Changes saved</p>
```

## Library notes

### Tailwind CSS

`animate-enter` stands for a project-defined animation. Delay can come from `[animation-delay:80ms]` or a CSS variable such as `style={{ "--i": index }}` with `animation-delay: calc(var(--i) * 80ms)`.

## Verify

- Several parts enter together on one trigger.
- They share one animation and one delay, or each word or tiny element has its own delay.
- A reviewer cannot judge feel from code. Treat this rule as author guidance.
