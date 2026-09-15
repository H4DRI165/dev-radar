# Dev Radar — Project Documentation

## 1. Overview

**Goal:** A practice project to rebuild hands-on React/TypeScript skills, specifically:
- REST API integration (GitHub API)
- GraphQL API integration (Countries API)
- Modern React Router (data router + loaders)
- Client-side state management (Zustand)

**What it does:** Search a GitHub user to view their profile/repos (REST). Search a country to view its details (GraphQL). Compare two GitHub users side by side. Save favorite users/countries to a persistent list.

**Why this project:** Combines two different API paradigms and two different state models (server state via loaders vs. client state via Zustand) in one small, portfolio-worthy app.

---

## 2. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | React + TypeScript | Core skill target |
| Routing | React Router v6.4+/v7 (`createBrowserRouter`, loaders) | Current idiomatic pattern, route-level data fetching |
| REST client | `fetch` or `axios`, called inside loaders | Manual typing/error handling reps |
| GraphQL client | Apollo Client (`client.query()` inside loaders) | Industry standard; direct query call fits loader model |
| Client state | Zustand (+ `persist` middleware) | Lightweight, minimal boilerplate, in-demand skill |
| Styling | Tailwind (or CSS Modules) | Keep styling simple, not the current focus |

---

## 3. Pages / Routes

| Path | Purpose | Data source | Loader? |
|---|---|---|---|
| `/` | Home/search entry | none | No |
| `/user/:username` | GitHub profile: bio, repos, languages, stars | REST (GitHub API) | Yes |
| `/country/:code` | Country detail: capital, languages, currency | GraphQL (Countries API) | Yes |
| `/compare?a=&b=` | Two GitHub users side by side | REST (parallel fetch) | Yes |
| `/favorites` | List of saved users/countries | Zustand store (client state) | No (reads store directly) |
| `*` | 404 fallback | none | No — uses `errorElement` |

Optional stretch: `/user/:username/repos` as a nested route under the profile page via `<Outlet />`, if you want extra nested-routing reps.

---

## 4. Architecture — Folder Structure

Feature-based organization (not type-based):

```
src/
  app/
    router.tsx          # createBrowserRouter config, all routes registered here
    root.tsx            # root layout, nav bar, <Outlet />
  features/
    github/
      api.ts             # REST fetch functions
      types.ts           # GitHub response interfaces
      UserProfile.tsx
      Compare.tsx
      loader.ts
    countries/
      queries.ts          # GraphQL query documents
      types.ts
      CountryDetail.tsx
      loader.ts
    favorites/
      store.ts            # Zustand store (with persist middleware)
      Favorites.tsx
  shared/
    components/          # Button, Spinner, ErrorBoundary, Card, etc.
    lib/
      apolloClient.ts
      githubClient.ts
```

**Reasoning:** Each feature folder owns its own loader, API/query logic, types, and UI — a full vertical slice per feature. This is the closest React convention to Flutter's feature-module organization, without imposing a formal data/domain/presentation split that isn't idiomatic in most React codebases.

---

## 5. Data Flow — Server State vs Client State

Two distinct data flows exist in this app; keeping them mentally separate is one of the main learning goals:

**Server state (loaders):**
```
Navigation → loader() runs → fetch (REST) or client.query() (GraphQL)
→ data returned → useLoaderData() in component → rendered
```
- Not persisted, not global — re-fetched on every navigation to that route.
- Errors handled per-route via `errorElement`.

**Client state (Zustand):**
```
User clicks "Favorite" → store action called → Zustand state updates
→ persisted to localStorage → any component reading the store re-renders
→ survives navigation and page refresh
```
- Global across the whole app, independent of routing.
- Not re-fetched — it's local, user-driven state.

---

## 6. API References

**GitHub REST API** (no auth needed for basic use, rate-limited):
- `GET https://api.github.com/users/{username}` — profile info
- `GET https://api.github.com/users/{username}/repos` — repo list (stars, languages per repo)

**Countries GraphQL API** (`https://countries.trevorblades.com/`):
```graphql
query GetCountry($code: ID!) {
  country(code: $code) {
    name
    capital
    currency
    languages {
      name
    }
  }
}
```

---

## 7. State Management Plan

| State | Where it lives | Why |
|---|---|---|
| GitHub profile/repo data | Loader → `useLoaderData()` | Server data, route-scoped |
| Country data | Loader → `useLoaderData()` | Server data, route-scoped |
| Favorites list | Zustand store (`persist` middleware) | Client state, must survive navigation + refresh |
| Search input value | Local `useState` | Purely local to the Home component |
| Compare page's two usernames | URL query params (`useSearchParams`) | Shareable/bookmarkable state, not app state |

---

## 8. TypeScript Types (initial plan)

```typescript
// features/github/types.ts
interface GitHubUser {
  login: string;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
}

interface GitHubRepo {
  name: string;
  stargazers_count: number;
  language: string | null;
}

// features/countries/types.ts
interface Country {
  name: string;
  capital: string;
  currency: string;
  languages: { name: string }[];
}

// features/favorites/store.ts
interface FavoriteItem {
  type: "user" | "country";
  id: string;       // username or country code
  label: string;    // display name
}
```

---

## 9. Build Order / Milestones

1. Scaffold project (Vite + React + TS), install React Router, Apollo Client, Zustand
2. Set up `createBrowserRouter` with all routes + root layout + nav
3. Build Home page (search input → navigate to `/user/:username`)
4. Build GitHub loader + UserProfile page (REST)
5. Build Apollo client setup + Countries loader + CountryDetail page (GraphQL)
6. Build Compare page (query params + parallel REST fetch)
7. Add Zustand favorites store (+ persist middleware)
8. Add Favorites page + "favorite" buttons on profile/country pages
9. Add 404 route + `errorElement` per route
10. Polish: loading states via `useNavigation()`, basic styling pass

---

## 10. Stretch Goals (optional, only if time allows)

- Nested route: `/user/:username/repos` via `<Outlet />` and tabs
- GraphQL Code Generator for typed Apollo hooks
- Dark mode toggle (small Zustand or Context exercise)
