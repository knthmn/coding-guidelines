---
id: empty-states-offer-action
title: Give empty states a reason and one action
summary: When a list or view has no content, say what belongs there and offer one clear action. Do not render a blank area or "No results".
applies_when: A list, table, search or dashboard can render with zero items.
severity: low
source:
  - { title: "interfaces.dev cheat sheet: Writing", url: "https://interfaces.dev/cheat-sheet" }
  - {
      title: "Vercel Web Interface Guidelines: Content",
      url: "https://vercel.com/design/guidelines",
    }
  - {
      title: "ui-skills: baseline-ui",
      url: "https://github.com/ibelick/ui-skills/blob/main/skills/baseline-ui/SKILL.md",
    }
---

# Give empty states a reason and one action

## Rule

Render an empty state for a zero-item view. State what belongs there and give one action to add the first item. For an empty search, say what was searched and how to change it.

## Why

- A blank area looks broken.
- A first-time user needs the next step. "No results" gives none.

## Exceptions

- Lists where empty means the work is done, such as an inbox. A short confirmation is enough.
- Users without permission to add. Say who can.
- Empty sub-lists inside a larger view, where the parent view already guides.

## Examples

<!-- example:incorrect case="blank-or-bare" -->

```tsx file="ProjectList.tsx"
function ProjectList({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return <p>No results.</p>;
  return (
    <ul>
      {projects.map((p) => (
        <ProjectItem key={p.id} project={p} />
      ))}
    </ul>
  );
}
```

<!-- example:correct case="reason-and-action" -->

```tsx file="ProjectList.tsx"
function ProjectList({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <section>
        <h2>No projects yet</h2>
        <p>Projects keep your files, notes and tasks in one place.</p>
        <button onClick={openCreateDialog}>Create a project</button>
      </section>
    );
  }
  return (
    <ul>
      {projects.map((p) => (
        <ProjectItem key={p.id} project={p} />
      ))}
    </ul>
  );
}
```

## Verify

- A zero-length branch renders nothing or one bare line, and the user can add items.
