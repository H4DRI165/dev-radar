# Dev Radar

A small practice app for rebuilding hands-on React/TypeScript skills across two API paradigms and two state models.

- **REST integration** — search a GitHub user and view their profile and repositories.
- **GraphQL integration** — look up a country and view its details.
- **Server state** — fetched per-route via React Router loaders.
- **Client state** — a persistent favorites list via Zustand.

Full design and rationale live in [`docs/PROJECT_SPEC.md`](docs/PROJECT_SPEC.md).

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React + TypeScript |
| Build tool | Vite |
| Routing | React Router (data router, `createBrowserRouter`) |
| REST client | native `fetch`, called inside loaders |
| GraphQL client | Apollo Client, `client.query()` inside loaders |
| Client state | Zustand with `persist` middleware |
| Styling | Tailwind CSS v4 |

## Getting Started

```bash
npm install
npm run dev
```

The dev server prints a local URL (default `http://localhost:5173`).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Type-check with `tsc -b`, then build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Project Structure

Feature-based organization: each feature owns its API logic, types, loaders, and UI.

```
src/
  app/
    router.tsx          # createBrowserRouter config, all routes registered here
    root.tsx            # root layout: nav bar + <Outlet />
  features/
    home/               # search entry page
    github/             # REST: profile, repos, compare
    countries/          # GraphQL: country detail
    favorites/          # Zustand store + favorites page
  shared/
    components/         # Button, Spinner, Card, NotFound, etc.
    lib/                # apolloClient.ts, githubClient.ts
  main.tsx              # mounts <RouterProvider />
  index.css             # Tailwind entry
```

## Routes

| Path | Purpose | Data source | Loader |
|---|---|---|---|
| `/` | Home / search entry | none | No |
| `/user/:username` | GitHub profile: bio, repos, languages, stars | GitHub REST | Yes |
| `/country/:code` | Country detail: capital, languages, currency | Countries GraphQL | Yes |
| `/compare?a=&b=` | Two GitHub users side by side | GitHub REST (parallel) | Yes |
| `/favorites` | Saved users and countries | Zustand store | No |
| `*` | 404 fallback | none | `errorElement` + splat route |

## API References

- **GitHub REST** (no auth for basic use, rate-limited): `https://api.github.com/users/{username}` and `https://api.github.com/users/{username}/repos`
- **Countries GraphQL**: `https://countries.trevorblades.com/`

## Status

Tracks the milestones in [`docs/PROJECT_SPEC.md`](docs/PROJECT_SPEC.md#9-build-order--milestones).

- [x] 1. Scaffold project, install React Router, Apollo Client, Zustand, Tailwind
- [x] 2. `createBrowserRouter` with all routes, root layout, and nav
- [ ] 3. Home page search input → navigate to `/user/:username`
- [ ] 4. GitHub loader + UserProfile page (REST)
- [ ] 5. Apollo client + Countries loader + CountryDetail page (GraphQL)
- [ ] 6. Compare page (query params + parallel REST fetch)
- [ ] 7. Zustand favorites store with `persist` middleware
- [ ] 8. Favorites page + favorite buttons
- [ ] 9. 404 route + per-route `errorElement`
- [ ] 10. Polish: `useNavigation()` loading states + styling pass
