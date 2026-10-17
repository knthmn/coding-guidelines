---
id: transitions-for-interactions-keyframes-for-sequences
title: Use transitions for interactions and keyframes for one-shot sequences
summary: Animate interactive state changes with CSS transitions so they can reverse midway. Use keyframes only for sequences that run once.
applies_when: An animation reacts to user input, such as open and close, hover, toggle or drag, or runs as a one-time sequence.
severity: low
source:
  - { title: "Interface Cheat Sheet", url: "https://interfaces.dev/cheat-sheet" }
---

# Use transitions for interactions and keyframes for one-shot sequences

## Rule

Use CSS transitions for animations that follow a state the user can change. Use `@keyframes` for sequences that start, run to the end and do not reverse.

## Why

- A transition starts from the current value. If the state flips midway, it reverses smoothly.
- A keyframe animation restarts from its first frame, so a quick toggle jumps.

## Exceptions

- Loops, such as spinners and skeletons.
- Multi-step sequences that a transition cannot express, even when triggered by input. Use keyframes and prevent re-triggering.
- Animations driven by a JavaScript library that handles interruption.

## Examples

<!-- example:incorrect case="keyframes-for-toggle" -->

```css file="panel.css"
.panel[data-open] {
  animation: slide-in 200ms ease-out forwards;
}
.panel:not([data-open]) {
  animation: slide-out 200ms ease-out forwards;
}
```

<!-- example:correct case="transition-for-toggle" -->

```css file="panel.css"
.panel {
  transform: translateY(8px);
  opacity: 0;
  transition:
    transform 200ms ease-out,
    opacity 200ms ease-out;
}
.panel[data-open] {
  transform: none;
  opacity: 1;
}
```

<!-- example:near-miss case="loop-spinner" -->

```css file="spinner.css"
.spinner {
  animation: spin 800ms linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

## Verify

- The animation follows a state that can flip while it runs.
- It uses `animation` and `@keyframes` to move between two states.
