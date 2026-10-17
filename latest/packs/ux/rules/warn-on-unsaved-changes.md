---
id: warn-on-unsaved-changes
title: Warn before the user loses unsaved changes
summary: When leaving a page or closing an editor would discard edits, warn first or save a draft.
applies_when: A form, editor or dialog holds user edits that are not yet saved, and the user can navigate or close it.
severity: medium
source:
  - { title: "Vercel Web Interface Guidelines: Forms", url: "https://vercel.com/design/guidelines" }
---

# Warn before the user loses unsaved changes

## Rule

If leaving would discard edits, ask the user to confirm, or save a draft automatically. Cover in-app navigation and closing the tab. Remove the warning when the form is clean or saved.

## Why

- Long forms and editors cost the user real effort.
- Back, a link click or Escape can lose the work with no sign.
- A warning that stays after saving trains users to ignore it.

## Exceptions

- Forms that autosave.
- Short forms or filters where retyping costs nothing.
- Dialogs where Cancel is the explicit choice to discard.

## Examples

<!-- example:incorrect case="silent-loss" -->

```tsx file="ArticleEditor.tsx"
function ArticleEditor() {
  const [body, setBody] = useState("");
  return <textarea value={body} onChange={(e) => setBody(e.target.value)} />;
}
```

<!-- example:correct case="beforeunload" -->

```tsx file="ArticleEditor.tsx"
function ArticleEditor() {
  const [body, setBody] = useState("");
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  return (
    <textarea
      value={body}
      onChange={(e) => {
        setBody(e.target.value);
        setDirty(true);
      }}
    />
  );
}
```

## Library notes

### Router libraries

`beforeunload` covers closing the tab and a full page load only. In-app navigation needs the router's blocking API, for example `useBlocker` in React Router (data and framework modes only) and TanStack Router.

## Verify

- The component holds user input of real size, with no autosave, no leave guard, and no discard confirmation.
- The guard is removed after save.
