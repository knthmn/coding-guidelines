---
id: gestures-have-alternatives
title: Give every gesture a click and keyboard alternative
summary: Offer a tap, click and keyboard path for any drag, swipe, pinch or path-based action, unless the gesture is the essential part.
applies_when: Code handles drag, swipe, pinch, drag-to-reorder, sliders or range controls.
severity: medium
source:
  - {
      title: "Vercel Web Interface Guidelines: Interactions",
      url: "https://vercel.com/design/guidelines",
    }
  - {
      title: "GOV.UK Design System: Question pages, range sliders",
      url: "https://design-system.service.gov.uk/patterns/question-pages/",
    }
---

# Give every gesture a click and keyboard alternative

## Rule

Any drag, swipe, pinch or path-based action also works with a single click or tap and with the keyboard. For range questions, offer a way to type or step a value.

## Why

- Users with tremor, a head pointer, a switch or a voice control cannot drag precisely.
- Keyboard users have no drag at all.

## Exceptions

- Gestures that are the essential point, such as freehand drawing or a signature pad.
- Drag that already comes with an accessible alternative from the component library. Check the rendered controls.

## Examples

<!-- example:incorrect case="drag-only" -->

```tsx file="TaskList.tsx"
{
  tasks.map((task) => (
    <li key={task.id} draggable onDragEnd={(e) => reorder(task.id, e)}>
      {task.title}
    </li>
  ));
}
```

<!-- example:correct case="drag-and-buttons" -->

```tsx file="TaskList.tsx"
{
  tasks.map((task, i) => (
    <li key={task.id} draggable onDragEnd={(e) => reorder(task.id, e)}>
      {task.title}
      <button aria-label={`Move ${task.title} up`} onClick={() => move(i, i - 1)}>
        Up
      </button>
      <button aria-label={`Move ${task.title} down`} onClick={() => move(i, i + 1)}>
        Down
      </button>
    </li>
  ));
}
```

## Verify

- A handler uses `drag`, `pointermove` or `touchmove` to change data, and no click or keyboard handler does the same.
- The gesture is not essential, such as drawing.
