---
id: format-for-locale
title: Format dates, numbers and currency for the user's locale
summary: Format dates, times, numbers and currency with `Intl` or the framework's formatter and the user's locale, not hand-built strings. Pick the language from browser preferences, not IP.
applies_when: Code renders dates, times, numbers, currency or units, or picks the interface language.
severity: medium
source:
  - {
      title: "Vercel Web Interface Guidelines: Content",
      url: "https://vercel.com/design/guidelines",
    }
---

# Format dates, numbers and currency for the user's locale

## Rule

Use `Intl.DateTimeFormat`, `Intl.NumberFormat` or the project's i18n formatter with the user's locale. Do not build strings with `toFixed`, template literals or fixed patterns. Pick the language from `Accept-Language` or `navigator.languages`, not from IP or GPS.

## Why

- Date order, separators and currency placement differ by locale. A fixed pattern is wrong for some users.
- IP location is wrong for travelers, VPN users and multilingual regions.

## Exceptions

- Machine-readable values, such as ISO dates in APIs and `datetime` attributes.
- Products fixed to one locale by design, for example a single-country tax form.

## Examples

<!-- example:incorrect case="hand-built" -->

```tsx file="Price.tsx"
function Price({ amount, date }: { amount: number; date: Date }) {
  return (
    <p>
      ${amount.toFixed(2)} on {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}
    </p>
  );
}
```

<!-- example:correct case="intl" -->

```tsx file="Price.tsx"
function Price({ amount, date, locale }: { amount: number; date: Date; locale: string }) {
  const money = new Intl.NumberFormat(locale, { style: "currency", currency: "USD" });
  const day = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });
  return (
    <p>
      {money.format(amount)} on {day.format(date)}
    </p>
  );
}
```

<!-- example:near-miss case="iso-attribute" -->

```tsx file="Posted.tsx"
<time dateTime={date.toISOString()}>{formatDay(date)}</time>
```

## Verify

- User-facing text builds numbers or dates by hand.
- The product serves one fixed locale on purpose.
