---
id: confirm-destructive-actions
title: Confirm destructive actions or offer undo
summary: Ask for confirmation before an action that deletes data or cannot be reversed, in a dialog that names the action, or provide Undo for a safe window.
applies_when: A button or menu item deletes, removes, revokes or overwrites data, or sends something that cannot be recalled.
severity: medium
source:
  - {
      title: "Vercel Web Interface Guidelines: Interactions",
      url: "https://vercel.com/design/guidelines",
    }
  - {
      title: "GOV.UK Design System: Button, warning buttons",
      url: "https://design-system.service.gov.uk/components/button/",
    }
  - {
      title: "ui-skills: baseline-ui",
      url: "https://github.com/ibelick/ui-skills/blob/main/skills/baseline-ui/SKILL.md",
    }
---

# Confirm destructive actions or offer undo

## Rule

Before an irreversible action, show a confirmation that states what will be lost. The confirm button names the action. Alternatively, perform it and offer Undo for a safe window. Use an alert dialog for the confirmation, not a plain dialog.

## Why

- A stray click or key press destroys data.
- A confirmation that says "Are you sure?" with Yes and No does not say what happens.
- Alert dialogs focus the least destructive action and require an answer.

## Exceptions

- Reversible actions, such as archive with a restore view.
- Actions with Undo that restores the item fully, including the server state.
- Removing an item that the user just added in the same session and can add again at no cost.

## Examples

<!-- example:incorrect case="direct-delete" -->

```tsx file="ProjectRow.tsx"
<button onClick={() => deleteProject(project.id)}>Delete</button>
```

<!-- example:correct case="alert-dialog" -->

```tsx file="ProjectRow.tsx"
<AlertDialog>
  <AlertDialogTrigger>Delete project</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogTitle>Delete this project?</AlertDialogTitle>
    <AlertDialogDescription>This removes the project and all of its files.</AlertDialogDescription>
    <AlertDialogCancel>Cancel</AlertDialogCancel>
    <AlertDialogAction onClick={() => deleteProject(project.id)}>Delete project</AlertDialogAction>
  </AlertDialogContent>
</AlertDialog>
```

<!-- example:correct case="undo-toast" -->

```tsx file="MessageRow.tsx"
function remove() {
  const restore = removeLocally(message.id);
  toast("Message deleted", { action: { label: "Undo", onClick: restore } });
}
```

## Verify

- The action permanently removes data or cannot be recalled.
- No confirmation exists, and no Undo restores the full state.
