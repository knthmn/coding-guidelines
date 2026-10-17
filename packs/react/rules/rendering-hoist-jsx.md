---
id: rendering-hoist-jsx
title: Hoist static JSX out of components
summary: Move large JSX that never changes, such as big SVGs, to a module-level constant, unless React Compiler is enabled.
applies_when: A component creates a large JSX element or SVG that has no props or state, and the project does not use React Compiler.
severity: low
source:
  - title: "Vercel React Best Practices"
    url: "https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rendering-hoist-jsx.md"
---

# Hoist static JSX out of components

## Rule

Define JSX that does not depend on props, state or context once at module level, and reuse the element. Apply this to large static trees, such as SVG illustrations.

## Why

- A component creates the element again on every render.
- A large static tree, such as an SVG, costs more to create and compare each time.
- A reused element has the same identity, so React can skip it.

## Exceptions

- React Compiler is enabled. It hoists static elements by itself.
- Small elements. The gain is too low to justify the change.
- Elements that use props, state or context.
- Elements that need a fresh instance per use, for example elements with a `key` or `ref` that differ by use.

## Examples

<!-- example:incorrect case="large-svg-in-render" -->

```tsx file="EmptyState.tsx"
function EmptyState({ message }: { message: string }) {
  return (
    <div>
      <svg viewBox="0 0 200 200" width="120" height="120">
        <path d="M10 10 L190 10 L190 190 L10 190 Z M40 40 L160 40 L160 160 L40 160 Z" />
      </svg>
      <p>{message}</p>
    </div>
  );
}
```

<!-- example:correct case="hoisted-svg" -->

```tsx file="EmptyState.tsx"
const illustration = (
  <svg viewBox="0 0 200 200" width="120" height="120">
    <path d="M10 10 L190 10 L190 190 L10 190 Z M40 40 L160 40 L160 160 L40 160 Z" />
  </svg>
);

function EmptyState({ message }: { message: string }) {
  return (
    <div>
      {illustration}
      <p>{message}</p>
    </div>
  );
}
```

<!-- example:near-miss case="depends-on-props" -->

```tsx file="Avatar.tsx"
function Avatar({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <circle cx="100" cy="100" r="90" />
    </svg>
  );
}
```

## Library notes

### React Compiler

- With React Compiler enabled, the compiler already hoists static elements. Do not hoist by hand.

## Verify

- The element has no dependency on props, state or context.
- The element is large enough to matter, for example a large SVG.
- The project does not use React Compiler.
