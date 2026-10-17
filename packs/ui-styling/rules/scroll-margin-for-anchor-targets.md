---
id: scroll-margin-for-anchor-targets
title: Set scroll-margin-top on anchor targets
summary: Give headings and sections that links can target a `scroll-margin-top`, so a sticky header does not cover them.
applies_when: The page has a sticky or fixed header and headings or sections with ids that links or the URL hash point to.
severity: medium
source:
  - { title: "Interface Cheat Sheet", url: "https://interfaces.dev/cheat-sheet" }
---

# Set scroll-margin-top on anchor targets

## Rule

Set `scroll-margin-top` on elements that links or URL hashes can scroll to. Make it at least as large as the sticky header height, plus some space.

## Why

- Without it, the browser scrolls the target to the top edge, and a sticky header covers it.
- The user then lands on a page where the target is hidden.

## Exceptions

- Pages with no sticky or fixed header and no need for extra space.
- Elements that are never a link target.

## Examples

<!-- example:incorrect case="header-covers-heading" -->

```tsx file="Section.tsx"
<h2 id="pricing" className="text-xl font-semibold">
  Pricing
</h2>
```

<!-- example:correct case="scroll-margin" -->

```tsx file="Section.tsx"
<h2 id="pricing" className="scroll-mt-20 text-xl font-semibold">
  Pricing
</h2>
```

<!-- example:correct case="css-all-targets" -->

```css file="anchors.css"
:target,
[id] {
  scroll-margin-top: 5rem;
}
```

<!-- example:near-miss case="no-sticky-header" -->

```tsx file="Faq.tsx"
<h2 id="faq" className="text-xl font-semibold">
  FAQ
</h2>
```

## Library notes

### Tailwind CSS

`scroll-mt-<n>` sets `scroll-margin-top`. `scroll-mt-20` is 5rem.

## Verify

- The layout has a sticky or fixed header.
- The element has an `id` that a link, table of contents or hash can target.
- No `scroll-margin-top` or `scroll-padding-top` on the element, the root or the scroll container covers the header height.
