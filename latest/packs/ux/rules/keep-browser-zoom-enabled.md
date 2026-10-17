---
id: keep-browser-zoom-enabled
title: Keep browser zoom enabled and size inputs to avoid iOS auto-zoom
summary: Never disable zoom with `maximum-scale` or `user-scalable`. Set input font size to 16px or more on mobile to stop iOS Safari from zooming on focus.
applies_when: The project sets a viewport meta tag or styles the font size of inputs, selects or textareas.
severity: medium
source:
  - {
      title: "Vercel Web Interface Guidelines: Interactions",
      url: "https://vercel.com/design/guidelines",
    }
---

# Keep browser zoom enabled and size inputs to avoid iOS auto-zoom

## Rule

Do not set `maximum-scale=1` or `user-scalable=no` in the viewport meta tag. To stop iOS Safari from zooming on focus, set the font size of inputs, selects and textareas to at least 16px on mobile.

## Why

- Low vision users need pinch zoom.
- Disabling zoom to hide the iOS focus zoom removes a user right to fix a styling problem.

## Exceptions

- Apps that implement their own accessible zoom or text scaling, such as a map or drawing canvas, where pinch is a different gesture. The page text still scales.

## Examples

<!-- example:incorrect case="disable-zoom" -->

```html file="index.html"
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
/>
```

<!-- example:incorrect case="small-input" -->

```css file="form.css"
input,
select,
textarea {
  font-size: 14px;
}
```

<!-- example:correct case="zoomable" -->

```html file="index.html"
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

<!-- example:correct case="sixteen-px" -->

```css file="form.css"
input,
select,
textarea {
  font-size: 1rem;
}
```

## Verify

- The viewport tag contains `maximum-scale` or `user-scalable=no`.
- Mobile inputs compute to less than 16px, and the root font size is 16px.
