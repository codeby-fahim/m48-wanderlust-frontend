<div align="center">

# Wanderlust

**A modern travel booking experience — discover destinations, manage packages, and book trips.**

[Live Demo](https://m48-wanderlust-frontend.vercel.app) · [GitHub Repository](https://github.com/codeby-fahim/m48-wanderlust-frontend) · [Report an Issue](https://github.com/codeby-fahim/m48-wanderlust-frontend/issues)

![Next.js](https://img.shields.io/badge/Next.js-16.4.3-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19.3-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Better Auth](https://img.shields.io/badge/Auth-Better_Auth-FF6B6B)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)

</div>

---

## Overview

Wanderlust is a full-featured travel booking frontend built with the Next.js App Router. Visitors can browse curated destinations, view detailed trip information, and create an account to book a package. Signed-in users can manage their bookings, while authenticated administrators can publish, edit, and remove travel packages.

The application pairs a **Better Auth** (email/password) authentication layer backed by **MongoDB** with a separate REST API for destination and booking data.

## Features

**Public experience**

- Landing page with hero banner, featured destinations carousel, value propositions, traveler testimonials, and a call to action.
- Browse all destinations in a responsive grid with pricing, duration, and rating.
- Destination detail page with an overview, highlights, and a booking panel.

**Authentication**

- Email/password sign up and sign in via Better Auth.
- JWT session caching (7 days) and bearer-token protected API calls.
- Session-aware navbar with avatar, profile popover, and sign out.
- Route protection for `add-destination`, `my-bookings`, and destination detail pages.

**Booking**

- Book a destination with a selected departure date.
- "My Bookings" dashboard with status badges (pending, confirmed, cancelled), formatted dates, and booking IDs.
- Cancel a booking through a confirmation dialog.

**Package management (admin)**

- Create a travel package with name, country, category, price, duration, departure date, image URL, and description.
- Edit package details in a dialog.
- Delete a package with an alert-dialog confirmation.

## Tech Stack

| Category        | Technology                                                |
| --------------- | --------------------------------------------------------- |
| Framework       | Next.js 16.4.3 (App Router, Turbopack)                    |
| Language        | TypeScript 5 (strict)                                     |
| UI              | React 19.3, shadcn/ui (base-nova), Base UI primitives     |
| Styling         | Tailwind CSS 4 (CSS-first configuration)                  |
| Icons           | Lucide React                                              |
| Carousel        | Embla Carousel                                            |
| Authentication  | Better Auth (MongoDB adapter, JWT plugin)                 |
| Database (auth) | MongoDB                                                   |
| Tooling         | ESLint 9, React Compiler, next/font (Josefin Sans)        |
| Deployment      | Vercel                                                    |

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- A running instance of the Wanderlust REST API (defaults to `http://localhost:5000`)
- A MongoDB connection string for Better Auth collections

### Installation

```bash
git clone https://github.com/codeby-fahim/m48-wanderlust-frontend.git
cd m48-wanderlust-frontend
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
# Better Auth
BETTER_AUTH_SECRET=your-random-secret
BETTER_AUTH_URL=http://localhost:3000

# MongoDB (used for auth collections; database name is "wanderlust")
MONGODB_URL=mongodb+srv://<user>:<password>@<cluster>/wanderlust

# Travel REST API
NEXT_PUBLIC_API_URL=http://localhost:5000
```

| Variable              | Required | Description                                                        |
| --------------------- | -------- | ------------------------------------------------------------------ |
| `BETTER_AUTH_SECRET`  | Yes      | Secret used by Better Auth to sign tokens and cookies.             |
| `BETTER_AUTH_URL`     | Yes      | Public URL of this app. Use the deployed URL in production.        |
| `MONGODB_URL`         | Yes      | MongoDB connection string for the Better Auth database.            |
| `NEXT_PUBLIC_API_URL` | Yes      | Base URL of the travel REST API, exposed to the browser.           |

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The API must be running and reachable at `NEXT_PUBLIC_API_URL` for destination and booking data to load.

### Production Build

```bash
npm run build
npm run start
```

## Available Scripts

| Script          | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the development server         |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build           |
| `npm run lint`  | Run ESLint                           |

Type checking is available via `npx tsc --noEmit` (there is no dedicated script).

## Routes

| Route                    | Access        | Description                                 |
| ------------------------ | ------------- | ------------------------------------------- |
| `/`                      | Public        | Landing page                                |
| `/destinations`          | Public        | All destinations grid                       |
| `/destinations/[id]`     | Authenticated | Destination details, edit/delete, booking   |
| `/add-destination`       | Authenticated | Create a new travel package                 |
| `/my-bookings`           | Authenticated | Bookings for the signed-in user             |
| `/signIn`                | Public        | Email/password sign in                      |
| `/signUp`                | Public        | Account registration                        |
| `/api/auth/[...all]`     | —             | Better Auth route handler                   |

Access control is enforced in `src/proxy.ts` (Next.js 16's proxy, formerly middleware).

## Project Structure

```text
src/
├─ app/
│  ├─ page.tsx                     # Home page composition
│  ├─ destinations/                # List + detail pages
│  ├─ add-destination/             # Create package form
│  ├─ my-bookings/                 # User bookings dashboard
│  ├─ signIn/ signUp/              # Auth pages
│  └─ api/auth/[...all]/route.ts   # Better Auth handler
├─ components/
│  ├─ home/                        # Banner, WhyChooseUs, Testimonials, CTA
│  ├─ destinations/                # DestinationCard, BookingCard, edit/delete
│  ├─ bookings/                    # Booking cards
│  ├─ featured/                    # Featured destinations carousel
│  ├─ layout/                      # Global navbar and footer
│  └─ ui/                          # shadcn/ui components
├─ lib/
│  ├─ auth.ts, auth-client.ts      # Better Auth server/client setup
│  ├─ getTokenFromServer.ts        # Server-side JWT retrieval
│  ├─ getTokenFromClient.ts        # Client-side JWT retrieval
│  └─ type/                        # Shared API types
└─ proxy.ts                        # Route protection
```

## Architecture Notes

### Authentication

- Better Auth is configured with the MongoDB adapter and the JWT plugin in `src/lib/auth.ts`.
- The client uses `authClient` (`src/lib/auth-client.ts`) for session state and email/password actions.
- API requests that mutate data send `Authorization: Bearer <token>`, obtained from `getTokenFromServer` (server components) or `getTokenFromClient` (client components).
- `src/proxy.ts` redirects unauthenticated users to `/signIn` for protected routes.

### Data Fetching

- Server components fetch from `NEXT_PUBLIC_API_URL` with `cache: "no-store"`, so data is always current.
- The destination detail page falls back to demo data if the API is unavailable or returns an incomplete record.
- Remote images come from arbitrary hosts, so `next.config.ts` disables image optimization and cards render plain `<img>` elements.

### Styling & UI

- shadcn/ui components use the **base-nova** style on **Base UI** primitives (not Radix).
- Tailwind CSS 4 is configured entirely in `src/app/globals.css`; there is no `tailwind.config.*`. Brand teal is available as `bg-brand` / `text-brand`.
- React Compiler is enabled, so components avoid manual memoization and follow the Rules of React.
- The global navbar and footer are rendered from `src/app/layout.tsx`.

## API Endpoints Used

| Method   | Endpoint                          | Purpose                              |
| -------- | --------------------------------- | ------------------------------------ |
| `GET`    | `/destinations`                   | List all destinations                |
| `GET`    | `/featured-destinations`          | Home page featured carousel          |
| `GET`    | `/destinations/:id`               | Destination details                  |
| `POST`   | `/add-destination`                | Create a package (auth required)     |
| `PATCH`  | `/destinations/:id`               | Update a package (auth required)     |
| `DELETE` | `/destinations/:id`               | Delete a package (auth required)     |
| `POST`   | `/booking`                        | Create a booking                     |
| `GET`    | `/my-bookings/:email`             | Bookings for a user                  |
| `DELETE` | `/my-bookings/:id`                | Cancel/delete a booking              |

## Deployment

The app is deployed on Vercel at **https://m48-wanderlust-frontend.vercel.app**.

To deploy your own instance:

1. Import the repository into Vercel.
2. Add all four environment variables from the table above.
3. Set `BETTER_AUTH_URL` to the deployed domain and `NEXT_PUBLIC_API_URL` to your production API.
4. Ensure the API allows requests (CORS) from the frontend origin.

## Known Limitations

- The Category / Price Range / Sort By controls on `/destinations` are visual placeholders; filtering and sorting are not implemented yet.
- Rating values, reviews, highlights, and booking perks are static because the API schema does not include them.
- Creating a destination currently logs the API response without a success redirect or toast.
- Social login buttons on the auth pages are UI placeholders; email/password authentication is fully wired.
- No automated test suite is configured.

## Author

**Fahim** — [@codeby-fahim](https://github.com/codeby-fahim)

Built as part of the Programming Hero MERN journey. If you find this project useful, consider giving it a star.
