---
id: image-edge-outline
title: Give images a faint inset outline
summary: Add a `1px` outline with offset `-1px` to images, black at 8% opacity in light mode and white at 8% in dark mode.
applies_when: Images, avatars or thumbnails whose edge can blend into a similar page background.
severity: low
source:
  - { title: "Interface Cheat Sheet", url: "https://interfaces.dev/cheat-sheet" }
---

# Give images a faint inset outline

## Rule

Give content images a 1px outline with an offset of -1px. Use black at 8% opacity in light mode and white at 8% in dark mode.

## Why

- An image with a light edge on a light page, or a dark edge on a dark page, loses its shape.
- An inset outline keeps the edge clear and does not change the image size.
- A semi-transparent color works on any image and any background.

## Exceptions

- Full-bleed images, and images inside a container that already clips them with a visible edge.
- Decorative images that are meant to fade into the background.
- Images with transparent regions, such as logos and illustrations. The outline traces the box, not the shape.

## Examples

<!-- example:incorrect case="no-outline" -->

```tsx file="Avatar.tsx"
<img className="size-10 rounded-full" src={user.avatarUrl} alt="" />
```

<!-- example:correct case="inset-outline" -->

```tsx file="Avatar.tsx"
<img
  className="size-10 rounded-full outline outline-1 -outline-offset-1 outline-black/8 dark:outline-white/8"
  src={user.avatarUrl}
  alt=""
/>
```

<!-- example:correct case="css" -->

```css file="image.css"
img {
  outline: 1px solid rgb(0 0 0 / 0.08);
  outline-offset: -1px;
}
@media (prefers-color-scheme: dark) {
  img {
    outline-color: rgb(255 255 255 / 0.08);
  }
}
```

<!-- example:near-miss case="transparent-logo" -->

```tsx file="Logo.tsx"
<img className="h-6" src="/logo.svg" alt="Acme" />
```

## Library notes

### Tailwind CSS

The `outline-1`, `-outline-offset-1` and `outline-black/8` classes assume Tailwind v4, where `outline-<n>` sets width and style. In v3, use `outline outline-1 -outline-offset-1 outline-black/[0.08]`.

## Verify

- The element shows a photo or an avatar, not a logo or an icon.
- The outline is missing, or its color or offset differs from the rule.
- A reviewer cannot confirm the look from code. Treat this rule as author guidance.
