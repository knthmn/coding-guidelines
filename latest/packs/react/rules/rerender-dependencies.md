---
id: rerender-dependencies
title: Narrow effect dependencies
summary: List primitive values in effect dependency arrays instead of objects, and compute derived booleans outside the effect, so the effect re-runs only when the used value changes.
applies_when: Effects, memos or callbacks whose dependency array holds an object or a fast-changing value that the body reduces to a smaller one.
severity: low
source:
  - {
      title: "Vercel React Best Practices",
      url: "https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rerender-dependencies.md",
    }
---

# Narrow effect dependencies

## Rule

Depend on the primitive values the effect reads, not on the object that holds them. When the effect reacts to a threshold or a condition, compute the boolean outside the effect and depend on that.

## Why

- An object dependency changes identity or content for reasons the effect does not use, so the effect re-runs without need.
- A continuous value, such as a width, re-runs the effect on every change, while the effect only cares about one transition.

## Exceptions

- The effect reads many fields of the object. List the object or restructure the effect.
- The effect passes the whole object to another function. The object is the real dependency.
- The project lints with `react-hooks/exhaustive-deps` and the narrower list would hide a value the effect uses. Correctness comes first.

## Examples

<!-- example:incorrect case="object-dependency" -->

```tsx file="UserLogger.tsx"
useEffect(() => {
  analytics.identify(user.id);
}, [user]);
```

<!-- example:correct case="primitive-dependency" -->

```tsx file="UserLogger.tsx"
useEffect(() => {
  analytics.identify(user.id);
}, [user.id]);
```

<!-- example:incorrect case="threshold-in-effect" -->

```tsx file="MobileMode.tsx"
useEffect(() => {
  if (width < 768) enableMobileMode();
}, [width]);
```

<!-- example:correct case="derived-boolean" -->

```tsx file="MobileMode.tsx"
const isMobile = width < 768;

useEffect(() => {
  if (isMobile) enableMobileMode();
}, [isMobile]);
```

<!-- example:near-miss case="whole-object-used" -->

```tsx file="UserSync.tsx"
useEffect(() => {
  syncProfile(user);
}, [user]);
```

## Verify

- The effect body reads only some fields of the object, and the other fields change independently.
- Narrowing the list does not leave a value the body reads out of the array.
