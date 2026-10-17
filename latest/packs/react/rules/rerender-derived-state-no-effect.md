---
id: rerender-derived-state-no-effect
title: Calculate derived state during render
summary: Do not store a value in state, or sync it in an effect, when it can be computed from props or state. Compute it during render, or reset state with a key.
applies_when: Components that call a state setter inside an effect to mirror or transform props or other state.
severity: medium
source:
  - {
      title: "Vercel React Best Practices",
      url: "https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rerender-derived-state-no-effect.md",
    }
---

# Calculate derived state during render

## Rule

Compute a value that depends only on current props and state during render. Do not keep it in `useState` and update it in an effect. To reset state when a prop changes, give the component a `key` instead of syncing in an effect.

## Why

- An effect that sets state causes an extra render, and the first render shows stale output.
- Duplicated state can drift from its source.

## Exceptions

- The value is a user-editable copy of a prop, such as a form draft. It starts from the prop and then diverges.
- The effect syncs with an external system, such as the DOM or a subscription, and does not only set React state.
- The computation is expensive. Wrap it in `useMemo`, but still compute it during render.

## Examples

<!-- example:incorrect case="effect-sets-state" -->

```tsx file="Form.tsx"
function Form() {
  const [firstName, setFirstName] = useState("First");
  const [lastName, setLastName] = useState("Last");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    setFullName(firstName + " " + lastName);
  }, [firstName, lastName]);

  return <p>{fullName}</p>;
}
```

<!-- example:correct case="derive-in-render" -->

```tsx file="Form.tsx"
function Form() {
  const [firstName, setFirstName] = useState("First");
  const [lastName, setLastName] = useState("Last");
  const fullName = firstName + " " + lastName;

  return <p>{fullName}</p>;
}
```

<!-- example:incorrect case="reset-in-effect" -->

```tsx file="CommentBox.tsx"
function CommentBox({ postId }: { postId: string }) {
  const [text, setText] = useState("");

  useEffect(() => {
    setText("");
  }, [postId]);

  return <textarea value={text} onChange={(e) => setText(e.target.value)} />;
}
```

<!-- example:correct case="reset-with-key" -->

```tsx file="CommentBox.tsx"
function PostComments({ postId }: { postId: string }) {
  return <CommentBox key={postId} />;
}

function CommentBox() {
  const [text, setText] = useState("");
  return <textarea value={text} onChange={(e) => setText(e.target.value)} />;
}
```

<!-- example:near-miss case="draft-from-prop" -->

```tsx file="NameEditor.tsx"
function NameEditor({ name }: { name: string }) {
  const [draft, setDraft] = useState(name);
  return <input value={draft} onChange={(e) => setDraft(e.target.value)} />;
}
```

## Library notes

### React

See [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect) in the React docs.

## Verify

- The state value is fully determined by props or other state.
- An effect sets it, or the code updates it next to the source value.
- The value is not an editable draft that diverges on purpose.
