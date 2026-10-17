---
id: persist-view-state-in-url
title: Keep shareable view state in the URL
summary: Store filters, search, sort, tabs, pagination and open panels in the URL, so refresh, Back, Forward and shared links restore the view.
applies_when: A page keeps filters, tabs, pagination, sort or similar view state in component state.
severity: low
source:
  - {
      title: "Vercel Web Interface Guidelines: Interactions",
      url: "https://vercel.com/design/guidelines",
    }
---

# Keep shareable view state in the URL

## Rule

When state changes what the page shows and a user may want to share, bookmark or restore it, keep it in the URL as path or search parameters. Back and Forward then step through it.

## Why

- State in memory is lost on refresh and cannot be shared.
- Users expect Back to undo a filter or tab change.
- Support staff can reproduce a view from a link.

## Exceptions

- Transient state: hover, focus, open menus, form drafts, and input before it is committed.
- Sensitive data. Never put secrets or personal data in the URL.
- Fast-changing values, such as scroll position or text typed in a field. Debounce, and replace the history entry instead of pushing.

## Examples

<!-- example:incorrect case="state-only" -->

```tsx file="Orders.tsx"
function Orders() {
  const [status, setStatus] = useState("open");
  const [page, setPage] = useState(1);
  return <OrderTable status={status} page={page} onStatus={setStatus} onPage={setPage} />;
}
```

<!-- example:correct case="search-params" -->

```tsx file="Orders.tsx"
function Orders() {
  const [params, setParams] = useSearchParams();
  const status = params.get("status") ?? "open";
  const page = Number(params.get("page") ?? 1);
  return (
    <OrderTable
      status={status}
      page={page}
      onStatus={(s) => setParams({ status: s, page: "1" })}
      onPage={(p) => setParams({ status, page: String(p) })}
    />
  );
}
```

<!-- example:near-miss case="menu-open" -->

```tsx file="Toolbar.tsx"
const [menuOpen, setMenuOpen] = useState(false);
```

## Verify

- The state decides what content the page lists or shows.
- The user would want the view after a refresh or in a shared link.
