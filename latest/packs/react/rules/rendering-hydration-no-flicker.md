---
id: rendering-hydration-no-flicker
title: Apply client-only values before hydration without a flash
summary: For values only the browser knows, such as a stored theme, set them with a small blocking inline script before first paint. Do not read storage in render or fix it in an effect.
applies_when: Server-rendered pages whose first paint depends on browser-only data such as `localStorage`, a cookie that the server cannot read, or a media query.
severity: medium
source:
  - title: "Vercel React Best Practices"
    url: "https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rendering-hydration-no-flicker.md"
---

# Apply client-only values before hydration without a flash

## Rule

When the first paint depends on data only the browser has, apply it with a small inline script that runs before the content paints. The script sets an attribute or class on an element that React does not render children into. Do not read browser storage during render, and do not correct the value in an effect.

## Why

- Browser storage does not exist on the server. Reading it during render throws on the server or gives a different result on the client, which causes a hydration mismatch.
- A default value that an effect replaces after hydration shows the wrong content first, then flashes to the right one.
- A blocking script runs before first paint, so the page paints once with the right value.

## Exceptions

- The server can read the value, for example from a cookie. Render the right value on the server.
- Client-only apps with no server rendering. Read the value before the first render.
- Values that do not change how the page looks at first paint. A short delay is fine.
- Keep the script small. A blocking script delays rendering.

## Examples

<!-- example:incorrect case="storage-in-render" -->

```tsx file="ThemeWrapper.tsx"
function ThemeWrapper({ children }: { children: ReactNode }) {
  const theme = localStorage.getItem("theme") ?? "light";
  return <div className={theme}>{children}</div>;
}
```

<!-- example:incorrect case="effect-after-hydration" -->

```tsx file="ThemeWrapper.tsx"
function ThemeWrapper({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) setTheme(stored);
  }, []);

  return <div className={theme}>{children}</div>;
}
```

<!-- example:correct case="inline-script" -->

```tsx file="RootLayout.tsx"
const themeScript = `
  try {
    var theme = localStorage.getItem("theme") || "light";
    document.documentElement.dataset.theme = theme;
  } catch (e) {}
`;

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

<!-- example:near-miss case="server-reads-cookie" -->

```tsx file="RootLayout.tsx"
async function RootLayout({ children }: { children: ReactNode }) {
  const theme = (await getCookie("theme")) ?? "light";
  return (
    <html lang="en" data-theme={theme}>
      <body>{children}</body>
    </html>
  );
}
```

## Library notes

### React

- The script changes an attribute on an element that React renders, so React reports a mismatch on that element in development. Put `suppressHydrationWarning` on that element only. See `rendering-hydration-suppress-warning`.
- The script content must be a fixed string. Never insert user input into it.

## Verify

- The page is server-rendered, and the server cannot know the value.
- The code reads browser storage in render, or sets the value in an effect, and users see the wrong value first.
- The script is small and has no user input.
