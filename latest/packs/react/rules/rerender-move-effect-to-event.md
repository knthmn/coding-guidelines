---
id: rerender-move-effect-to-event
title: Put interaction logic in event handlers
summary: Run side effects caused by a user action in the event handler. Do not model the action as state and react to it in an effect.
applies_when: Components that set a flag in a handler and then run a side effect, such as a request or toast, in an effect that watches the flag.
severity: medium
source:
  - {
      title: "Vercel React Best Practices",
      url: "https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rerender-move-effect-to-event.md",
    }
---

# Put interaction logic in event handlers

## Rule

When a user action causes a side effect, such as submit, click or drag, run the side effect in the event handler. Do not set a flag in state and run the side effect in an effect that depends on the flag.

## Why

- The effect re-runs when any of its other dependencies change, such as the theme, and can repeat the action.
- The handler runs once per action. The cause and the effect stay in one place.
- The flag adds an extra render and a state value with no UI meaning.

## Exceptions

- The effect syncs with an external system because of what is on screen, not because of one action. For example, it connects to a chat room while a component is shown.
- Logic that must run for every cause of a state change, not only one handler. Prefer fixing the causes, and use an effect only when that is not possible.

## Examples

<!-- example:incorrect case="flag-and-effect" -->

```tsx file="Form.tsx"
function Form() {
  const [submitted, setSubmitted] = useState(false);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    if (submitted) {
      post("/api/register");
      showToast("Registered", theme);
    }
  }, [submitted, theme]);

  return <button onClick={() => setSubmitted(true)}>Submit</button>;
}
```

<!-- example:correct case="handler" -->

```tsx file="Form.tsx"
function Form() {
  const theme = useContext(ThemeContext);

  function handleSubmit() {
    post("/api/register");
    showToast("Registered", theme);
  }

  return <button onClick={handleSubmit}>Submit</button>;
}
```

<!-- example:near-miss case="sync-with-visibility" -->

```tsx file="ChatRoom.tsx"
function ChatRoom({ roomId }: { roomId: string }) {
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  return <Messages roomId={roomId} />;
}
```

## Library notes

### React

See [Removing Effect Dependencies](https://react.dev/learn/removing-effect-dependencies#should-this-code-move-to-an-event-handler) in the React docs.

## Verify

- A state value is set only to trigger an effect, and one specific user action sets it.
- The side effect can run directly in that handler.
