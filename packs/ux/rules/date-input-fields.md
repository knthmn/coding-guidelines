---
id: date-input-fields
title: Collect known dates in separate fields, and accept natural entry
summary: For a date the user knows, such as birth date, use grouped day, month and year fields with a legend, accept month names, set `autocomplete="bday"`, and never auto-advance focus.
applies_when: A form asks for a date the user already knows or can look up without a calendar.
severity: low
source:
  - {
      title: "GOV.UK Design System: Date input",
      url: "https://design-system.service.gov.uk/components/date-input/",
    }
---

# Collect known dates in separate fields, and accept natural entry

## Rule

For a date the user knows, use three fields for day, month and year inside a `fieldset` with a `legend`. Accept month names and abbreviations as well as numbers. Do not move focus automatically between the fields. For a birth date, set `autocomplete` to `bday-day`, `bday-month` and `bday-year`.

## Why

- Users know their birth date. A calendar picker needs many clicks to go back decades.
- Users type months as names. Rejecting them causes many avoidable errors.
- Auto-advance focus clashes with keyboard and screen reader use.

## Exceptions

- Dates the user picks near today, such as a booking date, where a calendar helps.
- Dates the user does not know exactly. Use a simpler question.

## Examples

<!-- example:incorrect case="datepicker-for-birthday" -->

```tsx file="BirthDate.tsx"
<label htmlFor="dob">Date of birth</label>
<input id="dob" type="date" />
```

<!-- example:correct case="three-fields" -->

```tsx file="BirthDate.tsx"
<fieldset>
  <legend>Date of birth</legend>
  <label>
    Day <input name="day" inputMode="numeric" autoComplete="bday-day" />
  </label>
  <label>
    Month <input name="month" autoComplete="bday-month" />
  </label>
  <label>
    Year <input name="year" inputMode="numeric" autoComplete="bday-year" />
  </label>
</fieldset>
```

<!-- example:near-miss case="booking-date" -->

```tsx file="BookingDate.tsx"
<label htmlFor="check-in">Check-in date</label>
<input id="check-in" type="date" min={today} />
```

## Verify

- The date is one the user knows by heart, such as a birth date, and the form uses a picker.
- The month field rejects names, or code moves focus on input.
