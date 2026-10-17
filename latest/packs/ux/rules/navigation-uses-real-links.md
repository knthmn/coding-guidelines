---
id: navigation-uses-real-links
title: Use real links for navigation
summary: Navigate with an `<a>` that has an `href`, or the router's link component. Do not use a button or div with a click handler that sets the location.
applies_when: A click handler calls `router.push`, `navigate`, `window.location` or similar to go to another page.
severity: medium
source:
  - {
      title: "Vercel Web Interface Guidelines: Interactions",
      url: "https://vercel.com/design/guidelines",
    }
  - {
      title: "interfaces.dev cheat sheet: Accessibility",
      url: "https://interfaces.dev/cheat-sheet",
    }
---

# Use real links for navigation

## Rule

Elements that go to another URL are `<a href>` or the router's link component. Use buttons for actions, and links for destinations.

## Why

- Users expect Cmd or Ctrl click, middle click and "Open in new tab" to work.
- Crawlers and assistive technology list links by `href`.
- Hover preview of the address, copy link and drag to bookmarks need an `href`.

## Exceptions

- A button that performs an action first and then navigates, such as "Create project".
- Programmatic redirects after login, logout or an async result.

## Examples

<!-- example:incorrect case="button-navigates" -->

```tsx file="ProjectCard.tsx"
<div onClick={() => router.push(`/projects/${project.id}`)}>{project.name}</div>
```

<!-- example:correct case="link" -->

```tsx file="ProjectCard.tsx"
<Link href={`/projects/${project.id}`}>{project.name}</Link>
```

<!-- example:near-miss case="action-then-navigate" -->

```tsx file="CreateProject.tsx"
<button
  onClick={async () => {
    const project = await createProject();
    router.push(`/projects/${project.id}`);
  }}
>
  Create project
</button>
```

## Verify

- The handler only navigates and does nothing else first.
- The element is not an action that happens to end in a redirect.
