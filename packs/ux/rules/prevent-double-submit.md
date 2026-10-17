---
id: prevent-double-submit
title: Prevent double submission of non-idempotent actions
summary: Block repeat submits while a request is in flight, keep the button label, show progress, and protect the server too, for example with an idempotency key.
applies_when: A button or form triggers a request that creates, sends, charges or deletes something.
severity: high
source:
  - {
      title: "GOV.UK Design System: Button, stop users from accidentally sending information more than once",
      url: "https://design-system.service.gov.uk/components/button/",
    }
  - {
      title: "Vercel Web Interface Guidelines: Forms and Interactions",
      url: "https://vercel.com/design/guidelines",
    }
---

# Prevent double submission of non-idempotent actions

## Rule

While a submit request runs, ignore further submits and show a loading indicator next to the original label. For actions with side effects, also send an idempotency key or deduplicate on the server.

## Why

- Users double click on slow connections, from habit or from motor impairments. The result is two emails, two orders or two charges.
- Client checks fail when JavaScript is slow or a request is replayed. The server must be safe too.
- Replacing the label with a spinner alone makes the button change size and loses the meaning of the action.

## Exceptions

- Idempotent actions, such as saving the same draft or toggling to an explicit value.
- Actions that navigate away immediately and have no side effect before navigation.

## Examples

<!-- example:incorrect case="no-guard" -->

```tsx file="InviteForm.tsx"
function InviteForm() {
  const [email, setEmail] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await sendInvite({ email });
      }}
    >
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">Send invite</button>
    </form>
  );
}
```

<!-- example:correct case="guard-and-key" -->

```tsx file="InviteForm.tsx"
function InviteForm() {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const key = useRef(crypto.randomUUID());

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (pending) return;
        setPending(true);
        try {
          await sendInvite({ email }, { idempotencyKey: key.current });
        } finally {
          setPending(false);
        }
      }}
    >
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit" disabled={pending}>
        {pending && <Spinner />} Send invite
      </button>
    </form>
  );
}
```

<!-- example:near-miss case="idempotent-save" -->

```tsx file="ThemeSelect.tsx"
function ThemeSelect({ theme }: { theme: string }) {
  return <select value={theme} onChange={(e) => setTheme(e.target.value)} />;
}
```

## Verify

- The action has a side effect that repeating would duplicate.
- The handler has no pending guard, and the server does not deduplicate.
- A disabled attribute alone is not enough if the handler can still be reached by Enter or a second event before state updates. A ref or a pending check in the handler covers that.
