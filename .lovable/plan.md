

# Vetrya — Multi-Tenant SaaS Portal

## Overview
A production-ready, authenticated web portal for the Vetrya SaaS platform. Authentication is fully backend-driven via HttpOnly cookies — no Auth0 SDK or token management on the frontend. The portal serves as a control surface for data and analytics with a serious, corporate visual identity.

---

## 1. Brand & Design System
- **Color palette**: Primary Blue `#0B2A4A`, Graphite Gray `#2E2E2E`, White `#FFFFFF`
- **Typography**: Inter (neutral sans-serif)
- **No animations, gradients, shadows, or decorative elements**
- Update Tailwind theme variables to match Vetrya brand exactly

---

## 2. Authentication Flow (Backend-Driven)
- **No Auth0 SDK** — the frontend only redirects and reads cookies
- Unauthenticated users are redirected to `API_BASE_URL/login`
- Session validated via `GET /me` with `credentials: "include"`
- 401 responses trigger redirect to login
- Logout calls `POST /logout` then redirects to root
- Auth context wraps the entire app, gating all authenticated routes

---

## 3. Organization Selection (Multi-Tenant)
- After login, fetch organizations from backend (with mock fallback)
- Display an organization selection screen if no org is persisted
- Persist `orgId` and `orgName` in localStorage
- Header dropdown allows switching organizations at any time
- Global state via React Context

---

## 4. Centralized API Service
- All requests use `credentials: "include"`
- Automatically injects `X-Org-Id` header from global state
- Global 401 interception redirects to login
- Base URL from `VITE_API_BASE_URL` environment variable

---

## 5. Application Shell (Layout)
- **Fixed sidebar** (left): Vetrya logo text, navigation links (Overview, Dashboards, Account, Logout), active route highlighted in Primary Blue
- **Fixed header** (top of content): Dynamic page title, user info placeholder, organization selector dropdown
- **Content area**: Clean, data-oriented panels
- Fully responsive

---

## 6. Pages

### `/overview`
- Static placeholder cards: System Status, Usage Metrics, Notifications
- Clean analytical card layout

### `/dashboards`
- Single "Open Analytics Dashboard" button
- Full browser redirect to `VITE_STREAMLIT_URL`
- No iframe, no dashboard content rendered in the portal

### `/account`
- Displays Name, Email, Auth Provider, Current Organization
- Data sourced from the `/me` endpoint

### `/logout`
- Calls `POST /logout`, then redirects to root

---

## 7. Telemetry Scaffold
- Lightweight service posting to `POST /telemetry/event`
- Events: `login_success`, `organization_selected`, `page_view`, `api_error`, `logout`
- Each event includes `timestamp`, `orgId`, `route`
- No analytics UI — fire-and-forget only

---

## 8. Project Structure
```
src/
  components/     — Layout shell, sidebar, header, org selector
  pages/          — Overview, Dashboards, Account
  services/       — API client, auth service
  state/          — Auth context, organization context
  telemetry/      — Event tracking service
```

---

## Environment Variables
- `VITE_API_BASE_URL` — Backend base URL
- `VITE_STREAMLIT_URL` — External Streamlit dashboard URL

