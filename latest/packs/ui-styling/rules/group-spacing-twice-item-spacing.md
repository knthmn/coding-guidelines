---
id: group-spacing-twice-item-spacing
title: Space groups at least twice as far apart as items
summary: Leave at least twice as much space between groups as between items inside a group, for example 8px between items and 16px or more between groups.
applies_when: A layout has lists, forms or settings with several groups of related items.
severity: low
source:
  - { title: "Interface Cheat Sheet", url: "https://interfaces.dev/cheat-sheet" }
---

# Space groups at least twice as far apart as items

## Rule

Make the gap between groups at least twice the gap between items inside a group. For example, use 8px between items and 16px or more between groups.

## Why

- Proximity shows which items belong together.
- When both gaps are equal, people cannot see where one group ends.

## Exceptions

- Lists with one group.
- Dense data tables or grids where a uniform gap is part of the design.
- Groups that are separated by a divider or a heading, if the grouping stays clear.

## Examples

<!-- example:incorrect case="equal-gaps" -->

```tsx file="NotificationSettings.tsx"
<div className="flex flex-col gap-2">
  <h3>Notifications</h3>
  <Toggle label="Email" />
  <Toggle label="Push" />
  <h3>Privacy</h3>
  <Toggle label="Profile" />
  <Toggle label="Receipts" />
</div>
```

<!-- example:correct case="group-gap-larger" -->

```tsx file="NotificationSettings.tsx"
<div className="flex flex-col gap-6">
  <section className="flex flex-col gap-2">
    <h3>Notifications</h3>
    <Toggle label="Email" />
    <Toggle label="Push" />
  </section>
  <section className="flex flex-col gap-2">
    <h3>Privacy</h3>
    <Toggle label="Profile" />
    <Toggle label="Receipts" />
  </section>
</div>
```

<!-- example:near-miss case="single-group" -->

```tsx file="Tags.tsx"
<ul className="flex flex-col gap-2">
  <li>Design</li>
  <li>Engineering</li>
</ul>
```

## Verify

- The layout has several groups, and each has items.
- Compare the item gap and the group gap in the classes or tokens. Report only when the group gap is less than twice the item gap.
- A reviewer cannot judge how the grouping reads from code. Treat close calls as author guidance.
