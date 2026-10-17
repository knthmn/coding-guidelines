---
id: limit-text-with-character-count
title: Show a character count and an error for text limits
summary: For a textarea with a length limit, show the remaining count, let users type past the limit, and report the overflow with a specific error. Use a count only when a limit is needed.
applies_when: A textarea or long text field has a maximum length.
severity: low
source:
  - {
      title: "GOV.UK Design System: Character count",
      url: "https://design-system.service.gov.uk/components/character-count/",
    }
---

# Show a character count and an error for text limits

## Rule

When a long text field has a limit, show how many characters remain. Do not stop typing at the limit. Tell the user how many characters they are over, with an error on submit. Announce the count to screen readers when the user pauses, not on each key.

## Why

- Users can paste a full answer and edit it down. A hard stop cuts the answer without notice.
- A count that appears only after the limit is hit costs the user a long rewrite.
- A live region that speaks on each keystroke is unusable.

## Exceptions

- Limits users do not reach. Raise the limit or show the count only near it, for example at 75 percent.
- Short single-line fields, where a limit in the hint is enough.
- Characters that count as several, such as emoji, when the limit is technical. State how they count if it matters.

## Examples

<!-- example:incorrect case="silent-maxlength" -->

```tsx file="Summary.tsx"
<textarea name="summary" maxLength={400} />
```

<!-- example:correct case="count-and-overflow" -->

```tsx file="Summary.tsx"
function Summary({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const left = 400 - value.length;
  return (
    <div>
      <label htmlFor="summary">Summary</label>
      <textarea
        id="summary"
        value={value}
        aria-describedby="summary-count"
        onChange={(e) => onChange(e.target.value)}
      />
      <p id="summary-count">
        {left >= 0
          ? `You have ${left} characters remaining`
          : `You have ${-left} characters too many`}
      </p>
    </div>
  );
}
```

## Verify

- The textarea has `maxLength` or truncates in a handler, and no count or error describes the overflow.
- The limit is one the user can reach.
