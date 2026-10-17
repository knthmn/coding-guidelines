---
id: reset-overlay-state-on-open
title: Reset overlay state when it opens, not when it closes
summary: When state held above a dialog or popover must start fresh on each open, reset it at the open call site.
applies_when: Dialogs, popovers, sheets or drawers whose content must start fresh each time they open.
severity: medium
source: null
---

# Reset overlay state when it opens, not when it closes

## Rule

Keep overlay state inside the overlay content when possible, so it resets when the content unmounts. When the state must live above the overlay and must start fresh on each open, reset it in the handler that opens the overlay.

## Why

- Resetting before open runs before the content mounts, so stale values are never painted.
- Resetting on close is visible: fields clear while the exit animation plays. A callback that runs after the animation ends is too late to prevent one frame of stale values on the next open.
- An overlay has one way to open and many ways to close (Escape, outside press, Cancel, close button, successful submit). A reset on close is easy to miss on one of them.

## Exceptions

- State that should survive closing, such as a draft the user expects to find again.
- State that lives inside the overlay content and resets on unmount.
- Overlays whose content stays mounted while closed, when the code resets state explicitly on open by another means.

## Examples

<!-- example:incorrect case="reset-on-close" -->

```tsx file="EditUserButton.tsx"
function EditUserButton({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const form = useForm({ defaultValues: user });

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) form.reset();
        setOpen(next);
      }}
    >
      <Button onClick={() => setOpen(true)}>Edit</Button>
      <DialogContent>
        <UserForm form={form} />
      </DialogContent>
    </Dialog>
  );
}
```

<!-- example:correct case="reset-on-open" -->

```tsx file="EditUserButton.tsx"
function EditUserButton({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const form = useForm({ defaultValues: user });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        onClick={() => {
          form.reset(user);
          setOpen(true);
        }}
      >
        Edit
      </Button>
      <DialogContent>
        <UserForm form={form} />
      </DialogContent>
    </Dialog>
  );
}
```

<!-- example:correct case="state-inside-content" -->

```tsx file="EditUserButton.tsx"
function EditUserButton({ user }: { user: User }) {
  return (
    <Dialog>
      <DialogTrigger render={<Button>Edit</Button>} />
      <DialogContent>
        <EditUserForm user={user} />
      </DialogContent>
    </Dialog>
  );
}

function EditUserForm({ user }: { user: User }) {
  const form = useForm({ defaultValues: user });
  return <UserForm form={form} />;
}
```

<!-- example:near-miss case="draft-survives-close" -->

```tsx file="NoteComposer.tsx"
function NoteComposer() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)}>Write note</Button>
      <PopoverContent>
        <Textarea value={draft} onChange={(e) => setDraft(e.target.value)} />
      </PopoverContent>
    </Popover>
  );
}
```

## Library notes

### Base UI

`Dialog.Portal` and `Popover.Portal` unmount their content when closed, because `keepMounted` defaults to `false`. `onOpenChangeComplete` runs after the exit animation, which is too late to reset state for the next open.

## Verify

- The state is held above the overlay, not inside its content.
- The state must start fresh on each open. Check how the overlay is used before assuming this.
- The reset runs on close, or there is no reset at all, and the open path does not reset it.
