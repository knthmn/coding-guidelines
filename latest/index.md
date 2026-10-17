# Coding guidelines

Each pack applies only when its condition holds. Use the signals to judge the condition.
Read a pack index only when the pack applies. The index of pack `<pack-id>` is `packs/<pack-id>/index.md`.

- `api`: API Endpoints. Applies when: Any project that exposes HTTP or RPC endpoints.
  Signals: Route handlers, server functions, or RPC routers such as oRPC or tRPC.
  Rules: 1
- `code-organization`: Code Organization. Applies when: Any project, unless its AGENTS.md opts out of this pack.
  Signals: Opt-out form in AGENTS.md: Guideline opt-out: pack `code-organization`, reason `<reason>`.
  Rules: 1
- `react`: React Best Practices. Applies when: Any project that uses React.
  Signals: react in package.json dependencies; .jsx or .tsx components that import from react.
  Rules: 35
- `ui-styling`: UI Styling. Applies when: Any project with a user interface that it styles itself.
  Signals: CSS, Tailwind or CSS-in-JS in the project.
  Rules: 35
- `ux`: User Experience. Applies when: Any project with a user interface.
  Signals: Pages, screens, forms or components that users interact with.
  Rules: 31
- `web-app-template`: Web App Convention. Applies when: Only when the project is set up with web-app-template.
  Signals: AGENTS.md states the project is set up with web-app-template; TanStack Start, oRPC, Drizzle and Lingui in package.json.
  Rules: 5
- `web-frontend`: Web Frontend. Applies when: Any project with a browser frontend, whatever the UI framework.
  Signals: HTML pages, client-side JavaScript or a bundler such as Vite, webpack or Next.js.
  Rules: 12
