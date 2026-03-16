# EcclesiaFlow — Landing & Frontend

Marketing website, authentication flows, and member dashboard for **EcclesiaFlow**, a church management SaaS platform built with Next.js 16, React 19, and Keycloak.

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16 (App Router) | Framework, SSR, API routes, middleware |
| [React](https://react.dev/) | 19 | UI components |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Type safety across the entire codebase |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Utility-first styling with inline `@theme` config |
| [Framer Motion](https://www.framer.com/motion/) | 12 | Scroll reveals, counters, floating animations |
| [NextAuth](https://authjs.dev/) | v5 (beta.30) | OAuth2/OIDC authentication with Keycloak |
| [next-intl](https://next-intl.dev/) | 4 | Internationalization (French / English) |
| [react-hook-form](https://react-hook-form.com/) + [Zod](https://zod.dev/) | 7 / 4 | Form state management and schema validation |
| [Lucide React](https://lucide.dev/) | 0.577 | Icon library (40+ icons used) |
| [openapi-typescript](https://openapi-ts.dev/) | 7 | Auto-generated TypeScript types from OpenAPI specs |

---

## Architecture Overview

```
┌──────────────────────────────────────────────────┐
│                   Next.js 16                     │
│                                                  │
│  (site)          (auth)          (dashboard)     │
│  Marketing       Login/Register  Member panel    │
│  Navbar+Footer   Minimal layout  Sidebar+Header  │
│                                                  │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐ │
│  │ /          │  │ /connexion │  │ /dashboard  │ │
│  │ /features  │  │ /inscript. │  │ /profil     │ │
│  │ /pricing   │  │ /confirmat.│  │ /compte     │ │
│  │ /about     │  │ /mot-de-p. │  │ /membres    │ │
│  │ /preview   │  │ /callback  │  │ /evenements │ │
│  │            │  │ /onboarding│  │ /finances   │ │
│  └────────────┘  └────────────┘  └────────────┘ │
│                                                  │
│  API Rewrites ──────────────────────────────────>│
│  /api/members/*  ──> Members Module (8080)       │
│  /api/backend-auth/* ──> Auth Module (8081)      │
└──────────────────────────────────────────────────┘
         │                    │
    Keycloak (8180)     Backend Modules
    OIDC + IdP          Spring Boot
```

Three route groups with distinct layouts:

| Route Group | Layout | Purpose |
|---|---|---|
| `(site)` | Navbar + Footer + Decorative elements | Public marketing pages |
| `(auth)` | Minimal centered/split layout | Authentication flows |
| `(dashboard)` | Collapsible sidebar + Header | Authenticated member panel |

---

## Project Structure

```
app/
├── (site)/                     Marketing pages (home, features, pricing, about, preview)
├── (auth)/                     Auth flows (login, register, confirmation, callback, onboarding)
├── (dashboard)/                Dashboard with sidebar layout (profile, account, members...)
└── api/                        NextAuth handler, federated signout, password setup proxy

components/
├── ui/                         14 base components (button, input, card, dialog, badge...)
├── auth/                       6 auth components (auth-card, split-layout, social-button...)
├── sections/                   29 landing page sections (hero, pricing, testimonials, CTA...)
├── decorative/                 8 visual elements (floating-orbs, wave-divider, dot-grid...)
├── animation/                  4 motion components (scroll-reveal, animated-counter...)
├── dashboard/                  Sidebar and header
└── layout/                     Navbar, footer, page-with-banner

lib/
├── auth/                       NextAuth config (Keycloak OIDC + Credentials providers)
├── api/                        API clients with error sanitization + auto-generated types
├── hooks/                      Custom hooks (useSocialSignIn)
├── validation/                 Zod schemas (signup, password, profile, email)
└── constants.ts                Navigation, features, pricing, testimonials data

contexts/                       React Context providers (MemberContext)
messages/                       Translation files (fr.json, en.json)
i18n/                           next-intl routing and request config
```

**80+ components** organized across 8 categories.

---

## Getting Started

### Prerequisites

- **Node.js 20+**
- Running backend services:

| Service | Port | Description |
|---|---|---|
| Keycloak | `8180` | Identity provider (OIDC) |
| Members Module | `8080` | Member management API (Spring Boot) |
| Auth Module | `8081` | Authentication API (Spring Boot) |

### Installation

```bash
# Install dependencies
npm install

# Copy environment template and fill in values
cp .env.example .env.local

# Generate TypeScript types from backend OpenAPI specs
npm run generate:types

# Start development server
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Scope | Description |
|---|---|---|
| `AUTH_SECRET` | Server | Random 32-char secret for NextAuth session encryption |
| `AUTH_KEYCLOAK_ID` | Server | Keycloak client ID (`ecclesiaflow-frontend`) |
| `AUTH_KEYCLOAK_SECRET` | Server | Keycloak client secret (from admin console) |
| `AUTH_KEYCLOAK_ISSUER` | Server | Keycloak realm URL |
| `MEMBERS_API_URL` | Server | Members Module base URL |
| `AUTH_API_URL` | Server | Auth Module base URL |
| `NEXT_PUBLIC_APP_URL` | Public | Frontend URL for redirects |

> No secrets are exposed via `NEXT_PUBLIC_*` variables.

---

## Authentication

### Providers

Two authentication providers configured via NextAuth v5:

1. **Keycloak (OIDC)** — Standard OAuth2 Authorization Code flow with PKCE. Google and Facebook sign-in are delegated to Keycloak as Identity Providers, keeping all OAuth complexity server-side.

2. **Credentials (Direct Grant)** — Token-based authentication used exclusively after the password setup flow. Receives access/refresh tokens from the auth backend and stores them in the session.

### Token Management

- Tokens are stored in **httpOnly cookies** (managed by NextAuth)
- Automatic **token refresh** using the refresh_token grant when the access token expires
- On refresh failure, the session is flagged with `RefreshAccessTokenError` and the user is redirected to `/connexion`

### Auth Flows

```
Standard Login:
  /connexion → Keycloak login page → /api/auth/callback/keycloak → /dashboard

Social Sign-In (new user):
  /connexion → Keycloak → Google/Facebook → /callback → /onboarding → /dashboard

Registration:
  /inscription → email sent → /confirmation?token=... → /mot-de-passe → /dashboard

Logout:
  Dashboard → /api/auth/federated-signout → Keycloak end_session → /connexion

Account Reactivation:
  Login with deactivated account → 403 ACCOUNT_DEACTIVATED → /reactivate
```

### Route Protection

- **Dashboard** layout checks session status via `useSession()` and redirects unauthenticated users
- **MemberProvider** handles missing member profiles (404 → `/callback` for auto-provisioning)
- **API client** intercepts `401` (expired session → federated signout) and `403` with `ACCOUNT_DEACTIVATED` (→ `/reactivate`)

---

## API Integration

### Proxy Rewrites

Backend services are never called directly from the browser. All requests go through Next.js rewrites:

| Frontend Route | Backend Target |
|---|---|
| `/api/members/*` | Members Module — `localhost:8080/ecclesiaflow/members/*` |
| `/api/backend-auth/*` | Auth Module — `localhost:8081/ecclesiaflow/auth/*` |

### API Client

A centralized API client (`lib/api/client.ts`) handles all backend communication:

- Generic `apiRequest<T>()` with configurable timeout (10s default)
- Automatic JSON headers (`Content-Type`, `Accept`)
- **Error sanitization** — Strips JWTs, SQL fragments, and stack traces before displaying to users
- Localized fallback error messages by HTTP status code
- Returns typed result: `{ ok: true; data: T } | { ok: false; error: ApiError }`

### Type-Safe API Types

TypeScript interfaces are auto-generated from OpenAPI specifications using `openapi-typescript`:

```bash
npm run generate:types
```

Generated files live in `lib/api/types/` and are imported by the API client functions.

---

## Internationalization (i18n)

Powered by **next-intl** with the `prefix-when-needed` strategy:

| Locale | URL Pattern | Example |
|---|---|---|
| French (default) | `/path` | `/inscription` |
| English | `/en/path` | `/en/inscription` |

Translation files: `messages/fr.json` and `messages/en.json`

Key namespaces: `common`, `auth.signup`, `auth.login`, `auth.password`, `auth.onboarding`, `auth.emailVerification`, `auth.confirmation`

---

## Form Validation

All forms use **react-hook-form** with **Zod** schema resolvers:

| Schema | Fields | Rules |
|---|---|---|
| `signUpSchema` | firstName, lastName, email, address?, phoneNumber? | 2-50 chars, valid email, E.164 phone |
| `passwordSchema` | password, confirmPassword | 8-128 chars, uppercase, lowercase, digit, special char, match |
| `profileSchema` | firstName, lastName, address?, phoneNumber? | Same validation rules |
| `emailSchema` | email | Valid email format |

---

## Design System

### Theme Tokens

Defined inline in `globals.css` via Tailwind CSS 4 `@theme`:

- **Colors**: Indigo (primary), Amber (accent), Teal (secondary), Slate (neutral)
- **Shadows**: `soft`, `card`, `elevated`, `diffuse`, `glow-indigo`, `glow-amber`, `glow-teal`
- **Font**: Inter (300-800 weights)
- **Animations**: `marquee`, `float`, `gradient-shift`, `pulse-soft`, `fade-in`, `slide-up`

### Accessibility

- Reduced motion: All animations disabled when `prefers-reduced-motion: reduce` is set
- Focus indicators: Indigo ring (2px, offset 2px) on all interactive elements
- Selection highlight: Indigo background

---

## Security

### HTTP Headers

Applied to all routes via `next.config.ts`:

| Header | Value | Protection |
|---|---|---|
| `X-Frame-Options` | `DENY` | Clickjacking |
| `X-Content-Type-Options` | `nosniff` | MIME type sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Referrer leakage |
| `X-XSS-Protection` | `1; mode=block` | Reflected XSS |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Feature restriction |

### Application Security

- **httpOnly cookies** for token storage (no localStorage)
- **No secrets in `NEXT_PUBLIC_*`** environment variables
- **Error sanitization** strips sensitive data (JWTs, SQL, stack traces) from API responses
- **PKCE** enabled for OAuth2 flows (automatic via NextAuth + Keycloak)
- Backend proxy ensures **no direct browser-to-backend communication**

---

## State Management

### MemberContext

The dashboard uses a React Context (`contexts/member-context.tsx`) to provide the authenticated member's profile:

```typescript
const { member, refreshMember, updateMember } = useMember();
```

| Method | Description |
|---|---|
| `member` | Current member profile (guaranteed non-null inside provider) |
| `refreshMember()` | Re-fetch profile from backend |
| `updateMember(patch)` | Optimistic local update for instant UI feedback |

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Production build (SSR + static optimization) |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint with Next.js config |
| `npm run generate:types` | Regenerate TypeScript types from backend OpenAPI specs |

---

## Related Modules

| Module | Port | Repository |
|---|---|---|
| **Auth Module** (Spring Boot) | 8081 | `ecclesiaflow-auth-module` |
| **Members Module** (Spring Boot) | 8080 | `ecclesiaflow-members-module` |
| **Keycloak** (Docker) | 8180 | Configured in auth module (`docker/`) |

---

## License

MIT
