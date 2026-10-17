---
id: button-labels-name-the-action
title: Name the action in button labels and keep step labels consistent
summary: Start button labels with a verb that says what happens, such as "Delete project". Avoid OK, Yes and No. Use one label for the next step in a flow, for example Continue.
applies_when: Code adds buttons, confirmation dialogs or multi-step flows with text labels.
severity: low
source:
  - { title: "interfaces.dev cheat sheet: Writing", url: "https://interfaces.dev/cheat-sheet" }
  - {
      title: "Vercel Web Interface Guidelines: Copywriting",
      url: "https://vercel.com/design/guidelines",
    }
  - {
      title: "GOV.UK Design System: Button",
      url: "https://design-system.service.gov.uk/components/button/",
    }
  - {
      title: "GOV.UK Design System: Question pages, continue button",
      url: "https://design-system.service.gov.uk/patterns/question-pages/",
    }
---

# Name the action in button labels and keep step labels consistent

## Rule

Label a button with a verb and, where useful, the object: "Save draft", "Delete project". In confirmation dialogs, use the action as the confirm label and "Cancel" as the other. In a multi-step flow, use the same label for the step button on every step.

## Why

- "OK", "Yes" and "No" depend on the reader remembering the question.
- A button named for its action tells the user what the click does.
- A step button that changes between Continue, Next and Proceed makes users wonder if the action differs.

## Exceptions

- Standard system labels such as "Cancel" and "Close".
- A final step with a different action, such as "Pay" or "Submit application".

## Examples

<!-- example:incorrect case="yes-no" -->

```tsx file="DeleteDialog.tsx"
<p>Delete this project?</p>
<button>No</button>
<button>Yes</button>
```

<!-- example:correct case="named-actions" -->

```tsx file="DeleteDialog.tsx"
<p>Delete this project?</p>
<button>Cancel</button>
<button>Delete project</button>
```

<!-- example:incorrect case="mixed-step-labels" -->

```tsx file="Wizard.tsx"
const steps = [
  { title: "Account", next: "Continue" },
  { title: "Plan", next: "Next" },
  { title: "Billing", next: "Proceed" },
];
```

<!-- example:near-miss case="final-step" -->

```tsx file="Wizard.tsx"
const steps = [
  { title: "Account", next: "Continue" },
  { title: "Plan", next: "Continue" },
  { title: "Billing", next: "Pay" },
];
```

## Verify

- The label is a bare Yes, No, OK or Submit in a dialog where the action is not obvious.
- Steps of one flow use different words for the same forward action.
