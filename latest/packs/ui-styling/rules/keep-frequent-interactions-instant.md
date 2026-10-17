---
id: keep-frequent-interactions-instant
title: Keep frequent interactions instant
summary: Skip the open animation on menus people open often, and use no or very short transitions for hover and other high-frequency feedback.
applies_when: Menus, context menus, list items, tabs or buttons that people trigger many times per session.
severity: low
source:
  - { title: "Interface Cheat Sheet", url: "https://interfaces.dev/cheat-sheet" }
---

# Keep frequent interactions instant

## Rule

For interactions that people repeat often, use no animation or a very short one. Open frequently used menus, such as context menus, with no animation, and animate only the close. Give hover feedback a duration of 0 to 100ms.

## Why

- Each delay is small, but people feel it on the hundredth use.
- Fast feedback makes the interface feel responsive.
- A close animation still confirms that the action took effect.

## Exceptions

- Rarely used overlays, such as onboarding or a one-time confirmation. Normal animation is fine.
- Large state changes where motion explains what changed.
- Hover feedback that must not flicker when the pointer crosses items quickly. A short transition on the color change helps there.

## Examples

<!-- example:incorrect case="slow-open-and-hover" -->

```tsx file="ContextMenu.tsx"
<ContextMenu.Popup className="scale-95 opacity-0 transition duration-300 data-[open]:scale-100 data-[open]:opacity-100">
  <ContextMenu.Item className="transition-colors duration-300 hover:bg-neutral-100">
    Rename
  </ContextMenu.Item>
</ContextMenu.Popup>
```

<!-- example:correct case="exit-only" -->

```tsx file="ContextMenu.tsx"
<ContextMenu.Popup className="transition duration-100 data-[ending-style]:scale-95 data-[ending-style]:opacity-0">
  <ContextMenu.Item className="hover:bg-neutral-100">Rename</ContextMenu.Item>
</ContextMenu.Popup>
```

<!-- example:near-miss case="rare-overlay" -->

```tsx file="WelcomeDialog.tsx"
<Dialog.Popup className="scale-95 opacity-0 transition duration-200 data-[open]:scale-100 data-[open]:opacity-100" />
```

## Verify

- The interaction is frequent in the product. A reviewer may not know this from code. Check how the component is used.
- Duration is above about 150ms, or an enter animation is set on a frequent menu.
- A reviewer cannot judge feel from code. Treat this rule as author guidance.
