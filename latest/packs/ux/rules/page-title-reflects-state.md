---
id: page-title-reflects-state
title: Keep the page title accurate, and mark error states
summary: Set a unique document title for each page or view. When a page shows validation errors, add an `Error:` prefix so screen readers announce it first.
applies_when: Code sets `document.title` or a title in route metadata, or a page can show validation errors.
severity: medium
source:
  - {
      title: "Vercel Web Interface Guidelines: Content",
      url: "https://vercel.com/design/guidelines",
    }
  - {
      title: "GOV.UK Design System: Validation pattern",
      url: "https://design-system.service.gov.uk/patterns/validation/",
    }
---

# Keep the page title accurate, and mark error states

## Rule

Each route has its own `<title>` that names the current page. After a failed submit, prefix the title with "Error: ". Update the title on client-side navigation.

## Why

- Screen readers read the title when the page loads. A static title tells the user nothing new.
- Tabs, history and bookmarks show the title.
- A single-page app that keeps one title for every route leaves users lost.

## Exceptions

- Errors shown in a dialog or inline toast without a page change. Announce them with a live region instead.
- Pages that the user does not reach by name, such as an embedded widget.

## Examples

<!-- example:incorrect case="static-title" -->

```tsx file="routes/settings.tsx"
export default function Settings() {
  return <SettingsForm />;
}
```

<!-- example:correct case="title-with-error" -->

```tsx file="routes/settings.tsx"
export default function Settings() {
  const { errors } = useSettingsForm();
  const title = errors.length > 0 ? "Error: Settings" : "Settings";

  return (
    <>
      <title>{`${title} | Acme`}</title>
      <SettingsForm />
    </>
  );
}
```

## Library notes

### React

React 19 hoists a `<title>` rendered in any component into `<head>`. Earlier versions need a head manager or the router's metadata API.

## Verify

- A route has no title of its own, or the title does not change when the view changes.
- A failed-submit page keeps the same title as the page without errors.
