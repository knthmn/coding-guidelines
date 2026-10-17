---
id: rendering-svg-precision
title: Reduce SVG coordinate precision
summary: Round SVG path coordinates to the precision the viewBox needs, usually one or two decimals, with an optimizer such as SVGO.
applies_when: The project adds SVG files or inline SVG paths, especially icons exported from a design tool.
severity: low
source:
  - title: Vercel React Best Practices
    url: https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rendering-svg-precision.md
---

# Reduce SVG coordinate precision

## Rule

Round SVG coordinates to the precision the viewBox needs. For a 24 by 24 icon, one or two decimals is enough. Run an optimizer such as SVGO in the build or before commit, instead of editing by hand.

## Why

- Design tools export six or more decimals. The extra digits add bytes and no visible detail.
- Inline SVG ships in the HTML or JavaScript, so size affects load time.

## Exceptions

- Large viewBoxes with fine detail, such as maps or illustrations. Check the output before you lower precision.
- Very small viewBoxes, where one decimal can change the shape. Use a higher precision or scale the viewBox.
- Files that an optimizer already processes in the build.

## Examples

<!-- example:incorrect case="excess-precision" -->

```xml file="arrow.svg"
<svg viewBox="0 0 24 24"><path d="M 10.293847 20.847362 L 30.938472 40.192837" /></svg>
```

<!-- example:correct case="rounded" -->

```xml file="arrow.svg"
<svg viewBox="0 0 24 24"><path d="M10.3 20.8 30.9 40.2" /></svg>
```

<!-- example:near-miss case="optimizer-in-build" -->

```json file="svgo.config.json"
{ "floatPrecision": 1, "multipass": true }
```

## Verify

- The numbers have more decimals than the viewBox size needs.
- No SVG optimizer already runs on the file.
- The rounded result looks the same at the sizes in use.
